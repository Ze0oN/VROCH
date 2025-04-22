const pool = require('../../db'); // PostgreSQL connection pool

// GET all patients (admin only)
exports.getAllPatients = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Access denied: Admins only.' });
    }

    const result = await pool.query('SELECT * FROM patients ORDER BY id');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET patient by ID (admin only)
exports.getPatientById = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Access denied: Admins only.' });
    }

    const result = await pool.query('SELECT * FROM patients WHERE id = $1', [req.params.id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Patient not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// CREATE a new patient (admin only)
exports.createPatient = async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Only admins can create patients.' });
  }

  const {
    user_id,
    blood_group,
    emergency_contact_name,
    emergency_contact_phone,
    address,
    allergies,
    chronic_conditions
  } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO patients 
        (user_id, blood_group, emergency_contact_name, emergency_contact_phone, address, allergies, chronic_conditions)
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [user_id, blood_group, emergency_contact_name, emergency_contact_phone, address, allergies, chronic_conditions]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE a patient (admin only)
exports.updatePatient = async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Only admins can update patient information.' });
  }

  const {
    blood_group,
    emergency_contact_name,
    emergency_contact_phone,
    address,
    allergies,
    chronic_conditions
  } = req.body;

  try {
    const result = await pool.query(
      `UPDATE patients 
       SET blood_group=$1, emergency_contact_name=$2, emergency_contact_phone=$3,
           address=$4, allergies=$5, chronic_conditions=$6
       WHERE id=$7 RETURNING *`,
      [blood_group, emergency_contact_name, emergency_contact_phone, address, allergies, chronic_conditions, req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Patient not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE a patient (admin only)
exports.deletePatient = async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Only admins can delete patients.' });
  }

  try {
    const result = await pool.query('DELETE FROM patients WHERE id = $1 RETURNING *', [req.params.id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Patient not found' });
    }

    res.json({ message: 'Patient deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
