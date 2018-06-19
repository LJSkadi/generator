const express = require('express');
const router  = express.Router();

/* GET home page */
/* Frontdoor or Entrance to your HOMEPAGE */
router.get('/', (req, res, next) => {
  res.render('index');
});

module.exports = router;
