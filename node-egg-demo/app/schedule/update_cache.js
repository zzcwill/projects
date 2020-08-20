'use strict';

const Subscription = require('egg').Subscription;
const moment = require('moment');

class UpdateCache extends Subscription {
  // 通过 schedule 属性来设置定时任务的执行间隔等配置
  static get schedule() {
    return {
      // interval: '2s',
      type: 'all',
      cron: '*/2 * * * * *',
    };
  }

  // subscribe 是真正定时任务执行时被运行的函数
  async subscribe() {
    const { ctx } = this;
    ctx.app.cache = moment().format('LTS');
  }
}

module.exports = UpdateCache;
