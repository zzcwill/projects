var path = require('path');
var Sequelize = require('sequelize');
var config = require('config-lite')(path.resolve(__dirname, '../'));
var sequelize = new Sequelize(
	config.mysqlConfig.client.database, 
	config.mysqlConfig.client.user, 
	config.mysqlConfig.client.password, 
	{
		'dialect': 'mysql',  // 数据库使用mysql
		'host': config.mysqlConfig.client.host, // 数据库服务器ip
		'port': config.mysqlConfig.client.port,        // 数据库服务器端口
		'define': {
			// 字段以下划线（_）来分割（默认是驼峰命名风格）
			'underscored': true
		},
    'pool': {
			max: 5,
			min: 0,
			idle: 10000
		}
	}
);

sequelize
  .authenticate()
  .then(() => {
    console.log('mysql connect')
  })
  .catch(err => {
    console.error('mysql connect is error', err)
  });

module.exports = sequelize;