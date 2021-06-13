const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

require('dotenv').config();

const middlewares = require('./middlewares');
const userApi = require('./api/user');
const roomApi = require('./api/room');

const app = express();
app.set('trust proxy', 1);

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: 'API - 🦄🌈✨👋🌎🌍🌏✨🌈🦄'
  });
});

// Limiters need to be first
app.use('/api/', middlewares.apiLimiter);
app.use('/api/', middlewares.speedLimiter);
app.use('/api/v1/user', userApi);
app.use('/api/v1/room', roomApi);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
