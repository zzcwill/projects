var mailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

var { resDataApi } = require('../extend/api');

module.exports = {
	send: async function (req, res, next) {
		var option = {
				'host': 'smtp.qq.com',
				'port': 465,
				'auth': {
					'user': '841811316@qq.com',
					'pass': 'test'
				},
				'ignoreTLS': true		
		}
		var transporter = mailer.createTransport(smtpTransport(option));

    var from = 'express-demo<841811316@qq.com>';
    var to = '377950622@qq.com';
    var subject = 'express-demo';
		var html = '<p>您好：' + 'zzc' + '</p>';
		
		var data = await transporter.sendMail({
			from,
			to,
			subject,
			html,
		});

		if(data) {
			res.json(resDataApi(10000,{},'邮件-发送成功'))			
		}
	}
}