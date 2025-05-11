const express = require('express');
const router = express.Router();
const { authenticateUser } = require('../../middleware/auth');
const fileController = require('../../controllers/Files/fileController'); 

// Secure access to prescription files
router.get('/prescriptions/:filename', authenticateUser, fileController.getPrescriptionFile);

module.exports = router;
