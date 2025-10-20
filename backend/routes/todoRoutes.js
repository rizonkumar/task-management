const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController');
const authMiddleware = require('../middlewares/auth');
const { validateTodo, handleValidationErrors } = require('../validators/todoValidator');

// Apply auth middleware to all routes
router.use(authMiddleware);

// Routes
router.get('/', todoController.getTodos);
router.get('/:id', todoController.getTodo);
router.post('/', validateTodo, handleValidationErrors, todoController.createTodo);
router.put('/:id', validateTodo, handleValidationErrors, todoController.updateTodo);
router.delete('/:id', todoController.deleteTodo);
router.patch('/:id/toggle', todoController.toggleTodo);

module.exports = router;
