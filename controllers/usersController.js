const pool = require('../db');

// GET ALL USERS
exports.getAllUsers = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users ORDER BY id');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET USER BY ID
exports.getUserById = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'User not found' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// CREATE USER
exports.createUser = async (req, res) => {
  const { full_name, email, password_hash, role, phone, gender, date_of_birth } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO users (full_name, email, password_hash, role, phone, gender, date_of_birth)
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [full_name, email, password_hash, role, phone, gender, date_of_birth]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE USER
exports.updateUser = async (req, res) => {
  const { full_name, email, role, phone, gender, date_of_birth } = req.body;
  try {
    const result = await pool.query(
      `UPDATE users SET full_name=$1, email=$2, role=$3, phone=$4, gender=$5, date_of_birth=$6, updated_at=NOW()
       WHERE id=$7 RETURNING *`,
      [full_name, email, role, phone, gender, date_of_birth, req.params.id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'User not found' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE USER
exports.deleteUser = async (req, res) => {
  try {
    const result = await pool.query('DELETE FROM users WHERE id = $1 RETURNING *', [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'User not found' });
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
