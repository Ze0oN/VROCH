const pool = require('../db');

// GET ALL PROGRAMS
exports.getAllPrograms = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM health_programs ORDER BY id');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET PROGRAM BY ID
exports.getProgramById = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM health_programs WHERE id = $1', [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Program not found' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// CREATE PROGRAM
exports.createProgram = async (req, res) => {
  const { name, description, start_date, end_date } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO health_programs (name, description, start_date, end_date)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [name, description, start_date, end_date]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE PROGRAM
exports.updateProgram = async (req, res) => {
  const { name, description, start_date, end_date } = req.body;
  try {
    const result = await pool.query(
      `UPDATE health_programs
       SET name=$1, description=$2, start_date=$3, end_date=$4
       WHERE id=$5 RETURNING *`,
      [name, description, start_date, end_date, req.params.id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Program not found' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE PROGRAM
exports.deleteProgram = async (req, res) => {
  try {
    const result = await pool.query('DELETE FROM health_programs WHERE id = $1 RETURNING *', [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Program not found' });
    res.json({ message: 'Program deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
