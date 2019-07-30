var dataLoad_4, tableEvent_4, handle_4;

//贷款发起征信记录
dataLoad_4 = function(params) {
	tableData(params, {
		creditApplyId: args['creditApplyId'],
		loanApplyId: args["loanApplyId"],
		projectId: args["projectId"], 
		flowType: args['releventFlow'] || "",
		nodeKey: args['currentNodeKey'] || args['releventFlowNode'] 
	}, interUrl.credit.getCustomerCreditListByProjectId)
};

tableEvent_4 = {
	"click .loanStart1": function(e, a, item, index) {
	     comn.addTab({
			 title: '征信详情',
			 href: './Modal/loanManage/creditManage/creditInfo.html?type=1&businessId='+item.creditId
		 });
	}
};

handle_4 = function(value, row, index) {
	return ["<button type='button' class='btn btn-primary btn-xs loanStart1'>查看详情</button>"].join("");
};

$(function () { $("#table_4").bootstrapTable(comn.table); });
