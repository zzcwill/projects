$(function(){
	$('input[type=checkbox]').bootstrapSwitch();

	comn.ajax({
	  url: interUrl.dataView.settingsAll,
	  success: function (res) {
	  	$('#dataForm').values(res.data.setting_page);
	  	var arr=res.data.setting_page.pageDisplay.split('-');
	  	if(arr[0] == 0){
	  		$("input[name='layput']").bootstrapSwitch('state', false);
	  	}
	  	if(arr[1] == 0){
	  		$("input[name='parts']").bootstrapSwitch('state', false);
	  	}
	  	if(arr[2] == 0){
	  		$("input[name='core']").bootstrapSwitch('state', false);
	  	}
	  	if(arr[3] == 0){
	  		$("input[name='business']").bootstrapSwitch('state', false);
	  	}
	  	if(arr[4] == 0){
	  		$("input[name='risk']").bootstrapSwitch('state', false);
	  	}
	  	setHtml('settting_data_0',res.data.settting_data_0);
	  	setHtml('settting_data_1',res.data.settting_data_1);
	  	setHtml('settting_data_3',res.data.settting_data_3);
	  }
	});

	function setHtml(id,data){
		var htmlarr0=[];
		for(var i=0;i<data.length;i++){
			var item = data[i];
			var html = '<tr><td>'+item.itemName+
				 '</td><td><input class="showdata" type="text" value="'+item.dataReal+
				 '" readonly/></td><td><input class="showdata edit" type="text" data-dataExpect="'+item.dataExpect+'" data-dataReal="'+item.dataReal+'" data-id="'+item.id+'" value="'+item.dataExpect+
				 '"/></td></tr>';
			htmlarr0.push(html);
		}
		$('#'+id).html(htmlarr0.join(''));
	}

	var settting_data={
		idlist:[],
		data:[]
	};
	$('body').on('blur','.edit',function(){
		var input = $(this);
		var value = $.trim(input.val()),id = input.attr('data-id');
		if(!value){
			// tip( {content: "请输入数值！"});
			alert("请输入数值！");
			input.focus();
			return false;
		}
		var data = id+'-'+input.attr('data-dataReal')+'-'+value;
		var index = settting_data.idlist.indexOf(id);
		if(value != input.attr('data-dataExpect')){
			if(index<0){
				settting_data.idlist.push(id);
				settting_data.data.push(data);
			}else{
				settting_data.data.splice(index,1,data);
			}
		}else{
			if(index>=0){
				settting_data.idlist.splice(index,1);
				settting_data.data.splice(index,1);
			}
		}
	});
                                

	$('#confirm').click(function(){
    var data = $('#dataForm').values();
    var pageDisplay= (data.layput?1:0)+'-'+(data.parts?1:0)+'-'+(data.core?1:0)+'-'+(data.business?1:0)+'-'+(data.risk?1:0);
    var setting_page={};
    setting_page.display = pageDisplay;
    setting_page.id = data.id;
    setting_page.bank = data.coopBank;
    console.log(setting_page);
    console.log(settting_data.data.join(','));
    comn.ajax({
		  url: interUrl.dataView.generalUpdate,
		  data: setting_page,
		  success: function (res) {
		  	var data1=settting_data.data.join(',');
				if(data1){
					comn.ajax({
					  url: interUrl.dataView.dataUpdate,
					  data: {data: data1},
					  success: function (res) {
					  	window.location="/loan/Modal/main/dataSet/show.html";
					  }
					});
				}else{
					window.location="/loan/Modal/main/dataSet/show.html";
				}
		  }
		});
	});
});