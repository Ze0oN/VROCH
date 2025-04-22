const express = require('express');
const router = express.Router();
const appointmentsController = require('../../controllers/databaseAdminBoard/appointmentsController');
const verifyToken = require('../../middleware/verifyToken');

router.use(verifyToken);

router.get('/', appointmentsController.getAllAppointments);
router.get('/:id', appointmentsController.getAppointmentById);
router.post('/', appointmentsController.createAppointment);
router.put('/:id', appointmentsController.updateAppointment);
router.delete('/:id', appointmentsController.deleteAppointment);

module.exports = router;
