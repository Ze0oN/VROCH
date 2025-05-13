const express = require('express');
const router = express.Router();
const billingController = require('../../controllers/admin/billingController');
const requireRole = require('../../middleware/requireRole');
const verifyToken = require('../../middleware/verifyToken')
router.use(verifyToken);

router.get('/', requireRole('admin'), billingController.getFilteredBills);
router.get('/export/csv', requireRole('admin'), billingController.exportBillsCSV);
router.get('/export/pdf', requireRole('admin'), billingController.exportBillsPDF);

module.exports = router;
