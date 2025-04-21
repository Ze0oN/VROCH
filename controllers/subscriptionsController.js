const pool = require('../db');

// GET ALL SUBSCRIPTIONS
exports.getAllSubscriptions = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM subscriptions ORDER BY id');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET SUBSCRIPTION BY ID
exports.getSubscriptionById = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM subscriptions WHERE id = $1', [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Subscription not found' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// CREATE SUBSCRIPTION
exports.createSubscription = async (req, res) => {
  const { patient_id, plan_name, start_date, end_date, auto_renew } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO subscriptions (patient_id, plan_name, start_date, end_date, auto_renew)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [patient_id, plan_name, start_date, end_date, auto_renew]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE SUBSCRIPTION
exports.updateSubscription = async (req, res) => {
  const { plan_name, start_date, end_date, auto_renew } = req.body;
  try {
    const result = await pool.query(
      `UPDATE subscriptions 
       SET plan_name=$1, start_date=$2, end_date=$3, auto_renew=$4
       WHERE id=$5 RETURNING *`,
      [plan_name, start_date, end_date, auto_renew, req.params.id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Subscription not found' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE SUBSCRIPTION
exports.deleteSubscription = async (req, res) => {
  try {
    const result = await pool.query('DELETE FROM subscriptions WHERE id = $1 RETURNING *', [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Subscription not found' });
    res.json({ message: 'Subscription deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
