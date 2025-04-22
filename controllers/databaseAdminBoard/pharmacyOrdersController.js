const pool = require('../../db'); // PostgreSQL connection pool

// GET all pharmacy orders (admin only)
exports.getAllPharmacyOrders = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Access denied: Admins only.' });
    }

    const result = await pool.query('SELECT * FROM pharmacy_orders ORDER BY id');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET pharmacy order by ID (admin only)
exports.getPharmacyOrderById = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Access denied: Admins only.' });
    }

    const result = await pool.query('SELECT * FROM pharmacy_orders WHERE id = $1', [req.params.id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// CREATE a new pharmacy order (admin only)
exports.createPharmacyOrder = async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Only admins can create pharmacy orders.' });
  }

  const { patient_id, medications, total_amount, status, ordered_at } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO pharmacy_orders (patient_id, medications, total_amount, status, ordered_at)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [patient_id, medications, total_amount, status, ordered_at]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE pharmacy order (admin only)
exports.updatePharmacyOrder = async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Only admins can update pharmacy orders.' });
  }

  const { medications, total_amount, status, ordered_at } = req.body;

  try {
    const result = await pool.query(
      `UPDATE pharmacy_orders 
       SET medications=$1, total_amount=$2, status=$3, ordered_at=$4
       WHERE id=$5 RETURNING *`,
      [medications, total_amount, status, ordered_at, req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE pharmacy order (admin only)
exports.deletePharmacyOrder = async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Only admins can delete pharmacy orders.' });
  }

  try {
    const result = await pool.query('DELETE FROM pharmacy_orders WHERE id = $1 RETURNING *', [req.params.id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.json({ message: 'Pharmacy order deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
