var dataLoad_1,handle, tableEvent,args;
args = comn.getArgs();

// 新增
var url = interUrl.purchase.contractaddGet;

// 修改或是查看
if(args['id']){
	url = interUrl.purchase.contractget;
} 
// 获取合同编号
comn.ajax({
	url : url,
	data :{
		id : args['id']
	},
	success : function(res){
		console.log(res);
		$("#purchaseUserId").val(res.data.purchaseUserId);
		$("#searchForm").values(res.data);
		if(res.data.contractTime){
			$("#contractTime").val(dateFormTen(res.data.contractTime));
		}
		if(res.data.arrivalTime){
			$("#arrivalTime").val(dateFormTen(res.data.arrivalTime));
		}
		if(args['type']==1){
			$("#addExpress").addClass("hide");
			$("fieldset").attr("disabled", "true");
		}
	}
});
applyStatus = function(value){
	 var arrayValue = "";
	if(1 == value){
		arrayValue="已提交"
	}else if(2 == value){
		arrayValue="已签合同";
	}else if(3 == value){
		arrayValue="入库中";
	}else if(4==value){
		arrayValue="已入库";
	}
	return arrayValue;
}
//获取合同明细
dataLoad_1 = function(params) {
	tableData(params, {id:args['id'],type:args['type']}, interUrl.mockList || interUrl.purchase.contractgetDetail);
};

//增加合同单价一列
handle_1 = function(value, row, index) {
	var contractAmt = "";
	if(row['contractAmt']){
		contractAmt = row['contractAmt'];
	}
	return ["<input type='text' id='contractAmt"+row['id']+"' onkeyup='clearNoNum(this)' value='"+contractAmt+"' name='contractAmt"+row['id']+"'/>"].join("");
};
 //非法字符校验
handle_2 = {
		"onkeyup" : function(e, a, item, index) {
			alert(1);
		}
}
//handle_2 = function(obj)
//{
//	//先把非数字的都替换掉，除了数字和.
//	obj.value = obj.value.replace(/[^\d.]/g,"");
//	//必须保证第一个为数字而不是.
//	obj.value = obj.value.replace(/^\./g,"");
//	//保证只有出现一个.而没有多个.
//	obj.value = obj.value.replace(/\.{2,}/g,".");
//	//保证.只出现一次，而不能出现两次以上
//	obj.value = obj.value.replace(".","$#$").replace(/\./g,"").replace("$#$",".");
//	//obj.value=obj.value.toFixed(2)
//}
//点击取消
$("#cancel").click(function() {
	return window.parent.toUrl({
		url: "./Modal/purchaseManage/purchaseContract/index.html"
	}); 
});
//新增合同：首先获取复选框勾选的个数，然后再通过for遍历勾选的值，再往合同单价里面塞值
$("#addExpress").click(function() {
  var _data = $("#table").bootstrapTable('getSelections');
  var id = args["id"];
  if(_data == null || _data == "" || _data.length == 0){
	  tip({
          content: "至少勾选一笔合同明细,请确认!!!"
        });
     return;
  }
  var data = $("#searchForm").values();
  if (_data.length>0) {
	var contractAmt = "contractAmt";
	var contractAmtValues = $("#table").values();
	var contractNumber = 0;
    for (var i = 0; i < _data.length; i++) {
    	contractAmt = contractAmt + _data[i]['id'];
    	jQuery.each(contractAmtValues, function(key, val) {  
    		if(contractAmt == key){
    			_data[i]['contractAmt'] = val;
    		}
    		return;
    	});  
    	contractAmt = "contractAmt";
    	data["purchaseApplyList["+i+"].id"] = _data[i]['id'];
    	if(_data[i]['id']){
    		if(_data[i]['contractAmt']=="" || _data[i]['contractAmt']==null){
    			tip({
      	          content: "已勾选的合同明细中的合同单价不能为0,请确认!!!"
      	        });	
    			return;
    		}
    	}
    	data["purchaseApplyList["+i+"].contractAmt"] = _data[i]['contractAmt'];
    	contractNumber = parseInt(contractNumber) + parseInt(_data[i]['applyNumber']);
    }
  }
  data['contractNumber'] = contractNumber;
  data['purchaseUserId'] = $("#purchaseUserId").val();
  var remarkslength=data['remarks'].length
  if(remarkslength>4000){
	  tip({
			content : "备注长度不能大于4000,请确认!"
		});
	  return;
  }
  var url = interUrl.purchase.contractadd;
  var tishi='保存成功!';
  if(data['id']){
	  url = interUrl.purchase.contractupdate;
	  thshi='修改成功!';
  }
  comn.ajax({
	 url : url,
	 data : data,
	 success : function(res){
		 tip({
			 content : "保存成功!"
//					return window.parent.toUrl({
//						url: "./Modal/purchaseManage/purchaseContract/index.html"
//					}); 
			 });
		 window.parent.cache.emailList="";
		 return window.parent.toUrl({
			 url: "./Modal/purchaseManage/purchaseContract/index.html"
		 });
	 }
  });
});

//合同操作
tableEvent = {
	"click .update" : function(e, a, item, index) {
		$("#id_addUser").val(item['id']);
		$("#addUser").modal("show");
		$("#modifyUserForm").values(item)
	}
};

handle = function(value, row, index) {
	return ["<button type='button' class='btn btn-primary btn-xs update'>修改</button>"]
}
$(function(){
	
	$("#table").bootstrapTable({
	      "undefinedText": "--",
	      "classes": "table-striped table-hover table",
	      "pagination": false,
	      "sidePagination": "server",
	      "clickToSelect": true,
	      "height": "500"
	})
});

//保存
$("#save").click(function() {
	var p = $("#modifyUserForm").values();
	comn.ajax({
		url : interUrl.purchase.updatecontractAmt,
		data : p,
		success : function(res) {
			tip ({ content : "保存成功！"});
			$("#addUser").modal("hide");
			$("#table").bootstrapTable("selectPage", 1);
			$("#table").bootstrapTable("refresh");
		}
	});
})