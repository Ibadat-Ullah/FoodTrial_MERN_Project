const asyncHandler = require('../middleware/asyncHandler');
const User = require('../models/User');

const getAll = asyncHandler(async (req, res) => {
  const users = await User.find().select('name email createdAt').sort({ createdAt: -1 });
  res.json(users);
});

module.exports = { getAll };
