const express = require('express');
const router = express.Router();

const controller = require('../controller');
const { socketController } = controller;

router.get('/socket', socketController.get);


module.exports = router;
