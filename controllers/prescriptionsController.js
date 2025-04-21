const pool = require('../db');

// GET ALL PRESCRIPTIONS
exports.getAllPrescriptions = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM prescriptions ORDER BY id');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET PRESCRIPTION BY ID
exports.getPrescriptionById = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM prescriptions WHERE id = $1', [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Prescription not found' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// CREATE PRESCRIPTION
exports.createPrescription = async (req, res) => {
  const { appointment_id, medication, dosage, instructions, issued_date } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO prescriptions (appointment_id, medication, dosage, instructions, issued_date)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [appointment_id, medication, dosage, instructions, issued_date]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE PRESCRIPTION
exports.updatePrescription = async (req, res) => {
  const { medication, dosage, instructions, issued_date } = req.body;
  try {
    const result = await pool.query(
      `UPDATE prescriptions 
       SET medication=$1, dosage=$2, instructions=$3, issued_date=$4
       WHERE id=$5 RETURNING *`,
      [medication, dosage, instructions, issued_date, req.params.id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Prescription not found' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE PRESCRIPTION
exports.deletePrescription = async (req, res) => {
  try {
    const result = await pool.query('DELETE FROM prescriptions WHERE id = $1 RETURNING *', [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Prescription not found' });
    res.json({ message: 'Prescription deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
