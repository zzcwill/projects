var { resDataApi } = require('../extend/api');
var { Topic } = require('../model');
var logger = require('../extend/logger');
var _ = require('lodash');
var uuid = require('uuid');

module.exports = {
	add: async function (req, res, next) {
		var topic = new Topic({ 
			title: 'zzc-' + uuid.v1(),
			content: 'youxi',
			content_is_html: true,
			tab: 'tab'
		});

		var topicData = await topic.save();
		var topicData2 = topicData.toObject();
		topicData2.create_at = topicData.create_at_ago();

		res.json(resDataApi(10000,{
			data: topicData2
		},'ok'))
	},
	delete: async function (req, res, next) {
		var findOneData = await Topic.findOne();

		if(findOneData === null) {
			res.json(resDataApi(20000,{
			},'未找到数据'));
			return;
		}

		var query = { _id: findOneData._id};
		var data = await Topic.deleteOne(query);

		if(data.n === 0) {
			res.json(resDataApi(20000,{
				state: data.n
			},'删除失败'))			
		}

		if(data.n === 1) {
			res.json(resDataApi(10000,{
				state: data.n
			},'ok'))			
		}		
	},
	update: async function (req, res, next) {
		var findOneData = await Topic.findOne();

		if(findOneData === null) {
			res.json(resDataApi(20000,{
			},'未找到数据'))
			return;
		}

		var query = { title: 'update' + uuid.v1()};
		var data = await Topic.updateOne(query).exec();

		if(data.n === 1) {
			res.json(resDataApi(10000,{
				state: data.n
			},'ok'))			
		}
	},
	search: async function (req, res, next) {
		var page = 1;
		var limit = 100;
		var keyword = 'zzc';
    var query = { title: { $regex: new RegExp(keyword, 'i') } };
    var opts = { skip: (page - 1) * limit, limit: limit, sort: '-create_at' };

		var data = await Topic.find(query, '_id', opts).exec();
		res.json(resDataApi(10000,{
			list: data,
			total: data.length
		},'ok'))
	},		
}