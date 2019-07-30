var swp, user;
systemName = null;
swp = null;

user = null;
retprotUrl = [];
$(function() {
	$.ajax({
		url: '/getSystemName',
		type: "GET",
		dataType: "json",
		success: function(data, textStatus, jqXHR) {
			if (typeof data === "string") {
				data = JSON.parse(data);
			}
			var o = data.data;
            systemName = data.data;
			if (o) {
				if (data.data.systemName === "shengan") {
					$("head").append([
						'<link rel="stylesheet" href="./common/css/theme_shengan.css">',
					].join(""));
					$(".nav-header img").attr("src", './images/logo_shengan.png');
					$("#content-main").addClass("styleShengAn");
					document.title = '晟安-后台管理'
				} else if(data.data.systemName === "cherong"){
					$("head").append([
						'<link rel="stylesheet" href="./common/css/theme_cherong.css">',
					].join(""));
					$(".nav-header img").attr("src", './images/logo_cherong.png');
					$("#content-main").addClass("styleCherong");
					document.title = '车融-后台管理'
				} else {
					$(".nav-header img").attr({"width": "50%", "src": 'images/logo.png'});
					$("#icon_title img").attr("src", 'images/icon_title.png');
					$("#content-main").removeClass("styleCR styleCRW");
				}
			}
		}
	});
	$.ajax({
		url: '/za/menu/menuList',
		type: "POST",
		dataType: "json",
		data: {
			st: 'CLS_ADMIN_WEB'
		},
		success: function(data, textStatus, jqXHR) {
			console.log(data)
			if (typeof data === "string") {
				data = JSON.parse(data);
			}
			var o = data.data;
			if (o) {
				initMenu(o);
			}
		}
	});
  $.ajax({
    url: "/user/session/get",
    type: "POST",
    dataType: "json",
    success: function(data, textStatus, jqXHR) {
      if (typeof data === "string") {
        data = JSON.parse(data);
      }
      if (data.code === 30000) {
        return location.href = "/page/index.html";
      } else {
        user = data.data;
        $("#uid").val(data.data.uid);
        return $("#userName").text(data.data.realname);
      }
    }
  });
	initMenu = function(data) {
		var itemLi, menu, ulNav;
		ulNav = ['second', 'third'];
		itemLi = function(o, level, k) {
			var ref;
			if (! ((ref = o.sysMenuList) != null ? ref.length: void 0) > 0) {
				return ["<li><a class='J_menuItem' href='" + o.url + "' data-index='" + o.id + "'>" + o.menuName + "</a>"].join("");
			} else {
				return ["<li>" + "<a>" + ("<i class='fa iconfont " + o.logoTag + "'></i>") + ("<span class='nav-label'>" + o.menuName + "</span>") + "<span class='fa arrow'></span>" + "</a>" + menu(o.sysMenuList, level + 1, k) + "</li>"].join("");
			}
		};
		menu = function(arr, level) {
			var a, i, k, len, o;
			a = [];

			if(arr[arr.length-1]['sysMenuList']){
				$.each(arr[arr.length-1]['sysMenuList'], function(i, item){
					if(item.url.indexOf("?") != -1){
						url = item.url.split("?")[0];
					}else{
						url = item.url;
					}
					retprotUrl.push(url);
				});
			}
			if (level !== 0) {
				a.push("<ul class='nav nav-" + ulNav[level - 1] + "-level collapse'>");
			}
			if (arr.length > 0) {
				for (k = i = 0, len = arr.length; i < len; k = ++i) {
					o = arr[k];
					a.push(itemLi(o, level, k));
				}
			}
			if (level !== 0) {
				a.push("</ul>");
			}
			return a.join("");
		};
		$("#side-menu").append(menu(data, 0));
		$("#side-menu").metisMenu();
		return $(".sidebar-collapse").slimScroll({
			height: "100%",
			railOpacity: .9,
			alwaysVisible: ! 1
		});
	};
  $(".J_tabExit").click(function() {
    return $("#logOut").modal("show");
  });
  $(".J_tabUpdPwd").click(function() {
			//return $("#updPosswordDiv").modal("show");
			menuItemClick.call({title : '修改个人信息', href: systemName.ucServerUrl});
  });
  $("#exitSure").click(function() {
      location.href = systemName.logoutUrl;
  });
  $("#updPwd").click(function() {
	  var uid=$('#uid').val();
	  var oriPassword=$('#oriPassword').val();//原密码
	  var password=$('#password').val();//新密码
	  var confirmPassword=$('#confirmPassword').val();//确认新密码
	  
	  password=password.replace(/\s/gi,'');
	  confirmPassword=confirmPassword.replace(/\s/gi,'');
	  if(oriPassword.length<1 || confirmPassword.length<1){
		  alert('原始密码、新密码都是必填项');
		  return;
	  }
	  
	  if(password.length<6 || password.length>15){
		  alert('请输入6-15位密码');
		  return;
	  }
	  
	  var ret = /^[\w\d\_\-\.]*$/;
	  if(!ret.test(password)){
		alert("密码格式错误，请输入字母、数字、下划线、点、横杠");
	    return;
	  }
		
	  if(password!=confirmPassword){
		  alert('两次密码输入不一致');
		  return;
	  }
	  
	  $.ajax({
		    url: "/updPassWord",
		    data:{
		    	uid : uid,
		    	password : password,
		    	oriPassword : oriPassword
		    },
		    type: "POST",
		    dataType: "json",
		    success: function(data, textStatus, jqXHR) {
		      if (typeof data === "string") {
		    	  data = JSON.parse(data);
		      }
		      if (data.code === 10000) {
		    	  alert('密码修改成功');
		    	  return location.href = "./index.html";
		      }
		      if (data.code === 101) {
		    	  alert('原密码输入错误');
		      }
		    }
	  });
  });
  $("#imageSwitch").on("shown.bs.modal", function() {
    swp = new Swiper('.swiper-container', {
      slidesPerView: 5,
      slidesPerGroup: 5,
      grabCursor: true,
      nextButton: '.swiper-button-next',
      prevButton: '.swiper-button-prev',
      updateOnImagesReady: true,
      keyboardControl: true,
      lazyLoading: true
    });
    return swp.slideTo(18, 1000);
  });
  return $(".swiper-wrapper").on("click", ".swiper-slide", function() {
    var _index;
    _index = $(this).index();
    return $("#imgBig")[0].src = $(this).children("img")[0].src;
  });
});


