const Rider = require('../models/Rider');
const createCrudController = require('./createCrudController');

module.exports = createCrudController(Rider);
