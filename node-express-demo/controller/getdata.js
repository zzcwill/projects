var axios = require('axios');

var { resDataApi } = require('../extend/api');


module.exports = {
	getdata: async function (req, res) {
		var data = {};
		var apidata = await axios({
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			method: 'post',
			// url: 'http://pre-cls.fincs.net/api/login',
			url: 'http://192.168.26.9:9000/api/login',
			data: {
				userName: '18088888888',
				password: '123456a'
			}
		});

		console.info(apidata.data)

		if (apidata.code !== 10000) {
			data = resDataApi(20000, {}, apidata.data.message);
		}

		if (apidata.code === 10000) {
			data = resDataApi(
				10000,
				apidata.data,
				apidata.data.message || 'ok'
			);
		}
		res.json(data)
	}
}