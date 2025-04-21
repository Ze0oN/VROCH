const pool = require('../db');

// GET ALL PHARMACY ORDERS
exports.getAllPharmacyOrders = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM pharmacy_orders ORDER BY id');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET ORDER BY ID
exports.getPharmacyOrderById = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM pharmacy_orders WHERE id = $1', [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Order not found' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// CREATE ORDER
exports.createPharmacyOrder = async (req, res) => {
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

// UPDATE ORDER
exports.updatePharmacyOrder = async (req, res) => {
  const { medications, total_amount, status, ordered_at } = req.body;
  try {
    const result = await pool.query(
      `UPDATE pharmacy_orders 
       SET medications=$1, total_amount=$2, status=$3, ordered_at=$4
       WHERE id=$5 RETURNING *`,
      [medications, total_amount, status, ordered_at, req.params.id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Order not found' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE ORDER
exports.deletePharmacyOrder = async (req, res) => {
  try {
    const result = await pool.query('DELETE FROM pharmacy_orders WHERE id = $1 RETURNING *', [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Order not found' });
    res.json({ message: 'Pharmacy order deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
