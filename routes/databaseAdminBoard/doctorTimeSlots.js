const express = require('express');
const router = express.Router();
const doctorTimeSlotsController = require('../../controllers/databaseAdminBoard/doctorTimeSlotsController');
const verifyToken = require('../../middleware/verifyToken');
const requireAdmin = require('../../middleware/requireAdmin');

router.use(verifyToken);
router.use(requireAdmin);

/**
 * @swagger
 * /api/doctor-time-slots/{doctorId}:
 *   get:
 *     summary: Get all time slots for a specific doctor
 *     tags: [Doctor Time Slots]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: doctorId
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: Doctor ID
 *     responses:
 *       200:
 *         description: List of time slots
 *       404:
 *         description: Doctor or time slots not found
 */
router.get('/:doctorId', doctorTimeSlotsController.getTimeSlotsByDoctor);
/**
 * @swagger
 * /api/doctor-time-slots:
 *   post:
 *     summary: Create a new doctor time slot
 *     tags: [Doctor Time Slots]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - doctor_id
 *               - day_of_week
 *               - start_time
 *               - end_time
 *             properties:
 *               doctor_id:
 *                 type: integer
 *               day_of_week:
 *                 type: string
 *               start_time:
 *                 type: string
 *               end_time:
 *                 type: string
 *     responses:
 *       201:
 *         description: Time slot created
 *       400:
 *         description: Invalid input
 */
router.post('/', doctorTimeSlotsController.createTimeSlot);
/**
 * @swagger
 * /api/doctor-time-slots/{id}:
 *   put:
 *     summary: Update a time slot by ID
 *     tags: [Doctor Time Slots]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: Time slot ID
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               day_of_week:
 *                 type: string
 *               start_time:
 *                 type: string
 *               end_time:
 *                 type: string
 *     responses:
 *       200:
 *         description: Time slot updated
 *       404:
 *         description: Time slot not found
 */
router.put('/:id', doctorTimeSlotsController.updateTimeSlot);
/**
 * @swagger
 * /api/doctor-time-slots/{id}:
 *   delete:
 *     summary: Delete a time slot by ID
 *     tags: [Doctor Time Slots]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: Time slot ID
 *     responses:
 *       200:
 *         description: Time slot deleted
 *       404:
 *         description: Time slot not found
 */
router.delete('/:id', doctorTimeSlotsController.deleteTimeSlot);

module.exports = router;
