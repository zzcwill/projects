var config = global.config;
var Redis = require('ioredis');
var logger = global.help.logger;

var client = new Redis({
  port: config.redisConfig.client.port,
  host: config.redisConfig.client.host,
  db: config.redisConfig.client.db,
  password: config.redisConfig.client.password,
});

client.on('error', function (err) {
  if (err) {
    logger.error('connect to redis error, check your redis config', err);
    process.exit(1);
  }
})

// console.info('connect to redis')

module.exports = client;

 