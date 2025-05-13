const express = require('express');
const router = express.Router();
const charts = require('../../controllers/admin/chartsController');

/**
 * @swagger
 * tags:
 *   name: AdminCharts
 *   description: Analytics and chart-friendly data
 */

/**
 * @swagger
 * /api/admin/charts/top-doctors:
 *   get:
 *     summary: Top 5 doctors by appointment count
 *     tags: [AdminCharts]
 */
router.get('/top-doctors', charts.getTopDoctorsByAppointments);

/**
 * @swagger
 * /api/admin/charts/top-medications:
 *   get:
 *     summary: Top ordered medications
 *     tags: [AdminCharts]
 */
router.get('/top-medications', charts.getTopMedications);

/**
 * @swagger
 * /api/admin/charts/subscription-distribution:
 *   get:
 *     summary: Active subscription distribution (pie-ready)
 *     tags: [AdminCharts]
 */
router.get('/subscription-distribution', charts.getSubscriptionDistribution);

module.exports = router;
