$(function(){
	function autoJump() {
		var isPhone = /Android|Windows Phone|iPhone|iPod/i.test(navigator.userAgent);
		var origin = window.location.origin;
		var search = window.location.search;
		var url = '';

		if (isPhone){
			url = origin + '/indexPhone.html' + search;
		}else{
			url = origin + '/index.html' + search;
		}
		window.location.href = url;		
	}

	//首次加载运行方法
	autoJump();
})