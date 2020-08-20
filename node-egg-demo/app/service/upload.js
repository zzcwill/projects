'use strict';
const Service = require('egg').Service;
const fs = require('fs');
const path = require('path');
const sendToWormhole = require('stream-wormhole');


class UploadService extends Service {
  async new(stream) {
    const { ctx } = this;

    const filename = (new Date()).getTime() + path.basename(stream.filename);
    const target = path.join(this.config.baseDir, `app/public/upload_img/${filename}`);
    const readFileStream = fs.createWriteStream(target);
    stream.pipe(readFileStream);

    return {
      name: filename,
      url: `${ctx.request.header.origin}/public/upload_img/${filename}`,      
    }
  }
}

module.exports = UploadService;
