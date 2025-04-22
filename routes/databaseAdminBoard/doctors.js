const express = require('express');
const router = express.Router();
const doctorsController = require('../../controllers/databaseAdminBoard/doctorsController');
const verifyToken = require('../../middleware/verifyToken');

router.use(verifyToken);

router.get('/', doctorsController.getAllDoctors);
router.get('/:id', doctorsController.getDoctorById);
router.post('/', doctorsController.createDoctor);
router.put('/:id', doctorsController.updateDoctor);
router.delete('/:id', doctorsController.deleteDoctor);

module.exports = router;
