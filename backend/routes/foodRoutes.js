const express = require('express');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const foodController = require('../controllers/foodController');

const router = express.Router();
const uploadDirectory = path.join(__dirname, '..', 'uploads');
const imageExtensions = {
  'image/jpeg': '.jpg',
  'image/png': '.png',
  'image/webp': '.webp'
};

fs.mkdirSync(uploadDirectory, { recursive: true });

const uploadFoodImage = multer({
  storage: multer.diskStorage({
    destination: uploadDirectory,
    filename: (req, file, callback) => {
      callback(null, `${crypto.randomUUID()}${imageExtensions[file.mimetype]}`);
    }
  }),
  limits: { fileSize: 5 * 1024 * 1024, files: 1 },
  fileFilter: (req, file, callback) => {
    if (!imageExtensions[file.mimetype]) {
      const error = new Error('Upload a JPEG, PNG, or WebP image');
      error.statusCode = 400;
      callback(error);
      return;
    }
    callback(null, true);
  }
}).single('image');

const handleFoodImageUpload = (req, res, next) => {
  uploadFoodImage(req, res, (error) => {
    if (error instanceof multer.MulterError) error.statusCode = 400;
    next(error);
  });
};

router.get('/', foodController.getAll);
router.get('/:id', foodController.getOne);
router.post('/', handleFoodImageUpload, foodController.create);
router.put('/:id', handleFoodImageUpload, foodController.update);
router.delete('/:id', foodController.remove);

module.exports = router;
