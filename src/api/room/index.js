const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'Get All Rooms API - 👋🌎🌍🌏'
  });
});

router.use('/create', require('./create'));

module.exports = router;
