const bcrypt = require("bcryptjs");
const prisma = require("../config/prisma");
const {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} = require("../utils/jwt");

class AuthService {
  async registerUser(name, email, password) {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      throw new Error("Email already registered");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        avatar: name
          .split(" ")
          .map((n) => n[0])
          .join("")
          .toUpperCase(),
      },
    });

    // Generate tokens
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    await prisma.refreshToken.create({
      data: {
        token: refreshToken,
        userId: user.id,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    });

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
      },
      accessToken,
      refreshToken,
    };
  }

  async loginUser(email, password) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new Error("Invalid credentials");
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      throw new Error("Invalid credentials");
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    await prisma.refreshToken.create({
      data: {
        token: refreshToken,
        userId: user.id,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    });

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
      },
      accessToken,
      refreshToken,
    };
  }

  async refreshUserToken(refreshToken) {
    if (!refreshToken) {
      throw new Error("Refresh token required");
    }

    const decoded = verifyRefreshToken(refreshToken);

    const tokenRecord = await prisma.refreshToken.findUnique({
      where: { token: refreshToken },
    });

    if (!tokenRecord || tokenRecord.expiresAt < new Date()) {
      throw new Error("Invalid or expired refresh token");
    }

    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
    });

    const newAccessToken = generateAccessToken(user);

    return { accessToken: newAccessToken };
  }

  async logoutUser(refreshToken) {
    if (refreshToken) {
      await prisma.refreshToken.deleteMany({
        where: { token: refreshToken },
      });
    }
  }
}

module.exports = new AuthService();
