var express = require('express');
var router = express.Router();

// router.get('/login', function(req, res, next) {
//   res.send('login');
// });

router.get('/login', function(req, res, next) {
  res.send('login');
});

router.get('/loginOut', function(req, res, next) {
  res.send('login');
});

router.get('/userInfo', function(req, res, next) {
  res.send('userInfo');
});

module.exports = router;
