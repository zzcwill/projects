'use strict';
const Controller = require('../core/base_controller');

class HomeController extends Controller {
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
