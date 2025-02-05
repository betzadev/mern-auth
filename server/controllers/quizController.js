import Quiz from "../models/quizModel.js";
import Topic from "../models/topicModel.js";

export const submitQuiz = async (req, res) => {
  try {
    const { topicId, answers } = req.body;
    const userId = req.userId;

    // Get topic questions to validate answers
    const topic = await Topic.findById(topicId);
    if (!topic) {
      return res.status(404).json({ message: "Topic not found" });
    }

    // Calculate score
    const processedAnswers = answers.map((answer, index) => {
      const question = topic.questions[index];
      return {
        questionId: question._id,
        selectedAnswer: answer,
        isCorrect: answer === question.correctAnswer,
      };
    });

    const correctAnswers = processedAnswers.filter((a) => a.isCorrect).length;
    const score = (correctAnswers / topic.questions.length) * 100;

    const quiz = new Quiz({
      userId,
      topicId,
      answers: processedAnswers,
      score,
      completed: true,
    });

    await quiz.save();
    res.status(201).json({
      score,
      correctAnswers,
      totalQuestions: topic.questions.length,
      answers: processedAnswers,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getUserQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find({ userId: req.userId })
      .populate("topicId", "title")
      .sort("-completedAt")
      .select("-answers");
    res.json(quizzes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getQuizDetails = async (req, res) => {
  try {
    const quiz = await Quiz.findOne({
      _id: req.params.id,
      userId: req.userId,
    }).populate("topicId");

    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    res.json(quiz);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
