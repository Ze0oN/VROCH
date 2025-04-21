const express = require('express');
const router = express.Router();
const programsController = require('../controllers/programsController');

router.get('/', programsController.getAllPrograms);
router.get('/:id', programsController.getProgramById);
router.post('/', programsController.createProgram);
router.put('/:id', programsController.updateProgram);
router.delete('/:id', programsController.deleteProgram);

module.exports = router;
