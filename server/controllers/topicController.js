import Topic from "../models/topicModel.js";

export const getAllTopics = async (req, res) => {
  try {
    const topics = await Topic.find()
      .select("title description order")
      .sort("order");
    res.json(topics);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTopicById = async (req, res) => {
  try {
    const topic = await Topic.findById(req.params.id);
    if (!topic) {
      return res.status(404).json({ message: "Topic not found" });
    }
    res.json(topic);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTopicQuestions = async (req, res) => {
  try {
    const topic = await Topic.findById(req.params.id).select("questions");
    if (!topic) {
      return res.status(404).json({ message: "Topic not found" });
    }
    res.json(topic.questions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
