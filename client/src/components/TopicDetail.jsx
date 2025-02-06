"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const TopicDetail = ({ topicId, onBack, onQuizClick }) => {
  const [topic, setTopic] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTopic = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/topics/${topicId}`,
          {
            credentials: "include",
          }
        );
        const data = await response.json();
        if (data.success) {
          setTopic(data.topic);
        } else {
          setError(data.message || "Error desconocido al obtener el tema");
        }
      } catch (error) {
        setError(`Error al obtener el tema: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    if (topicId) {
      fetchTopic();
    }
  }, [topicId]);

  if (loading) {
    return (
      <div className="text-center text-lg font-semibold animate-pulse">
        Cargando...
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500 font-medium">{error}</div>;
  }

  if (!topic) {
    return (
      <div className="text-center text-gray-500 font-medium">
        Tema no encontrado
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

      <h1 className="text-3xl font-bold text-gray-900 mb-4">{topic.title}</h1>
      <p className="text-gray-700 leading-relaxed text-lg">{topic.content}</p>

      <motion.button
        onClick={() => onQuizClick(topic._id)}
        className="mt-6 bg-gradient-to-r from-blue-500 to-blue-700 text-white px-6 py-3 rounded-lg font-semibold text-lg shadow-md hover:shadow-xl transform hover:scale-105 transition-all duration-300"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        Ver cuestionarios
      </motion.button>
    </div>
  );
};

export default TopicDetail;
