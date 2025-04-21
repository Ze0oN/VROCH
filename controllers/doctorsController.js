const pool = require('../db');

// GET ALL DOCTORS
exports.getAllDoctors = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM doctors ORDER BY id');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET DOCTOR BY ID
exports.getDoctorById = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM doctors WHERE id = $1', [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Doctor not found' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// CREATE DOCTOR
exports.createDoctor = async (req, res) => {
  const { user_id, specialization, qualifications, availability_status, profile_picture_url, bio } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO doctors (user_id, specialization, qualifications, availability_status, profile_picture_url, bio)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [user_id, specialization, qualifications, availability_status, profile_picture_url, bio]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE DOCTOR
exports.updateDoctor = async (req, res) => {
  const { specialization, qualifications, availability_status, profile_picture_url, bio } = req.body;
  try {
    const result = await pool.query(
      `UPDATE doctors SET specialization=$1, qualifications=$2, availability_status=$3, profile_picture_url=$4, bio=$5
       WHERE id=$6 RETURNING *`,
      [specialization, qualifications, availability_status, profile_picture_url, bio, req.params.id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Doctor not found' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE DOCTOR
exports.deleteDoctor = async (req, res) => {
  try {
    const result = await pool.query('DELETE FROM doctors WHERE id = $1 RETURNING *', [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Doctor not found' });
    res.json({ message: 'Doctor deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
