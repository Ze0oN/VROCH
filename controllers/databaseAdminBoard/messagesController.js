const pool = require('../../db'); // PostgreSQL connection pool

// GET all messages (admin only)
exports.getAllMessages = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Access denied: Admins only.' });
    }

    const result = await pool.query('SELECT * FROM messages ORDER BY id');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET message by ID (admin only)
exports.getMessageById = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Access denied: Admins only.' });
    }

    const result = await pool.query('SELECT * FROM messages WHERE id = $1', [req.params.id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Message not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// CREATE a new message (admin only)
exports.createMessage = async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Only admins can create messages.' });
  }

  const { sender_id, receiver_id, message, is_read } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO messages (sender_id, receiver_id, message, is_read)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [sender_id, receiver_id, message, is_read]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE message (admin only)
exports.updateMessage = async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Only admins can update messages.' });
  }

  const { message, is_read } = req.body;

  try {
    const result = await pool.query(
      `UPDATE messages SET message = $1, is_read = $2 WHERE id = $3 RETURNING *`,
      [message, is_read, req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Message not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE message (admin only)
exports.deleteMessage = async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Only admins can delete messages.' });
  }

  try {
    const result = await pool.query('DELETE FROM messages WHERE id = $1 RETURNING *', [req.params.id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Message not found' });
    }

    res.json({ message: 'Message deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
