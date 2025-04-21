const pool = require('../db');

// GET ALL TICKETS
exports.getAllSupportTickets = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM support_tickets ORDER BY id');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET TICKET BY ID
exports.getSupportTicketById = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM support_tickets WHERE id = $1', [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Ticket not found' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// CREATE TICKET
exports.createSupportTicket = async (req, res) => {
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

// UPDATE TICKET
exports.updateSupportTicket = async (req, res) => {
  const { subject, description, status } = req.body;
  try {
    const result = await pool.query(
      `UPDATE support_tickets 
       SET subject = $1, description = $2, status = $3
       WHERE id = $4 RETURNING *`,
      [subject, description, status, req.params.id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Ticket not found' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE TICKET
exports.deleteSupportTicket = async (req, res) => {
  try {
    const result = await pool.query('DELETE FROM support_tickets WHERE id = $1 RETURNING *', [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Ticket not found' });
    res.json({ message: 'Support ticket deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
