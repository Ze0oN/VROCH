const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const router = express.Router();
const authController = require('../../controllers/authentication/authController');

// @route   POST /api/auth/register
router.post('/register', authController.registerUser);

// @route   POST /api/auth/login
router.post('/login', authController.loginUser);

// GOOGLE LOGIN
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
