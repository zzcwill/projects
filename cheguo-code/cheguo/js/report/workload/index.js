var dataLoad_1,businessType;
var uId = comn.user.uid;
var args = comn.getArgs();
var businessTypeObj={
	"CREDIT_FLOW":"征信流程",
	"LOAN_APPLY_FLOW":"贷款申请流程",
	"LOAN_MODIFY_FLOW":"贷款修改流程",
	"LOAN_CANCEL_FLOW":"贷款作废流程",
	"SECOND_HAND_CAR_ESTIMATE_FLOW":"二手车评估流程",
	"SECOND_HAND_CAR_TRANSFER_FLOW":"二手车过户流程",
	"CHEGUO_CUSTOMER_ASSIGN_FLOW":"车果客户分配流程",
	"DOCUMENT_TRANSMIT_FLOW":"文档传递流程",
	"CAR_DEALER_ADD_FLOW":"车商新增流程",
	"INSURANCE_DISPATCHN_FLOW":"保险分发流程"
}

dataLoad_1 = function(params) {
	tableData(params, $.extend($("#searchForm").values(), {
    uId:uId,
    businessType: 'LOAN_APPLY_FLOW'
  }), interUrl.report.businessObjectProcessInfoReportList);
};
function total(){
	comn.ajax({
		url:interUrl.report.businessObjectProcessInfoReportListStatis,
		data:$.extend($("#searchForm").values(),{ uId : uId,businessType:$("#businessType").val()}),
		success:function(res){
			$("#getForm").values(res.data);
		}
	});
}
total();
businessType = function(value, row, index){
	return businessTypeObj[value] || null ;
};

$(function(){
	$('#businessType').flowGet('LOAN_APPLY_FLOW');
	$('#nodeKey').getFlowNode('LOAN_APPLY_FLOW');
	/*$('#businessType').on('change',function(){
		$(this).find('option').each(function(){
			businessTypeObj[$(this).val()] = $(this).html();
		});

		var code = $(this).find("option:selected").attr('value');
		$('#nodeKey').getFlowNode(code);
	});*/
	$('#operatorOrganizationId').getOrg();
	$('#btn-search').off('click').click(function(){
		$('#searchForm').validate();
		if ($("#searchForm").valid() == true) {
			$("#table").bootstrapTable('refresh', {url: "..."});
		};
		$('#getForm')[0].reset();
		total();
	});
	$(".btn[modal='reset']").off('click').click(function(){
		var ref;
		if((ref = $(this).parents("form")[0]) != null){
			ref.reset();
			$('#businessType').find('option[value="LOAN_APPLY_FLOW"]').attr('selected','selected');
		}else{
			return void 0;
		};
	});

	$('#searchForm input[name=lastSubmittedDateTimeBegin]').getMonthDayFirst();
	$('#searchForm input[name=lastSubmittedDateTimeEnd]').getToday();

	$('#table').bootstrapTable({
		classes: "table-striped table-hover table",
		clickToSelect: true,
		pagination: true,
		paginationFirstText: "第一页",
		paginationLastText: "最后一页",
		paginationNextText: "下一页",
		paginationPreText: "上一页",
		queryParams: "queryParams",
		sidePagination: "server",
		undefinedText: "--"
	});

	$('#exportBtn').click(function(){
    var search=$("#searchForm").serialize();
    var downLink = interUrl.basic + interUrl.report.businessObjectProcessInfoReportListExport + "?" + search + '&uId=' + uId +'&businessType=LOAN_APPLY_FLOW';
    window.open(downLink, "_blank");
  });
	$("#export").click(function(){
		var search=$("#searchForm").serialize();
		var downLink = interUrl.basic + interUrl.report.businessObjectProcessInfoReportLlistDetailExport+ "?" + search+ '&uId=' + uId +'&businessType=LOAN_APPLY_FLOW';
		window.open(downLink, "_blank");
	})
});