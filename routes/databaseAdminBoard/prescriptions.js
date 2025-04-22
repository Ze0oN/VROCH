const express = require('express');
const router = express.Router();
const prescriptionsController = require('../../controllers/databaseAdminBoard/prescriptionsController');
const verifyToken = require('../../middleware/verifyToken');

router.use(verifyToken);

router.get('/', prescriptionsController.getAllPrescriptions);
router.get('/:id', prescriptionsController.getPrescriptionById);
router.post('/', prescriptionsController.createPrescription);
router.put('/:id', prescriptionsController.updatePrescription);
router.delete('/:id', prescriptionsController.deletePrescription);

module.exports = router;
