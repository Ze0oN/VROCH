const pool = require('../../db');
const fs = require('fs');
const path = require('path');
const { encrypt, decrypt } = require('../../utils/encrypt');

// POST /prescriptions
exports.addPrescription = async (req, res) => {
  if (req.user?.role !== 'doctor') {
    return res.status(403).json({ message: 'Only doctors can add prescriptions' });
  }

  const { appointment_id, medication, dosage, instructions, issued_date } = req.body;
  const filePath = req.file ? req.file.path : null;

  try {
    const encryptedInstructions = encrypt(instructions);

    const result = await pool.query(
      `INSERT INTO prescriptions (appointment_id, medication, dosage, instructions, issued_date)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [appointment_id, medication, dosage, encryptedInstructions, issued_date]
    );

    res.status(201).json({
      message: 'Prescription added',
      data: result.rows[0],
      file: filePath
    });
  } catch (err) {
    console.error('Error adding prescription:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

// GET /prescriptions/patient/:id
exports.getPrescriptionsByPatient = async (req, res) => {
  const { id } = req.params;
  const userId = req.user?.id;
  const role = req.user?.role;

  if (role !== 'admin' && parseInt(id) !== userId) {
    return res.status(403).json({ message: 'Access denied' });
  }

  try {
    const result = await pool.query(
      `SELECT * FROM prescriptions
       WHERE appointment_id IN (SELECT id FROM appointments WHERE patient_id = $1)
       ORDER BY issued_date DESC`,
      [id]
    );

    const prescriptions = result.rows.map(p => ({
      ...p,
      instructions: decrypt(p.instructions)
    }));

    res.status(200).json(prescriptions);
  } catch (err) {
    console.error('Error fetching patient prescriptions:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

// GET /prescriptions/doctor/:id
exports.getPrescriptionsByDoctor = async (req, res) => {
  const { id } = req.params;
  const role = req.user?.role;

  if (role !== 'doctor' && role !== 'admin') {
    return res.status(403).json({ message: 'Access denied' });
  }

  try {
    const result = await pool.query(
      `SELECT * FROM prescriptions
       WHERE appointment_id IN (SELECT id FROM appointments WHERE doctor_id = $1)
       ORDER BY issued_date DESC`,
      [id]
    );

    const prescriptions = result.rows.map(p => ({
      ...p,
      instructions: decrypt(p.instructions)
    }));

    res.status(200).json(prescriptions);
  } catch (err) {
    console.error('Error fetching doctor prescriptions:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

// DELETE /prescriptions/:id
exports.deletePrescription = async (req, res) => {
  const role = req.user?.role;
  if (role !== 'doctor' && role !== 'admin') {
    return res.status(403).json({ message: 'Access denied' });
  }

  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM prescriptions WHERE id = $1', [id]);
    if (result.rowCount === 0) return res.status(404).json({ message: 'Prescription not found' });

    await pool.query('DELETE FROM prescriptions WHERE id = $1', [id]);
    res.status(200).json({ message: 'Prescription deleted' });
  } catch (err) {
    console.error('Error deleting prescription:', err);
    res.status(500).json({ error: 'Server error' });
  }
};
