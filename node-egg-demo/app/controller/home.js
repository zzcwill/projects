'use strict';
const Controller = require('../core/base_controller');

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    // ctx.body = ctx.session;
    ctx.body = ctx.app.cache;
  }
  async user() {
    const { ctx } = this;

    if (!ctx.query.name) {
      ctx.body = '缺少参数user';
    }

    if (ctx.query.name) {
      ctx.body = 'hi, ' + ctx.query.name;
    }
  }

  async login() {
    const { ctx } = this;
    await ctx.render('login/login.html');
  }
  async apilogin() {
    const { ctx, app } = this;
    const { name } = ctx.request.body;

    ctx.session.token = name;
    await app.redis.set('token', name, 'EX', 60 * 10);
    this.success(name);
  }
  async apiuserinfo() {
    const { ctx } = this;

    const token = ctx.session.token;

    if (!token) {
      ctx.logger.warn('api/userinfo请求错误');
      this.fail(20000, '未登录');
      return;
    }

    this.success(token);
  }
}

module.exports = HomeController;
