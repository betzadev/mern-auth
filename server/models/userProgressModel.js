import mongoose from "mongoose";

const userProgressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  quizId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Quiz",
    required: true,
  },
  score: {
    type: Number,
    required: true,
  },
  completedAt: {
    type: Date,
    default: Date.now,
  },
});

const UserProgress =
  mongoose.models.UserProgress ||
  mongoose.model("UserProgress", userProgressSchema);

export default UserProgress;
