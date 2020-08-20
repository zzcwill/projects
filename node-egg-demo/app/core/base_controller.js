'use strict';

const { Controller } = require('egg');
class BaseController extends Controller {
  success(data, msg = '调动成功') {
    this.ctx.body = {
      code: 10000,
      data,
      message: msg,
    };
  }

  fail(code, msg = '调用失败') {
    this.ctx.body = {
      code,
      data: {},
      message: msg,
    };
  }
}
module.exports = BaseController;
