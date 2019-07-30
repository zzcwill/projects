var dataLoad_1, tableEvent, handle_1,hasPicture,hasloanTerm,hasValue;
var uId = comn.user.uid;
var args = comn.getArgs();
dataLoad_1 = function(params) {
	tableData(params,$.extend($("#searchForm").values(), {uId:uId}), interUrl.report.carDealerInfoReportList);
};
function total(){
	comn.ajax({
		url:interUrl.mockList || interUrl.report.carDealerInfoReportListStatis,
		data:$.extend($("#searchForm").values(),{ uId : uId}),
		success:function(res){
			$("#getForm").values(res.data);
		}
	});
}
total();
$("#btn-search").click(function(){
	$('#getForm')[0].reset();
	total();
})
tableEvent_1 = {
	"click .showcardealer": function(e, a, item, index) {
		comn.addTab({
			title: '车商详情',
			href:"./Modal/carDealerManage/carDealer/carDealer.html?dealerId=" + item.dealerId + "&type=2&isManager=true"
	  }); //查看车商详情
	},
	"click .showloan": function(e, a, item, index) {
		comn.addTab({
			title: '车商贷款详情',
			href:"./Modal/report/loanCostFlow/index.html?carDealerCompany=" + item.dealerName
	  }); //查看车商贷款详情
	}
};

handle_1 = function(value, row, index) {
	return ["<div class='btn-group btn-group-xs'>", "<button type='button' class='btn btn-primary dropdown-toggle' data-toggle='dropdown'>操作",
	 "<span class='caret'></span>",
	  "<span class='sr-only'>下拉切换</span>", 
	  "</button>", "<ul class='dropdown-menu' role='menu'>",
	  "<li><a class='showcardealer'>查看车商详情</a></li>" , 
	  "<li><a class='showloan'>查看车商贷款详情</a></li>", "</ul>", "</div>"].join("");
};

hasPicture = function (value, row, index) {
  return (value>0)?'有':'无';
};

hasloanTerm = function (value, row, index) {
  return (value)?value:'无';
};

hasValue = function (value, row, index) {
  return (value)?value:'--';
};

$(function(){
    $("#dealerGroupId").getDealerGroup();
	$('#companyId').getOrg();
	$('#companyId').on('change',function(){
		var code = $(this).find("option:selected").attr('value');
		if(code){
			$('#groupIdDiv').show();
			$('#groupId').getGroup(code);
		}else{
			$('#groupIdDiv').hide();
			$('#groupId').val('');
		}
	});
    //渠道来源
    // $(document).on("change","#channelSource",function(){
    //     var v = $(this).val();
    //     if(v === "2") {
    //         var _v = $("input[name='isDealerGroup']:checked").val();
    //         if (_v === undefined){
    //             $("#isDealerGroup").addClass("hide");
    //         } else if ( _v === "0"){
    //             $("#isDealerGroup").addClass("hide");
    //             $("select[name=dealerGroupId], input[name=dealerGroupName]").prop("disabled", "disabled");
    //         } else {
    //             $("#isDealerGroup").removeClass("hide");
    //             $("select[name=dealerGroupId], input[name=dealerGroupName]").prop("disabled", false);
    //         }
    //         $("#isBranchMarketing").removeClass("hide");
    //         //$("input[name='isDealerGroup']:checked").trigger("click");
    //         $("select[name=dealerGroupId], input[name=dealerGroupName]").val("");
    //         $("input[name=isDealerGroup]").prop("disabled", false);
    //     } else if(v === "3") {
    //         $("#isBranchMarketing").addClass("hide");
    //         $("#isDealerGroup").removeClass("hide");
    //         $("select[name=dealerGroupId], input[name=dealerGroupName]").prop("disabled", false);
    //         $("input[name=isDealerGroup]").prop("disabled", "disabled");
    //     } else {
    //         $("#isBranchMarketing, #isDealerGroup").addClass("hide");
    //         $("select[name=dealerGroupId], input[name=dealerGroupName], input[name=isDealerGroup]").prop("disabled", "disabled");
    //
    //     }
    // });
    //有无经销商集团
    // $(document).on("click", "input[name=isDealerGroup]", function(){
    //     var _this = $(this);
    //     if ( _this.val() === "0"){
    //         $("#isDealerGroup").addClass("hide");
    //         $("select[name=dealerGroupId], input[name=dealerGroupName]").prop("disabled", "disabled");
    //     } else {
    //         $("#isDealerGroup").removeClass("hide");
    //         $("select[name=dealerGroupId], input[name=dealerGroupName]").prop("disabled", false);
    //     }
    // });
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
});
