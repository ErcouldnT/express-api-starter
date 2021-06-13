const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.json('Login route');
});

module.exports = router;
