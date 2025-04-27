const express = require('express');
const router = express.Router();
const doctorTimeSlotsController = require('../../controllers/databaseAdminBoard/doctorTimeSlotsController');
const verifyToken = require('../../middleware/verifyToken');
const requireAdmin = require('../../middleware/requireAdmin');

router.use(verifyToken);
router.use(requireAdmin);

router.get('/:doctorId', doctorTimeSlotsController.getTimeSlotsByDoctor);
router.post('/', doctorTimeSlotsController.createTimeSlot);
router.put('/:id', doctorTimeSlotsController.updateTimeSlot);
router.delete('/:id', doctorTimeSlotsController.deleteTimeSlot);

module.exports = router;
