$(function(){
	function autoJump() {
		var url = '';
		var isPhone = /Android|Windows Phone|iPhone|iPod/i.test(navigator.userAgent);
		var type = getUrlParam('type');
		var origin = window.location.origin;
		var search = window.location.search;

		if (isPhone){	
			if(type === '1') {
				url = origin + '/indexPhone.html' + search;
			}else if(type === '2') {
				//没有手机端直接跳pc端页面
				url = origin + '/reportTwo.html' + search;
			}else if(type === '100') {
				url = origin + '/reportOneTwoPhone.html' + search;
			}else{

			}
		}

		if(!isPhone) {
			if(type === '1') {
				url = origin + '/index.html' + search;
			}else if(type === '2') {
				url = origin + '/reportTwo.html' + search;
			}else if(type === '100') {
				url = origin + '/reportOneTwo.html' + search;
			}else{

			}			
		}

		if(type) {
			window.location.href = url;
		}
	}

	//首次加载运行方法
	autoJump();
})