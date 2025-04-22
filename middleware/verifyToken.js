const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = function (req, res, next) {
  const authHeader = req.headers['authorization'];
  console.log('[DEBUG] Authorization Header:', authHeader);

  const token = authHeader && authHeader.split(' ')[1];
  console.log('[DEBUG] Extracted Token:', token);

  if (!token) {
    console.log('[ERROR] No token provided');
    return res.status(403).json({ error: 'No token provided' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.log('[ERROR] Token verification failed:', err.message);
      return res.status(403).json({ error: 'Invalid token' });
    }

    console.log('[DEBUG] Token verified successfully. User:', user);
    req.user = user;
    next();
  });
};
