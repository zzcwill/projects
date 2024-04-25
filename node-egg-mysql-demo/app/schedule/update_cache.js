'use strict';

const Subscription = require('egg').Subscription;

class UpdateCache extends Subscription {
  // 通过 schedule 属性来设置定时任务的执行间隔等配置
  static get schedule() {
    return {
      interval: '30m',
      // cron: '* */30 * * * *',
      type: 'worker',
    };
  }

  // subscribe 是真正定时任务执行时被运行的函数
  async subscribe() {
    const { ctx } = this;
    ctx.app.cache.now = ctx.helper.moment().format('LTS');
    console.info(ctx.app.cache);
  }
}

module.exports = UpdateCache;
