var qs = require('qs');
var axios = require('axios');

var { resDataApi } = require('../extend/api');


module.exports = {
	getdata: async function (req, res) {
		var data = {};

		var apidata = await axios({
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
				// 'Content-Type': 'application/json',
				// 'Content-Type': 'multipart/form-data'
			},
			method: 'post',
			url: 'http://pre-cls.fincs.net/api/login',
			data: {
				userName: '18088888888',
				password: '123456a'
			},
			transformRequest: [function(data) {
				if (data && data.type && data.type === 'file') {
					data = data.data
				} else {
					data = qs.stringify(data)
				}
				return data
			}]
		});

		if (apidata.data.code !== 10000) {
			data = resDataApi(20000, {}, apidata.data.message);
		}

		if (apidata.data.code === 10000) {
			data = resDataApi(
				10000,
				apidata.data.data,
				apidata.data.message || 'ok'
			);
		}
		res.json(data)
	}
}