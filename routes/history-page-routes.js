var express = require('express');
var router = express.Router();

// Render history-page
router.get('/', function(req, res, next) {
  res.render('history-page', {  });
});

module.exports = router;
