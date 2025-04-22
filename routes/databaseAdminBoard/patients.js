const express = require('express');
const router = express.Router();
const patientsController = require('../../controllers/databaseAdminBoard/patientsController');
const verifyToken = require('../../middleware/verifyToken');

router.use(verifyToken);

router.get('/', patientsController.getAllPatients);
router.get('/:id', patientsController.getPatientById);
router.post('/', patientsController.createPatient);
router.put('/:id', patientsController.updatePatient);
router.delete('/:id', patientsController.deletePatient);

module.exports = router;
