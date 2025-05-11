const express = require('express');
const router = express.Router();
const controller = require('../../controllers/PharmacyOrders/pharmacyOrderController');
const { authenticateUser, authorizeRoles } = require('../../middleware/auth');
const verifyToken = require('../../middleware/verifyToken');
const multer = require('multer');
const db = require('../../db');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/prescriptions'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });



router.get('/patient/:id', verifyToken, async (req, res) => {
  try {
    const { id } = req.params;

    // [DEBUG]
    console.log('[DEBUG] Fetching orders for patient ID:', id);

    const result = await db.query(
      'SELECT * FROM pharmacy_orders WHERE patient_id = $1 ORDER BY ordered_at DESC',
      [id]
    );

    console.log('[DEBUG] Fetched orders:', result.rows);

    res.json(result.rows);
  } catch (err) {
    console.error('[ERROR] fetching pharmacy orders:', err.stack);
    res.status(500).json({ error: 'Internal server error' });
  }
});



// GET all orders (admin only)
router.get('/', authenticateUser, authorizeRoles('admin'), controller.getAllOrders);

// GET patient orders
router.get('/patient/:patient_id', authenticateUser, authorizeRoles('patient'), controller.getOrdersByPatient);

// POST new order
router.post('/', authenticateUser, authorizeRoles('patient'), upload.single('prescription_file'), controller.createOrder);

// PUT update status
router.put('/:orderId', authenticateUser, authorizeRoles('admin'), controller.updateOrderStatus);

// GET medication list (all roles)
router.get('/medications/list', authenticateUser, authorizeRoles('admin', 'doctor', 'patient'), controller.getMedications);


module.exports = router;
