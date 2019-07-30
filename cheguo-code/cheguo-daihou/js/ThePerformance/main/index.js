var SettlementRegistration,editTableEvent,yc,dk,yq;
yc=function(value, row, index){
	if(row.renewalDeposit==null){
		return 0;
	}
};
dk=function(value, row, index){
	if(row.advanceBalance==null){
		return 0;
	}
};
yq=function(value, row, index){
	if(row.returnAmount==null){
		if(isNaN(row.renewalDeposit)){
			row.renewalDeposit=0;
		}
		if(isNaN(row.advanceBalance)){
			row.advanceBalance=0;
		}
		if(isNaN(row.pbDeposit)){
			row.pbDeposit=0;
		}
		return parseInt(row.pbDeposit)-parseInt(row.renewalDeposit)-parseInt(row.advanceBalance);
	}else{
		return value;
	}
}


// 履约保证金
SettlementRegistration=function(params){
	tableData(params, $("#searchForm").values(), interUrl.ThePerformance.lyIndexUrl || interUrl.mockList);
};
// 点击查询
$(function() {
  return $("#btn-search2").click(function() {
    return $("#sign").find("table").bootstrapTable("refresh", {url:'...'});
  });
});


// 列表的自定义按钮
SettlemenStatus = function(value, row, index) {
	//console.log(row);
	/*console.log(index);
	console.log(value);*/
	/*
		index为索引
		row为返回当前一条记录的对象
		value为当前值
	*/
	// console.log(row.returnStatusName == "未结清");
	var returnStatusName_str = "";
	returnStatusName_str = row.returnStatusName == "未清退" ? "<li><a class='SettlementProcessing'>清退处理</a></li>" : "<li><a class='SettlementProcessing2'>查看清退详情</a></li>";
	if(row.returnStatusName == "已关闭") {
		returnStatusName_str = "<li><a class='SettlementProcessing'>清退处理</a></li><li><a class='SettlementProcessing2'>查看清退详情</a></li>"
	}
	return 	["<div class='btn-group btn-group-xs'>",
					"<button type='button' class='btn btn-primary dropdown-toggle' data-toggle='dropdown'>操作", 
						"<span class='caret'></span>", "<span class='sr-only'>下拉切换</span>", 
					"</button>",
					"<ul class='dropdown-menu' role='menu'>",
						returnStatusName_str,
						"<li><a class='CheckDetails'>查看基本详情</a></li>",
					"</ul>",
				"</div>"].join("");
};

// 当前列的按钮事件绑定
editTableEvent = {
	// 结清处理按钮点击时
	"click .SettlementProcessing": function(e, a, item, index) {
		return comn.addTab({
			title:"清退处理",
			href: "./Modal/ThePerformance/RepelProcessing/RepelProcessing.html?projectId="+item.projectId +"&currentNode=LAUNCH_BOND_CLEAR&pbDeposit="+item.pbDeposit+"&renewalDeposit="+item.renewalDeposit+"&businessId="+item.id+"&loanApplyId"+item.id
		});
	},
	"click .SettlementProcessing2":function(e, a, item, index){
		return comn.addTab({
			title:"查看清退详情",
			href: "./Modal/ThePerformance/RepelProcessing/RepelProcessing.html?projectId="+item.projectId+"&pbDeposit="+item.pbDeposit+"&disble=0&xiangqing=1&loanApplyId="+item.id +"&businessTypeCode=PERFORM_DUTIES_BOND_CLEAR_FLOW"
		});
	},
	// 查看贷款详情时
	"click .CheckDetails": function(e, a, item, index) {
		return comn.addTab({
			title:"贷款详情",
			href: "./Modal/customManage/customer/loanDetail.html?id="+item.projectId+"&loanApplyId="+item.projectId+"&businessTypeCode=" + item.flowType+"&projectId="+item.projectId + "&space=LOAN&releventFlowNode=LOAN_QUERY&releventFlow=LOAN_QUERY" + "&loanFlag=1&customerId="+item.customerId
		});
	}
};