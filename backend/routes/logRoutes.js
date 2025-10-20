const express = require("express");
const router = express.Router();
const logController = require("../controllers/logController");
const authMiddleware = require("../middlewares/auth");
const {
  validateLog,
  handleValidationErrors,
} = require("../validators/logValidator");

router.use(authMiddleware);

router.get("/", logController.getLogs);
router.get("/:id", logController.getLog);
router.post("/", validateLog, handleValidationErrors, logController.createLog);
router.put(
  "/:id",
  validateLog,
  handleValidationErrors,
  logController.updateLog
);
router.delete("/:id", logController.deleteLog);

module.exports = router;
