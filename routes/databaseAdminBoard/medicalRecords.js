const express = require('express');
const router = express.Router();
const medicalRecordsController = require('../../controllers/databaseAdminBoard/medicalRecordsController');
const verifyToken = require('../../middleware/verifyToken');

router.use(verifyToken);

router.get('/', medicalRecordsController.getAllMedicalRecords);
router.get('/:id', medicalRecordsController.getMedicalRecordById);
router.post('/', medicalRecordsController.createMedicalRecord);
router.put('/:id', medicalRecordsController.updateMedicalRecord);
router.delete('/:id', medicalRecordsController.deleteMedicalRecord);

module.exports = router;
