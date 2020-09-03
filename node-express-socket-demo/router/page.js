var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'socket' });
});

router.get('/error', function(req, res, next) {
  res.locals.message = 'error-zzc';
  res.render('error');
});

module.exports = router;
