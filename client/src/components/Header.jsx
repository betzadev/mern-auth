import { useContext, useState, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import Quiz from "react-quiz-component";
import { assets } from "../assets/assets";

const Dashboard = () => {
  const { userData } = useContext(AppContext);
  const [topics, setTopics] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [userProgress, setUserProgress] = useState({});

  useEffect(() => {
    // Función para cargar los temas desde la API
    const fetchTopics = async () => {
      try {
        const response = await fetch("/api/topics");
        const data = await response.json();
        setTopics(data);
      } catch (error) {
        console.error("Error fetching topics:", error);
      }
    };

    fetchTopics();
  }, []);

  const handleQuizStart = (topic) => {
    setSelectedQuiz(topic);
  };

  const handleQuizComplete = async (result) => {
    try {
      // Enviar resultados a la API
      await fetch("/api/quizzes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          topicId: selectedQuiz._id,
          score: result.score,
          userId: userData._id,
        }),
      });
      setSelectedQuiz(null);
    } catch (error) {
      console.error("Error saving quiz results:", error);
    }
  };

  return (
    <div className="min-h-screen bg-[#dcfbff] p-8">
      {!selectedQuiz ? (
        <>
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-[#022237] mb-4">
              Bienvenido, {userData.name}!
            </h1>
            <p className="text-[#3390bf] text-lg">
              Tu progreso actual: {Object.keys(userProgress).length} de{" "}
              {topics.length} módulos completados
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topics.map((topic, index) => (
              <div
                key={topic._id}
                className="bg-white rounded-lg p-6 shadow-lg"
              >
                <h3 className="text-xl font-semibold text-[#022237] mb-3">
                  Módulo {index + 1}: {topic.title}
                </h3>
                <p className="text-[#3390bf] mb-4">{topic.description}</p>

                <div className="space-y-2">
                  {topic.modules.map((module, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between bg-[#f5f5f5] p-3 rounded"
                    >
                      <span className="text-[#022237]">{module.title}</span>
                      <button
                        onClick={() => handleQuizStart(topic)}
                        className="bg-[#6abb55] text-white px-4 py-1 rounded-full hover:bg-[#5aa345] transition-colors"
                      >
                        {userProgress[topic._id]
                          ? `Ver resultados`
                          : "Comenzar quiz"}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-3xl mx-auto">
          <Quiz
            quiz={selectedQuiz.quiz}
            onComplete={handleQuizComplete}
            showInstantFeedback={true}
          />
        </div>
      )}
    </div>
  );
};

const Header = () => {
  const { userData } = useContext(AppContext);

  if (userData) {
    return <Dashboard />;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center bg-white">
      <img
        src={assets.header_img}
        alt="Logo de EDUTGS"
        className="w-36 h-36 rounded-full mb-6"
      />
      <h1 className="flex items-center gap-2 text-xl sm:text-3xl font-medium mb-2 text-[#022237]">
        ¡Hola Estudiante!
        <img src={assets.hand_wave} className="w-8 aspect-square" alt="" />
      </h1>
      <h2 className="text-3xl sm:text-5xl font-semibold mb-4 text-[#3390bf]">
        Bienvenido a EDUTGS
      </h2>
      <p className="mb-8 max-w-md text-lg text-[#022237]">
        EDUTGS es tu herramienta educativa para dominar la Teoría General de
        Sistemas. Con un enfoque interactivo y dinámico, te ayudaremos a
        comprender y aplicar los conceptos clave de manera efectiva.
      </p>
      <button className="rounded-full px-8 py-2.5 text-white font-semibold transition-all duration-300 hover:bg-opacity-90 bg-[#6abb55]">
        Comenzar
      </button>
    </div>
  );
};

export default Header;
