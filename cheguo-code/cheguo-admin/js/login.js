$(function() {
	//登录的话自动跳转
	function isCanAutoJump() {
		$.ajax({
			url: '/user/session/get',
			type: "POST",
			dataType: "json",
			success: function(data, textStatus, jqXHR) {
				if (data.code === 10000) {
					return location.href = "./main.html";
				}
			}
		});		
	}
	isCanAutoJump();  

  $.ajax({
      url: '/getSystemName',
  	type: "GET",
  	dataType: "json",
  	success: function(data, textStatus, jqXHR) {
  		if (typeof data === "string") {
  			data = JSON.parse(data);
  		}
        var o = data.data;
        if (o){
            if (o.systemName === "shengan") {
                $(".logopanel h1").html("晟安");
                $(".m-t-md").html("登录晟安系统");
                document.title = '晟安-后台管理'
            } else if(o.systemName === "cherong"){
                $(".logopanel h1").html("车融");
                $(".m-t-md").html("登录车融系统");
                document.title = '车融-后台管理'
            } else {
                $(".logopanel h1").html("车贷");
                $(".m-t-md").html("登录车贷系统");
                document.title = '车贷'
            }
        }
  	}
  });
  return $("#loginBtn").click(function() {
    return $.ajax({
      url: "/login",
      type: "POST",
      data: $("#loginForm").values(),
      success: function(res) {
        if (res["code"] === 10000) {
        	return location.href = "main.html";
        } else if (res['code'] === 20000) {
        	$('#errInfo').html(res['message']);
        	return $("#loginError").modal("show");
        }
      }
    });
  });
});
