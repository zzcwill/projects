var path = require('path');

module.exports = {
	hostname: 'http://127.0.0.1',
	port: 7000,
	cookieSession: {
		keys: ['zzc']
	},
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

	},
	redisConfig: {
    client: {
      host: '127.0.0.1',
      port: 6379,
      password: '',
      db: '0',
    }
  },
  log_dir: path.join(__dirname, '../log4'),
	//上传路径-'/public/uploads/'
	uploadsUrl: '/uploads/'
}