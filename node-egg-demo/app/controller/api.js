'use strict';
const Controller = require('../core/base_controller');

class HomeController extends Controller {
  async login() {
    const { ctx, app } = this;
    const { name } = ctx.request.body;

    if(ctx.session.sessionId) {
      ctx.body = ctx.resfail(20000,'已经登录')
      return
    }

    ctx.session.sessionId = name;
    // await app.redis.set('sessionId', name, 'EX', 60 * 10);

    ctx.body = ctx.resok(name)
  }
  async logout() {
    const { ctx } = this;

    ctx.session.sessionId = '';

    ctx.body = ctx.resok()
  }  
  async userinfo() {
    const { ctx } = this;

    const sessionId = ctx.session.sessionId;

    if (!sessionId) {
      ctx.logger.warn('api/userinfo请求错误');
      ctx.body = ctx.resfail(20000, '未登录');
      return;
    }

    ctx.body = ctx.resok(sessionId)
  }
}

module.exports = HomeController;
