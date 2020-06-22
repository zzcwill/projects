var axios = require('axios');

var { resDataApi } = require('../extend/api');

// $.ajax({
// 	type:"get",
// 	url:"https://cnodejs.org/api/v1/topics",
// 	data:{
// 		tab : 'job',
// 	},
// 	dataType:"json",
// 	success:function(res){
// 		console.log(res);				
// 	},
// 	error:function(){
// 	}
// });


module.exports = {
	getdata: function (req, res) {

		// var data = axios({
		// 	method: 'get',
		// 	url: 'https://cnodejs.org/api/v1/topics',
		// 	data: {
		// 		tab : 'job',
		// 	}
		// }).then(function(data){
		// 	res.send(data)
		// });
		res.json({
			data: 'ok'
		})
	}
}