import express from "express";
import {
  getQuizzesByTopic,
  submitQuiz,
  getUserProgress,
} from "../controllers/quizController.js";
import userAuth from "../middleware/userAuth.js"; // Importa el middleware de autenticación

const router = express.Router();

// Ruta pública (no requiere autenticación)
router.get("/topic/:topicId", getQuizzesByTopic);

// Rutas protegidas (requieren autenticación)
router.post("/submit", userAuth, submitQuiz);
router.get("/progress/:userId", userAuth, getUserProgress);

export default router;
