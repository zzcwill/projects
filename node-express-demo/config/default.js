var path = require('path');

module.exports = {
	hostname: 'http://127.0.0.1',
	port: 7000,
	cookieSession: {
		keys: ['zzc']
	},
  log_dir: path.join(__dirname, '../log4'),
	//上传路径-'/public/uploads/'
	uploadsUrl: '/uploads/'
}