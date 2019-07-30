var dataLoad_4, tableEvent_4, handle_4;

//贷款发起征信记录
dataLoad_4 = function(params) {
	var p;
	data = {
		loanApplyId: args["loanApplyId"],
		creditId: args["creditApplyId"],
		customerId : args["customerId"],
		projectId: args["projectId"]
	}
	p = params.data;
	return comn.ajax({
		async: false,
		url: interUrl.credit.getCustomerCreditListByProjectId,
		data: data,
		success: function(res) {
			params.success({
				'total': res.totalItem,
				rows: res.data
			});
			$("#table_4").bootstrapTable('load', res.data);
			return params.complete();
		}
	});
};

tableEvent_4 = {
	"click .loanStart1": function(e, a, item, index) {
	     comn.addTab({title: '征信详情',  href: './Modal/loanManage/creditManage/creditInfo.html?type=1&businessId='+item.creditId });
	}
};

handle_4 = function(value, row, index) {
	return ["<button type='button' class='btn btn-primary btn-xs loanStart1'>查看详情</button>"].join("");
};
$("#table_4").bootstrapTable();
