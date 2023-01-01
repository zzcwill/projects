var path = require('path');

module.exports = {
	mysqlConfig: {
    client: {
      host:'127.0.0.1',
      port:'3306',    
      user:'root',
      password:'zzc123456',
      database: 'shop'     
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