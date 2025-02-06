import { useEffect, useState } from "react";
import { motion } from "framer-motion";
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

  if (loading) return <div className="text-center">Cargando...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;
  if (quizzes.length === 0) {
    return (
      <div className="text-center">
        No se encontraron cuestionarios para este tema
      </div>
    );
  }

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg max-w-3xl mx-auto">
      <motion.button
        onClick={onBack}
        className="mb-4 flex items-center gap-2 text-blue-600 font-semibold text-lg hover:text-blue-800 transition duration-300"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        ⬅ Volver a la lista de temas
      </motion.button>
      <h1 className="text-3xl font-bold text-gray-900 mb-4">Cuestionarios</h1>
      <div className="space-y-4">
        {quizzes.map((quiz) => (
          <motion.div
            key={quiz._id}
            className="p-6 border rounded-xl shadow-lg bg-white transform hover:scale-102 transition-all duration-300"
            whileHover={{ scale: 1.03 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <SubmitQuiz
              quizId={quiz._id}
              question={quiz.question}
              correctAnswer={quiz.correctAnswer}
              options={quiz.options}
              userId={userId}
              isCompleted={completedQuizzes[quiz._id]}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default QuizzesByTopic;
