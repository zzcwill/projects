'use strict';
const BaseController = require('../../core/base_controller');

class ApiUserController extends BaseController {
  async login() {
    const { ctx, app } = this;
    const { name, password } = ctx.request.body;

    if(name === '') {
      ctx.body = ctx.resfail(20000,'用户名不能为空')
      return      
    }

    if(password === '') {
      ctx.body = ctx.resfail(20000,'账号密码不能为空')
      return      
    }    

    if(ctx.session.sessionId) {
      ctx.body = ctx.resfail(20000,'已经登录')
      return
    }

    const existUser = await ctx.service.user.getUserByLoginName(name)

    // 用户不存在
    if (!existUser) {
      ctx.body = ctx.resfail(20000,'用户不存在')
      return
    }

    // console.info(existUser)

    // TODO: change to async compare
    const equal = ctx.helper.passwordCompare(password, existUser);
    // 密码不匹配
    // if (!equal) {
    if (equal) {  
      ctx.body = ctx.resfail(20000,'密码不对')
      return
    }    

    ctx.session.sessionId = existUser;
    // await app.redis.set('sessionId', name, 'EX', 60 * 10);

    ctx.body = ctx.resok(existUser)
  }
  async logout() {
    const { ctx } = this;

    ctx.session.sessionId = '';

    ctx.body = ctx.resok('','退出成功')
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

module.exports = ApiUserController;
