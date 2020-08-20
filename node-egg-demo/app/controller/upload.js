'use strict';

const Controller = require('../core/base_controller');
const path = require('path');
const sendToWormhole = require('stream-wormhole');

class UploadController extends Controller {
  async new() {
    const { ctx } = this;

    const stream = await ctx.getFileStream();

    if(stream.fields.user === 'zzc') {
      console.info(stream.fields)
    }

    try {
      const data = await ctx.service.upload.new(stream);

      if(stream.fields.user) {
        data.user = stream.fields.user
      }

      this.success(data);
    } catch (err) {
      // 必须将上传的文件流消费掉，要不然浏览器响应会卡死
      await sendToWormhole(stream);
      ctx.logger.warn(err);
      this.fail(20000, '/api/upload/new请求错误');
    }
  }
}

module.exports = UploadController;
