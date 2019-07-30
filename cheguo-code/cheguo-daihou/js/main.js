var angle, cache, cardType,  imgArrString, initMenu, swp, swpImage, user, recordDocQuery, allImg, imgIds;
systemName = null;
recordDocQuery = null;

imgIds = [];

swp = null;

user = null;

imgArrString = "";

angle = 0;

allImg = [];

retprotUrl = [];

cache = {};
var comn1 = {};
comn1 = {
	user: window.parent.user,
	cache: window.parent.cache,
	addTab: function(o) {
		if (o.href) {
			return window.parent.menuItemClick.call(o);
		}
	},
	getArgs: function() {
		var args, i, item, items, name, qs, value;
		qs = (location.search.length > 0 ? location.search.substring(1) : "");
		items = (qs.length ? qs.split("&") : []);
		args = {};
		i = 0;
		while (i < items.length) {
			item = items[i].split("=");
			name = decodeURIComponent(item[0]);
			value = decodeURIComponent(item[1]);
			if (name.length) {
				args[name] = value;
			}
			i++;
		}
		return args;
	}
};
var args1 = comn1.getArgs();
if (args1["type"] == "modifyPWD") {
	comn1.addTab({
		title: '修改个人信息 ',
		href: './Modal/personalCenter/modifyPassword/modifyPassword.html?type=modifyPWD'
	})
}

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
			value = window[keySwitch](arg[key]) || "--";
		}
		if (key) {
			return $(item).html(value || arg[key] || "--");
		}
	});
};

var a = function toggle() {
	var flag = true;
	function get() {
		return flag = !flag;
	}
	return get;
}();

toggleTopNav = function(){
	$("#topNav").toggleClass("hide")
	var o = {};
	if(a()){
		o['height'] = "calc(100% - 110px)";
	}else{
		o['height'] = "calc(100% - 0px)";
	}
	$("#content-main").css(o);
}

swpImage = function(o) {
	if(o.title){ $("#dirTitle").text(o.title); }
	return $.ajax({
		url: interUrl.basic + interUrl.gr.getPhoto,
		type: 'post',
		data: {
			loanApplyId: o.loanApplyId,
			dirId: o.dirId,
			fileNamespace: o.fileNamespace,
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
			allImg = res.data.loanDocumentList;
			switchImage(arr, _index, 1)

			recordDocQuery = function(ids) {
				$.ajax({
					url: interUrl.basic + interUrl.gr.recordDocQueryHistory,
					type: "post",
					data: {
						loanApplyId: o.loanApplyId,
						dirId: o.dirId,
						fileNamespace: o.fileNamespace,
						releventFlow: o['releventFlow'],
						releventFlowNode: o['releventFlowNode'],
						docIds: ids
					},
					success: function(res){
						if(res.code == 20000){return comn.tip({content: res.message || "<code>" + o.url + "</code><br /> 接口异常！！！"})};
						if(typeof(o.callback == "function")){
							imgIds = [];
							o.callback(ids);
						}
					}
				});
			}
			if(res.data.loanDocumentList[_index].hasRead == 1){ imgIds.push(res.data.loanDocumentList[_index].id); }

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
			if ((ref2 = res.data.photoInfo) != null ? ref2.Credit_Info : void 0) {
				$(".coBank").show().nameValues(res.data.photoInfo.Credit_Info);
			} else {
				$(".coBank").hide();
			}
			/*
			 *   参数1：图片列表
			 *   参数2：显示图片下标
			 *   参数3：是否显示图片信息(1显示、2不显示)
			 */
			/*
			 switchImage(['http://zacdn.cgw360.com/cgw360/cls/loan/2cf1539f-a554-4085-acb2-aac5ad6a08e4.png','http://zacdn.cgw360.com/cgw360/cls/loan/6eaec911-ba58-4992-88c6-45a75d58e2f1.png','http://zacdn.cgw360.com/cgw360/cls/loan/a661304c-753b-4a4d-a058-77d7fbacee83.png','http://zacdn.cgw360.com/cgw360/cls/loan/f432845b-3706-4712-8179-2db073658153.png'], 2, 1);
			 */
		}
	});
};

