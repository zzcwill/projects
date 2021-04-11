var redis  = require('../../redis');
var logger = global.help.logger;

module.exports = {
  get: async (key) => {
    var t = Date.now();
    var data = await redis.get(key);
    if (!data) return '';
    data = JSON.parse(data);
    var duration = (Date.now() - t);
    logger.debug('Cache', 'get', key, (duration + 'ms').green);
    return data;
  },

  set: async (key, value, seconds) =>{
    var t = Date.now();
    value = JSON.stringify(value);
    await redis.set(key, value, 'EX', seconds);
    var duration = (Date.now() - t);
    logger.debug('Cache', 'set', key, (duration + 'ms').green);
  },

  del: async (key) =>{
    var t = Date.now();
    await redis.del(key, 1);
    var duration = (Date.now() - t);
    logger.debug('Cache', 'del', key, (duration + 'ms').green);
  },

  incr :async (key, seconds) => {
    var t = Date.now();
    var result = await redis.multi().incr(key).expire(key, seconds)
      .exec();
    var duration = (Date.now() - t);
    logger.debug('Cache', 'set', key, (duration + 'ms').green);
    return result[0][1];
  }
}
