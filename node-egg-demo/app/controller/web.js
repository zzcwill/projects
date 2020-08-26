'use strict';
const Controller = require('../core/base_controller');

class PageController extends Controller {
  async index() {
    const { ctx } = this;

    console.info(ctx.query.name)
    if (!ctx.query.name) {
      ctx.body = 'egg-node-web';
    }    

    if (ctx.query.name) {
      ctx.body = 'egg-node-web' + '-' + ctx.query.name;
    }
  }
}

module.exports = PageController;