function switchImage(arr, _index, type){
	if(type == 1){
		$("#picInfo")[0].className = "col-md-8";
		$("#picImage")[0].className = "col-md-16"
	}else{
		$("#picInfo")[0].className = "hide";
		$("#picImage")[0].className = "col-md-24"
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
	var itemLi, menu, ulNav;
	ulNav = ['second', 'third'];
	itemLi = function(o, level, k) {
		var ref;
		if (! ((ref = o.sysMenuList) != null ? ref.length: void 0) > 0) {
			return ["<li><a class='J_menuItem' href='" + o.url + "' data-index='" + o.id + "'>" + o.menuName + "</a>"].join("");
		} else {
			return ["<li>" + "<a>" + ("<i class='fa iconfont " + o.logoTag + "'></i>") + ("<span class='nav-label'>" + o.menuName + "</span>") + "<span class='fa arrow'></span>" + (o.menuName == '首页' ? '<i class="tip_num" id="tipNumElm"></i>' : '') +"</a>" + menu(o.sysMenuList, level + 1, k) + "</li>"].join("");
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
	if(document.location.href == "http://ht-dh.cheguo.com/view/main.html") document.title = '非资管贷后';
	$("#imageSwitch").on("hide.bs.modal", function(){
		if(imgIds && imgIds.length > 0){
			recordDocQuery(imgIds.join(","));
		}
	});
	//获取消息纪录的条数
	comn.ajax({
		url: interUrl.basic + interUrl.messageRecord.messageWarningCount,
		data: {
			status: 0
		},
		success: function (res) {
			console.log(res)
			if (res.data == 0) {
				$(".icon-xiaoxi").html("");
			}
			else {
				$(".icon-xiaoxi").html(`<span id='messageRemain' class='xiaoxiStyle'>${res.data}</span>`);
			}
		}
	});
	//shengan
	$.ajax({
		url: interUrl.basic + interUrl.common.getSystemName,
		type: "GET",
		dataType: "json",
		success: function(data, textStatus, jqXHR) {
			if (typeof data === "string") {
				data = JSON.parse(data);
			}
      systemName = data.data;
			//$(".nav-header img").attr("src", data.data.systemName === "shengan" ? 'images/logo_shengan.png' : 'images/logo.png');
			//$("#icon_title img").attr("src", data.data.systemName === "shengan" ? 'images/icon_title_shengan.png' : 'images/icon_title.png');
			if (data.data.systemName === "shengan") {
				$("head").append([
					'<link rel="stylesheet" href="./common/css/theme.css">'
				].join(""));
                $(".nav-header img").attr("src", 'images/logo_shengan.png');
                $("#icon_title img").attr("src", 'images/icon_title_shengan.png');
				$("#content-main").addClass("styleCR");
				$("li[for=02]").remove();
				$(".nav-header img").attr("width","100%");
				document.title = '晟安贷后'
			} else if (data.data.systemName === "cherong"){
                $("head").append([
                    '<link rel="stylesheet" href="./common/css/theme_cherong.css">'
                ].join(""));
                $(".nav-header img").attr("src", 'images/logo_cherong.png');
                $("#icon_title img").attr("src", 'images/icon_title_cherong.png');
                $("#content-main").addClass("styleCRW");
                $("li[for=02]").remove();
                $(".nav-header img").attr("width","100%");
                document.title = '车融贷后'
            } else {
                $(".nav-header img").attr("src", 'images/logo.png');
                $("#icon_title img").attr("src", 'images/icon_title.png');
				$("#content-main").removeClass("styleCR styleCRW");
			}
		}
	});
	$.ajax({
		url: interUrl.basic + interUrl.user.getUser,
		type: "POST",
		dataType: "json",
		success: function(data, textStatus, jqXHR) {
			if (typeof data === "string") {
				data = JSON.parse(data);
			}
			if (data.code === 30000) {
				return location.href = "./index.html";
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
		data: {
			st: 'CLS_WEB_POST'
		},
		dataType: "json",
		success: function(data, textStatus, jqXHR) {

			if (typeof data === "string") {
				data = JSON.parse(data);
			}
			if (data.code === 30000) {
				return location.href = "./index.html";
			} else if (data.code === 20000) {
				$("#dialogTip").nameValues({
					content: data.message
				});
				return $("#dialogTip").modal("show");
			} else {
				initMenu(data.data);
			}
		}
	});
	$.ajax({
		url: interUrl.basic + interUrl.myTask.searchTaskList,
		data: {
			cname:'',
			oid:'',
			ftCode:'',
			flowNode:'',
			bNum:'',
			isProcessed:false,
			page:'',
			pageSize:10
		},
		success: function (res) {
			if (res && (res.totalItem || (res.totalItem === 0))) {
				$(".tip_num").css("padding","0 3px");
			}
			$(".tip_num").html(res.totalItem);
		}
	});
	$(".J_tabExit").click(function() {
		return $("#logOut").modal("show");
	});

	$("#exitSure").click(function() {
    location.href = systemName.logoutUrl;
	});

	//修改个人信息跳转oa地址
	$("#changePersonInfo").click(function() {
		menuItemClick.call({title : '修改个人信息', href: systemName.ucServerUrl});
	});
	
	// 报表菜单加载
	var hrefs = $("#side-menu").find("li");
});

