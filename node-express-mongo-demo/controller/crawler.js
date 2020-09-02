var cheerio = require('cheerio');
// var qs = require('qs');
var axios = require('axios');

var { resDataApi } = require('../extend/api');

module.exports = {
	get: async function (req, res, next) {
		var apidata = await axios({
			method: 'get',
			url: 'http://pre-cls.fincs.net/view/index.html',
			data: {
			},
		});

		if(apidata.data) {
			var $ = cheerio.load(apidata.data)
			res.json(resDataApi(10000,{
				src: `http://pre-cls.fincs.net/view/${$('.fixedLogoImg').attr('src')}`
			},'获取百度图片成功'))			
		}
	}
}