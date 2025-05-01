const express = require('express');
const router = express.Router();
const controller = require('../../controllers/admin/adminAppointmentsController');
const verifyToken = require('../../middleware/verifyToken');

router.use(verifyToken);

router.get('/', controller.getAllAppointments);
router.delete('/:id', controller.deleteAppointment);
router.put('/:id/reassign', controller.reassignAppointment);

module.exports = router;
