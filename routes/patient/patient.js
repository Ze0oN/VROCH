const express = require('express');
const router = express.Router();
const controller = require('../../controllers/patient/patientController');
const verifyToken = require('../../middleware/verifyToken');
const requirePatient = require('../../middleware/requirePatient');

router.use(verifyToken);
router.use(requirePatient);

/**
 * @swagger
 * /api/patient/appointments:
 *   get:
 *     summary: Get all appointments for the logged-in patient
 *     tags: [Patient Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of appointments
 *       401:
 *         description: Unauthorized
 */
router.get('/appointments', controller.getAppointments);
/**
 * @swagger
 * /api/patient/prescriptions:
 *   get:
 *     summary: Get all prescriptions for the logged-in patient
 *     tags: [Patient Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of prescriptions
 *       401:
 *         description: Unauthorized
 */
router.get('/prescriptions', controller.getPrescriptions);
/**
 * @swagger
 * /api/patient/records:
 *   get:
 *     summary: Get all medical records for the logged-in patient
 *     tags: [Patient Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of medical records
 *       401:
 *         description: Unauthorized
 */
router.get('/records', controller.getMedicalRecords);

module.exports = router;
