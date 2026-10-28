const express = require('express');
const foodController = require('../controllers/foodController');
const foodImageUpload = require('../middleware/foodImageUpload');

const router = express.Router();

router.get('/', foodController.getAll);
router.get('/:id', foodController.getOne);
router.post('/', foodImageUpload, foodController.create);
router.put('/:id', foodImageUpload, foodController.update);
router.delete('/:id', foodController.remove);

module.exports = router;
