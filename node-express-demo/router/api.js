var express = require('express');
var router = express.Router();

var { resDataApi } = require('../extend/api');

router.get('/get', function(req, res, next) {
  var data = {};

  if(req.query.way === undefined) {
    data = resDataApi(20000,{},'没有传way参数');
  }

  if(req.query.way !== undefined) {
    data = resDataApi(
      10000,
      {
        way: req.query.way
      },
      'ok'
    );
  }

  res.json(data)
});

router.post('/post/json', function(req, res, next) {
  var data = {};
  if(req.body.way  === undefined) {
    data = resDataApi(20000,{},'没有传way参数');
  }

  if(req.body.way !== undefined) {
    data = resDataApi(
      10000,
      {
        way: req.body.way
      },
      'ok'
    );
  }

  res.json(data)
});

router.post('/post/from', function(req, res, next) {
  var data = {};
  if(req.body.way  === undefined) {
    data = resDataApi(20000,{},'没有传way参数');
  }

  if(req.body.way !== undefined) {
    data = resDataApi(
      10000,
      {
        way: req.body.way
      },
      'ok'
    );
  }

  res.json(data)
});

//文件上传
router.post('/post/multipart', function(req, res, next) {
  var data = {};
   console.info(req)
  if(req.body.way  === undefined) {
    data = resDataApi(20000,{},'没有传way参数');
  }

  if(req.body.way !== undefined) {
    data = resDataApi(
      10000,
      {
        way: req.body.way
      },
      'ok'
    );
  }

  res.json(data)
});

module.exports = router;
