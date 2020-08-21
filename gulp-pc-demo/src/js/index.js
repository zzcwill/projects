const say = () => {
	return 'hi'
}    
const type = 'zzc' 

console.log(`${type} says ${say()}`)

$.ajax({
	type:"get",
	url:'/api' + '/topics',
	data:{
		page: 1,
		tab: 'good',
		limit: 10,
	},
	dataType:"json",
	success:function(res){
		console.log(res);				
	},
	error:function(){
	}
});