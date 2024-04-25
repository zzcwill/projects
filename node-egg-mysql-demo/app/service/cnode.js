'use strict';

const Service = require('egg').Service;

class CnodeService extends Service {
  async list(reqData) {
    const { config } = this;
    const { serverUrl } = config.cnodePage;
    const { page, pageSize, tab } = reqData;

    // use build-in http client to GET hacker-news api
    const cnodeData = await this.ctx.curl(`${serverUrl}/topics`, {
      data: {
        page,
        limit: pageSize,
        tab,
      },
      method: 'GET',
      dataType: 'json',
    });
    return cnodeData.data.data;
  }
}

module.exports = CnodeService;
