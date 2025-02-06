import Topic from "../models/topicModel.js";

export const getTopics = async (req, res) => {
  try {
    const topics = await Topic.find();
    res.json({ success: true, topics });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const getTopicById = async (req, res) => {
  const { id } = req.params;
  try {
    const topic = await Topic.findById(id);
    if (!topic) {
      return res.json({ success: false, message: "Topic not found" });
    }
    res.json({ success: true, topic });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
