var express = require('express');
var router = express.Router();

var api = require('../controller/api');

var socket = require('../controller/socket');

var csurf = require('csurf');
var csurfProtection = csurf({ cookie: true });
var csurfApi = require('../controller/csurfApi');

//接口测试
router.get('/get', api.get);
router.post('/post/json', api.postjson);
router.post('/post/from', api.postfrom);

//socket
router.get('/socket', socket.serversend);

//防csrf攻击
router.get('/csurf', csurfProtection, csurfApi.get);


module.exports = router;
