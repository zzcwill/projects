$(function() {
	//登录的话自动跳转
	function isCanAutoJump() {
		$.ajax({
			url: interUrl.basic + interUrl.user.getUser,
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

	if ($.cookie('userName') == 'null') {
		var name = '';
	} else {
		var name = $.cookie('userName');
	}
	$("input[name=userName]").val(name);
	var addCookie, delCookie;

	function addCookie(a) {
		$.cookie('userName', a, {
			expires: 1
		});
	};

	function delCookie(b) {
		$.cookie('userName', null);
	};
	//shengan
	$.ajax({
		url: interUrl.basic + interUrl.common.getSystemName,
		type: "GET",
		dataType: "json",
		success: function(data, textStatus, jqXHR) {
			if (typeof data === "string") {
				data = JSON.parse(data);
			}
			//$(".navbar-nav img").attr("src", data.data.systemName === "shengan" ? "images/login_logo_shengan.png" : "images/login_logo.jpg");
			//$(".codeBox img").attr("src", data.data.systemName === "shengan" ? "images/code_shengan.png" : "images/code.png");
			if (data.data.systemName === "shengan") {
				$("head").append([
					'<link rel="stylesheet" href="./common/css/theme.css">'
				].join(""));
                $(".navbar-nav img").attr("src", "images/login_logo_shengan.png");
                $(".codeBox img").attr("src", "images/code_shengan.png");
				document.title = '晟安贷后'
			} else if(data.data.systemName === "cherong"){
                $("head").append([
                    '<link rel="stylesheet" href="./common/css/theme_cherong.css">'
                ].join(""));
                $(".navbar-nav img").attr("src", "images/login_logo_cherong.png");
                $(".codeBox img").attr("src", "images/code_cherong.png");
                document.title = '车融贷后'
            } else {
                $(".navbar-nav img").attr("src", "images/login_logo.jpg");
                $(".codeBox img").attr("src", "images/code.png");
				$("#chedaiImg, #tel").removeClass("hide");
			}
		}
	});
	$("#loginBtn").click(function() {
		$.ajax({
			url: interUrl.basic + interUrl.user.login,
			type: "POST",
			data: $("#loginForm").values(),
			success: function(res) {
				console.log("code:"+res["code"])
				var code = $('.check i').attr('index');
				var userName = $("input[name=userName]").val();
				if (code == 1) {
					delCookie(userName);
				} else if (code == 0) {
					addCookie(userName);
				};
				var o;
				if (typeof res === "string") {
					o = JSON.parse(res);
				} else {
					o = res;
				}
				if (o["code"] === 20001) {
					return location.href = "main.html?type=modifyPWD"
				}
				if (o["code"] === 10000) {
					location.href = "main.html";
				} else if (o['code'] === 20000) {
					$('#errInfo').html(res['message']);
					$("#loginError").modal("show");
				}
			}
		});
	});
	/*
	$("#switch").click(function() { //登录二维码切换
		$(this).toggleClass('code');
		var code = $(this).attr('class');
		if (code == 'code') {
			$(".login_box").addClass('hide').next(".codeBox").removeClass('hide');
		} else {
			$(".login_box").removeClass('hide').next(".codeBox").addClass('hide');
		}
	});
	*/
	$(".check i").click(function() {
		var code = $(this).attr('class');
		if (code == null || code == '') {
			$(this).addClass('cancel').attr('index', '1');
		} else if (code == 'cancel') {
			$(this).removeClass('cancel').attr('index', '0');
		}
	});
});
