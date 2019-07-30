var dataLoad_1, handle, tableEvent,loanStatus;

dataLoad_1 = function(params) {
	tableData(params, $("#searchForm").values(),interUrl.gr.getLoanModifyList);
};

tableEvent = {
	"click .cancel": function(e, a, item, index) {
		var search="";
		comn.ajax({
			url:interUrl.gr.launchLoanModifyApply,
			data:{loanApplyId:item['relativeApplyId1'],flowType:"LOAN_MODIFY_FLOW"},
			success:function(res){
				tip({content:res.message || "发起贷款修改成功"});
				$("#table").bootstrapTable("refresh");
				comn.addTab({
					title: '贷款修改',
					href: "./Modal/loanManage/loanReview/loanStart.html?scoreType=edit&flow=modify&type=0&loanApplyId=" + res.data.loanApplyId + "&space=LOAN&releventFlow=LOAN_MODIFY_FLOW&releventFlowNode=LOAN_MODIFY_LAUNCH"
				});
			}
		});

	}
};

handle = function(value, row, index) {
	return ["<button type='button' class='btn btn-primary btn-xs cancel'>发起贷款修改</button>"].join("");
};

loanStatus = function(value, row, index) {
	if (typeof value === "string") { value = parseInt(value); }
	return (value === 1 && "拒绝") || (value === 2 && "通过") || (value === 3 && "审核中") || (value === 4 && "发起") || "";
};

function rowStyle(row, index) {
	//var classes = ['active', 'success', 'info', 'warning', 'danger'];
	if(row.modifyFlag==1){
		return {
			classes: 'danger'
		};
	}
	return {};
}
