const pool = require('../../db');
const fs = require('fs');
const path = require('path');

// GET /medical-records/patient/:id
exports.getRecordsByPatient = async (req, res) => {
  const { id } = req.params;
  const userId = req.user?.id;
  const role = req.user?.role;

  if (role !== 'admin' && parseInt(id) !== userId) {
    return res.status(403).json({ message: 'Access denied' });
  }

  try {
    const result = await pool.query(
      'SELECT * FROM medical_records WHERE patient_id = $1 ORDER BY created_at DESC',
      [id]
    );
    res.status(200).json(result.rows);
  } catch (err) {
    console.error('Error fetching patient records:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

// GET /medical-records/doctor/:id
exports.getRecordsByDoctor = async (req, res) => {
  const { id } = req.params;
  const role = req.user?.role;

  if (role !== 'doctor' && role !== 'admin') {
    return res.status(403).json({ message: 'Access denied' });
  }

  try {
    const result = await pool.query(
      'SELECT * FROM medical_records WHERE doctor_id = $1 ORDER BY created_at DESC',
      [id]
    );
    res.status(200).json(result.rows);
  } catch (err) {
    console.error('Error fetching doctor records:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

// DELETE /medical-records/:id
exports.deleteRecord = async (req, res) => {
  const role = req.user?.role;
  if (role !== 'doctor' && role !== 'admin') {
    return res.status(403).json({ message: 'Access denied' });
  }

  const { id } = req.params;
  try {
    const result = await pool.query('SELECT file_url FROM medical_records WHERE id = $1', [id]);
    if (result.rowCount === 0) return res.status(404).json({ message: 'Record not found' });

    const filePath = path.join(__dirname, '../../', result.rows[0].file_url);
    fs.unlink(filePath, async (err) => {
      if (err) console.warn('File may not exist:', err.message);
      await pool.query('DELETE FROM medical_records WHERE id = $1', [id]);
      res.status(200).json({ message: 'Medical record deleted' });
    });
  } catch (err) {
    console.error('Error deleting medical record:', err);
    res.status(500).json({ error: 'Server error' });
  }
};
