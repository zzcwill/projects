//10000   正常
//20000   错误

var resDataApi = (code,data,msg) => {
	return {
		code: code || 10000,
		data: data || {},
		msg: msg			
	}
}

exports.resDataApi = resDataApi