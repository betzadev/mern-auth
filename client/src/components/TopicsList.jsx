import React, { useEffect, useState } from "react";

const TopicsList = ({ onTopicClick }) => {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/topics`
        ); // Usa la variable de entorno
        const data = await response.json();
        if (data.success) {
          setTopics(data.topics);
        } else {
          console.error("Error fetching topics:", data.message);
        }
      } catch (error) {
        console.error("Error fetching topics:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTopics();
  }, []);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Temas Disponibles</h1>
      <div className="space-y-4">
        {topics.map((topic) => (
          <div
            key={topic._id}
            className="p-4 border rounded-lg shadow-sm cursor-pointer hover:bg-gray-50"
            onClick={() => onTopicClick(topic._id)}
          >
            <h2 className="text-xl font-semibold">{topic.title}</h2>
            <p className="text-gray-600">{topic.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopicsList;
