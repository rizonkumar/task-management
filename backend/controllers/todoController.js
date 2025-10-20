const todoService = require("../services/todoService");

exports.getTodos = async (req, res) => {
  try {
    const todos = await todoService.getTodos(req.user.id);
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getTodo = async (req, res) => {
  try {
    const todo = await todoService.getTodo(req.params.id, req.user.id);
    res.json(todo);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

exports.createTodo = async (req, res) => {
  try {
    const todo = await todoService.createTodo(req.user.id, req.body);
    res.status(201).json(todo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateTodo = async (req, res) => {
  try {
    const todo = await todoService.updateTodo(
      req.params.id,
      req.user.id,
      req.body
    );
    res.json(todo);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

exports.deleteTodo = async (req, res) => {
  try {
    await todoService.deleteTodo(req.params.id, req.user.id);
    res.json({ message: "Todo deleted successfully" });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

exports.toggleTodo = async (req, res) => {
  try {
    const todo = await todoService.toggleTodo(req.params.id, req.user.id);
    res.json(todo);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
