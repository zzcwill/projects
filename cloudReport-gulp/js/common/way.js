//全局变量
//方便调试的url前缀
var apiUrl = '/api';

//全局方法-不需要jquery
//获取url相应参数值
function getUrlParam(name) {
	var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
	var r = window.location.search.substr(1).match(reg)
	if (r !== null) {
		return unescape(r[2])
	}
	return null
}
//去引入文件缓存
function clearCache() {
	var time = new Date().getTime();
	var cssDom = $('link')
	var jsDom = $('script')
	for (var i = 0; i < cssDom.length; i++) {
		var url = cssDom.eq(i).attr('href') + '?t=' + time;
		cssDom.eq(i).attr('href', url);
	}

	for (var j = 0; j < jsDom.length; j++) {
		var url2 = jsDom.eq(j).attr('src') + '?t=' + time;
		jsDom.eq(j).attr('src', url2);
	}
}
//获取对象-属性个数
function attributeCount(obj) {
	var count = 0;
	for (var i in obj) {
		if (obj.hasOwnProperty(i)) {
			count++;
		}
	}
	return count;
}
//复制对象
function dataToData(data1, data2) {
	var data = {}
	for (var key in data1) {
		data[key] = data2[key];
	}

	return data;
}
//复制对象-数据处理-针对人行征信
function dataToData2(data1, data2) {
	var data = {}
	for (var key in data1) {
		if(data2[key] === null) {
			data[key] = '';
		}else{
			data[key] = data2[key];
		}
	}

	return data;
}

//全局方法-需要jquery
//滚动到某个id指定位置
function scrollDomToPlace(id) {
	var top = $('#' + id).offset().top + 'px';
	$('body,html').animate({
		scrollTop: top
	}, 1000);
}
//移动端滚动处理
// function scrollDomToPlace2(id) {
// 	var top = $('#lender').offset().top;
// 	var top2 = $('#' + id).offset().top;

// 	top2 = top2 - top;
// 	$('body,html').animate({
// 		scrollTop: top2
// 	}, 1000);
// }
//只针对riskListDetailsPhone页面使用
function scrollDomToPlace3(id) {
	var relationship = loanPersonFilter(id);
	var top = $('#' + id).offset().top + 'px';

	$('#navTitle').removeClass('dn');
	$('#navTitle').text(relationship);
	$('body,html').animate({
		scrollTop: top
	}, 1000);	
}

//封装ajax方法
function yjAjax(request) {
	$.ajax({
		type: request.type,
		url: apiUrl + request.url,
		data: request.data,
		dataType: "json",
		success: function (res) {		
			request.success(res);
		},
		error: function () {}
	});
}

//自动跳手机端
function autoPhone() {
	var url = '';
	var isPhone = /Android|Windows Phone|iPhone|iPod/i.test(navigator.userAgent);
	var type = getUrlParam('type');
	var origin = window.location.origin;
	var search = window.location.search;

	if (isPhone){
		if(type === '1') {
			url = origin + '/indexPhone.html' + search;
		}else if(type === '2') {
			//没有手机端-不跳
		}else if(type === '100') {
			url = origin + '/reportOneTwoPhone.html' + search;
		}else{

		}
		if(type) {
			window.location.href = url;
		}
	}
}

//自动跳pc端
function autoPc() {
	var url = '';
	var isPhone = /Android|Windows Phone|iPhone|iPod/i.test(navigator.userAgent);
	var type = getUrlParam('type');
	var origin = window.location.origin;
	var search = window.location.search;

	if(!isPhone) {
		if(type === '1') {
			url = origin + '/index.html' + search;
		}else if(type === '2') {
			url = origin + '/reportTwo.html' + search;
		}else if(type === '100') {
			url = origin + '/reportOneTwo.html' + search;
		}else{

		}	
		if(type) {
			window.location.href = url;
		}	
	}
}

//跳h5-错误页
function jumpErrorH5(txt) {
	var origin = window.location.origin;
	//var search = window.location.search;

	localStorage.setItem('errorMessage',txt);
	window.location.href = origin + '/errorPhone.html';
}