const express = require('express');
const router = express.Router();
const controller = require('../../controllers/patient/patientController');
const verifyToken = require('../../middleware/verifyToken');
const requirePatient = require('../../middleware/requirePatient');

router.use(verifyToken);
router.use(requirePatient);

router.get('/appointments', controller.getAppointments);
router.get('/prescriptions', controller.getPrescriptions);
router.get('/records', controller.getMedicalRecords);

module.exports = router;
