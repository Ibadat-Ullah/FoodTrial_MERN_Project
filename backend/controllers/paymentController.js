const Payment = require('../models/Payment');
const createCrudController = require('./createCrudController');

module.exports = createCrudController(Payment);
