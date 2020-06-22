var express = require('express');
var router = express.Router();
// var path = require('path');
// var multer  = require('multer');
// var uuid = require('uuid');
// var config = require('config-lite')(path.resolve(__dirname, '../'));
// var { resDataApi } = require('../extend/api');
// var { getNowDay } = require('../extend/time');

var api = require('../controller/api');
var code = require('../controller/code');
var uploadLoad = require('../middleware/upload');
var upload = require('../controller/upload');

//接口测试
router.get('/get', api.get);
router.post('/post/json', api.postjson);
router.post('/post/from', api.postfrom);

//文件上传
router.post('/post/multipart', uploadLoad.imageUploader, upload.postmultipart);

//图形验证码
router.get('/code', code.code);
router.get('/getcode', code.getcode);

module.exports = router;
