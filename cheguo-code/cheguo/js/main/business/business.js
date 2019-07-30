var newCarStype = $('select[name=newCarTime]').val();
var usedCarStype = $('select[name=usedCarTime]').val();

newCartop10Html(newCarStype);
usedCartop10Html(usedCarStype);
function newCartop10Html(stype){
	comn.ajax({
	   url: interUrl.dataView.businessGetTop10,
	   data: {type: 1,stype: stype},//data:{province: province},
	   success: function (res) {
	   		var data=res.data;
	    	var html = "";
				for(var i=0; i<data.length; i++){
					html += [
						'<tr>',
							'<td style="text-align:center;">'+(i+1)+'</td>',
							'<td style="text-align:center;">'+(data[i].provinceName)+'</td>',
							'<td style="text-align:center;">'+ data[i].loanAmount + '</td>',
							'<td style="text-align:center;">' + (data[i].monthRate||'0') +'%</td>',
						'</tr>',
					].join("");
				}
				$('#newCartop10').html(html);
	   }
	});
}

function usedCartop10Html(stype){
	comn.ajax({
	   url: interUrl.dataView.businessGetTop10,
	   data: {type: 2,stype: stype},//data:{province: province},
	   success: function (res) {
	   		var data=res.data;
	    	var html = "";
				for(var i=0; i<data.length; i++){
					html += [
						'<tr>',
							'<td style="text-align:center;">'+(i+1)+'</td>',
							'<td style="text-align:center;">'+(data[i].provinceName)+'</td>',
							'<td style="text-align:center;">'+ data[i].loanAmount + '</td>',
							'<td style="text-align:center;">' + (data[i].monthRate||'0') +'%</td>',
						'</tr>',
					].join("");
				}
				$('#usedCartop10').html(html);
	   }
	});
}
$('select[name=newCarTime]').change(function(){
    var value=$(this).val();
    newCartop10Html(value);
});
$('select[name=usedCarTime]').change(function(){
    var value=$(this).val();
    usedCartop10Html(value);
});
$('input[name=newCar]').click(function(){
		newCartop10Html($(this).val());
});
$('input[name=usedCar]').click(function(){
		usedCartop10Html($(this).val());
});
