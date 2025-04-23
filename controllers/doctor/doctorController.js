const pool = require('../../db');

// Get patients assigned to the doctor
exports.getDoctorPatients = async (req, res) => {
  try {
    const doctorId = req.user.id;
    const result = await pool.query(
      `SELECT u.id, u.full_name, u.email, p.blood_group, p.allergies, p.chronic_conditions
       FROM patients p
       JOIN users u ON p.user_id = u.id
       JOIN appointments a ON a.patient_id = p.id
       WHERE a.doctor_id = $1
       GROUP BY u.id, p.blood_group, p.allergies, p.chronic_conditions`,
      [doctorId]
    );
    res.json(result.rows);
  } catch (err) {
    console.error('[ERROR] getDoctorPatients:', err);
    res.status(500).json({ error: 'Failed to fetch patients.' });
  }
};

// Get medical records for patients assigned to the doctor
exports.getMedicalRecords = async (req, res) => {
  try {
    const doctorId = req.user.id;
    const result = await pool.query(
      `SELECT mr.*, u.full_name AS patient_name
       FROM medical_records mr
       JOIN patients p ON mr.patient_id = p.id
       JOIN users u ON p.user_id = u.id
       WHERE mr.doctor_id = $1`,
      [doctorId]
    );
    res.json(result.rows);
  } catch (err) {
    console.error('[ERROR] getMedicalRecords:', err);
    res.status(500).json({ error: 'Failed to fetch medical records.' });
  }
};

// Update a medical record by doctor
exports.updateMedicalRecord = async (req, res) => {
  const { id } = req.params;
  const { description } = req.body;
  try {
    const doctorId = req.user.id;
    const result = await pool.query(
      `UPDATE medical_records
       SET description = $1, updated_at = NOW()
       WHERE id = $2 AND doctor_id = $3
       RETURNING *`,
      [description, id, doctorId]
    );

    if (result.rows.length === 0) {
      return res.status(403).json({ error: 'Unauthorized or record not found.' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error('[ERROR] updateMedicalRecord:', err);
    res.status(500).json({ error: 'Failed to update medical record.' });
  }
};

// Update a prescription by doctor
exports.updatePrescription = async (req, res) => {
  const { id } = req.params;
  const { medication, dosage, instructions } = req.body;
  try {
    const doctorId = req.user.id;

    // Ensure the prescription is assigned to a patient of this doctor
    const check = await pool.query(
      `SELECT pr.* FROM prescriptions pr
       JOIN patients p ON pr.patient_id = p.id
       JOIN appointments a ON a.patient_id = p.id
       WHERE pr.id = $1 AND a.doctor_id = $2`,
      [id, doctorId]
    );

    if (check.rows.length === 0) {
      return res.status(403).json({ error: 'Unauthorized or prescription not found.' });
    }

    const result = await pool.query(
      `UPDATE prescriptions
       SET medication = $1, dosage = $2, instructions = $3, issued_date = NOW()
       WHERE id = $4 RETURNING *`,
      [medication, dosage, instructions, id]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error('[ERROR] updatePrescription:', err);
    res.status(500).json({ error: 'Failed to update prescription.' });
  }
};

// Get all prescriptions for patients assigned to the doctor
exports.getPrescriptions = async (req, res) => {
    try {
      const userId = req.user.id;
  
      // 1. Get doctor_id from doctors table
      const doctorRes = await pool.query(
        'SELECT id FROM doctors WHERE user_id = $1',
        [userId]
      );
      if (doctorRes.rows.length === 0) {
        return res.status(404).json({ error: 'Doctor not found for this user.' });
      }
  
      const doctorId = doctorRes.rows[0].id;
  
      // 2. Get appointment_ids for this doctor
      const appointmentRes = await pool.query(
        'SELECT id FROM appointments WHERE doctor_id = $1',
        [doctorId]
      );
      const appointmentIds = appointmentRes.rows.map(a => a.id);
  
      if (appointmentIds.length === 0) {
        return res.json([]); // No prescriptions if no appointments
      }
  
      // 3. Get prescriptions for these appointments
      const prescriptionRes = await pool.query(
        `SELECT * FROM prescriptions WHERE appointment_id = ANY($1::int[])`,
        [appointmentIds]
      );
  
      res.json(prescriptionRes.rows);
    } catch (err) {
      console.error('[ERROR] getPrescriptions:', err);
      res.status(500).json({ error: 'Failed to retrieve prescriptions.' });
    }
  };
  