var { resDataApi } = require('../extend/api');

module.exports = {
	get: async function (req, res, next) {
		res.json(resDataApi(10000,{
			data: 'csurf'
		},'csurf-test'))
	}
}