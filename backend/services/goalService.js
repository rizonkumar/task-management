const prisma = require('../config/prisma');

class GoalService {
  async getGoals(userId, filters = {}) {
    const { period, category } = filters;

    const where = { userId };

    if (period) {
      where.period = period;
    }

    if (category) {
      where.category = category;
    }

    return await prisma.goal.findMany({
      where,
      orderBy: { createdAt: 'desc' }
    });
  }

  async getGoal(id, userId) {
    const goal = await prisma.goal.findFirst({
      where: { id, userId }
    });

    if (!goal) {
      throw new Error('Goal not found');
    }

    return goal;
  }

  async createGoal(userId, data) {
    const { title, description, period, target, current, category, startDate, endDate } = data;

    return await prisma.goal.create({
      data: {
        title,
        description,
        period,
        target: target || 0,
        current: current || 0,
        category,
        startDate: startDate ? new Date(startDate) : new Date(),
        endDate: endDate ? new Date(endDate) : null,
        userId
      }
    });
  }

  async updateGoal(id, userId, data) {
    const existingGoal = await prisma.goal.findFirst({
      where: { id, userId }
    });

    if (!existingGoal) {
      throw new Error('Goal not found');
    }

    const { title, description, period, target, current, category, startDate, endDate, completed } = data;

    return await prisma.goal.update({
      where: { id },
      data: {
        title,
        description,
        period,
        target,
        current,
        category,
        startDate: startDate ? new Date(startDate) : undefined,
        endDate: endDate ? new Date(endDate) : undefined,
        completed
      }
    });
  }

  async deleteGoal(id, userId) {
    const existingGoal = await prisma.goal.findFirst({
      where: { id, userId }
    });

    if (!existingGoal) {
      throw new Error('Goal not found');
    }

    await prisma.goal.delete({ where: { id } });
  }

  async updateProgress(id, userId, current) {
    const existingGoal = await prisma.goal.findFirst({
      where: { id, userId }
    });

    if (!existingGoal) {
      throw new Error('Goal not found');
    }

    return await prisma.goal.update({
      where: { id },
      data: {
        current,
        completed: current >= existingGoal.target
      }
    });
  }
}

module.exports = new GoalService();
