const express = require('express');
const router = express.Router();
const medicalRecordsController = require('../controllers/medicalRecordsController');

router.get('/', medicalRecordsController.getAllMedicalRecords);
router.get('/:id', medicalRecordsController.getMedicalRecordById);
router.post('/', medicalRecordsController.createMedicalRecord);
router.put('/:id', medicalRecordsController.updateMedicalRecord);
router.delete('/:id', medicalRecordsController.deleteMedicalRecord);

module.exports = router;
