const db = require('../../db');

// Get Patient ID using User ID
async function getPatientId(userId) {
  const result = await db.query('SELECT id FROM patients WHERE user_id = $1', [userId]);
  return result.rows[0]?.id;
}

// Get Appointments
exports.getAppointments = async (req, res) => {
  try {
    const patientId = await getPatientId(req.user.id);
    if (!patientId) return res.status(404).json({ message: 'Patient not found' });

    const result = await db.query('SELECT * FROM appointments WHERE patient_id = $1', [patientId]);
    res.json(result.rows);
  } catch (err) {
    console.error('[ERROR] getAppointments:', err);
    res.status(500).json({ message: 'Failed to fetch appointments' });
  }
};

// Get Prescriptions
exports.getPrescriptions = async (req, res) => {
  try {
    const patientId = await getPatientId(req.user.id);
    if (!patientId) return res.status(404).json({ message: 'Patient not found' });

    const result = await db.query(`
      SELECT p.*
      FROM prescriptions p
      JOIN appointments a ON p.appointment_id = a.id
      WHERE a.patient_id = $1
    `, [patientId]);

    res.json(result.rows);
  } catch (err) {
    console.error('[ERROR] getPrescriptions:', err);
    res.status(500).json({ message: 'Failed to fetch prescriptions' });
  }
};

// Get Medical Records
exports.getMedicalRecords = async (req, res) => {
  try {
    console.log("[DEBUG] Request received for medical records");

    const userId = req.user?.id;
    if (!userId) {
      console.error("[ERROR] No user ID found in token");
      return res.status(401).json({ message: "Unauthorized - no user ID" });
    }

    console.log("[DEBUG] User ID from token:", userId);

    const patientResult = await db.query(
      "SELECT id FROM patients WHERE user_id = $1",
      [userId]
    );

    console.log("[DEBUG] Patient lookup result:", patientResult.rows);

    const patientId = patientResult.rows[0]?.id;
    if (!patientId) {
      console.error("[ERROR] No patient found for this user");
      return res.status(404).json({ message: "Patient not found" });
    }

    const recordsResult = await db.query(
      "SELECT * FROM medical_records WHERE patient_id = $1",
      [patientId]
    );

    console.log("[DEBUG] Medical records retrieved:", recordsResult.rows);

    res.json(recordsResult.rows);
  } catch (err) {
    console.error("[ERROR] Failed to fetch medical records:", err.stack);
    res.status(500).json({ message: "Internal server error" });
  }
};

// New: Get Patient Profile with ID for frontend pharmacy order fetching
exports.getPatientProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const result = await db.query(`
      SELECT 
        p.id AS patient_id,
        p.blood_group,
        p.emergency_contact_name,
        p.emergency_contact_phone,
        p.address,
        p.allergies,
        p.chronic_conditions,
        u.full_name,
        u.email,
        u.phone,
        u.gender,
        u.date_of_birth
      FROM patients p
      JOIN users u ON p.user_id = u.id
      WHERE p.user_id = $1
    `, [userId]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Patient not found' });
    }

    res.json(result.rows[0]);  // Includes `patient_id` for front-end use
  } catch (err) {
    console.error('[ERROR] getPatientProfile:', err.stack);
    res.status(500).json({ error: 'Internal server error' });
  }
};
