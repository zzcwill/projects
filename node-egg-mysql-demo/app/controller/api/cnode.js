'use strict';

const BaseController = require('../../core/base_controller');

class CnodeController extends BaseController {
  async list() {
    const { ctx, config } = this;
    let { page, pageSize, tab } = ctx.request.body;

    if (page === undefined) {
      page = config.cnodePage.page;
    }

    if (pageSize === undefined) {
      pageSize = config.cnodePage.pageSize;
    }

    if (pageSize === undefined) {
      ctx.body = ctx.resmiss('tab');
      return;
    }

    if (tab === undefined) {
      ctx.body = ctx.resmiss('tab');
      return;
    }

    if (tab === '') {
      ctx.body = ctx.resfail(20000, 'tab不能为空');
      return;
    }

    const reqData = {
      page,
      pageSize,
      tab,
    };

    const apiData = await ctx.service.cnode.list(reqData);

    ctx.body = ctx.resok(apiData);
  }
}

module.exports = CnodeController;
