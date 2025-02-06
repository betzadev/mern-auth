import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CheckCircle, XCircle } from "lucide-react";

const SubmitQuiz = ({
  quizIndex = 0,
  question,
  correctAnswer,
  options,
  userId,
  isCompleted,
}) => {
  const [selectedOption, setSelectedOption] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(isCompleted);
  const [quizStarted, setQuizStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(20);
  const [isCorrect, setIsCorrect] = useState(null);

  useEffect(() => {
    if (quizStarted && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
    if (timeLeft === 0 && quizStarted && !isSubmitted) {
      handleSubmit();
    }
  }, [quizStarted, timeLeft]);

  const handleSubmit = async () => {
    if (!selectedOption) {
      setMessage("No se seleccionó ninguna opción.");
    }

    try {
      const ipResponse = await fetch("https://api64.ipify.org?format=json");
      const ipData = await ipResponse.json();
      const userIp = ipData.ip;

      const score = selectedOption === correctAnswer ? 1 : 0;
      setIsCorrect(selectedOption === correctAnswer);

      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/quizzes/submit`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            quizIndex,
            score,
            userId,
            ip: userIp,
          }),
        }
      );

      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      if (!data.success)
        throw new Error(data.message || "Error al enviar la respuesta");

      setMessage("Respuesta enviada correctamente.");
      setIsSubmitted(true);
      setQuizStarted(false);
    } catch (error) {
      console.error("Error submitting quiz:", error);
      setMessage(`Error al enviar la respuesta: ${error.message}`);
    }
  };

  return (
    <div className="text-center mt-6 p-6 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg shadow-lg transform transition-transform hover:scale-105">
      <h2 className="text-2xl font-bold mb-6 text-white">
        ¿Preparado para comenzar?
      </h2>
      {!quizStarted && !isSubmitted ? (
        <motion.button
          onClick={() => setQuizStarted(true)}
          className="mt-4 bg-green-500 text-white px-6 py-3 rounded-full hover:bg-green-600 transition duration-300 transform hover:scale-105"
          whileHover={{ scale: 1.1 }}
        >
          Comenzar prueba
        </motion.button>
      ) : null}
      {quizStarted && !isSubmitted && (
        <>
          <motion.p
            className="text-red-500 font-semibold text-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Tiempo restante: {timeLeft}s
          </motion.p>
          <h2 className="text-2xl font-semibold mb-6 text-white">{question}</h2>
          <ul className="space-y-3">
            {options.map((option, index) => (
              <motion.li
                key={index}
                className="bg-white p-3 rounded-xl shadow-md hover:shadow-xl transition duration-300 transform hover:scale-105"
                whileHover={{ scale: 1.05 }}
              >
                <label className="flex items-center space-x-3">
                  <input
                    type="radio"
                    name="quiz-option"
                    value={option}
                    checked={selectedOption === option}
                    onChange={() => setSelectedOption(option)}
                    className="form-radio h-5 w-5 text-blue-600"
                  />
                  <span className="text-gray-800 font-medium">{option}</span>
                </label>
              </motion.li>
            ))}
          </ul>
          <motion.button
            onClick={handleSubmit}
            className="mt-4 bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-600 transition duration-300"
            whileHover={{ scale: 1.1 }}
          >
            Enviar respuesta
          </motion.button>
        </>
      )}
      {isSubmitted && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mt-6 flex items-center justify-center"
        >
          {isCorrect ? (
            <div className="text-green-600 flex items-center text-xl">
              <CheckCircle size={28} />
              <span className="ml-3">¡Respuesta correcta!</span>
            </div>
          ) : (
            <div className="text-red-600 flex items-center text-xl">
              <XCircle size={28} />
              <span className="ml-3">Respuesta incorrecta</span>
            </div>
          )}
        </motion.div>
      )}
      {message && (
        <motion.p
          className="mt-4 text-white text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {message}
        </motion.p>
      )}
    </div>
  );
};

export default SubmitQuiz;
