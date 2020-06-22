var express = require('express');
var router = express.Router();

var api = require('../controller/api');
var code = require('../controller/code');
var uploadLoad = require('../middleware/upload');
var upload = require('../controller/upload');
var getdata = require('../controller/getdata');

//接口测试
router.get('/get', api.get);
router.post('/post/json', api.postjson);
router.post('/post/from', api.postfrom);

//文件上传
router.post('/post/multipart', uploadLoad.imageUploader, upload.postmultipart);

//图形验证码
router.get('/code', code.code);
router.get('/getcode', code.getcode);

//请求第三方数据
router.get('/getdata', getdata.getdata);


module.exports = router;
