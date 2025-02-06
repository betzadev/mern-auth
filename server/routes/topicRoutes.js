import express from "express";
import { getTopics, getTopicById } from "../controllers/topicController.js";
import userAuth from "../middleware/userAuth.js"; // Importa el middleware de autenticación

const router = express.Router();

// Ruta pública (no requiere autenticación)
router.get("/", getTopics);

// Ruta protegida (requiere autenticación)
router.get("/:id", userAuth, getTopicById);

export default router;
