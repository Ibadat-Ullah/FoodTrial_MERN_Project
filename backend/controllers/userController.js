const User = require('../models/User');
const asyncHandler = require('./asyncHandler');

const getAll = asyncHandler(async (req, res) => {
  const users = await User.find().select('name email createdAt').sort({ createdAt: -1 });
  res.json(users);
});

module.exports = { getAll };
