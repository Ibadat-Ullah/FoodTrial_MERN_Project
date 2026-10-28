const express = require('express');
const paymentController = require('../controllers/paymentController');

const router = express.Router();

router.get('/', paymentController.getAll);
router.get('/:id', paymentController.getOne);
router.post('/', paymentController.create);
router.put('/:id', paymentController.update);
router.delete('/:id', paymentController.remove);

module.exports = router;
