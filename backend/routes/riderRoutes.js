const express = require('express');
const riderController = require('../controllers/riderController');

const router = express.Router();

router.get('/', riderController.getAll);
router.get('/:id', riderController.getOne);
router.post('/', riderController.create);
router.put('/:id', riderController.update);
router.delete('/:id', riderController.remove);

module.exports = router;
