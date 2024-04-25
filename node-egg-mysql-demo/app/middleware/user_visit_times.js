'use strict';

const moment = require('moment');

module.exports = limit => {
  return async function(ctx, next) {
    const realIP = ctx.ip;

    const YYYYMMDD = ctx.helper.moment().format('YYYYMMDD');
    const key = `user_count_${realIP}_${YYYYMMDD}`;

    const count = (await ctx.service.cache.get(key)) || 0;

    await ctx.service.cache.incr(key, 60 * 60 * 24);

    if (count >= limit) {
      ctx.body = ctx.resfail(20000, `当前用户，当前接口访问，超出每天限制次数${limit}`);
      return;
    }

    await next();
  };
};

