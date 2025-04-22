const express = require('express');
const router = express.Router();
const notificationsController = require('../../controllers/databaseAdminBoard/notificationsController');
const verifyToken = require('../../middleware/verifyToken');

router.use(verifyToken);

router.get('/', notificationsController.getAllNotifications);
router.get('/:id', notificationsController.getNotificationById);
router.post('/', notificationsController.createNotification);
router.put('/:id', notificationsController.updateNotification);
router.delete('/:id', notificationsController.deleteNotification);

module.exports = router;
