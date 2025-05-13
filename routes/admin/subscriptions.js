const express = require('express');
const router = express.Router();
const db = require('../../db');
const requireRole = require('../../middleware/requireRole');
const verifyToken = require('../../middleware/verifyToken')
router.use(verifyToken);

// GET /api/admin/subscriptions?plan=...
router.get('/', requireRole('admin'), async (req, res) => {
  const { plan } = req.query;
  let query = 'SELECT * FROM subscriptions WHERE 1=1';
  const values = [];

  if (plan) {
    values.push(plan);
    query += ` AND plan_name = $${values.length}`;
  }

  query += ' ORDER BY start_date DESC';

  try {
    const result = await db.query(query, values);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve subscriptions' });
  }
});

module.exports = router;
