const goalService = require("../services/goalService");

exports.getGoals = async (req, res) => {
  try {
    const goals = await goalService.getGoals(req.user.id, req.query);
    res.json(goals);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getGoal = async (req, res) => {
  try {
    const goal = await goalService.getGoal(req.params.id, req.user.id);
    res.json(goal);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

exports.createGoal = async (req, res) => {
  try {
    const goal = await goalService.createGoal(req.user.id, req.body);
    res.status(201).json(goal);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateGoal = async (req, res) => {
  try {
    const goal = await goalService.updateGoal(
      req.params.id,
      req.user.id,
      req.body
    );
    res.json(goal);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

exports.deleteGoal = async (req, res) => {
  try {
    await goalService.deleteGoal(req.params.id, req.user.id);
    res.json({ message: "Goal deleted successfully" });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

exports.updateProgress = async (req, res) => {
  try {
    const { current } = req.body;
    const goal = await goalService.updateProgress(
      req.params.id,
      req.user.id,
      current
    );
    res.json(goal);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
