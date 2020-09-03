var express = require('express');
var router = express.Router();

var socket = require('../controller/socket');

//socket
router.get('/socket', socket.serversend);


module.exports = router;
