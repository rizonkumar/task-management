const express = require("express");
const router = express.Router();
const goalController = require("../controllers/goalController");
const authMiddleware = require("../middlewares/auth");
const {
  validateGoal,
  handleValidationErrors,
} = require("../validators/goalValidator");

router.use(authMiddleware);

router.get("/", goalController.getGoals);
router.get("/:id", goalController.getGoal);
router.post(
  "/",
  validateGoal,
  handleValidationErrors,
  goalController.createGoal
);
router.put(
  "/:id",
  validateGoal,
  handleValidationErrors,
  goalController.updateGoal
);
router.delete("/:id", goalController.deleteGoal);
router.patch("/:id/progress", goalController.updateProgress);

module.exports = router;
