const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'Get All User API - 👋🌎🌍🌏'
  });
});

router.use('/login', require('./login'));
router.use('/register', require('./register'));

module.exports = router;
