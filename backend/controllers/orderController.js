const Order = require('../models/Order');
const createCrudController = require('./createCrudController');

module.exports = createCrudController(Order);
