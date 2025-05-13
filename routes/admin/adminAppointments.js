const express = require('express');
const router = express.Router();
const controller = require('../../controllers/admin/adminAppointmentsController');
const requireRole = require('../../middleware/requireRole');
const verifyToken = require('../../middleware/verifyToken')
router.use(verifyToken);

/**
 * @swagger
 * /api/admin/appointments:
 *   get:
 *     summary: Get all appointments (admin only)
 *     tags: [Admin Appointments]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all appointments
 *       401:
 *         description: Unauthorized - Token missing or invalid
 */
router.get('/', requireRole('admin'), controller.getAllAppointments);
/**
 * @swagger
 * /api/admin/appointments/{id}:
 *   delete:
 *     summary: Delete an appointment by ID (admin only)
 *     tags: [Admin Appointments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Appointment ID
 *     responses:
 *       200:
 *         description: Appointment deleted
 *       403:
 *         description: Deletion forbidden (e.g., prescription exists)
 *       404:
 *         description: Appointment not found
 */
router.delete('/:id', requireRole('admin'), controller.deleteAppointment);
/**
 * @swagger
 * /api/admin/appointments/{id}/reassign:
 *   put:
 *     summary: Reassign a pending appointment to a different doctor
 *     tags: [Admin Appointments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Appointment ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               new_doctor_id:
 *                 type: integer
 *                 example: 3
 *     responses:
 *       200:
 *         description: Appointment reassigned
 *       400:
 *         description: Invalid reassignment (e.g., doctor unavailable)
 *       404:
 *         description: Appointment not found
 */
router.put('/:id/reassign', requireRole('admin'), controller.reassignAppointment);

module.exports = router;
