const express = require('express');
const router = express.Router();
const billingController = require('../../controllers/admin/billingController');

router.get('/', billingController.getFilteredBills);
router.get('/export/csv', billingController.exportBillsCSV);
router.get('/export/pdf', billingController.exportBillsPDF);

module.exports = router;
