const express = require('express');
const router = express.Router();
const programsController = require('../../controllers/databaseAdminBoard/programsController');
const verifyToken = require('../../middleware/verifyToken');

router.use(verifyToken);

router.get('/', programsController.getAllPrograms);
router.get('/:id', programsController.getProgramById);
router.post('/', programsController.createProgram);
router.put('/:id', programsController.updateProgram);
router.delete('/:id', programsController.deleteProgram);

module.exports = router;
