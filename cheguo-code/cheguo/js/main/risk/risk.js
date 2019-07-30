var GPSData={
	'province': [{
		'name' :'浙江',
		'sum' :'200',
		'percentage' :'+12%'
	},{
		'name' :'安徽',
		'sum' :'180',
		'percentage' :'+6%'
	},{
		'name' :'江西',
		'sum' :'150',
		'percentage' :'+10%'
	},{
		'name' :'湖南',
		'sum' :'140',
		'percentage' :'+2%'
	},{
		'name' :'黑龙江',
		'sum' :'130',
		'percentage' :'-2%'
	},{
		'name' :'山西',
		'sum' :'120',
		'percentage' :'+5%'
	},{
		'name' :'四川',
		'sum' :'110',
		'percentage' :'-4%'
	},{
		'name' :'湖北',
		'sum' :'100',
		'num' :'+3%'
	},{
		'name' :'福建',
		'sum' :'90',
		'percentage' :'+2%'
	},{
		'name' :'江苏',
		'sum' :'80',
		'percentage' :'-6%'
	}],
	'city': [{
		'name' :'湖州',
		'sum' :'110',
		'percentage' :'+11%'
	},{
		'name' :'嘉兴',
		'sum' :'100',
		'percentage' :'+5%'
	},{
		'name' :'宁波',
		'sum' :'90',
		'percentage' :'+9%'
	},{
		'name' :'温州',
		'sum' :'80',
		'percentage' :'+1%'
	},{
		'name' :'台州',
		'sum' :'70',
		'percentage' :'-3%'
	},{
		'name' :'苏州',
		'sum' :'60',
		'percentage' :'+4%'
	},{
		'name' :'合肥',
		'sum' :'50',
		'percentage' :'-4%'
	},{
		'name' :'武汉',
		'sum' :'40',
		'percentage' :'+2%'
	},{
		'name' :'大连',
		'sum' :'30',
		'percentage' :'+1%'
	},{
		'name' :'丽水',
		'sum' :'20',
		'percentage' :'-7%'
	}]
};

GPStop10Html('province');
function GPStop10Html(n){
	var data=GPSData[n];
	var html = "";
	for(var i=0; i<10; i++){
		html += [
			'<tr>',
				'<td style="text-align:center;">'+(i+1)+'</td>',
				'<td style="text-align:center;">'+(data[i].name)+'</td>',
				'<td style="text-align:center;">'+ data[i].sum + '</td>',
				'<td style="text-align:center;">' + data[i].percentage +'</td>',
			'</tr>',
		].join("");
	}
	$('#GPStop10').html(html);
}
$('input[name=GPS]').click(function(){
	GPStop10Html($(this).val());
});