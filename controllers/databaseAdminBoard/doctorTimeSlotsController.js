const pool = require('../../db');

// GET all time slots for a specific doctor (admin only)
exports.getTimeSlotsByDoctor = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Access denied: Admins only.' });
    }

    const result = await pool.query(
      'SELECT * FROM doctor_time_slots WHERE doctor_id = $1 ORDER BY day_of_week, start_time',
      [req.params.doctorId]
    );

    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// CREATE a new time slot (admin only)
exports.createTimeSlot = async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Only admins can create time slots.' });
  }

  const { doctor_id, day_of_week, start_time, end_time } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO doctor_time_slots (doctor_id, day_of_week, start_time, end_time)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [doctor_id, day_of_week, start_time, end_time]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE a time slot (admin only)
exports.updateTimeSlot = async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Only admins can update time slots.' });
  }

  const { doctor_id, day_of_week, start_time, end_time } = req.body;

  try {
    const result = await pool.query(
      `UPDATE doctor_time_slots
       SET doctor_id = $1, day_of_week = $2, start_time = $3, end_time = $4
       WHERE id = $5 RETURNING *`,
      [doctor_id, day_of_week, start_time, end_time, req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Time slot not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE a time slot (admin only)
exports.deleteTimeSlot = async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Only admins can delete time slots.' });
  }

  try {
    const result = await pool.query(
      'DELETE FROM doctor_time_slots WHERE id = $1 RETURNING *',
      [req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Time slot not found' });
    }

    res.json({ message: 'Time slot deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
