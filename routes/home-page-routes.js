var express = require('express');
var router = express.Router();

// Render home-page
router.get('/', function(req, res) {
  res.render('home-page', { });
});

module.exports = router;