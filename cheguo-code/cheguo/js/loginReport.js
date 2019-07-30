$(function() {
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
		} else {
			$(".login_box").removeClass('hide').next(".codeBox").addClass('hide');
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
});
