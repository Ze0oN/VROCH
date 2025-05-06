const express = require('express');
const router = express.Router();
const patientAppointmentsController = require('../../controllers/patient/patientAppointmentsController');
const verifyToken = require('../../middleware/verifyToken');

router.use(verifyToken);

/**
 * @swagger
 * /api/patient-appointments:
 *   post:
 *     summary: Book a new appointment
 *     tags: [Patient Appointments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - doctor_id
 *               - appointment_date
 *               - appointment_start_time
 *             properties:
 *               doctor_id:
 *                 type: integer
 *               appointment_date:
 *                 type: string
 *                 format: date
 *               appointment_start_time:
 *                 type: string
 *                 example: "10:00"
 *               notes:
 *                 type: string
 *     responses:
 *       201:
 *         description: Appointment created
 *       400:
 *         description: Validation error or time slot unavailable
 */
router.post('/', patientAppointmentsController.createAppointment);

// Get all specializations
/**
 * @swagger
 * /api/patient-appointments/specializations:
 *   get:
 *     summary: Get list of available doctor specializations
 *     tags: [Patient Appointments]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of specializations
 */
router.get('/specializations', patientAppointmentsController.getSpecializations);

// Get doctors by specialization
/**
 * @swagger
 * /api/patient-appointments/doctors-by-specialization/{specialization}:
 *   get:
 *     summary: Get doctors by specialization
 *     tags: [Patient Appointments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: specialization
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of doctors for the specialization
 *       404:
 *         description: No doctors found
 */
router.get('/doctors-by-specialization/:specialization', patientAppointmentsController.getDoctorsBySpecialization);

// Get doctor time slots
/**
 * @swagger
 * /api/patient-appointments/doctor-time-slots/{doctorId}:
 *   get:
 *     summary: Get available time slots for a doctor
 *     tags: [Patient Appointments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: doctorId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Available time slots
 *       404:
 *         description: Doctor not found or no slots
 */
router.get('/doctor-time-slots/:doctorId', patientAppointmentsController.getDoctorTimeSlots);

// Get patient appointments
/**
 * @swagger
 * /api/patient-appointments/my-appointments:
 *   get:
 *     summary: Get appointments of the logged-in patient
 *     tags: [Patient Appointments]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of patient appointments
 *       401:
 *         description: Unauthorized
 */
router.get('/my-appointments', patientAppointmentsController.getPatientAppointments);

// Cancel appointment
/**
 * @swagger
 * /api/patient-appointments/cancel/{id}:
 *   put:
 *     summary: Cancel an appointment by the patient
 *     tags: [Patient Appointments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Appointment ID
 *     responses:
 *       200:
 *         description: Appointment cancelled
 *       403:
 *         description: Unauthorized or invalid status
 *       404:
 *         description: Appointment not found
 */
router.put('/cancel/:id', patientAppointmentsController.cancelAppointmentByPatient);

module.exports = router;
