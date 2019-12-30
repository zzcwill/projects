$('i').addClass('ok');
jquery2('i').addClass('ok2');

$.ajax({
	type:"get",
	url:"/api/topics",
	data:{
		tab : 'job',
	},
	dataType:"json",
	success:function(res){
		console.info(1)
		console.log(res);				
	},
	error:function(){
	}
});