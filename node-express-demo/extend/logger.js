var path = require('path')
var log4js = require('log4js');
var config = require('config-lite')(path.join(__dirname,'../'));

log4js.configure({
  appenders: { cheese: { type: "file", filename: path.join(config.log_dir, 'cheese.log') } },
  categories: { default: { appenders: ["cheese"], level: "error" } }
});

var logger = log4js.getLogger('cheese');
logger.level = process.env.NODE_ENV !== 'dev' ? 'DEBUG' : 'ERROR'

module.exports = logger;
