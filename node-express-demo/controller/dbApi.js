var { resDataApi } = require('../extend/api');
var { Topic } = require('../model');
var logger = require('../extend/logger');

module.exports = {
	add: async function (req, res, next) {
		var topic = new Topic({ 
			title: 'zzc',
			content: 'youxi',
			content_is_html: true,
			tab: 'tab'
		});

		var topicData = await topic.save();

		res.json(resDataApi(10000,{
			data: topicData
		},'ok'))
	},
	delete: async function (req, res, next) {
		var query = { _id: '5ef9b19060d8f848d10f36a2' };
		var data = await Topic.deleteOne(query);
		
		if(data.n === 1) {
			res.json(resDataApi(10000,{
				state: data.n
			},'ok'))			
		}

		if(data.n === 0) {
			res.json(resDataApi(20000,{
				state: data.n
			},'ok'))			
		}		
	},
	update: function (req, res, next) {
		var data = {};

		res.json(data)
	},
	search: function (req, res, next) {
		var data = {};

		res.json(data)
	},		
}