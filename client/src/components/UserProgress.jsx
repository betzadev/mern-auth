import { useState, useEffect } from "react";

const UserProgress = () => {
  const [progress, setProgress] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/quizzes/progress`,
          {
            credentials: "include",
          }
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (data.success) {
          setProgress(data.progress);
        } else {
          setError(data.message || "Error desconocido al obtener el progreso");
        }
      } catch (error) {
        setError(`Error al obtener el progreso: ${error.message}`);
        console.error("Error completo:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProgress();
  }, []);

  if (loading) {
    return <div className="text-center">Cargando progreso...</div>;
  }

  if (error) {
    return (
      <div className="text-center text-red-500">
        <p>{error}</p>
        <p>Por favor, verifica tu conexión y asegúrate de estar autenticado.</p>
      </div>
    );
  }

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Tu Progreso</h2>
      {progress.length === 0 ? (
        <p>Aún no has completado ningún cuestionario.</p>
      ) : (
        <ul className="space-y-2">
          {progress.map((item) => (
            <li key={item._id} className="bg-white p-4 rounded shadow">
              <p>Quiz: {item.quizId.question}</p>
              <p>Puntuación: {item.score}</p>
              <p>Completado: {new Date(item.completedAt).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserProgress;
