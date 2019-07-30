loantop10Html();
function loantop10Html(province){
	comn.ajax({
	   url: interUrl.dataView.loaninfoGetTop10,
	   //data:{province: province},
	   success: function (res) {
	    	var data=res.data;
	    	var html = "";
				for(var i=0; i<10; i++){
					html += [
						'<tr>',
							'<td style="text-align:center;">'+(i+1)+'</td>',
							'<td style="text-align:center;">'+(data[i].provinceName)+'</td>',
							'<td style="text-align:center;">'+ data[i].loanAmount + '</td>',
							'<td style="text-align:center;">' + data[i].loanCount+'</td>',
						'</tr>',
					].join("");
				}
				$('#loantop10').html(html);
	   }
	});
}

mortgagetop10Html();
function mortgagetop10Html(province){
	comn.ajax({
	   url: interUrl.dataView.pledgeGetTop10,
	   //data:{province: province},
	   success: function (res) {
	    	var data=res.data;
	    	var html = "";
				for(var i=0; i<10; i++){
					html += [
						'<tr>',
							'<td style="text-align:center;">'+(i+1)+'</td>',
							'<td style="text-align:center;">'+(data[i].provinceName)+'</td>',
							'<td style="text-align:center;">'+ data[i].cntRange2 + '</td>',
							'<td style="text-align:center;">' + data[i].amountRange2+'</td>',
						'</tr>',
					].join("");
				}
				$('#mortgagetop10').html(html);
	   }
	});
}

$('input[name=loan]').click(function(){
	loantop10Html($(this).val());
});
$('input[name=mortgage]').click(function(){
	mortgagetop10Html($(this).val());
});
