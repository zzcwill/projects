var express = require('express');
var router = express.Router();

var api = require('../controller/api');
var code = require('../controller/code');
var uploadLoad = require('../middleware/upload');
var upload = require('../controller/upload');
var getdata = require('../controller/getdata');

var timer = require('../controller/timer');
var email = require('../controller/email');
var crawler = require('../controller/crawler');

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

//定时器
router.get('/timer/start', timer.start);
router.get('/timer/end', timer.end);

//发送邮件
router.get('/email', email.send);

//爬虫第三方页面
router.get('/crawler', crawler.get);

module.exports = router;
