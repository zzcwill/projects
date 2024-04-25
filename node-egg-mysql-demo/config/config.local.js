'use strict';

module.exports = appInfo => {
  const config = {};

  config.cluster = {
    listen: {
      port: 7002,
    },
  };

  config.mysql = {
    clients: {
      db1: {
        // host
        host: '127.0.0.1',
        // 端口号
        port: '3306',
        // 用户名
        user: 'root',
        // 密码
        password: 'root',
        // 数据库名
        database: 'car-loan',
      },
      // db2: {
      //   // host
      //   host: '127.0.0.1',
      //   // 端口号
      //   port: '3306',
      //   // 用户名
      //   user: 'root',
      //   // 密码
      //   password: 'root',
      //   // 数据库名
      //   database: 'car-loan',
      // },
    },
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false,
  };


  config.redis = {
    client: {
      host: '127.0.0.1',
      port: '6379',
      password: '',
      db: '1',
    },
    agent: true,
  };

  return config;
};
