'use strict';
const Controller = require('../core/base_controller');

class PageController extends Controller {
  async index() {
    const { ctx } = this;

    ctx.body = 'egg-node-web';
  }
  
  async login() {
    const { ctx } = this;
    await ctx.render('login/login.html');
  }  
}

module.exports = PageController;
