import "@babel/polyfill";

import "./fonts/iconfont.less";
import "./less/index.less";

import $_ from "lodash";

//测试jquery
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
jquery2('.demo').css('border-color','#eee')

//测试lodash
let data = {
	a: 'app',
}
let outData = $_.pick(data,['a'])
console.log(`${outData.a}`);