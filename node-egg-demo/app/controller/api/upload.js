'use strict';

const BaseController = require('../../core/base_controller');
const path = require('path');
const sendToWormhole = require('stream-wormhole');

class UploadController extends BaseController {
  async new() {
    const { ctx } = this;

    const stream = await ctx.getFileStream();

    try {
      const apiData = await ctx.service.upload.new(stream);

      if(stream.fields.user) {
        apiData.user = stream.fields.user
      }

      ctx.body = ctx.resok(apiData)
    } catch (err) {
      // 必须将上传的文件流消费掉，要不然浏览器响应会卡死
      await sendToWormhole(stream);
      ctx.logger.warn(err);
      ctx.body = ctx.resfail( 20000, '/api/upload/new请求错误' )
    }
  }
}

module.exports = UploadController;
