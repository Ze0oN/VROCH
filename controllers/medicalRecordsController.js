const pool = require('../db');

// GET ALL MEDICAL RECORDS
exports.getAllMedicalRecords = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM medical_records ORDER BY id');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET RECORD BY ID
exports.getMedicalRecordById = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM medical_records WHERE id = $1', [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Medical record not found' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// CREATE RECORD
exports.createMedicalRecord = async (req, res) => {
  const { patient_id, doctor_id, record_type, description, file_url } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO medical_records (patient_id, doctor_id, record_type, description, file_url)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [patient_id, doctor_id, record_type, description, file_url]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE RECORD
exports.updateMedicalRecord = async (req, res) => {
  const { record_type, description, file_url } = req.body;
  try {
    const result = await pool.query(
      `UPDATE medical_records 
       SET record_type=$1, description=$2, file_url=$3
       WHERE id=$4 RETURNING *`,
      [record_type, description, file_url, req.params.id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Medical record not found' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE RECORD
exports.deleteMedicalRecord = async (req, res) => {
  try {
    const result = await pool.query('DELETE FROM medical_records WHERE id = $1 RETURNING *', [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Medical record not found' });
    res.json({ message: 'Medical record deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
