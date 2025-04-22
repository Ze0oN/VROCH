// routes/admin/admin.js
const express = require('express');
const router = express.Router();
const adminPasswordsController = require('../../controllers/admin/adminPasswordsController');

// GET /api/admin/passwords
router.get('/passwords', adminPasswordsController.getPlainPasswords);

module.exports = router;
