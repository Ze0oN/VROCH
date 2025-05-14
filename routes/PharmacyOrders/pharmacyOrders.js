const express = require('express');
const router = express.Router();
const controller = require('../../controllers/PharmacyOrders/pharmacyOrderController');
const requireRole = require('../../middleware/requireRole');
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
/**
 * @swagger
 * /api/pharmacy-orders:
 *   get:
 *     summary: Get all pharmacy orders (admin only)
 *     tags: [Pharmacy Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of pharmacy orders
 *       403:
 *         description: Forbidden
 */
router.get('/', verifyToken, requireRole('admin'), controller.getAllOrders);

// GET patient orders
/**
 * @swagger
 * /api/pharmacy-orders/patient/{patient_id}:
 *   get:
 *     summary: Get pharmacy orders for a specific patient
 *     tags: [Pharmacy Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: patient_id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Patient order history
 */
router.get('/patient/:patient_id', verifyToken, requireRole('patient'), controller.getOrdersByPatient);

// POST new order
/**
 * @swagger
 * /api/pharmacy-orders:
 *   post:
 *     summary: Create a new pharmacy order
 *     tags: [Pharmacy Orders]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               prescription_file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Order created
 */
router.post('/', verifyToken, requireRole('patient'), upload.single('prescription_file'), controller.createOrder);

// PUT update status
/**
 * @swagger
 * /api/pharmacy-orders/{orderId}:
 *   put:
 *     summary: Update the status of a pharmacy order
 *     tags: [Pharmacy Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Order updated
 */
router.put('/:orderId', verifyToken, requireRole('admin'), controller.updateOrderStatus);

// GET medication list (all roles)
/**
 * @swagger
 * /api/pharmacy-orders/medications/list:
 *   get:
 *     summary: Get a list of medications
 *     tags: [Pharmacy Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of medications available
 */
router.get('/medications/list', verifyToken, requireRole(['patient', 'doctor', 'admin']), controller.getMedications);


module.exports = router;
