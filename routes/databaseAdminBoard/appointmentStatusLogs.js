const express = require('express');
const router = express.Router();
const appointmentStatusLogsController = require('../../controllers/databaseAdminBoard/appointmentStatusLogsController');
const verifyToken = require('../../middleware/verifyToken');
const requireAdmin = require('../../middleware/requireAdmin');

router.use(verifyToken);
router.use(requireAdmin);

router.get('/:appointmentId', appointmentStatusLogsController.getLogsByAppointment);
router.post('/', appointmentStatusLogsController.createStatusLog);
router.delete('/:id', appointmentStatusLogsController.deleteStatusLog);

module.exports = router;
