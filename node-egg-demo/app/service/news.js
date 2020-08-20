'use strict';

const Service = require('egg').Service;

class NewsService extends Service {
  async list(page = 1) {
    // read config
    const { serverUrl, pageSize } = this.config.news;

    // use build-in http client to GET hacker-news api
    const newsList = await this.ctx.curl(`${serverUrl}/topics`, {
      data: {
        page,
        limit: pageSize,
        tab: 'ask',
      },
      method: 'GET',
      dataType: 'json',
    });
    return newsList.data.data;
  }
  async add(obj) {

    // use build-in http client to GET hacker-news api
    const data = obj;
    return data;
  }
}

module.exports = NewsService;
