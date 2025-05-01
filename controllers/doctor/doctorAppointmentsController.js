const pool = require('../../db');

exports.getDoctorAppointments = async (req, res) => {
  try {
    const userId = req.user.id;
    const doctorResult = await pool.query('SELECT id FROM doctors WHERE user_id = $1', [userId]);
    if (doctorResult.rows.length === 0) return res.status(404).json({ error: 'Doctor not found.' });
    const doctorId = doctorResult.rows[0].id;

    const result = await pool.query(`
      SELECT a.id, a.appointment_date, a.appointment_start_time, a.appointment_end_time,
             a.status, u.full_name AS patient_name, a.patient_id
      FROM appointments a
      JOIN patients p ON a.patient_id = p.id
      JOIN users u ON p.user_id = u.id
      WHERE a.doctor_id = $1
      ORDER BY a.appointment_date DESC, a.appointment_start_time DESC
    `, [doctorId]);

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error.' });
  }
};

exports.updateAppointmentStatus = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;
    const { status } = req.body;

    const doctorResult = await pool.query('SELECT id FROM doctors WHERE user_id = $1', [userId]);
    if (doctorResult.rows.length === 0) return res.status(404).json({ error: 'Doctor not found.' });
    const doctorId = doctorResult.rows[0].id;

    const appointmentCheck = await pool.query('SELECT * FROM appointments WHERE id = $1 AND doctor_id = $2', [id, doctorId]);
    if (appointmentCheck.rows.length === 0) return res.status(403).json({ error: 'Unauthorized.' });

    await pool.query('UPDATE appointments SET status = $1 WHERE id = $2', [status, id]);

    // Notification logic
    const patientId = appointmentCheck.rows[0].patient_id;
    const patientUserRes = await pool.query('SELECT user_id FROM patients WHERE id = $1', [patientId]);
    if (patientUserRes.rows.length > 0) {
      const patientUserId = patientUserRes.rows[0].user_id;
      await pool.query(
        'INSERT INTO notifications (user_id, title, body) VALUES ($1, $2, $3)',
        [
          patientUserId,
          'Appointment Status Updated',
          `Your appointment on ${appointmentCheck.rows[0].appointment_date} has been marked as ${status}.`
        ]
      );
    }

    res.json({ message: 'Status updated and patient notified.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error.' });
  }
};

exports.addMedicalRecord = async (req, res) => {
  try {
    const userId = req.user.id;
    const { appointmentId } = req.params;
    const { record_type, description } = req.body;

    const doctorResult = await pool.query('SELECT id FROM doctors WHERE user_id = $1', [userId]);
    if (doctorResult.rows.length === 0) return res.status(404).json({ error: 'Doctor not found.' });
    const doctorId = doctorResult.rows[0].id;

    const appointmentResult = await pool.query('SELECT patient_id FROM appointments WHERE id = $1 AND doctor_id = $2', [appointmentId, doctorId]);
    if (appointmentResult.rows.length === 0) return res.status(403).json({ error: 'Unauthorized.' });
    const patientId = appointmentResult.rows[0].patient_id;

    await pool.query(
      'INSERT INTO medical_records (patient_id, doctor_id, record_type, description) VALUES ($1, $2, $3, $4)',
      [patientId, doctorId, record_type, description]
    );

    res.json({ message: 'Medical record added.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error.' });
  }
};
