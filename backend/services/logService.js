const prisma = require("../config/prisma");

class LogService {
  async getLogs(userId, filters = {}) {
    const { category, startDate, endDate } = filters;

    const where = { userId };

    if (category) {
      where.category = category;
    }

    if (startDate || endDate) {
      where.timestamp = {};
      if (startDate) where.timestamp.gte = new Date(startDate);
      if (endDate) where.timestamp.lte = new Date(endDate);
    }

    return await prisma.log.findMany({
      where,
      orderBy: { timestamp: "desc" },
    });
  }

  async getLog(id, userId) {
    const log = await prisma.log.findFirst({
      where: { id, userId },
    });

    if (!log) {
      throw new Error("Log not found");
    }

    return log;
  }

  async createLog(userId, data) {
    const { title, description, category, timestamp } = data;

    return await prisma.log.create({
      data: {
        title,
        description,
        category,
        timestamp: timestamp ? new Date(timestamp) : new Date(),
        userId,
      },
    });
  }

  async updateLog(id, userId, data) {
    const existingLog = await prisma.log.findFirst({
      where: { id, userId },
    });

    if (!existingLog) {
      throw new Error("Log not found");
    }

    const { title, description, category, timestamp } = data;

    return await prisma.log.update({
      where: { id },
      data: {
        title,
        description,
        category,
        timestamp: timestamp ? new Date(timestamp) : undefined,
      },
    });
  }

  async deleteLog(id, userId) {
    const existingLog = await prisma.log.findFirst({
      where: { id, userId },
    });

    if (!existingLog) {
      throw new Error("Log not found");
    }

    await prisma.log.delete({ where: { id } });
  }
}

module.exports = new LogService();
