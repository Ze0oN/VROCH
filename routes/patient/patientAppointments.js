const express = require('express');
const router = express.Router();
const patientAppointmentsController = require('../../controllers/patient/patientAppointmentsController');
const verifyToken = require('../../middleware/verifyToken');

router.use(verifyToken);

router.post('/', patientAppointmentsController.createAppointment);

// Get all specializations
router.get('/specializations', patientAppointmentsController.getSpecializations);

// Get doctors by specialization
router.get('/doctors-by-specialization/:specialization', patientAppointmentsController.getDoctorsBySpecialization);

// Get doctor time slots
router.get('/doctor-time-slots/:doctorId', patientAppointmentsController.getDoctorTimeSlots);

// Get patient appointments
router.get('/my-appointments', patientAppointmentsController.getPatientAppointments);

// Cancel appointment
router.put('/cancel/:id', patientAppointmentsController.cancelAppointmentByPatient);

module.exports = router;
