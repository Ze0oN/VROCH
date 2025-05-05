const express = require('express');
const router = express.Router();
const { getUserProfile } = require('../../controllers/authentication/profileController');
const verifyToken = require('../../middleware/verifyToken');

router.get('/', verifyToken, getUserProfile);

module.exports = router;
