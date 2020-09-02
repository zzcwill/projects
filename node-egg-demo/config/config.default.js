'use strict';

module.exports = appInfo => {
  const config = {};

  config.keys = appInfo.name + '_1585114634462_7124';
  config.maxAge = 6 * 3600 * 1000;

  config.view = {
    defaultViewEngine: 'nunjucks',
    mapping: {
      '.tpl': 'nunjucks',
    },
  };

  config.news = {
    pageSize: 2,
    serverUrl: 'https://cnodejs.org/api/v1',
  };

  // add your middleware config here
  config.middleware = [
  ];

  config.security = {
    csrf: {
      // 判断是否需要 ignore 的方法，请求上下文 context 作为第一个参数
      ignore: ctx => {
        if (ctx.request.url.indexOf('/api') !== -1) {
          return true;
        }
        return false;

      },
    },
  };

  config.multipart = {
    mode: 'stream',
    uploadFileDir: '/app/public/upload_img/',
    uploadFileDirOut: '/public/upload_img/'
  };

  config.cluster = {
    listen: {
      port: 7001,
    },
  };

  config.logger = {
    outputJSON: true,
  };

  config.session = {
    key: 'sessionId',
    // maxAge: 24 * 3600 * 1000, // 1 天
    maxAge: 6 * 3600 * 1000,
    httpOnly: true,
    encrypt: true,
    renew: true
  };

  config.cnodePage = {
    page: 1,
    pageSize: 10,
    serverUrl: 'https://cnodejs.org/api/v1',
  }

  config.userVisitTimes = {
    max: 5
  }

  return config;
};
