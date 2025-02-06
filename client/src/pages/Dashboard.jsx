"use client";

import { useContext, useState, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate, useParams } from "react-router-dom";
import TopicsList from "../components/TopicsList";
import TopicDetail from "../components/TopicDetail";
import QuizzesByTopic from "../components/QuizzesByTopic";

const Dashboard = () => {
  const { userData } = useContext(AppContext);
  const navigate = useNavigate();
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [selectedQuizTopic, setSelectedQuizTopic] = useState(null);
  const { topicId } = useParams();

  useEffect(() => {
    document.documentElement.style.backgroundColor = "#dcfbff";
    document.body.style.backgroundColor = "#dcfbff";

    if (topicId) {
      setSelectedTopic(topicId);
    }
  }, [topicId]);

  const handleTopicClick = (topicId) => {
    setSelectedTopic(topicId);
    setSelectedQuizTopic(null);
  };

  const handleQuizClick = (topicId) => {
    setSelectedQuizTopic(topicId);
    // No navegamos a una nueva ruta, solo actualizamos el estado
  };

  const handleBack = () => {
    if (selectedQuizTopic) {
      setSelectedQuizTopic(null);
    } else if (selectedTopic) {
      setSelectedTopic(null);
    }
    // No navegamos a una nueva ruta, solo actualizamos el estado
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#dcfbff]">
      <div className="max-w-4xl mx-auto mt-12 sm:mt-16 flex-grow px-4 sm:px-8 py-8 sm:py-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-[#022237] mb-3 sm:mb-4 text-center">
          ¡Bienvenido, {userData.name}!
        </h1>
        <p className="text-[#3390bf] text-lg sm:text-xl text-center">
          Explora los temas y cuestionarios disponibles.
        </p>

        <div className="mt-6 sm:mt-10">
          {!selectedTopic && !selectedQuizTopic && (
            <TopicsList onTopicClick={handleTopicClick} />
          )}

          {selectedTopic && !selectedQuizTopic && (
            <TopicDetail
              topicId={selectedTopic}
              onBack={handleBack}
              onQuizClick={handleQuizClick}
            />
          )}

          {selectedQuizTopic && (
            <QuizzesByTopic topicId={selectedQuizTopic} onBack={handleBack} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
