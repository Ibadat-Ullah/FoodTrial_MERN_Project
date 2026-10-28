const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const multer = require('multer');

const uploadDirectory = path.join(__dirname, '..', 'uploads');
fs.mkdirSync(uploadDirectory, { recursive: true });

const extensions = {
  'image/jpeg': '.jpg',
  'image/png': '.png',
  'image/webp': '.webp'
};

const upload = multer({
  storage: multer.diskStorage({
    destination: uploadDirectory,
    filename: (req, file, callback) => {
      callback(null, `${crypto.randomUUID()}${extensions[file.mimetype]}`);
    }
  }),
  limits: { fileSize: 5 * 1024 * 1024, files: 1 },
  fileFilter: (req, file, callback) => {
    if (!extensions[file.mimetype]) {
      const error = new Error('Upload a JPEG, PNG, or WebP image');
      error.statusCode = 400;
      callback(error);
      return;
    }
    callback(null, true);
  }
}).single('image');

module.exports = (req, res, next) => {
  upload(req, res, (error) => {
    if (error instanceof multer.MulterError) error.statusCode = 400;
    next(error);
  });
};
