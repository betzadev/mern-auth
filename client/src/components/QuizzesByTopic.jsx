"use client";

import { useEffect, useState } from "react";
import SubmitQuiz from "./SubmitQuiz";

const QuizzesByTopic = ({ topicId, onBack, userId }) => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [completedQuizzes, setCompletedQuizzes] = useState({});

  useEffect(() => {
    const fetchQuizzes = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/quizzes/topic/${topicId}`,
          {
            credentials: "include",
          }
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (data.success) {
          setQuizzes(data.quizzes);
          // Verificar el progreso del usuario para cada cuestionario
          const completed = {};
          data.quizzes.forEach((quiz) => {
            completed[quiz._id] = quiz.completed || false;
          });
          setCompletedQuizzes(completed);
        } else {
          setError(
            data.message || "Error desconocido al obtener los cuestionarios"
          );
        }
      } catch (error) {
        setError(`Error al obtener los cuestionarios: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    if (topicId) {
      fetchQuizzes();
    }
  }, [topicId]);

  const handleSubmitQuiz = async (quizId, score, userId) => {
    try {
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
      setCompletedQuizzes((prev) => ({ ...prev, [quizId]: true }));
    } catch (error) {
      console.error("Error submitting quiz:", error);
      throw error;
    }
  };

  if (loading) {
    return <div className="text-center">Cargando...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  if (quizzes.length === 0) {
    return (
      <div className="text-center">
        No se encontraron cuestionarios para este tema
      </div>
    );
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <button
        onClick={onBack}
        className="mb-4 text-blue-500 hover:underline font-semibold"
      >
        Volver al detalle del tema
      </button>
      <h1 className="text-2xl font-bold mb-4 text-[#022237]">Cuestionarios</h1>
      <div className="space-y-4">
        {quizzes.map((quiz, index) => (
          <div
            key={quiz._id}
            className="p-4 border rounded-lg shadow-sm bg-gray-50"
          >
            <SubmitQuiz
              quizId={quiz._id}
              correctAnswer={quiz.correctAnswer}
              options={quiz.options}
              onSubmit={handleSubmitQuiz}
              quizNumber={index + 1}
              userId={userId}
              isCompleted={completedQuizzes[quiz._id]}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuizzesByTopic;
