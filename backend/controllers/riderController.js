const Rider = require('../models/Rider');
const createCrudController = require('./crudController');

module.exports = createCrudController(Rider);
