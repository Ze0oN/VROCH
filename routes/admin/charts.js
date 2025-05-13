const express = require('express');
const router = express.Router();
const chartsController = require('../../controllers/admin/chartsController');
const requireRole = require('../../middleware/requireRole');

// All routes require admin or doctor access
const allowedRoles = ['admin', 'doctor'];

router.get('/top-doctors', requireRole(allowedRoles), chartsController.getTopDoctorsByAppointments);
router.get('/top-medications', requireRole(allowedRoles), chartsController.getTopMedications);
router.get('/subscription-distribution', requireRole(allowedRoles), chartsController.getSubscriptionDistribution);

module.exports = router;
