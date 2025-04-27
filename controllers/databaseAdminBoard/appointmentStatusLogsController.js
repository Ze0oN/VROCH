const pool = require('../../db');

// GET all status logs for a specific appointment (admin only)
exports.getLogsByAppointment = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Access denied: Admins only.' });
    }

    const result = await pool.query(
      'SELECT * FROM appointment_status_logs WHERE appointment_id = $1 ORDER BY changed_at DESC',
      [req.params.appointmentId]
    );

    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// CREATE a new status log (admin only)
// Note: Normally this is auto-called from backend when appointment status changes, but we allow manual add here too
exports.createStatusLog = async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Only admins can create status logs.' });
  }

  const { appointment_id, old_status, new_status } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO appointment_status_logs (appointment_id, old_status, new_status)
       VALUES ($1, $2, $3) RETURNING *`,
      [appointment_id, old_status, new_status]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE a status log (admin only)
exports.deleteStatusLog = async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Only admins can delete status logs.' });
  }

  try {
    const result = await pool.query(
      'DELETE FROM appointment_status_logs WHERE id = $1 RETURNING *',
      [req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Status log not found' });
    }

    res.json({ message: 'Status log deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
