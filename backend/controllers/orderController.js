const Order = require('../models/Order');
const createCrudController = require('./crudController');

module.exports = createCrudController(Order);
