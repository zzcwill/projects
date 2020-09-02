var path = require('path');

module.exports = {
	mongoConfig:{
    client: {
			url: 'mongodb://root:root@127.0.0.1:27017/cnode2?authSource=admin',
      // host
      host: '127.0.0.1',
      // 端口号
      port: '27017',
      // 用户名
      user: 'root',
      // 密码
      password: 'root',
      // 数据库名
      database: 'cnode2',
    },
	},
	mysqlConfig: {
    client: {
      host:'127.0.0.1',
      port:'3306',    
      user:'root',
      password:'root',
      database: 'yf_shop'     
    }
	},
	redisConfig: {
    client: {
      host: '127.0.0.1',
      port: 6379,
      password: '',
      db: '0',
    }
  }
}