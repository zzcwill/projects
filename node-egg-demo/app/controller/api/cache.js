'use strict';
const BaseController = require('../../core/base_controller');


class CacheController extends BaseController { 
  async visit() {
    const { ctx, app} = this;
    const { config } = app;
    
    const realIP = ctx.ip;

    const YYYYMMDD = ctx.helper.moment().format('YYYYMMDD');
    const key = `user_count_${realIP}_${YYYYMMDD}`;
    let count = (await ctx.service.cache.get(key)) || 0;

    let resData = {
      count: count,
      limit: config.userVisitTimes.max
    }
 
    ctx.body = ctx.resok(resData)
  }
}

module.exports = CacheController;
