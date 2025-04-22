const pool = require('../../db'); // PostgreSQL connection pool

// GET all doctors (admin only)
exports.getAllDoctors = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Access denied: Admins only.' });
    }

    const result = await pool.query('SELECT * FROM doctors ORDER BY id');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET doctor by ID (admin only)
exports.getDoctorById = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Access denied: Admins only.' });
    }

    const result = await pool.query('SELECT * FROM doctors WHERE id = $1', [req.params.id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Doctor not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// CREATE doctor (admin only)
exports.createDoctor = async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Only admins can create doctor profiles.' });
  }

  const {
    user_id,
    specialization,
    qualifications,
    availability_status,
    profile_picture_url,
    bio
  } = req.body;

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

// UPDATE doctor (admin only)
exports.updateDoctor = async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Only admins can update doctor profiles.' });
  }

  const {
    specialization,
    qualifications,
    availability_status,
    profile_picture_url,
    bio
  } = req.body;

  try {
    const result = await pool.query(
      `UPDATE doctors
       SET specialization=$1, qualifications=$2, availability_status=$3, profile_picture_url=$4, bio=$5
       WHERE id=$6 RETURNING *`,
      [specialization, qualifications, availability_status, profile_picture_url, bio, req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Doctor not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE doctor (admin only)
exports.deleteDoctor = async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Only admins can delete doctor profiles.' });
  }

  try {
    const result = await pool.query('DELETE FROM doctors WHERE id = $1 RETURNING *', [req.params.id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Doctor not found' });
    }

    res.json({ message: 'Doctor deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
