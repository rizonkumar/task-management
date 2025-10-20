const logService = require("../services/logService");

exports.getLogs = async (req, res) => {
  try {
    const logs = await logService.getLogs(req.user.id, req.query);
    res.json(logs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getLog = async (req, res) => {
  try {
    const log = await logService.getLog(req.params.id, req.user.id);
    res.json(log);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

exports.createLog = async (req, res) => {
  try {
    const log = await logService.createLog(req.user.id, req.body);
    res.status(201).json(log);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateLog = async (req, res) => {
  try {
    const log = await logService.updateLog(
      req.params.id,
      req.user.id,
      req.body
    );
    res.json(log);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

exports.deleteLog = async (req, res) => {
  try {
    await logService.deleteLog(req.params.id, req.user.id);
    res.json({ message: "Log deleted successfully" });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
