const pool = require('../../db'); // PostgreSQL connection pool
const bcrypt = require('bcryptjs');

// GET all users (admin only)
exports.getAllUsers = async (req, res) => {
  try {
    // Only admins can access this route
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Access denied: Admins only.' });
    }

    const result = await pool.query('SELECT * FROM users ORDER BY id');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET user by ID (admin only)
exports.getUserById = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Access denied: Admins only.' });
    }

    const result = await pool.query('SELECT * FROM users WHERE id = $1', [req.params.id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// CREATE a new user (admin only)
exports.createUser = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Only admins can create users.' });
    }

    const { full_name, email, password, role, phone, gender, date_of_birth } = req.body;

    // Hash the plain password
    const password_hash = await bcrypt.hash(password, 10);

    // Insert into users table
    const result = await pool.query(
      `INSERT INTO users (full_name, email, password_hash, role, phone, gender, date_of_birth)
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [full_name, email, password_hash, role, phone, gender, date_of_birth]
    );

    // Insert into user_passwords table
    await pool.query(
      `INSERT INTO user_passwords (email, password) VALUES ($1, $2)`,
      [email, password]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE a user (admin only)
exports.updateUser = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Only admins can update users.' });
    }

    const { full_name, email, role, phone, gender, date_of_birth, password } = req.body;

    let query = `
      UPDATE users
      SET full_name=$1, email=$2, role=$3, phone=$4, gender=$5, date_of_birth=$6, updated_at=NOW()`;
    const values = [full_name, email, role, phone, gender, date_of_birth];

    if (password) {
      const password_hash = await bcrypt.hash(password, 10);
      query += `, password_hash=$7 WHERE id=$8 RETURNING *`;
      values.push(password_hash, req.params.id);
    } else {
      query += ` WHERE id=$7 RETURNING *`;
      values.push(req.params.id);
    }

    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    // If password was updated, update user_passwords table as well
    if (password) {
      await pool.query(
        `UPDATE user_passwords SET password = $1 WHERE email = $2`,
        [password, email]
      );
    }

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE a user (admin only)
exports.deleteUser = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Only admins can delete users.' });
    }

    const result = await pool.query('DELETE FROM users WHERE id = $1 RETURNING *', [req.params.id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
