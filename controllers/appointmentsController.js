const pool = require('../db');

// GET ALL APPOINTMENTS
exports.getAllAppointments = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM appointments ORDER BY id');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET APPOINTMENT BY ID
exports.getAppointmentById = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM appointments WHERE id = $1', [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Appointment not found' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// CREATE APPOINTMENT
exports.createAppointment = async (req, res) => {
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

// UPDATE APPOINTMENT
exports.updateAppointment = async (req, res) => {
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
    if (result.rows.length === 0) return res.status(404).json({ error: 'Appointment not found' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE APPOINTMENT
exports.deleteAppointment = async (req, res) => {
  try {
    const result = await pool.query('DELETE FROM appointments WHERE id = $1 RETURNING *', [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Appointment not found' });
    res.json({ message: 'Appointment deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
