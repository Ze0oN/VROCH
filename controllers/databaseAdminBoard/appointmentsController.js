const pool = require('../../db'); // PostgreSQL connection pool

// GET all appointments (admin only)
exports.getAllAppointments = async (req, res) => {
  try {
    // Only admins can access all appointments
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Access denied: Admins only.' });
    }

    const result = await pool.query('SELECT * FROM appointments ORDER BY id');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET appointment by ID (admin only)
exports.getAppointmentById = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Access denied: Admins only.' });
    }

    const result = await pool.query('SELECT * FROM appointments WHERE id = $1', [req.params.id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Appointment not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// CREATE appointment (admin only)
exports.createAppointment = async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Only admins can create appointments.' });
  }

  const {
    patient_id,
    doctor_id,
    appointment_date,
    appointment_time,
    status,
    notes
  } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO appointments 
        (patient_id, doctor_id, appointment_date, appointment_time, status, notes)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [patient_id, doctor_id, appointment_date, appointment_time, status, notes]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE appointment (admin only)
exports.updateAppointment = async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Only admins can update appointments.' });
  }

  const {
    patient_id,
    doctor_id,
    appointment_date,
    appointment_time,
    status,
    notes
  } = req.body;

  try {
    const result = await pool.query(
      `UPDATE appointments 
       SET patient_id=$1, doctor_id=$2, appointment_date=$3, appointment_time=$4,
           status=$5, notes=$6
       WHERE id=$7 RETURNING *`,
      [patient_id, doctor_id, appointment_date, appointment_time, status, notes, req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Appointment not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE appointment (admin only)
exports.deleteAppointment = async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Only admins can delete appointments.' });
  }

  try {
    const result = await pool.query('DELETE FROM appointments WHERE id = $1 RETURNING *', [req.params.id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Appointment not found' });
    }

    res.json({ message: 'Appointment deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
