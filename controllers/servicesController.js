const pool = require('../db');

// GET ALL SERVICES
exports.getAllServices = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM services ORDER BY id');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET SERVICE BY ID
exports.getServiceById = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM services WHERE id = $1', [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Service not found' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// CREATE SERVICE
exports.createService = async (req, res) => {
  const { name, description, cost } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO services (name, description, cost)
       VALUES ($1, $2, $3) RETURNING *`,
      [name, description, cost]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE SERVICE
exports.updateService = async (req, res) => {
  const { name, description, cost } = req.body;
  try {
    const result = await pool.query(
      `UPDATE services 
       SET name=$1, description=$2, cost=$3 
       WHERE id=$4 RETURNING *`,
      [name, description, cost, req.params.id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Service not found' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE SERVICE
exports.deleteService = async (req, res) => {
  try {
    const result = await pool.query('DELETE FROM services WHERE id = $1 RETURNING *', [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Service not found' });
    res.json({ message: 'Service deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
