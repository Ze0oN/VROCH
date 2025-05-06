const express = require('express');
const router = express.Router();
const doctorAppointmentsController = require('../../controllers/doctor/doctorAppointmentsController');
const verifyToken = require('../../middleware/verifyToken');

router.use(verifyToken);

/**
 * @swagger
 * /api/doctor/appointments:
 *   get:
 *     summary: Get all appointments for the logged-in doctor
 *     tags: [Doctor Appointments]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of appointments
 *       401:
 *         description: Unauthorized
 */
router.get('/', doctorAppointmentsController.getDoctorAppointments);
/**
 * @swagger
 * /api/doctor/appointments/{id}/status:
 *   put:
 *     summary: Update the status of an appointment
 *     tags: [Doctor Appointments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Appointment ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 example: completed
 *     responses:
 *       200:
 *         description: Appointment status updated
 *       403:
 *         description: Unauthorized to update this appointment
 *       404:
 *         description: Appointment not found
 */
router.put('/:id/status', doctorAppointmentsController.updateAppointmentStatus);
/**
 * @swagger
 * /api/doctor/appointments/{appointmentId}/records:
 *   post:
 *     summary: Add a medical record for an appointment
 *     tags: [Doctor Appointments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: appointmentId
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: Appointment ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - record_type
 *               - description
 *             properties:
 *               record_type:
 *                 type: string
 *               description:
 *                 type: string
 *               file_url:
 *                 type: string
 *     responses:
 *       201:
 *         description: Medical record added
 *       403:
 *         description: Unauthorized or invalid appointment
 *       500:
 *         description: Server error
 */
router.post('/:appointmentId/records', doctorAppointmentsController.addMedicalRecord);

module.exports = router;
