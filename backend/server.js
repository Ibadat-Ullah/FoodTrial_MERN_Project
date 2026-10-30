require('dotenv').config();

const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const authRoutes = require('./routes/authRoutes');
const foodRoutes = require('./routes/foodRoutes');
const orderRoutes = require('./routes/orderRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const riderRoutes = require('./routes/riderRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
const port = 5000;
const mongoUri = process.env.MONGO_URI;

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/auth', authRoutes);
app.use('/api/foods', foodRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/riders', riderRoutes);
app.use('/api/users', userRoutes);

app.use((req, res, next) => {
  const error = new Error('Route not found');
  error.statusCode = 404;
  next(error);
});

app.use((error, req, res, next) => {
  let statusCode = error.statusCode || error.status || 500;
  let message = error.message || 'Internal server error';

  if (error.name === 'ValidationError' || error.name === 'CastError' || error.code === 11000) {
    statusCode = 400;
  }

  if (statusCode < 400 || statusCode > 599) {
    statusCode = 500;
  }

  if (statusCode >= 500) {
    console.error(error);
    message = 'Internal server error';
  }

  res.status(statusCode).json({ message });
});

if (!mongoUri) {
  console.error('MongoDB connection failed: MONGO_URI is not set in backend/.env');
  process.exitCode = 1;
} else {
  mongoose.connect(mongoUri)
  .then(() => {
    console.log(`MongoDB connected: ${mongoose.connection.host}`);
    app.listen(port, () => {
      console.log(`FoodTrial API listening on port ${port}`);
    });
  })
  .catch((error) => {
    console.error(`MongoDB connection failed: ${error.message}`);
    process.exitCode = 1;
  });
}
