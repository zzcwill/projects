'use strict';

// const Controller = require('egg').Controller;
const Controller = require('../core/base_controller');

class MysqlController extends Controller {
  async userlist() {
    const { ctx, service } = this;

    let { page, pageSize } = ctx.request.query;

    page = page * 1;
    pageSize = pageSize * 1;

    const data = {
      page,
      pageSize,
    };
    // 调用 Service 进行业务处理
    try {
      const res = await service.mysql.userlist(data);
      this.success(res);
    } catch (err) {
      ctx.logger.warn(err);
      this.fail(20000, '/api/mysql/userlist请求错误');
    }
  }
  async userlist2() {
    const { ctx, service } = this;

    const { level, phone } = ctx.request.body;

    const data = {
      level,
      phone,
    };

    // 调用 Service 进行业务处理
    try {
      const res = await service.mysql.userlist2(data);
      this.success(res);
    } catch (err) {
      ctx.logger.warn(err);
      this.fail(20000, '/api/mysql/userlist请求错误');
    }
  }
}

module.exports = MysqlController;
