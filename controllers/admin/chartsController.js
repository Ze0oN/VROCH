const db = require('../../db');

// Utility: parse date filters
function buildDateFilter(start, end, columnName = 'created_at') {
  let filter = '1=1';
  const values = [];

  if (start) {
    values.push(start);
    filter += ` AND ${columnName} >= $${values.length}`;
  }
  if (end) {
    values.push(end);
    filter += ` AND ${columnName} <= $${values.length}`;
  }

  return { filter, values };
}

// 1. Top 5 doctors by appointments
exports.getTopDoctorsByAppointments = async (req, res) => {
  try {
    const { from, to } = req.query;
    const { filter, values } = buildDateFilter(from, to, 'appointment_date');

    const query = `
      SELECT u.full_name AS doctor_name, COUNT(a.id) AS count
      FROM appointments a
      JOIN doctors d ON a.doctor_id = d.id
      JOIN users u ON u.id = d.user_id
      WHERE ${filter}
      GROUP BY u.full_name
      ORDER BY count DESC
      LIMIT 5
    `;

    const result = await db.query(query, values);
    res.json({
      labels: result.rows.map(r => r.doctor_name),
      values: result.rows.map(r => parseInt(r.count))
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 2. Top 5 most ordered medications
exports.getTopMedications = async (req, res) => {
  try {
    const { from, to } = req.query;
    const { filter, values } = buildDateFilter(from, to, 'ordered_at');

    const query = `
      SELECT TRIM(med.name) AS name, COUNT(*) AS count
      FROM pharmacy_orders po,
           unnest(string_to_array(po.medications, ',')) AS med(name)
      WHERE ${filter}
      GROUP BY med.name
      ORDER BY count DESC
      LIMIT 5
    `;

    const result = await db.query(query, values);
    res.json({
      labels: result.rows.map(r => r.name),
      values: result.rows.map(r => parseInt(r.count))
    });
  } catch (err) {
    console.error('Top medications error:', err);
    res.status(500).json({ error: 'Failed to load top medications' });
  }
};

// 3. Subscription distribution for pie chart
exports.getSubscriptionDistribution = async (req, res) => {
  try {
    const result = await db.query(`
      SELECT plan_name, COUNT(*) AS count
      FROM subscriptions
      WHERE NOW() BETWEEN start_date AND end_date
      GROUP BY plan_name
    `);

    res.json({
      labels: result.rows.map(r => r.plan_name),
      values: result.rows.map(r => parseInt(r.count))
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
