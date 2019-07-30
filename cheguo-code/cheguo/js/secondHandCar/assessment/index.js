var dataLoad_1, tableEvent, handle_1;
dataLoad_1 = function(params) {
	tableData(params,$("#searchForm").values(), interUrl.second.estimateSearch);
};

tableEvent_1 = {
	"click .loanStart_1": function(e, a, item, index) {
		var code = item.estimateStatusCode;
		var codeId = '',sr = '';
		if(code == '0'){
			codeId = '1';
			sr = '&releventFlow=SECOND_HAND_CAR_ESTIMATE_FLOW&releventFlowNode=ESTIMATE_LAUNCH&fileNamespace=SECONDHAND_CAR'
		}else if(code == '1' || code == '2'){
			codeId = '4';
			sr = '&releventFlow=SECOND_HAND_CAR_ESTIMATE_FLOW&releventFlowNode=FIRST_ESTIMATE&fileNamespace=SECONDHAND_CAR'
		}else if(code == '3' || code == '4'){
			codeId = '5';
			sr = '&releventFlow=SECOND_HAND_CAR_ESTIMATE_FLOW&releventFlowNode=SECOND_ESTIMATE&fileNamespace=SECONDHAND_CAR'
		}
        //查看二手车评估
	    comn.addTab(
			{
				title: '评估详情',
				href: "./Modal/secondHandCar/common/index.html?type="+codeId+"&hi=2&id="+item['secondHandCarInfoId'] +"&space=SECONDHAND_CAR"+sr+"&loanApplyId=" + item.secondHandCarInfoId + "&businessTypeCode=SECOND_HAND_CAR_ESTIMATE_FLOW&status=done"
			}
		);
	},
	"click .cancel":function(e,a,item,index){
		comn.ajax({
			url:interUrl.second.cancelEvaluation,
			data:{
				secondHandCarInfoId:item.secondHandCarInfoId
			},
			success:function(res){
				tip({
					content:"取消成功"
				});
				$("#table").bootstrapTable("refresh",{url:'...'})
			}
		})
	}

};
function cancel(row){
	if(row.loanType != 5 && row.estimateStatus == "复评完成"){
		return "<li><a class='cancel' href='javascript:;'>取消复评</a></li>"
	}
}
handle_1 = function(value, row, index) {
		return ["<div class='btn-group btn-group-xs'>" ,
		"<button type='button' class='btn btn-primary btn-xs dropdown-toggle' data-toggle='dropdown'>操作" ,
			"<span class='caret'></span>",
		"</button>",
		"<ul class='dropdown-menu' role='menu'>" ,
			"<li><a class='loanStart_1' href='javascript:;'>查看评估详情</a></li>",
			cancel(row),
		"</ul>",
		"</div>"].join("");
};

$(function(){
	$("#assessment").click(function(){    //点击发起二手车评估
//		return window.parent.toUrl({
//		    url: "./Modal/secondHandCar/common/index.html?type=1"    //发起二手车评估
//	    });
	    comn.addTab({title: '发起评估',  href: './Modal/secondHandCar/common/index.html?type=1&action=start&releventFlow=SECOND_HAND_CAR_ESTIMATE_FLOW&releventFlowNode=ESTIMATE_LAUNCH&fileNamespace=SECONDHAND_CAR' });
	});
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
	//车辆三级级联菜单
	// $("#getBrand").getBrand();
	// $(document).on("change", "#getBrand,#getCarList", function() {
	// 	var code = $(this).find("option:selected").attr('value'),
	// 		dataNext = $(this).attr("data-next");
	// 	if (dataNext == 1) $("#getCarList").getCarList(code);
	// 	if (dataNext == 2) $("#getCarModel").getCarModel(code);
	// 	return
	// });
	$("#getBrand").getBrandC( $("#getBrand").is(":disabled"));
	$(document).on("change", "#getBrand", function (){
		var code = $(this).attr("data-code");
		$(this).prev().val(code);
		$("#getCarList, #getCarModel").val("--请选择--").next().remove();
		$("#getCarList").getCarList(code);
		$("#carSeriesKey, #carModelKey").val("");
	});

	$(document).on("change", ".carSelect", function () { //给车辆赋值
		var code = $(this).attr("data-code");
		$(this).prev().val(code);
		if(this.id == "getCarList"){
			$("#getCarModel").val("--请选择--").next().remove();
			$("#getCarModel").getCarModel(code)
		};
	});
})
