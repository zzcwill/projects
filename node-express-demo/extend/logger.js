var path = require('path')
var log4js = require('log4js');

var config = require('config-lite')(path.join(__dirname,'../'));

log4js.configure({
  appenders: [
    { type: 'console' },
    { type: 'file', filename: path.join(config.log_dir, 'cheese.log'), category: 'cheese' }
  ]
});

var logger = log4js.getLogger('cheese');
logger.setLevel(process.env.NODE_ENV !== 'test' ? 'DEBUG' : 'ERROR')

module.exports = logger;
