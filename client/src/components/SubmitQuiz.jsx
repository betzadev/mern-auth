import { useState, useEffect } from "react";
import { CheckCircle } from "lucide-react";

const SubmitQuiz = ({
  quizId,
  correctAnswer,
  options,
  quizNumber,
  userId,
  isCompleted,
}) => {
  const [selectedOption, setSelectedOption] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isStarted, setIsStarted] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(isCompleted);

  useEffect(() => {
    let timer;
    if (isStarted && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => Math.max(prevTime - 1, 0));
      }, 1000);
    } else if (timeLeft === 0 && isStarted) {
      handleSubmit();
    }

    return () => clearInterval(timer);
  }, [isStarted, timeLeft]);

  const handleStart = () => {
    if (isSubmitted) {
      return; // Prevenir iniciar si ya está completado
    }
    setIsStarted(true);
  };

  const handleSubmit = async () => {
    if (!selectedOption && timeLeft > 0) {
      setMessage("No se seleccionó ninguna opción.");
      return;
    }

    try {
      const score = selectedOption === correctAnswer ? 1 : 0;

      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/quizzes/submit`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            quizId,
            score,
            userId,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      if (!data.success) {
        throw new Error(data.message || "Error al enviar la respuesta");
      }

      setMessage("Respuesta enviada correctamente.");
      setError(null);
      setIsStarted(false);
      setIsSubmitted(true);
      setTimeLeft(30);
    } catch (error) {
      console.error("Error submitting quiz:", error);
      setError(`Error al enviar la respuesta: ${error.message}`);
      setMessage("");
    }
  };

  if (isSubmitted) {
    return (
      <div className="text-center mt-4 p-4 bg-green-100 rounded-lg">
        <CheckCircle className="mx-auto text-green-500 w-12 h-12 mb-2" />
        <p className="text-green-600 font-semibold">Cuestionario completado</p>
        <p className="text-sm text-gray-600 mt-2">
          Este cuestionario ya ha sido completado y no puede realizarse
          nuevamente.
        </p>
      </div>
    );
  }

  if (!isStarted) {
    return (
      <div className="text-center mt-4">
        <h2 className="text-xl font-semibold mb-4 text-[#022237]">
          Cuestionario {quizNumber}
        </h2>
        <button
          onClick={handleStart}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
        >
          Comenzar prueba
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-4 text-lg font-bold text-[#022237]">
        Tiempo restante: {timeLeft} segundos
      </div>
      <ul className="space-y-2">
        {options.map((option, index) => (
          <li key={index}>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="quiz-option"
                value={option}
                checked={selectedOption === option}
                onChange={() => setSelectedOption(option)}
                className="form-radio h-4 w-4 text-blue-600"
              />
              <span className="text-gray-700">{option}</span>
            </label>
          </li>
        ))}
      </ul>
      <button
        onClick={handleSubmit}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
        disabled={timeLeft === 0}
      >
        Enviar respuesta
      </button>
      {message && <p className="mt-4 text-green-600">{message}</p>}
      {error && <p className="mt-4 text-red-600">{error}</p>}
    </div>
  );
};

export default SubmitQuiz;
