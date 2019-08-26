$(function() {
	//当前页变量
	var errorMessage = localStorage.getItem('errorMessage');

	//首次加载
	$('#errorTxt').html(errorMessage);
});