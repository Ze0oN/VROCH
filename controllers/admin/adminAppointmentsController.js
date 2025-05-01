const pool = require('../../db');

exports.getAllAppointments = async (req, res) => {
  try {
    const { doctor, patient, date, status } = req.query;
    let query = `
      SELECT a.id, a.appointment_date, a.appointment_start_time, a.appointment_end_time,
             a.status, a.notes,
             duser.full_name AS doctor_name, puser.full_name AS patient_name
      FROM appointments a
      JOIN doctors d ON a.doctor_id = d.id
      JOIN users duser ON d.user_id = duser.id
      JOIN patients p ON a.patient_id = p.id
      JOIN users puser ON p.user_id = puser.id
      WHERE 1=1`;
    const params = [];

    if (doctor) {
      params.push(`%${doctor}%`);
      query += ` AND duser.full_name ILIKE $${params.length}`;
    }
    if (patient) {
      params.push(`%${patient}%`);
      query += ` AND puser.full_name ILIKE $${params.length}`;
    }
    if (date) {
      params.push(date);
      query += ` AND a.appointment_date = $${params.length}`;
    }
    if (status) {
      params.push(status);
      query += ` AND a.status = $${params.length}`;
    }

    query += ` ORDER BY a.appointment_date DESC, a.appointment_start_time DESC`;
    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch appointments.' });
  }
};

exports.deleteAppointment = async (req, res) => {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Only admins can delete appointments.' });
    }
  
    try {
      const appointmentId = req.params.id;
  
      // Check for prescriptions linked to this appointment
      const prescriptionCheck = await pool.query(
        'SELECT id FROM prescriptions WHERE appointment_id = $1',
        [appointmentId]
      );
  
      if (prescriptionCheck.rows.length > 0) {
        return res.status(400).json({
          error: 'This appointment has an active prescription and cannot be deleted.'
        });
      }
  
      // Delete only if no prescription exists
      const result = await pool.query(
        'DELETE FROM appointments WHERE id = $1 RETURNING *',
        [appointmentId]
      );
  
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Appointment not found.' });
      }
  
      res.json({ message: 'Appointment deleted successfully.' });
    } catch (err) {
      console.error('Delete Appointment Error:', err.message);
      res.status(500).json({ error: 'Failed to delete appointment.', details: err.message });
    }
  };

exports.reassignAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const { doctor_id } = req.body;
    await pool.query('UPDATE appointments SET doctor_id = $1 WHERE id = $2', [doctor_id, id]);
    res.json({ message: 'Appointment reassigned successfully.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to reassign appointment.' });
  }
};
