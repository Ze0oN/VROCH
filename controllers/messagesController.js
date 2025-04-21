const pool = require('../db');

// GET ALL MESSAGES
exports.getAllMessages = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM messages ORDER BY id');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET MESSAGE BY ID
exports.getMessageById = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM messages WHERE id = $1', [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Message not found' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// CREATE MESSAGE
exports.createMessage = async (req, res) => {
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

// UPDATE MESSAGE
exports.updateMessage = async (req, res) => {
  const { message, is_read } = req.body;
  try {
    const result = await pool.query(
      `UPDATE messages SET message = $1, is_read = $2 WHERE id = $3 RETURNING *`,
      [message, is_read, req.params.id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Message not found' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE MESSAGE
exports.deleteMessage = async (req, res) => {
  try {
    const result = await pool.query('DELETE FROM messages WHERE id = $1 RETURNING *', [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Message not found' });
    res.json({ message: 'Message deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
