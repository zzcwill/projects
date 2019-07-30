var dataLoad_1, dataLoad_2, tableEvent_1, tableEvent_2, handle_1, handle_2;

dataLoad_1 = function(params) {
	tableData(params,$("#searchForm").values(), interUrl.second.not_yet);
};

tableEvent_1 = {
	"click .loanStart1": function(e, a, item, index) {
//		return window.parent.toUrl({
//		    url: "./Modal/secondHandCar/common/index.html?type=3&id="+item['secondHandCarInfoId']    //发起二手车过户
//	    });
	     comn.addTab({title: '发起过户',  href: "./Modal/secondHandCar/common/index.html?type=3&id="+item['secondHandCarInfoId']+"&releventFlow=SECOND_HAND_CAR_TRANSFER_FLOW&releventFlowNode=TRANSFER_LAUNCH&fileNamespace=SECONDHAND_CAR&loanApplyId=" + item.secondHandCarInfoId + "&businessTypeCode=SECOND_HAND_CAR_TRANSFER_FLOW" });
	}
};

handle_1 = function(value, row, index) {
	return ["<button type='button' class='btn btn-primary btn-xs loanStart1'>发起过户</button>"].join("");
};

dataLoad_2 = function(params) {
	tableData(params,$("#searchForm").values(), interUrl.second.already);
};

tableEvent_2 = {
	"click .loanStart2": function(e, a, item, index) {
		var code = item.businessTypeKey;
		var codeId = '';
		if(code == 'SECOND_HAND_CAR_TRANSFER_FLOW'){    //评估报告
			codeId = '7'
		}
		var sr = '';
		if(codeId == '3'){    //发起过户
			sr="&releventFlow=SECOND_HAND_CAR_TRANSFER_FLOW&releventFlowNode=TRANSFER_LAUNCH&fileNamespace=SECONDHAND_CAR";
		}else if(codeId == '6'){//过户审批
			sr="&releventFlow=SECOND_HAND_CAR_TRANSFER_FLOW&releventFlowNode=TRANSFER_APPROVAL&fileNamespace=SECONDHAND_CAR";
		}else if(codeId == '7'){//评估报告
			sr="&releventFlow=SECOND_HAND_CAR_TRANSFER_FLOW&releventFlowNode=TRANSFER_ESTIMATE_REPORT&fileNamespace=SECONDHAND_CAR";
		}
	    comn.addTab({title: '查看过户',  href: "./Modal/secondHandCar/common/index.html?status=done&type="+codeId+"&hi=2&id="+item['secondHandCarInfoId']+sr+"&loanApplyId=" + item.secondHandCarInfoId + "&businessTypeCode=SECOND_HAND_CAR_TRANSFER_FLOW" });
	}
};

handle_2 = function(value, row, index) {
	return ["<button type='button' class='btn btn-primary btn-xs loanStart2'>查看过户详情</button>"].join("");
};


$(function(){
	//重置
	$(".btn[modal='reset']").off('click').click(function(){
		var ref;
		if((ref = $(this).parents("form")[0]) != null){
			$("#carBrandKey, #carSeriesKey, #carModelKey").val("");
			$("#getCarList, #getCarModel").val("--请选择--").next().remove();
			ref.reset();
		}else{
			return void 0;
		};
	});
	//车辆三级级联菜单1
	$("#getBrand").getBrandC( $("#getBrand").is(":disabled"));
	$(document).on("change", "#getBrand", function (){
		var code = $(this).attr("data-code");
		$(this).prev().val(code);
		$("#getCarList, #getCarModel").val("--请选择--").next().remove();
		$("#getCarList").getCarList(code);
	});

	$(document).on("change", ".carSelect", function () { //给车辆赋值
		var code = $(this).attr("data-code");
		$(this).prev().val(code);
		if(this.id == "getCarList"){
			$("#getCarModel").val("--请选择--").next().remove();
			$("#getCarModel").getCarModel($(this).attr("data-code"))
		};
	});
	// $(".getBrand1").getBrand();
	// $(document).on("change", ".getBrand1,.getCarList1", function() {
	// 	var code = $(this).find("option:selected").attr('value'),
	// 		dataNext = $(this).attr("data-next");
	// 	if (dataNext == 1) $(".getCarList1").getCarList(code);
	// 	if (dataNext == 2) $(".getCarModel1").getCarModel(code);
	// 	return
	// });
	//车辆三级级联菜单2
	// $(".getBrand2").getBrand();
	// $(document).on("change", ".getBrand2,.getCarList1", function() {
	// 	var code = $(this).find("option:selected").attr('value'),
	// 		dataNext = $(this).attr("data-next");
	// 	if (dataNext == 1) $(".getCarList2").getCarList(code);
	// 	if (dataNext == 2) $(".getCarModel2").getCarModel(code);
	// 	return
	// });
	
	$("#btn-search1").click(function() {
		var index = $(".nav-tabs li[class='active']").index();
		if(index == 0){
			$("#table_1").bootstrapTable('refresh', {url: "..."});
		}else if(index == 1){
			$("#table_2").bootstrapTable('refresh', {url: "..."});
		}
	  });
})
