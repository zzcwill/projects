'use strict';

// 接口code
// 10000  调用成功
// 20000  调用失败

exports.resok = (data, msg = '调动成功') => {
	return {
		code: 10000,
		data: data,
		message: msg,
	};
}

exports.resfail = (code, msg = '调用失败') => {
	return {
		code,
		data: '',
		message: msg,
	};
}
