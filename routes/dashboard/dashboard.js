const express = require('express');
const router = express.Router();

const verifyToken = require('../../middleware/verifyToken');
const requireAdmin = require('../../middleware/requireAdmin');
const requireDoctor = require('../../middleware/requireDoctor');
const requirePatient = require('../../middleware/requirePatient');

// Admin dashboard route
/**
 * @swagger
 * /api/dashboard/admin:
 *   get:
 *     summary: Get admin dashboard data
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Admin dashboard welcome and user info
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - not an admin
 */
router.get('/admin', verifyToken, requireAdmin, (req, res) => {
  res.json({
    role: 'admin',
    message: 'Welcome to the Admin Dashboard',
    user: req.user,
  });
});

// Doctor dashboard route
/**
 * @swagger
 * /api/dashboard/doctor:
 *   get:
 *     summary: Get doctor dashboard data
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Doctor dashboard welcome and user info
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - not a doctor
 */
router.get('/doctor', verifyToken, requireDoctor, (req, res) => {
  res.json({
    role: 'doctor',
    message: 'Welcome to the Doctor Dashboard',
    user: req.user,
  });
});

// Patient dashboard route
/**
 * @swagger
 * /api/dashboard/patient:
 *   get:
 *     summary: Get patient dashboard data
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Patient dashboard welcome and user info
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - not a patient
 */
router.get('/patient', verifyToken, requirePatient, (req, res) => {
  res.json({
    role: 'patient',
    message: 'Welcome to the Patient Dashboard',
    user: req.user,
  });
});

module.exports = router;
