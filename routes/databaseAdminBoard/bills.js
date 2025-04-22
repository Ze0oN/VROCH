const express = require('express');
const router = express.Router();
const billsController = require('../../controllers/databaseAdminBoard/billsController');
const verifyToken = require('../../middleware/verifyToken');

router.use(verifyToken);

router.get('/', billsController.getAllBills);
router.get('/:id', billsController.getBillById);
router.post('/', billsController.createBill);
router.put('/:id', billsController.updateBill);
router.delete('/:id', billsController.deleteBill);

module.exports = router;
