const db = require('../../db');
const path = require('path');
const fs = require('fs');

exports.getAllOrders = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM pharmacy_orders ORDER BY ordered_at DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
};

exports.getOrdersByPatient = async (req, res) => {
  try {
    const patientId = req.params.patient_id;
    console.log("[DEBUG] getOrdersByPatient: patient_id =", patientId);

    const result = await db.query(
      'SELECT * FROM pharmacy_orders WHERE patient_id = $1 ORDER BY ordered_at DESC',
      [patientId]
    );

    console.log("[DEBUG] Orders found:", result.rows);

    res.json(result.rows);
  } catch (err) {
    console.error('[ERROR] getOrdersByPatient:', err.stack);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.createOrder = async (req, res) => {
  try {
    const { medications } = req.body;

    // FIX: Get correct patient_id from patients table using user_id from JWT
    const patientRes = await db.query(
      'SELECT id FROM patients WHERE user_id = $1',
      [req.user.id]
    );

    if (patientRes.rowCount === 0) {
      return res.status(404).json({ error: 'Patient not found' });
    }

    const patientId = patientRes.rows[0].id;

    if (!Array.isArray(medications) || medications.length === 0) {
      return res.status(400).json({ error: 'No medications selected' });
    }

    // Get medication prices
    const placeholders = medications.map((_, i) => `$${i + 1}`).join(',');
    const medsQuery = `SELECT * FROM medications WHERE name IN (${placeholders})`;
    const medsResult = await db.query(medsQuery, medications);

    if (medsResult.rows.length === 0) {
      return res.status(400).json({ error: 'No valid medications found' });
    }

    const totalAmount = medsResult.rows.reduce((sum, m) => sum + parseFloat(m.price), 0);

    // Handle file
    let filePath = null;
    if (req.file) {
      filePath = `uploads/prescriptions/${req.file.filename}`;
    }

    const insertQuery = `
      INSERT INTO pharmacy_orders (patient_id, medications, total_amount, prescription_file)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `;

    const result = await db.query(insertQuery, [
      patientId,
      JSON.stringify(medications),
      totalAmount,
      filePath
    ]);

    return res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error in createOrder:', err);
    return res.status(500).json({ error: 'Order creation failed' });
  }
};


exports.updateOrderStatus = async (req, res) => {
  const { orderId } = req.params;
  const { new_status } = req.body;

  try {
    await db.query(`UPDATE pharmacy_orders SET status = $1 WHERE id = $2`, [new_status, orderId]);
    res.json({ message: 'Status updated successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update status' });
  }
};

exports.getMedications = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM medications ORDER BY name');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch medications' });
  }
};
