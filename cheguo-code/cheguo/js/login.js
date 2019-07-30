$(function() {
	$.ajax({
		url: interUrl.basic + interUrl.user.getUser,
		type: "POST",
		dataType: "json",
		success: function(data, textStatus, jqXHR) {
			if (typeof data === "string") {
				data = JSON.parse(data);
			}
			if (data.code === 10000) {
				return location.href = "./main.html";
			}
		}
	});
	//cherong
	var systemName;
	$.ajax({
		url: interUrl.basic + interUrl.common.getSystemName,
		type: "GET",
		dataType: "json",
		success: function(data, textStatus, jqXHR) {
			if (typeof data === "string") {
				data = JSON.parse(data);
			}
			//$(".navbar-nav img").attr("src", data.data.systemName === "shengan" ? "images/login_logo_shengan.png" : "images/login_logo.jpg");
			//$("#isShengAn p").html(data.data.systemName === "shengan" ? "请扫描二维码下载晟安车贷APP" : "请扫描二维码下载车贷APP");
            systemName = data.data.systemName;
			if (data.data.systemName === "shengan") {
				$("head").append([
					'<link rel="stylesheet" href="./common/css/theme.css">'
				].join(""));
                $(".navbar-nav img").attr("src", "images/login_logo_shengan.png");
                $("#isShengAn p").html("请扫描二维码下载晟安车贷APP");
				document.title = '晟安贷前'
			} else if(data.data.systemName === "cherong"){
                $("head").append([
                    '<link rel="stylesheet" href="./common/css/theme_cherong.css">'
                ].join(""));
                $(".navbar-nav img").attr("src", "images/login_logo_cherong.png");
                $("#isShengAn p").html("请扫描二维码下载车融网APP");
                document.title = '车融贷前'
            } else {
				$(".chedaiLoginImg").removeClass("hide");
                $(".navbar-nav img").attr("src","images/login_logo.png");
                $("#isShengAn p").html("请扫描二维码下载车贷APP");
				$("#chedaiImg, #tel").removeClass("hide");
			}
		}
	});
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
	$("#loginBtn").click(function() {
		$.ajax({
			url: interUrl.basic + interUrl.user.login,
			type: "POST",
			data: $("#loginForm").values(),
			success: function(res) {
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

	$("#switch").click(function() { //登录二维码切换
		$(this).toggleClass('code');
		var code = $(this).attr('class');
		if (code == 'code') {
			$(".login_box").addClass('hide').next(".codeBox").removeClass('hide');
			if (systemName === "default") {
				$(".signinpanel form").css("background", "rgba(75, 75, 75, 0.6)");
            }

		} else {
			$(".login_box").removeClass('hide').next(".codeBox").addClass('hide');
            if (systemName === "default") {
                $(".signinpanel form").css("background", "#fff");
            }
		}
	});
	$(".check i").click(function() {
		var code = $(this).attr('class');
		if (code == null || code == '') {
			$(this).addClass('cancel').attr('index', '1');
		} else if (code == 'cancel') {
			$(this).removeClass('cancel').attr('index', '0');
		}
	});
	$("input[name=password]").keydown(function(event){
        if (event.keyCode == "13") {
            $("#loginBtn").trigger("click");
		}
	})
});
