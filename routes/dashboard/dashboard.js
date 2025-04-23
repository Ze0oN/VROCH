const express = require('express');
const router = express.Router();

const verifyToken = require('../../middleware/verifyToken');
const requireAdmin = require('../../middleware/requireAdmin');
const requireDoctor = require('../../middleware/requireDoctor');
const requirePatient = require('../../middleware/requirePatient');

// Admin dashboard route
router.get('/admin', verifyToken, requireAdmin, (req, res) => {
  res.json({
    role: 'admin',
    message: 'Welcome to the Admin Dashboard',
    user: req.user,
  });
});

// Doctor dashboard route
router.get('/doctor', verifyToken, requireDoctor, (req, res) => {
  res.json({
    role: 'doctor',
    message: 'Welcome to the Doctor Dashboard',
    user: req.user,
  });
});

// Patient dashboard route
router.get('/patient', verifyToken, requirePatient, (req, res) => {
  res.json({
    role: 'patient',
    message: 'Welcome to the Patient Dashboard',
    user: req.user,
  });
});

module.exports = router;
