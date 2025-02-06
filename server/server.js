import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";

import connectDB from "./config/mongodb.js";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";
import topicRouter from "./routes/topicRoutes.js";
import quizRouter from "./routes/quizRoutes.js";

const app = express();
const port = process.env.PORT || 4000;
connectDB();

const allowedOrigins = ["http://localhost:5173", ""];

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: allowedOrigins, credentials: true }));

// API Endpoints
app.get("/", (req, res) => res.send("APP IS RUNNING"));
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/topics", topicRouter);
app.use("/api/quizzes", quizRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
