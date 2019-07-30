var InsurancePolicy_edit,AfterConfirmedPhoneRecords_edit,editTableEvent;


var jqQasicInformationUrl=comn.getArgs();//获取url参数并且格式化成对象


// 保单详情按钮

InsurancePolicy_edit = function(value, row, index) {
	/*console.log(row);
	console.log(index);
	console.log(value);*/
	/*
		index为索引
		row为返回当前一条记录的对象
		value为当前值
	*/
	return ["<button type='button' class='btn btn-primary btn-xs InsurancePolicy_edit' style='margin-left:10px;'>查看详情</button>"].join("");
};

//还款记录按钮
AfterConfirmedPhoneRecords_edit=function(){
	return ["<button type='button' class='btn btn-primary btn-xs AfterConfirmedPhoneRecords_edit' style='margin-left:10px;'>查看详情</button>"].join("");
}



// 保单列表
InsurancePolicy=function(params){
	return tableData(params, $.extend($("#searchForm").values(), {
    	isRegistered: 1
    }),interUrl.mockList || interUrl.creditManagement.loanContractList);
};


// 保单列表
AfterConfirmedPhoneRecords=function(params){
	return tableData(params, $.extend($("#searchForm").values(), {
    	isRegistered: 1
    }),interUrl.mockList || interUrl.creditManagement.loanContractList);
};


// 操作按钮绑定事件
editTableEvent = {
	// 保单详情
	"click .InsurancePolicy_edit": function(e, a, item, index) {
		//addTab方法是打开窗口方法
		return comn.addTab({
			title:"保单详情",
			href: "./Modal/SettlementRegistration/bartenderRecord/policyDetails.html?id="+item.projectId+"&loanApplyId="+item.relativeApplyId1+"&businessTypeCode=" + item.flowType+"&projectId="+item.projectId + "&space=LOAN&releventFlowNode=LOAN_QUERY&releventFlow=LOAN_QUERY"
		});
	},

	// 继保电话记录
	"click .AfterConfirmedPhoneRecords_edit": function(e, a, item, index) {
		//addTab方法是打开窗口方法
		return comn.addTab({
			title:"还款记录情",
			href: "./Modal/SettlementRegistration/CheckLoanDetails/CheckLoanDetails.html?id="+item.projectId+"&loanApplyId="+item.relativeApplyId1+"&businessTypeCode=" + item.flowType+"&projectId="+item.projectId + "&space=LOAN&releventFlowNode=LOAN_QUERY&releventFlow=LOAN_QUERY"
		});
	}
};