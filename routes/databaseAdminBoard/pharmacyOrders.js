const express = require('express');
const router = express.Router();
const pharmacyOrdersController = require('../../controllers/databaseAdminBoard/pharmacyOrdersController');
const verifyToken = require('../../middleware/verifyToken');

router.use(verifyToken);

router.get('/', pharmacyOrdersController.getAllPharmacyOrders);
router.get('/:id', pharmacyOrdersController.getPharmacyOrderById);
router.post('/', pharmacyOrdersController.createPharmacyOrder);
router.put('/:id', pharmacyOrdersController.updatePharmacyOrder);
router.delete('/:id', pharmacyOrdersController.deletePharmacyOrder);

module.exports = router;
