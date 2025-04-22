const express = require('express');
const router = express.Router();
const messagesController = require('../../controllers/databaseAdminBoard/messagesController');
const verifyToken = require('../../middleware/verifyToken');

router.use(verifyToken);

router.get('/', messagesController.getAllMessages);
router.get('/:id', messagesController.getMessageById);
router.post('/', messagesController.createMessage);
router.put('/:id', messagesController.updateMessage);
router.delete('/:id', messagesController.deleteMessage);

module.exports = router;
