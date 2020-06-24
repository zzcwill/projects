var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'index' });
});

router.get('/socket', function(req, res, next) {
  res.render('socket', { title: 'socket' });
});

module.exports = router;
