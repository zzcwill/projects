var dataLoad_1, handle, tableEvent;

dataLoad_1 = function(params) {
	  var p;
	  p = params.data;
	  return comn.ajax({
	    url: interUrl.mockList || interUrl.purchase.purchaselist,
	    data: $.extend($("#searchForm").values(), p),
	    success: function(res) {
	      params.success({
	        'total': res.totalItem,
	        rows: res.data
	      });
	      return params.complete();
	    }
	  });
	};

//$("#btn-search").click(function(){
//	    $("#table").bootstrapTable("refresh");	
//	});
	 
tableEvent = {
	"click .update" : function(e, a, item, index) {
		$("#modalTitle").text("修改申请单录入");
		$("#id").val(item['id']);
		$("fieldset").attr("disabled", false);
		//$("#applyTimes").attr("disabled", false);
		$("#save").removeClass("hide");
		$("#applyNums").attr("disabled", true);
		$("#applyOrgNames").attr("disabled", true);
		$("#applyUserNames").attr("disabled", true);
		publicfunction(e, a, item, index);
	},
	"click .info" : function(e, a, item, index) {
		$("#modalTitle").text("查看详情");
		publicfunction(e, a, item, index);
		$("fieldset").attr("disabled", "true");
		$("#save").addClass("hide");
		
	},
	"click .delete" : function(e, a, item, index) {
		$("#sure").modal("show");
		$("#deleteId").val(item['id']);
	}
};
 function publicfunction (e, a, item, index){
	 $("#addUser").modal("show");
	 if(item['applyTime']){
			item['applyTime'] = dateFormTen(item['applyTime']);
		}
		if(item['requestTime']){
			item['requestTime'] = dateFormTen(item['requestTime']);
		}
		$("#applyNum").val(item['applyNum']);
		$("#applyTime").val(item['applyTime']);
		$("#applyOrgName").val(item['applyOrgName']);
		$("#applyUserName").val(item['applyUserName']);
		$("#itemName").val(item['itemName']);
		$("#modelType").val(item['modelType']);
		$("#otherRequest").val(item['otherRequest']);
		$("#requestTime").val(item['requestTime']);
		$("#applyNumber").val(item['applyNumber']);
		$("#applyUserId").val(item['applyUserId']);
		$("#applyOrgId").val(item['applyOrgId']);
 }
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
handle = function(value, row, index) {
	if (row['applyStatus'] == 1) {
		return [
				"<div class='btn-group btn-group-xs'>",
				"<button type='button' class='btn btn-primary dropdown-toggle' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>操作",
				"<span class='caret'></span>",
				"<span class='sr-only'>下拉切换</span>", "</button>",
				"<ul class='dropdown-menu' role='menu'>",
				"<li><a class='update'>修改</a></li>",
				"<li><a class='delete'>删除</a></li>",
				"<li><a class='info' id='info'>查看详情</a></li>", "</ul>", "</div>" ]
				.join("");
	} else {
		return [
				"<div class='btn-group btn-group-xs'>",
				"<button type='button' class='btn btn-primary dropdown-toggle' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>操作",
				"<span class='caret'></span>",
				"<span class='sr-only'>下拉切换</span>", "</button>",
				"<ul class='dropdown-menu' role='menu'>",
				"<li><a class='info' id='info' >查看详情</a></li>", "</ul>", "</div>" ]
				.join("");
	}
};
//非法字符校验
function onlyNum() {
    if(!(event.keyCode==46)&&!(event.keyCode==8)&&!(event.keyCode==37)&&!(event.keyCode==39))
    if(!((event.keyCode>=48&&event.keyCode<=57)||(event.keyCode>=96&&event.keyCode<=105)))
    event.returnValue=false;
} 

///[\d.]/.test(String.fromCharCode(event.keyCode))
$(function() {
	$("#orgName").getOrg();//机构
	$("#add").click(function() {
		$("#addUser").modal("show");
		$("#modalTitle").text("申请单录入");
		$("#save").removeClass("hide");
		comn.ajax({
			url : interUrl.purchase.purchaseaddGet,
			success : function(res) {
				console.log(res);
				$("#itemName").val('');
				$("#modelType").val('');
				$("#otherRequest").val('');
				$("#applyNumber").val('');
				$("input[name='applyNum']").val(res.data.applyNum);
				$("input[name='applyOrgName']").val(res.data.applyOrgName);
				$("input[name='applyUserName']").val(res.data.applyUserName);
				$("input[name='applyOrgId']").val(res.data.applyOrgId);
				$("input[name='applyUserId']").val(res.data.applyUserId);
				$("input[name='applyTime']").val(res.data.applyTimeStr);
				$("input[name='requestTime']").val(res.data.applyTimeStr);
			}
		});
		$("fieldset").attr("disabled", false);
		$("#applyNums").attr("disabled", true);
		$("#applyOrgNames").attr("disabled", true);
		$("#applyUserNames").attr("disabled", true);
	});

});
$("#save").click(function() {
		var applyNum,applyTime,applyOrgName,applyUserName,itemName,modelType,otherRequest,requestTime,applyNumber,data = {};
		applyNum=$("#applyNum").val();
		applyTime = $("#applyTime").val();	
		applyOrgName = $("#applyOrgName").val();
		applyUserName = $("#applyUserName").val();
		itemName = $("#itemName").val();
		modelType = $("#modelType").val();
		otherRequest = $("#otherRequest").val();
		requestTime = $("#requestTime").val();
		applyNumber = $("#applyNumber").val();
		 
		data['id'] = $("#id").val();
		data['applyUserId'] = $("#applyUserId").val();
		data['applyOrgId'] = $("#applyOrgId").val();
		data['applyNum']=applyNum;
		data['applyTime']=applyTime;
		data['applyOrgName']=applyOrgName;
		data['applyUserName']=applyUserName;
		data['itemName']=itemName;
		data['modelType']=modelType;
		data['otherRequest']=otherRequest;
		data['requestTime']=requestTime;
		data['applyNumber']=applyNumber;
		var urls = interUrl.purchase.purchaseadd;
		var thishi="保存成功!";
		if (data['id']) {
			urls = interUrl.purchase.purchaseupdate;
			$("#id").val("");
			thishi="修改成功!";
		}
		comn.ajax({
			url : urls,
			data : data,
			success : function(res) {
				tip({
					content : thishi
				});
				$("#addUser").modal("hide");
				$("#table").bootstrapTable("selectPage", 1);
				$("#table").bootstrapTable("refresh");
			}
		});

});

$("#OK").click(function() {
	return comn.ajax({
		url : interUrl.purchase.purchasedelete,
		data : {
			id : $("#deleteId").val()
		},
		success : function(res) {
			tip({
				content : "删除成功!"
			});
			$("#sure").modal("hide");
			 $("#table").bootstrapTable("refresh");
		}
	});
});
