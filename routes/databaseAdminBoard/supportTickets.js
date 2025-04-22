const express = require('express');
const router = express.Router();
const supportTicketsController = require('../../controllers/databaseAdminBoard/supportTicketsController');
const verifyToken = require('../../middleware/verifyToken');

router.use(verifyToken);

router.get('/', supportTicketsController.getAllSupportTickets);
router.get('/:id', supportTicketsController.getSupportTicketById);
router.post('/', supportTicketsController.createSupportTicket);
router.put('/:id', supportTicketsController.updateSupportTicket);
router.delete('/:id', supportTicketsController.deleteSupportTicket);

module.exports = router;
