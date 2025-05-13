const express = require('express');
const router = express.Router();
const statsController = require('../../controllers/admin/statsController');
const requireAdmin = require('../../middleware/requireAdmin');

/**
 * @swagger
 * tags:
 *   name: AdminStats
 *   description: Admin dashboard statistics and aggregation
 */

/**
 * @swagger
 * /api/admin/stats/users-by-role:
 *   get:
 *     summary: Count users by role
 *     tags: [AdminStats]
 *     responses:
 *       200:
 *         description: Role-wise user counts
 */
router.get('/users-by-role', statsController.getUsersByRole);

/**
 * @swagger
 * /api/admin/stats/appointments:
 *   get:
 *     summary: Count appointments by status and date range
 *     tags: [AdminStats]
 *     parameters:
 *       - in: query
 *         name: status
 *         schema: { type: string }
 *       - in: query
 *         name: start
 *         schema: { type: string, format: date }
 *       - in: query
 *         name: end
 *         schema: { type: string, format: date }
 *     responses:
 *       200:
 *         description: Appointment counts
 */
router.get('/appointments', statsController.getAppointmentsStats);

/**
 * @swagger
 * /api/admin/stats/prescriptions:
 *   get:
 *     summary: Count prescriptions issued by doctors
 *     tags: [AdminStats]
 *     responses:
 *       200:
 *         description: Doctor-wise prescription counts
 */
router.get('/prescriptions', statsController.getPrescriptionsStats);

/**
 * @swagger
 * /api/admin/stats/pharmacy-orders:
 *   get:
 *     summary: Count pharmacy orders by status
 *     tags: [AdminStats]
 *     responses:
 *       200:
 *         description: Pharmacy order stats
 */
router.get('/pharmacy-orders', statsController.getPharmacyOrdersStats);

/**
 * @swagger
 * /api/admin/stats/revenue:
 *   get:
 *     summary: Total revenue from paid bills
 *     tags: [AdminStats]
 *     responses:
 *       200:
 *         description: Monthly and yearly revenue totals
 */
router.get('/revenue', statsController.getRevenueStats);

/**
 * @swagger
 * /api/admin/stats/subscriptions:
 *   get:
 *     summary: Count active subscriptions by plan
 *     tags: [AdminStats]
 *     responses:
 *       200:
 *         description: Subscription usage by plan
 */
router.get('/subscriptions', statsController.getSubscriptionsStats);

module.exports = router;
