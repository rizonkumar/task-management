const { body, validationResult } = require("express-validator");

const validateLog = [
  body("title").trim().notEmpty().withMessage("Title is required"),
  body("category").trim().notEmpty().withMessage("Category is required"),
];

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = {
  validateLog,
  handleValidationErrors,
};
