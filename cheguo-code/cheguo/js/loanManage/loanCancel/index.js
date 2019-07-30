var dataLoad_1, handle, tableEvent,loanStatus;

dataLoad_1 = function(params) {
	tableData(params, $("#searchForm").values(),interUrl.gr.getLoanCancelList);
};

tableEvent = {
	"click .cancel": function(e, a, item, index) {
		var search="";
		comn.ajax({
			url:interUrl.gr.launchLoanModifyApply,
			data:{loanApplyId:item['relativeApplyId1'],flowType:"LOAN_CANCEL_FLOW"},
			success:function(res){
				search = "bopInfoId=" + res.data.bopInfoId + "&loanApplyId=" + res.data.loanApplyId+ "&businessTypeCode=" + res.data.businessTypeCode + "&businessGroupId=" + res.data.businessGroupId + "&currentNodeKey=" + res.data.currentNodeKey+"&space=LOAN"+"&releventFlowNode=" + res.data.currentNodeKey+"&releventFlow=" + res.data.businessTypeCode;
				tip({content:res.message || "发起贷款作废成功"});
				$("#table").bootstrapTable("refresh");
				comn.addTab({
					title: '贷款作废',
					href: "./Modal/loanManage/loanCancel/office.html?"+search+"&flow=cancel" + '&projectId=' + item.projectId
				});
			}
		});

	}
};

handle = function(value, row, index) {
	return ["<button type='button' class='btn btn-primary btn-xs cancel'>发起贷款作废</button>"].join("");
};

loanStatus = function(value, row, index) {
	if (typeof value === "string") { value = parseInt(value); }
	return (value === 1 && "拒绝") || (value === 2 && "通过") || (value === 3 && "审核中") || (value === 4 && "发起") || "";
};

