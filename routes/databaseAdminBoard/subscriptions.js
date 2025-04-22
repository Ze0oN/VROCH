const express = require('express');
const router = express.Router();
const subscriptionsController = require('../../controllers/databaseAdminBoard/subscriptionsController');
const verifyToken = require('../../middleware/verifyToken');

router.use(verifyToken);

router.get('/', subscriptionsController.getAllSubscriptions);
router.get('/:id', subscriptionsController.getSubscriptionById);
router.post('/', subscriptionsController.createSubscription);
router.put('/:id', subscriptionsController.updateSubscription);
router.delete('/:id', subscriptionsController.deleteSubscription);

module.exports = router;
