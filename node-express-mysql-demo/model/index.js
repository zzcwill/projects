var path = require('path');
var mongoose = require('mongoose');
var config = require('config-lite')(path.join(__dirname,'../'));
var logger = require('../extend/logger')

mongoose.connect(config.mongoConfig.client.url,{
  poolSize: 20,
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
}, function (err) {
  console.info('db connect')
  if (err) {
    logger.error('connect to %s error: ', config.mongoConfig.client.url, err.message);
    process.exit(1);
  }
});

// models
require('./user');
require('./topic');

exports.User         = mongoose.model('User');
exports.Topic        = mongoose.model('Topic');
