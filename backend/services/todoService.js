const prisma = require('../config/prisma');

class TodoService {
  async getTodos(userId) {
    return await prisma.todo.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' }
    });
  }

  async getTodo(id, userId) {
    const todo = await prisma.todo.findFirst({
      where: { id, userId }
    });

    if (!todo) {
      throw new Error('Todo not found');
    }

    return todo;
  }

  async createTodo(userId, data) {
    const { title, description, priority, dueDate, category } = data;

    return await prisma.todo.create({
      data: {
        title,
        description,
        priority: priority || 'medium',
        dueDate: dueDate ? new Date(dueDate) : null,
        category,
        userId
      }
    });
  }

  async updateTodo(id, userId, data) {
    // Check if todo exists and belongs to user
    const existingTodo = await prisma.todo.findFirst({
      where: { id, userId }
    });

    if (!existingTodo) {
      throw new Error('Todo not found');
    }

    const { title, description, priority, dueDate, category, completed } = data;

    return await prisma.todo.update({
      where: { id },
      data: {
        title,
        description,
        priority,
        dueDate: dueDate ? new Date(dueDate) : null,
        category,
        completed
      }
    });
  }

  async deleteTodo(id, userId) {
    const existingTodo = await prisma.todo.findFirst({
      where: { id, userId }
    });

    if (!existingTodo) {
      throw new Error('Todo not found');
    }

    await prisma.todo.delete({ where: { id } });
  }

  async toggleTodo(id, userId) {
    const existingTodo = await prisma.todo.findFirst({
      where: { id, userId }
    });

    if (!existingTodo) {
      throw new Error('Todo not found');
    }

    return await prisma.todo.update({
      where: { id },
      data: { completed: !existingTodo.completed }
    });
  }
}

module.exports = new TodoService();
