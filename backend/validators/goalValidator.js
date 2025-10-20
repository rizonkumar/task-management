const { body, validationResult } = require('express-validator');

const validateGoal = [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('period').isIn(['daily', 'weekly', 'monthly', 'yearly', 'custom']).withMessage('Invalid period'),
  body('target').optional().isNumeric().withMessage('Target must be a number')
];

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = {
  validateGoal,
  handleValidationErrors
};
