var express = require('express');
var router = express.Router();

// Render about-us-page
router.get('/', function(req, res) {
  res.render('about-us-page', { });
});

module.exports = router;