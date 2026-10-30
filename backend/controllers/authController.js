const User = require('../models/User');
const asyncHandler = require('./asyncHandler');

const register = asyncHandler(async (req, res) => {
  const { name, email } = req.body;
  const normalizedEmail = typeof email === 'string' ? email.trim().toLowerCase() : '';

  if (typeof name !== 'string' || name.trim().length < 2 || !normalizedEmail) {
    const error = new Error('A name and valid email are required');
    error.statusCode = 400;
    throw error;
  }

  const existingUser = await User.exists({ email: normalizedEmail });
  if (existingUser) {
    const error = new Error('An account with this email already exists');
    error.statusCode = 409;
    throw error;
  }

  await User.create({ name: name.trim(), email: normalizedEmail });
  res.status(201).json({ message: 'Data received successfully' });
});

const login = (req, res) => {
  res.json({ message: 'Data received successfully' });
};

module.exports = { register, login };
