var { resDataApi } = require('../extend/api');

module.exports = {
	get: function (req, res, next) {
		var data = {};

		if (req.query.way === undefined) {
			data = resDataApi(20000, {}, '没有传way参数');
		}

		if (req.query.way !== undefined) {
			data = resDataApi(
				10000,
				{
					way: req.query.way
				},
				'ok'
			);
		}

		res.json(data)
	},
	postjson: function (req, res, next) {
		var data = {};
		if (req.body.way === undefined) {
			data = resDataApi(20000, {}, '没有传way参数');
		}

		if (req.body.way !== undefined) {
			data = resDataApi(
				10000,
				{
					way: req.body.way
				},
				'ok'
			);
		}

		res.json(data)
	},
	postfrom: function (req, res, next) {
		var data = {};
		if (req.body.way === undefined) {
			data = resDataApi(20000, {}, '没有传way参数');
		}

		if (req.body.way !== undefined) {
			data = resDataApi(
				10000,
				{
					way: req.body.way
				},
				'ok'
			);
		}

		res.json(data)
	}
}