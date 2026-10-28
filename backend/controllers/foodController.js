const Food = require('../models/Food');
const createCrudController = require('./crudController');

module.exports = createCrudController(Food, {
  prepareBody: (req, operation) => {
    const food = { ...req.body };
    delete food.imageUrl;
    delete food.image;

    if (req.file) {
      food.imageUrl = `/uploads/${req.file.filename}`;
    } else if (operation === 'create') {
      const error = new Error('A food photo is required');
      error.statusCode = 400;
      throw error;
    }

    return food;
  }
});
