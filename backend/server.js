const app = require("./app");
const prisma = require("./config/prisma");

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`✅ Environment: ${process.env.NODE_ENV}`);
  console.log(`✅ Client URL: ${process.env.CLIENT_URL}`);
});

process.on("SIGTERM", async () => {
  console.log("SIGTERM received, closing server...");
  server.close(async () => {
    await prisma.$disconnect();
    process.exit(0);
  });
});

process.on("SIGINT", async () => {
  console.log("SIGINT received, closing server...");
  server.close(async () => {
    await prisma.$disconnect();
    process.exit(0);
  });
});
