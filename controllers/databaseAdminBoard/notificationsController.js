const pool = require('../../db'); // PostgreSQL connection pool

// GET all notifications (admin only)
exports.getAllNotifications = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Access denied: Admins only.' });
    }

    const result = await pool.query('SELECT * FROM notifications ORDER BY id');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET notification by ID (admin only)
exports.getNotificationById = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Access denied: Admins only.' });
    }

    const result = await pool.query('SELECT * FROM notifications WHERE id = $1', [req.params.id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Notification not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// CREATE a notification (admin only)
exports.createNotification = async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Only admins can create notifications.' });
  }

  const { user_id, title, body, is_read } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO notifications (user_id, title, body, is_read)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [user_id, title, body, is_read]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE a notification (admin only)
exports.updateNotification = async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Only admins can update notifications.' });
  }

  const { title, body, is_read } = req.body;

  try {
    const result = await pool.query(
      `UPDATE notifications 
       SET title = $1, body = $2, is_read = $3 
       WHERE id = $4 RETURNING *`,
      [title, body, is_read, req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Notification not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE a notification (admin only)
exports.deleteNotification = async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Only admins can delete notifications.' });
  }

  try {
    const result = await pool.query('DELETE FROM notifications WHERE id = $1 RETURNING *', [req.params.id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Notification not found' });
    }

    res.json({ message: 'Notification deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
