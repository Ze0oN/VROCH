const express = require('express');
const router = express.Router();
const appointmentStatusLogsController = require('../../controllers/databaseAdminBoard/appointmentStatusLogsController');
const verifyToken = require('../../middleware/verifyToken');
const requireAdmin = require('../../middleware/requireAdmin');

router.use(verifyToken);
router.use(requireAdmin);

/**
 * @swagger
 * /api/appointment-status-logs/{appointmentId}:
 *   get:
 *     summary: Get all status change logs for a specific appointment
 *     tags: [Appointment Status Logs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: appointmentId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Appointment ID
 *     responses:
 *       200:
 *         description: List of status logs
 *       404:
 *         description: Appointment or logs not found
 */
router.get('/:appointmentId', appointmentStatusLogsController.getLogsByAppointment);
/**
 * @swagger
 * /api/appointment-status-logs/{appointmentId}:
 *   get:
 *     summary: Get all status change logs for a specific appointment
 *     tags: [Appointment Status Logs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: appointmentId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Appointment ID
 *     responses:
 *       200:
 *         description: List of status logs
 *       404:
 *         description: Appointment or logs not found
 */
router.post('/', appointmentStatusLogsController.createStatusLog);
/**
 * @swagger
 * /api/appointment-status-logs/{id}:
 *   delete:
 *     summary: Delete a specific status log
 *     tags: [Appointment Status Logs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Log ID
 *     responses:
 *       200:
 *         description: Status log deleted
 *       404:
 *         description: Log not found
 */
router.delete('/:id', appointmentStatusLogsController.deleteStatusLog);

module.exports = router;
