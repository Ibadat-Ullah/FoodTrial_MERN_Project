const errorHandler = (error, req, res, next) => {
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
};

module.exports = errorHandler;
