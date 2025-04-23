// routes/admin/admin.js
const express = require('express');
const router = express.Router();
const adminPasswordsController = require('../../controllers/admin/adminPasswordsController');

const verifyToken = require('../../middleware/verifyToken');
const requireAdmin = require('../../middleware/requireAdmin');

// GET /api/admin/passwords
router.get('/passwords', verifyToken, requireAdmin, adminPasswordsController.getPlainPasswords);

module.exports = router;
