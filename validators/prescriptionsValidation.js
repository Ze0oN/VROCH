const { body, validationResult } = require('express-validator');

const validateAddPrescription = [
  body('appointment_id')
    .isInt().withMessage('Appointment ID must be number'),
  body('medication')
    .trim().notEmpty().escape().withMessage('Medication is required'),
  body('dosage')
    .trim().notEmpty().escape().withMessage('Dosage is required'),
  body('instructions')
    .trim().notEmpty().withMessage('Instructions are required'),
  body('issued_date')
    .isISO8601().withMessage('Issued date must be a valid date (YYYY-MM-DD)'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    next();
  }
];

module.exports = { validateAddPrescription };
