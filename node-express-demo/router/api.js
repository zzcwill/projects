var express = require('express');
var router = express.Router();

var { resDataApi } = require('../extend/api');

console.info(resDataApi(20000,'','没有传way参数'))

router.get('/get', function(req, res, next) {
  var data = {};
  if(!req.params.way) {
    data = resDataApi(20000,'','没有传way参数');
  }

  if(req.params.way) {
    data = resDataApi('',{
      way: req.params.way
    },'ok');
  }

  res.json(data)
});

router.get('/loginOut', function(req, res, next) {
  res.send('login');
});

router.get('/userInfo', function(req, res, next) {
  res.send('userInfo');
});

module.exports = router;
