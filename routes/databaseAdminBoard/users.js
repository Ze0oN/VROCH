const express = require('express');
const router = express.Router();
const usersController = require('../../controllers/databaseAdminBoard/usersController');
const verifyToken = require('../../middleware/verifyToken');

router.use(verifyToken);

router.get('/me', verifyToken, async (req, res) => {
    try {
      const result = await pool.query('SELECT id, full_name, role FROM users WHERE id = $1', [req.user.id]);
      if (result.rows.length === 0) return res.status(404).json({ error: 'User not found' });
      res.json(result.rows[0]);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

router.put('/update-profile', usersController.updateOwnProfile)
router.get('/', usersController.getAllUsers);
router.get('/:id', usersController.getUserById);
router.post('/', usersController.createUser);
router.put('/:id', usersController.updateUser);
router.delete('/:id', usersController.deleteUser);

module.exports = router;
