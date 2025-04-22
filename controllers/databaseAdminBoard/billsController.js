const pool = require('../../db'); // PostgreSQL connection pool

// GET all bills (admin only)
exports.getAllBills = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Access denied: Admins only.' });
    }

    const result = await pool.query('SELECT * FROM bills ORDER BY id');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET bill by ID (admin only)
exports.getBillById = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Access denied: Admins only.' });
    }

    const result = await pool.query('SELECT * FROM bills WHERE id = $1', [req.params.id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Bill not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// CREATE bill (admin only)
exports.createBill = async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Only admins can create bills.' });
  }

  const { patient_id, amount, status, billing_date, details } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO bills (patient_id, amount, status, billing_date, details)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [patient_id, amount, status, billing_date, details]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE bill (admin only)
exports.updateBill = async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Only admins can update bills.' });
  }

  const { amount, status, billing_date, details } = req.body;

  try {
    const result = await pool.query(
      `UPDATE bills 
       SET amount=$1, status=$2, billing_date=$3, details=$4
       WHERE id=$5 RETURNING *`,
      [amount, status, billing_date, details, req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Bill not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE bill (admin only)
exports.deleteBill = async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Only admins can delete bills.' });
  }

  try {
    const result = await pool.query('DELETE FROM bills WHERE id = $1 RETURNING *', [req.params.id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Bill not found' });
    }

    res.json({ message: 'Bill deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
