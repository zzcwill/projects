var svgCaptcha = require('svg-captcha');
var { resDataApi } = require('../extend/api');

module.exports = {
	code: function (req, res) {
		var option = {
			size: 4, // 验证码长度
			ignoreChars: '0o1ilI', // 验证码字符中排除 0o1i
			noise: 2, // 干扰线条的数量
			color: true, // 验证码的字符是否有颜色，默认没有，如果设定了背景，则默认有
			background: '#fff' // 验证码图片背景颜色 
		}
		var captcha = svgCaptcha.create(option);
		req.session.captcha = captcha.text;
		
		res.type('svg');
		res.send(captcha.data);
	},
	getcode:function (req, res) {
		res.send(req.session.captcha);
	}
}