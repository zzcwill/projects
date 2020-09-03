var { resDataApi } = require('../extend/api');
var { socketCache } = require('../extend/socket');
var app = require('../app');

module.exports = {
	serversend: function (req, res, next) {
		var data = {
			msg: `服务端发给客户端${socketCache[0]}消息`
		}

		res.json(resDataApi(10000,data,'服务端发送消息成功'))		
	}
}