const express = require('express');
const router = express.Router();
const doctorAppointmentsController = require('../../controllers/doctor/doctorAppointmentsController');
const verifyToken = require('../../middleware/verifyToken');

router.use(verifyToken);

router.get('/', doctorAppointmentsController.getDoctorAppointments);
router.put('/:id/status', doctorAppointmentsController.updateAppointmentStatus);
router.post('/:appointmentId/records', doctorAppointmentsController.addMedicalRecord);

module.exports = router;
