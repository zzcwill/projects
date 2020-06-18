var express = require('express');
var router = express.Router();

var { resDataApi } = require('../extend/api');

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

router.post('/post/json', function(req, res, next) {
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

router.post('/post/from', function(req, res, next) {
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

//文件上传
router.post('/post/multipart', function(req, res, next) {
  res.json({
    'str': '文件上传'
  })
});

module.exports = router;
