'use strict';
const BaseController = require('../../core/base_controller');

class PageLoginController extends BaseController {
  async index() {
    const { ctx } = this;

    ctx.body = 'egg-node-web';
  }
  
  async login() {
    const { ctx } = this;
    await ctx.render('login/login.html');
  }  
}

module.exports = PageLoginController;
