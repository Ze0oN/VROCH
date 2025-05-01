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
    const user_id = req.user.id;

    // Fetch patient ID
    const patientResult = await pool.query('SELECT id FROM patients WHERE user_id = $1', [user_id]);
    if (patientResult.rows.length === 0) {
      return res.status(404).json({ error: 'Patient record not found.' });
    }
    const patient_id = patientResult.rows[0].id;

    if (!doctor_id || !appointment_date || !appointment_start_time || !appointment_end_time) {
      return res.status(400).json({ error: 'Missing required fields.' });
    }

    const dayOfWeek = getDayOfWeek(appointment_date);

    // Check if doctor is available
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

    // Insert appointment
    const insertResult = await pool.query(
      `INSERT INTO appointments (patient_id, doctor_id, appointment_date, appointment_start_time, appointment_end_time, status, notes)
       VALUES ($1, $2, $3, $4, $5, 'pending', $6)
       RETURNING *`,
      [patient_id, doctor_id, appointment_date, appointment_start_time, appointment_end_time, notes]
    );

    // Fetch doctor user_id
    const doctorUserResult = await pool.query(
      'SELECT user_id FROM doctors WHERE id = $1',
      [doctor_id]
    );

    if (doctorUserResult.rows.length > 0) {
      const doctor_user_id = doctorUserResult.rows[0].user_id;

      // Create notification for doctor
      await pool.query(
        'INSERT INTO notifications (user_id, title, body) VALUES ($1, $2, $3)',
        [
          doctor_user_id,
          'New Appointment Booked',
          `A patient has booked an appointment on ${appointment_date} at ${appointment_start_time}.`,
        ]
      );
    }

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

// Patient can view their own appointments
exports.getPatientAppointments = async (req, res) => {
  try {
    const userId = req.user.id;

    // Get patient_id from user_id
    const patientResult = await pool.query('SELECT id FROM patients WHERE user_id = $1', [userId]);
    if (patientResult.rows.length === 0) {
      return res.status(404).json({ error: 'Patient record not found.' });
    }

    const patientId = patientResult.rows[0].id;

    // Fetch all appointments for this patient
    const result = await pool.query(`
      SELECT a.id, a.appointment_date, a.appointment_start_time, a.appointment_end_time,
             a.status, a.notes,
             u.full_name AS doctor_name, d.specialization
      FROM appointments a
      JOIN doctors d ON a.doctor_id = d.id
      JOIN users u ON d.user_id = u.id
      WHERE a.patient_id = $1
      ORDER BY a.appointment_date DESC, a.appointment_start_time DESC
    `, [patientId]);

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error while fetching appointments.' });
  }
};

// Patient can cancel upcoming appointment
exports.cancelAppointmentByPatient = async (req, res) => {
  try {
    const userId = req.user.id;
    const appointmentId = req.params.id;

    // Get patient_id
    const patientResult = await pool.query('SELECT id FROM patients WHERE user_id = $1', [userId]);
    if (patientResult.rows.length === 0) {
      return res.status(404).json({ error: 'Patient record not found.' });
    }
    const patientId = patientResult.rows[0].id;

    // Check appointment exists and is pending
    const apptResult = await pool.query(
      `SELECT * FROM appointments 
       WHERE id = $1 AND patient_id = $2 AND status = 'pending'`,
      [appointmentId, patientId]
    );
    if (apptResult.rows.length === 0) {
      return res.status(403).json({ error: 'Unauthorized or invalid appointment.' });
    }

    const { doctor_id, appointment_date, appointment_start_time } = apptResult.rows[0];

    // Cancel the appointment
    await pool.query(
      `UPDATE appointments SET status = 'cancelled' WHERE id = $1`,
      [appointmentId]
    );

    // Get doctor's user_id
    const doctorResult = await pool.query(
      'SELECT user_id FROM doctors WHERE id = $1',
      [doctor_id]
    );

    if (doctorResult.rows.length > 0) {
      const doctor_user_id = doctorResult.rows[0].user_id;

      // Insert notification for doctor
      await pool.query(
        `INSERT INTO notifications (user_id, title, body)
         VALUES ($1, $2, $3)`,
        [
          doctor_user_id,
          'Appointment Cancelled',
          `A patient has cancelled their appointment on ${appointment_date} at ${appointment_start_time}.`
        ]
      );
    }

    res.json({ message: 'Appointment cancelled and doctor notified.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error while cancelling appointment.' });
  }
};
