const express = require('express');
const { createAccountLimiter } = require('../../middlewares');

const router = express.Router();

router.get('/', createAccountLimiter, (req, res) => {
  res.json('Create a room route');
});

module.exports = router;
