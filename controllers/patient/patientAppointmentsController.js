const pool = require('../../db');

// Helper function to get day of week from a date
function getDayOfWeek(dateString) {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return days[new Date(dateString).getDay()];
}

// Patient books an appointment
exports.createAppointment = async (req, res) => {
  try {
    if (req.user.role !== 'patient') {
      return res.status(403).json({ error: 'Access denied: Patients only.' });
    }

    const { doctor_id, appointment_date, appointment_start_time, appointment_end_time, notes } = req.body;
    const user_id = req.user.id; // Get from the token

    // Fetch patient ID from patients table
    const patientResult = await pool.query('SELECT id FROM patients WHERE user_id = $1', [user_id]);

    if (patientResult.rows.length === 0) {
    return res.status(404).json({ error: 'Patient record not found.' });
    }

    const patient_id = patientResult.rows[0].id;


    if (!doctor_id || !appointment_date || !appointment_start_time || !appointment_end_time) {
      return res.status(400).json({ error: 'Missing required fields.' });
    }

    const dayOfWeek = getDayOfWeek(appointment_date);

    // Validate doctor availability (time slot)
    const timeSlotResult = await pool.query(
      `SELECT * FROM doctor_time_slots
       WHERE doctor_id = $1 AND day_of_week = $2
       AND start_time <= $3 AND end_time >= $4`,
      [doctor_id, dayOfWeek, appointment_start_time, appointment_end_time]
    );

    if (timeSlotResult.rows.length === 0) {
      return res.status(400).json({ error: 'Doctor is not available at the selected time.' });
    }

    // Check for overlapping appointments
    const overlapResult = await pool.query(
      `SELECT * FROM appointments
       WHERE doctor_id = $1
       AND appointment_date = $2
       AND ($3 < appointment_end_time AND $4 > appointment_start_time)
       AND status IN ('pending', 'confirmed')`,
      [doctor_id, appointment_date, appointment_start_time, appointment_end_time]
    );

    if (overlapResult.rows.length > 0) {
      return res.status(400).json({ error: 'Doctor already has an appointment at this time.' });
    }

    // Insert the appointment (status is pending)
    const insertResult = await pool.query(
      `INSERT INTO appointments (patient_id, doctor_id, appointment_date, appointment_start_time, appointment_end_time, status, notes)
       VALUES ($1, $2, $3, $4, $5, 'pending', $6)
       RETURNING *`,
      [patient_id, doctor_id, appointment_date, appointment_start_time, appointment_end_time, notes]
    );

    res.status(201).json(insertResult.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error.' });
  }
};

// Get all specializations (unique)
exports.getSpecializations = async (req, res) => {
  try {
    const result = await pool.query('SELECT DISTINCT specialization FROM doctors ORDER BY specialization');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error.' });
  }
};

// Get doctors by specialization (join with users for names)
exports.getDoctorsBySpecialization = async (req, res) => {
  try {
    const { specialization } = req.params;
    const result = await pool.query(
      `SELECT d.id AS doctor_id, u.full_name
       FROM doctors d
       INNER JOIN users u ON d.user_id = u.id
       WHERE d.specialization = $1
       ORDER BY u.full_name`,
      [specialization]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error.' });
  }
};

// Patient views available time slots for a doctor
exports.getDoctorTimeSlots = async (req, res) => {
    try {
      const { doctorId } = req.params;
      const result = await pool.query(
        `SELECT * FROM doctor_time_slots WHERE doctor_id = $1 ORDER BY day_of_week, start_time`,
        [doctorId]
      );
      res.json(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error.' });
    }
  };