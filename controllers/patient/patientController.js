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
