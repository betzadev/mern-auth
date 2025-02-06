import Quiz from "../models/quizModel.js";
import UserProgress from "../models/userProgressModel.js";

export const getQuizzesByTopic = async (req, res) => {
  const { topicId } = req.params;
  try {
    const quizzes = await Quiz.find({ topicId });
    if (quizzes.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No se encontraron cuestionarios para este tema",
      });
    }
    res.json({ success: true, quizzes });
  } catch (error) {
    console.error("Error al obtener los cuestionarios:", error);
    res
      .status(500)
      .json({ success: false, message: "Error interno del servidor" });
  }
};

export const submitQuiz = async (req, res) => {
  const { quizId, score } = req.body;
  const userId = req.userId; // Obtenido del middleware de autenticación

  try {
    const userProgress = await UserProgress.findOneAndUpdate(
      { userId, quizId },
      { score },
      { new: true, upsert: true }
    );
    res.json({
      success: true,
      message: "Respuesta enviada correctamente",
      userProgress,
    });
  } catch (error) {
    console.error("Error al enviar la respuesta del cuestionario:", error);
    res
      .status(500)
      .json({ success: false, message: "Error interno del servidor" });
  }
};

export const getUserProgress = async (req, res) => {
  const userId = req.userId; // Obtenido del middleware de autenticación

  try {
    const progress = await UserProgress.find({ userId });
    res.json({ success: true, progress });
  } catch (error) {
    console.error("Error al obtener el progreso del usuario:", error);
    res
      .status(500)
      .json({ success: false, message: "Error interno del servidor" });
  }
};
