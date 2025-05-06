const express = require('express');
const router = express.Router();
const doctorController = require('../../controllers/doctor/doctorController');
const verifyToken = require('../../middleware/verifyToken');
const requireDoctor = require('../../middleware/requireDoctor');

// Middleware protection
router.use(verifyToken, requireDoctor);

// Routes
/**
 * @swagger
 * /api/doctor/patients:
 *   get:
 *     summary: Get all patients assigned to the logged-in doctor
 *     tags: [Doctor Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of patients
 *       401:
 *         description: Unauthorized
 */
router.get('/patients', doctorController.getDoctorPatients);
/**
 * @swagger
 * /api/doctor/records:
 *   get:
 *     summary: Get medical records created by the logged-in doctor
 *     tags: [Doctor Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of medical records
 *       401:
 *         description: Unauthorized
 */
router.get('/records', doctorController.getMedicalRecords);
/**
 * @swagger
 * /api/doctor/records/{id}:
 *   put:
 *     summary: Update a medical record
 *     tags: [Doctor Dashboard]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Medical record ID
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Record updated
 *       404:
 *         description: Record not found
 */
router.put('/records/:id', doctorController.updateMedicalRecord);
/**
 * @swagger
 * /api/doctor/prescriptions/{id}:
 *   put:
 *     summary: Update a prescription
 *     tags: [Doctor Dashboard]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: Prescription ID
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               medication:
 *                 type: string
 *               dosage:
 *                 type: string
 *               instructions:
 *                 type: string
 *     responses:
 *       200:
 *         description: Prescription updated
 *       404:
 *         description: Prescription not found
 */
router.put('/prescriptions/:id', doctorController.updatePrescription);
/**
 * @swagger
 * /api/doctor/prescriptions:
 *   get:
 *     summary: Get prescriptions issued by the doctor
 *     tags: [Doctor Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of prescriptions
 *       401:
 *         description: Unauthorized
 */
router.get('/prescriptions', doctorController.getPrescriptions);

module.exports = router;
