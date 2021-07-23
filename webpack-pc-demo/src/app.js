import "@babel/polyfill";

import "./fonts/iconfont.less";
import "./less/index.less";

import _ from "lodash";

import { add } from "@/utils/common"

// webpack引入jquery
$.ajax({
	type:"get",
	url:"/api/topics",
	data:{
		tab : 'job',
	},
	dataType:"json",
	success:function(res){
		console.log(res);				
	},
	error:function(){
	}
});

let data = add(1, 2)

let isNum = _.isNumber(data)

console.info(isNum)