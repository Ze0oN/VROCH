module.exports = (req, res, next) => {
    if (req.user?.role !== 'patient') {
      return res.status(403).json({ error: 'Access denied. Patients only.' });
    }
    next();
  };
  