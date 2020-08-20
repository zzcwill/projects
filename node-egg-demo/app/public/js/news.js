$(function(){
	// $.ajax({
	// 	type:"post",
	// 	url:"/news/add",
	// 	data:{
	// 		title : 'java1',
	// 		content: 'java1',
	// 		_csrf: getCookie("csrfToken")
	// 	},	
	// 	dataType:"json",
	// 	success:function(res){			
	// 	},
	// 	error:function(){
	// 	}
	// });	
	// $.ajax({
	// 	type:"post",
	// 	url:"/api/news/add",
	// 	data:{
	// 		title : 'java2',
	// 		content: 'java2'
	// 	},	
	// 	dataType:"json",
	// 	success:function(res){			
	// 	},
	// 	error:function(){
	// 	}
	// });	
	// $.ajax({
	// 	type:"get",
	// 	url:"/api/mysql/userlist",
	// 	data:{
	// 		page : 1,
	// 		pageSize: '10'
	// 	},	
	// 	dataType:"json",
	// 	success:function(res){	
	// 	},
	// 	error:function(){
	// 	}
	// });	
	// $.ajax({
	// 	type:"post",
	// 	url:"/api/mysql/userlist2",
	// 	data:{
	// 		level : 40,
	// 		phone: '159'
	// 	},	
	// 	dataType:"json",
	// 	success:function(res){
	// 		console.info(res)	
	// 	},
	// 	error:function(){
	// 	}
	// });	
	
	//上传图片1
  $("#upImage1").click(function () {
    $("#upImageInput1").trigger("click");
  });
  $("#upImageInput1").change(function () {
    var formData = new FormData();
		var _this = this;

		formData.append('fileImg', _this.files[0]);
		formData.append('user', 'zzc');

    $.ajax({
        url: "/api/upload/new",
        type:"post",
        data:formData,
        processData: false,
        contentType: false, 
        success: function (res) {
					console.info(res)
        }
    });      
  });	
})

function getCookie(cookie_name) {
	var allcookies = document.cookie;
//索引长度，开始索引的位置
	var cookie_pos = allcookies.indexOf(cookie_name);

	// 如果找到了索引，就代表cookie存在,否则不存在
	if (cookie_pos != -1) {
			// 把cookie_pos放在值的开始，只要给值加1即可
			//计算取cookie值得开始索引，加的1为“=”
			cookie_pos = cookie_pos + cookie_name.length + 1; 
			//计算取cookie值得结束索引
			var cookie_end = allcookies.indexOf(";", cookie_pos);
			
			if (cookie_end == -1) {
					cookie_end = allcookies.length;

			}
			//得到想要的cookie的值
			var value = unescape(allcookies.substring(cookie_pos, cookie_end)); 
	}
	return value;
}