const pool = require('../db');

// GET ALL BILLS
exports.getAllBills = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM bills ORDER BY id');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET BILL BY ID
exports.getBillById = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM bills WHERE id = $1', [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Bill not found' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// CREATE BILL
exports.createBill = async (req, res) => {
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

// UPDATE BILL
exports.updateBill = async (req, res) => {
  const { amount, status, billing_date, details } = req.body;
  try {
    const result = await pool.query(
      `UPDATE bills 
       SET amount=$1, status=$2, billing_date=$3, details=$4
       WHERE id=$5 RETURNING *`,
      [amount, status, billing_date, details, req.params.id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Bill not found' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE BILL
exports.deleteBill = async (req, res) => {
  try {
    const result = await pool.query('DELETE FROM bills WHERE id = $1 RETURNING *', [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Bill not found' });
    res.json({ message: 'Bill deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
