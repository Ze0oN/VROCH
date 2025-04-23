const express = require('express');
const router = express.Router();
const doctorController = require('../../controllers/doctor/doctorController');
const verifyToken = require('../../middleware/verifyToken');
const requireDoctor = require('../../middleware/requireDoctor');

// Middleware protection
router.use(verifyToken, requireDoctor);

// Routes
router.get('/patients', doctorController.getDoctorPatients);
router.get('/records', doctorController.getMedicalRecords);
router.put('/records/:id', doctorController.updateMedicalRecord);
router.put('/prescriptions/:id', doctorController.updatePrescription);
router.get('/prescriptions', doctorController.getPrescriptions);

module.exports = router;
