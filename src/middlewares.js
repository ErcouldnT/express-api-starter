const rateLimit = require('express-rate-limit');
const slowDown = require('express-slow-down');

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per 15 minutes
});

const createAccountLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour window
  max: 5, // start blocking after 5 requests
  message:
    {
      type: 'error',
      message: 'Too many accounts created from this IP, please try again after an hour.',
    }
});

const speedLimiter = slowDown({
  windowMs: 15 * 60 * 1000, // 15 minutes
  delayAfter: 60, // allow 60 requests per 15 minutes, then...
  delayMs: 500 // begin adding +500 ms of delay per request.
});

const resetPasswordSpeedLimiter = slowDown({
  windowMs: 15 * 60 * 1000, // 15 minutes
  delayAfter: 5, // allow 5 requests to go at full-speed, then...
  delayMs: 100 // 6th request has a 100ms delay, 7th has a 200ms delay, 8th gets 300ms, etc.
});

function notFound(req, res, next) {
  res.status(404);
  const error = new Error(`🔍 - Not Found - ${req.originalUrl}`);
  next(error);
}

/* eslint-disable no-unused-vars */
function errorHandler(err, req, res, next) {
  /* eslint-enable no-unused-vars */
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack
  });
}

module.exports = {
  notFound,
  errorHandler,
  apiLimiter,
  createAccountLimiter,
  speedLimiter,
  resetPasswordSpeedLimiter
};
