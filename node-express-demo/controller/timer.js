var schedule = require('node-schedule');

var { resDataApi } = require('../extend/api');

var timercounter = 0
var timer = null;

module.exports = {
	start: function (req, res, next) {
		if(timer) {
			res.json(resDataApi(20000,{
				timercounter: timercounter
			},'定时器已经启动'))
			return
		}

		timer = schedule.scheduleJob('2 * * * * *', function(){    
			timercounter++; 
			console.log('接口启动定时器：' + timercounter);
		});
		res.json(resDataApi(10000,{
			timercounter: timercounter
		},'定时器启动'))		
	},
	end: function (req, res, next) {
		if(timer === null) {
			res.json(resDataApi(20000,{
				timercounter: timercounter
			},'定时器未启动'))
			return
		}

		timer.cancel();
		timer =  null;
		res.json(resDataApi(10000,{
			timercounter: timercounter
		},'取消定时器成功'))
	}
}