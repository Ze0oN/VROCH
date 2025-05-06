const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const router = express.Router();
const authController = require('../../controllers/authentication/authController');

// @route   POST /api/auth/register
/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - full_name
 *               - email
 *               - password
 *               - role
 *             properties:
 *               full_name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *                 enum: [admin, doctor, patient]
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Email already exists or invalid input
 */
router.post('/register', authController.registerUser);

// @route   POST /api/auth/login
/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Log in with email and password
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successful login, returns JWT token
 *       401:
 *         description: Invalid credentials
 */
router.post('/login', authController.loginUser);

// GOOGLE LOGIN
/**
 * @swagger
 * /api/auth/google:
 *   get:
 *     summary: Google OAuth login
 *     tags: [Authentication]
 *     responses:
 *       302:
 *         description: Redirects to Google login
 */
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback',
  passport.authenticate('google', { session: false, failureRedirect: '/login.html' }),
  (req, res) => {
    const token = jwt.sign({ id: req.user.id, role: req.user.role }, process.env.JWT_SECRET);

    let redirectUrl = '/under-development.html'; // default fallback

    if (req.user.role === 'admin') {
      redirectUrl = `/admin-dashboard.html?token=${token}`;
    } else if (req.user.role === 'doctor') {
      redirectUrl = `/doctor-dashboard.html?token=${token}`;
    } else if (req.user.role === 'patient') {
      redirectUrl = `/patient-dashboard.html?token=${token}`;
    }

    res.redirect(redirectUrl);
  }
);

// FACEBOOK LOGIN
/**
 * @swagger
 * /api/auth/facebook:
 *   get:
 *     summary: Facebook OAuth login
 *     tags: [Authentication]
 *     responses:
 *       302:
 *         description: Redirects to Facebook login
 */
router.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }));

router.get('/facebook/callback',
  passport.authenticate('facebook', { session: false, failureRedirect: '/login.html' }),
  (req, res) => {
    const token = jwt.sign({ id: req.user.id, role: req.user.role }, process.env.JWT_SECRET);

    let redirectUrl = '/under-development.html'; // default fallback

    if (req.user.role === 'admin') {
      redirectUrl = `/admin-dashboard.html?token=${token}`;
    } else if (req.user.role === 'doctor') {
      redirectUrl = `/doctor-dashboard.html?token=${token}`;
    } else if (req.user.role === 'patient') {
      redirectUrl = `/patient-dashboard.html?token=${token}`;
    }

    res.redirect(redirectUrl);
  }
);

module.exports = router;
