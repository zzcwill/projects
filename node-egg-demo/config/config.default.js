'use strict';

module.exports = appInfo => {
  const config = {};

  config.keys = appInfo.name + '_1585114634462_7124';
  config.maxAge = 4 * 3600 * 1000;

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
    'robot',
    'gzip',
  ];
  config.robot = {
    ua: [
      /Baiduspider/i,
    ],
  };
  config.gzip = {
    threshold: 1024, // 小于 1k 的响应体不压缩
  };

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
    key: 'token',
    // maxAge: 24 * 3600 * 1000, // 1 天
    maxAge: 4 * 3600 * 1000,
    httpOnly: true,
    encrypt: true,
  };


  return config;
};
