'use strict';

// const Controller = require('egg').Controller;
const Controller = require('../core/base_controller');

class NewsController extends Controller {
  async list() {
    const ctx = this.ctx;
    const page = ctx.query.page || 1;
    // const data = await ctx.service.news.list(page);
    await this.ctx.render('news/list.tpl');
  }
  async add() {
    const { ctx, service } = this;

    if (ctx.request.body.content === '1') {
      ctx.logger.warn('news/add请求错误');
      this.fail(20000, 'news/add请求参数错误');
      return;
    }

    // 组装参数
    const time = (new Date()).getTime();
    const req = Object.assign(ctx.request.body, { time });
    // 调用 Service 进行业务处理
    const res = await service.news.add(req);
    // 设置响应内容和响应状态码
    this.success(res);
  }
}

module.exports = NewsController;
