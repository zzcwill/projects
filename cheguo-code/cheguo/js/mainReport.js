var angle, cache, cardType,  imgArrString, initMenu, swp, swpImage, user;

swp = null;

user = null;

imgArrString = "";

angle = 0;

retprotUrl = [];

cache = {};

cardType = function(v) {
	return ['', '身份证', '军官证', '侨胞证', '外籍人士'][v] || "";
};

$.fn.nameValues = function() {
	var arg;
	arg = arguments[0];
	return $(this).find("[data-name]").each(function(index, item) {
		var key, keySwitch, value;
		key = $(this).data("name");
		keySwitch = $(this).data("formatter");
		if (keySwitch) {
			value = window[keySwitch](arg[key]) || "";
		}
		if (key) {
			return $(item).html(value || arg[key] || "");
		}
	});
};

swpImage = function(o) {
	if(o.title){ $("#dirTitle").text(o.title); }
	return $.ajax({
		url: interUrl.basic + interUrl.gr.getPhoto,
		type: 'post',
		data: {
			loanApplyId: o.loanApplyId,
			dirId: o.dirId,
			releventFlow: o['releventFlow'],
			releventFlowNode: o['releventFlowNode']
		},
		success: function(res) {
			  var arr = [], _index = 0, ref = res.data.loanDocumentList, results = [];
			  for (k = j = 0, len = ref.length; j < len; k = ++j) {
				i = ref[k];
				arr.push(i.filePath);
				if (i.id === o.id) {
				  results.push(_index = k);
				} else {
				  results.push(void 0);
				}
			  }
			  switchImage(arr, _index, 1)

			//$(".guarantor").nameValues(res.data.photoInfo.Guarantor_Info[0]);
			//console.log(res.data.photoInfo.Guarantor_Info);
		    $("#guarantor").html("");
			  if(res.data && res.data.photoInfo && res.data.photoInfo.Guarantor_Info){
				$.each(res.data.photoInfo.Guarantor_Info, function(i, item){
					$("#guarantor").append($("#guarantorTPL").html()).children().eq(i).nameValues(item); 
				});
			  }
			if (res.data.photoInfo && res.data.photoInfo.Customer_Info) {
				$(".customer").show().nameValues(res.data.photoInfo.Customer_Info);
			}else{
			$(".customer").hide();
			}
			if (res.data.photoInfo && res.data.photoInfo.Spouse_Info) {
				$(".spouse").show().nameValues(res.data.photoInfo.Spouse_Info);
			}else{
				$(".spouse").hide();
			}
			/*
			 switchImage(['http://zacdn.cgw360.com/cgw360/cls/loan/2cf1539f-a554-4085-acb2-aac5ad6a08e4.png','http://zacdn.cgw360.com/cgw360/cls/loan/6eaec911-ba58-4992-88c6-45a75d58e2f1.png','http://zacdn.cgw360.com/cgw360/cls/loan/a661304c-753b-4a4d-a058-77d7fbacee83.png','http://zacdn.cgw360.com/cgw360/cls/loan/f432845b-3706-4712-8179-2db073658153.png'], 2, 1);
			*/
		}
	});
};

function switchImage(arr, _index, type){
	if(type == 1){
		$("#picInfo")[0].className = "col-md-4";
		$("#picImage")[0].className = "col-md-8"
	}else{
		$("#picInfo")[0].className = "hide";
		$("#picImage")[0].className = "col-md-12"
	}
	$("#imageSwitch").modal("show")
	$.openPhotoGallery(arr, _index);
}

function curImg(index) { 
	if(index){
		$("#curImg").text(index) 
	}else{
		return parseInt($("#curImg").text());
	}
}
function totalImg(total) { $("#totalImg").text(total); }

initMenu = function(data) {
	var icons, itemLi, menu, ulNav;
	ulNav = ['second', 'third'];
	icons = ['fa-home', 'fa-cogs', 'fa-cubes', 'fa-cubes'];
	itemLi = function(o, level, k) {
		var ref;
		if (! ((ref = o.sysMenuList) != null ? ref.length: void 0) > 0) {
			return ["<li><a class='J_menuItem' href='" + o.url + "' data-index='" + o.id + "'>" + o.menuName + "</a>"].join("");
		} else {
			return ["<li>" + "<a>" + ("<i class='fa " + icons[k] + "'></i>") + ("<span class='nav-label'>" + o.menuName + "</span>") + "<span class='fa arrow'></span>" + "</a>" + menu(o.sysMenuList, level + 1, k) + "</li>"].join("");
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

$(function() {
	initMenu([{
		"menuName": "报表查询",
		"sysMenuList": [{
			"menuName": "大屏展示",
			"url": "./Modal/main/index/signMap.html"
		},
		{
			"menuName": "业务流程统计报表",
			"url": "./Modal/report/businessFlow/index.html"
		},
		{
			"menuName": "贷款费用统计报表",
			"url": "./Modal/report/loanCostFlow/index.html"
		}]
	}
	]);

	$.ajax({
		url: interUrl.basic + interUrl.user.getUser,
		type: "POST",
		dataType: "json",
		success: function(data, textStatus, jqXHR) {
			if (typeof data === "string") {
				data = JSON.parse(data);
			}
			if (data.code === 30000) {
				return location.href = "/loan/index.html";
			} else if (data.code === 20000) {
				$("#dialogTip").nameValues({
					content: data.message
				});
				return $("#dialogTip").modal("show");
			} else {
				user = data.data;
				return $("#userName").text(data.data.realname);
			}
		}
	});
	$.ajax({
		url: interUrl.basic + interUrl.user.menu,
		type: "POST",
		dataType: "json",
		success: function(data, textStatus, jqXHR) {
			if (typeof data === "string") {
				data = JSON.parse(data);console.log(data);
			}
			if (data.code === 30000) {
				return location.href = "/loan/index.html";
			} else if (data.code === 20000) {
				$("#dialogTip").nameValues({
					content: data.message
				});
				return $("#dialogTip").modal("show");
			} else {
				//initMenu(data.data);
			}
		}
	});
	$(".J_tabExit").click(function() {
		return $("#logOut").modal("show");
	});
	return $("#exitSure").click(function() {
		return location.href = "./index.html";
	});
	// 报表菜单加载
	var hrefs = $("#side-menu").find("li"); console.log(hrefs);
	// for (var i = hrefs.length - 1; i >= 0; i--) {
	// 	var href= hrefs[i].sysMenuList('a').attr('href');
	// 	console.log(href+"<br>");
	// };
	// $("#side-menu .nav-header").attr('href', './Modal/main/index/index.html?methods='+href);
});

