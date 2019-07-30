var dataLoad_1, handle_1,tableEvent,args,_data1,dataLoad_2;
args = comn.getArgs();
if(window.parent.cache.emailList != "" && window.parent.cache.emailList != null){
   //  _data1 = jQuery.parseJSON(window.parent.cache.emailList);
	// var data_=window.parent.cache.emailList;
	 var carModelName= window.parent.cache.emailList.carModelName;
	 var carBrandName= window.parent.cache.emailList.carBrandName;
	 var carMakeName= window.parent.cache.emailList.carMakeName;
	 var carInfo="";
	// alert(window.parent.cache.emailList);
	 carInfo=carModelName+carBrandName+carMakeName;
	 $("#carInfo").val(carInfo);
	 $("#outForm").values(window.parent.cache.emailList);
//	 var gpsNumber=window.parent.cache.emailList.gpsNumber;
//	 if(gpsNumber==''||gpsNumber==null){
//		 $("#gpsNumber").val(1);
//	 }
	 $("#orgId").val(window.parent.cache.emailList.orgId);
	 $("#groupId").val(window.parent.cache.emailList.userGroupId);

}

if (args["type"] == 2) {
    $("fieldset").attr("disabled", "true");
	$("#save").addClass("hide");
	$("#add").addClass("hide");
	
//	$("#type").val(1);
	 var basicUrl=interUrl.purchase.userStockList;
	  comn.ajax({
			url: basicUrl,
			data: {
				projectId:window.parent.cache.emailList.projectId
			},
			success: function(res) {
		//		alert(res.data)
		//		 console.log("保存打印出的"+ jQuery.parseJSON(res.data));   
				$("#table_1").bootstrapTable('append', res.data);
				$("#installTime").val(dateFormTen(res.data[0].installTime));
				$("#installName").val(res.data[0].installName);
				$("#remarks").val(res.data[0].remarks);
			}
		});
  }
else if (args["type"] == 1) {
	  var basicUrl=interUrl.purchase.userStockList;
	  comn.ajax({
			url: basicUrl,
			data: {
				projectId:window.parent.cache.emailList.projectId
			},
			success: function(res) {
				$("#table_1").bootstrapTable('append', res.data);
				if(res.data.length > 0 ){
					$("#installTime").val(dateFormTen(res.data[0].installTime));
					$("#installName").val(res.data[0].installName);
					$("#remarks").val(res.data[0].remarks);
				}				
			}
		});
	  }  

////table_2的读取
dataLoad_2 = function(params) {
	  var p;
	  p = params.data;
	  return comn.ajax({
	    url: interUrl.mockList || interUrl.purchase.userStockList,
	    data: $.extend($("#userInfo").values(), p),
	    success: function(res) {
	      params.success({
	        'total': res.totalItem,
	        rows: res.data
	      });
	      $("#sum").html("库存总数：" + res.totalItem);
	      return params.complete();
	    }
	  });
	
//	 return tableData(params, $.extend(aa,{
//	  }), interUrl.mockList || interUrl.purchase.userStockList);
};

//dataLoad_1 = function(params) {
//	 return tableData(params, {projectId:window.parent.cache.emailList.projectId}, interUrl.mockList || interUrl.purchase.userStockList);
//};


 $(function () {
	    $("#userSearch").click(function() {
		    return $("#table_2").bootstrapTable('selectPage', 1);
		  });
    });
 
//table_1的操作
handle_1 = function(value, row, index) {
	console.log(args["type"]);
	if(args["type"]==2){
		 return "<div class='btn btn-xs btn-primary del'  style='display: none'>删除</div>";
	}else{
		 return "<div class='btn btn-xs btn-primary del'>删除</div>";
	}
	 
	};
//选择库存
$(function() {
	$("#add").click(function() {
		$("#addUser").modal("show");
		var _data=$("#table_1").bootstrapTable('getData');
	    var a ='';
		for (var i = 0; i < _data.length; i++) {
			a=a+_data[i].id+",";
		}
		if(a.length>0){
			a=a.replace(/,$/g,"");
		}
		$("#outid").val(a);
	    $("#userSearch").trigger("click");	
	});
	$("#table_1").bootstrapTable({
	      "undefinedText": "--",
	      "classes": "table-striped table-hover table",
	      "pagination": false,
	      "sidePagination": "server",
	      "clickToSelect": true,
	      "height": "500"
	});
})

//删除操作
tableEvent = {
  "click .del": function(e, a, item, index) {
	  
		 var data = $("#table_1").bootstrapTable('getData');
		 $("#table_1").bootstrapTable('remove', {
		     field: 'id',
		     values: [data[index].id]
		 });
		var vid=$("#outid").val();
		if(vid){
			var outid = "";
			var arr = vid.split(',');
			for(var i = 0; i < arr.length;i ++){
				if(data[index].id == arr[i]){
					
				}else {
					outid = outid + arr[i] + ",";
				}
			}
			if(outid.length>0){
				outid=outid.replace(/,$/g,"");
			}
			$("#outid").val(outid);
		}
  }
}; 

//保存
$("#save").click(function() {
	if($("#outForm").valid()){
		var data= $("#outForm").values();	
		var _data=$("#table_1").bootstrapTable('getData');
		gpsNumber=$("#gpsNumber").val();
		if(_data.length!=gpsNumber){
			 $("#suress").modal("show");
			return;
		}
		var a="";
		for(var i = 0; i < _data.length; i ++ ){
			a=a+_data[i].id+",";
        }
		if(a.length>0){
			a=a.replace(/,$/g,"");
		}
		data['ids']=a
		var gpsNum="";
		for(var i = 0; i < _data.length; i ++ ){
			gpsNum=gpsNum+_data[i].gpsNum+",";
        }
		if(gpsNum.length>0){
			gpsNum=gpsNum.replace(/,$/g,"");
		}
		data['gpsNums']=gpsNum;
		data['type']=args["type"];
      //  console.log("保存打印出的"+data);   
		var basicUrl=interUrl.purchase.saveStock;
		return comn.ajax({
			url: basicUrl,
			data: data,
			success: function(res) {
				tip({
					content: "保存成功"//billId?"修改成功!":"发件成功!"
				});
				 window.parent.cache.emailList = "";
				 return window.parent.toUrl({
					    url: "./Modal/stockManage/userStock/index.html"
					});
			}
		});
	}
});
//选择到的库存已到tabl_1
$("#checkSure").click(function() {
	var id,cardNo;
	var data=$("#table_1").bootstrapTable("getData");
	var datas=$("#table_2").bootstrapTable("getSelections");
//	if(datas == null || datas.length == 0){
//		return;
//	}
	gpsNumber=$("#gpsNumber").val();
	if(data.length+datas.length>gpsNumber){
		 $("#sures").modal("show");
		return;
	}
//	var outid = $("#outid").val();
//	for(var i = 0; i < datas.length; i++){
//		outid = outid + datas[i].id + ",";
//	}
//	if(outid.length>0){
//		outid=outid.replace(/,$/g,"");
//	}
//	$("#outid").val(outid);
	$("#table_1").bootstrapTable("append", datas);
	$("#addUser").modal("hide");
});

$("#btnBack").click(function(){
	window.parent.cache.emailList = "";
	window.parent.toUrl({url: "./Modal/stockManage/userStock/index.html"})
});