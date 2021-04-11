var path = require('path');

module.exports = {
	port: 4000,
	cookieSession: {
		name: 'session',
		keys: ['zzc']
	},
  log_dir: path.join(__dirname, '../logs/error'),
  security: {
    secretKey: "zzc",
    // 过期时间 3小时
    expiresIn: 60 * 60 * 24
  },
	// /api以下
	noauthArr: ['/socket']
}