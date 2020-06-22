var express = require('express');
var router = express.Router();
var path = require('path');
var multer  = require('multer');
var uuid = require('uuid');
var config = require('config-lite')(path.resolve(__dirname, '../'));
var svgCaptcha = require('svg-captcha');

var { resDataApi } = require('../extend/api');
var { getNowDay } = require('../extend/time');

//接口测试-start
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
//接口测试-end

//文件上传-start
//设置保存规则
var storage = multer.diskStorage({
  //destination：字段设置上传路径，可以为函数
  destination: path.resolve(__dirname, '../public/uploads'),
  //filename：设置文件保存的文件名
  filename: function(req, file, cb) {
      var extName = file.originalname.slice(file.originalname.lastIndexOf('.'));
      var fileName = uuid.v1();
      var date = getNowDay();
      cb(null, fileName + '-' + date + extName);
  }
})
//设置过滤规则（可选）
var imageFilter = function(req, file, cb){
  var acceptableMime = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif']
  //微信公众号只接收上述四种类型的图片
  if(acceptableMime.indexOf(file.mimetype) !== -1){
      cb(null, true)
  }else{
      cb(null, false)
  }
}
//设置限制（可选）
var imageLimit = {
  fieldSize: '2MB'
}
//创建 multer 实例
var imageUploader = multer({ 
  storage: storage,
  fileFilter: imageFilter,
  limits: imageLimit
}).single('file', 12)    //定义表单字段、数量限制
router.post('/post/multipart', imageUploader,function(req, res, next) {
  var data = {};

  if(req.file  === undefined) {
    data = resDataApi(20000,{},'没有上传图片');
  }

  if(req.file  !== undefined) {
    data = resDataApi(
      10000,
      {
        date: getNowDay(),
        filename: req.file.filename,
        originalname: req.file.originalname,
        url: `${config.hostname}:${config.port}${config.uploadsUrl}${req.file.filename}`,
        way: req.body.way
      },
      'ok'
    );
  } 

  res.json(data)
});
//文件上传-end

//图形验证码-start
router.get('/captcha', function (req, res) {
  var captcha = svgCaptcha.create();
  req.session.captcha = captcha.text;
  
  res.type('svg');
  res.send(captcha.data);
});
//图形验证码-end

module.exports = router;
