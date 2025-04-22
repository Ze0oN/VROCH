const pool = require('../../db'); // PostgreSQL connection pool

// GET all support tickets (admin only)
exports.getAllSupportTickets = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Access denied: Admins only.' });
    }

    const result = await pool.query('SELECT * FROM support_tickets ORDER BY id');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET a support ticket by ID (admin only)
exports.getSupportTicketById = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Access denied: Admins only.' });
    }

    const result = await pool.query('SELECT * FROM support_tickets WHERE id = $1', [req.params.id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Ticket not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// CREATE a support ticket (admin only)
exports.createSupportTicket = async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Only admins can create support tickets.' });
  }

  const { user_id, subject, description, status } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO support_tickets (user_id, subject, description, status)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [user_id, subject, description, status]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE a support ticket (admin only)
exports.updateSupportTicket = async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Only admins can update support tickets.' });
  }

  const { subject, description, status } = req.body;

  try {
    const result = await pool.query(
      `UPDATE support_tickets 
       SET subject = $1, description = $2, status = $3
       WHERE id = $4 RETURNING *`,
      [subject, description, status, req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Ticket not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE a support ticket (admin only)
exports.deleteSupportTicket = async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Only admins can delete support tickets.' });
  }

  try {
    const result = await pool.query('DELETE FROM support_tickets WHERE id = $1 RETURNING *', [req.params.id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Ticket not found' });
    }

    res.json({ message: 'Support ticket deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
