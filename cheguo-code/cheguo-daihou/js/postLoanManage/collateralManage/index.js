var table_1, handle_1, handle_2, tableEvent_1;
//获取银行列表
    $("#bankId").getBankAll();
//获取机构列表
    $("#orgId").getOrg();
table_1 = function(params) {
        tableData(params, $("#recentOverdueForm").values(),  interUrl.collateral.getList);
}
handle_1 = function (value, row, index) {
	return ["<div class='btn-group btn-group-xs'>", 
			"<button type='button' class='btn btn-primary dropdown-toggle' data-toggle='dropdown'>操作", 
			"<span class='caret'></span>", "<span class='sr-only'>下拉切换</span>", 
			"</button>",
				"<ul class='dropdown-menu' role='menu'>", 
					row.status == 2 ? "<li><a class='outApply'>出库申请</a></li>" : "<li><a class='see'>查看占管记录</a></li>", 
					"<li><a class='loanSee'>查看贷款详情</a></li>",
				"</ul>",
			"</div>"].join("");
};
handle_2 = function (value, row, index) {
    return [null, null, "已入库", null, "出库审批中", "已出库"][value] || null;
};
tableEvent_1 = {
    "click .outApply": function(e, a, item, index) {
        return comn.addTab({
            title: "出库申请",
            href:"./Modal/postLoanManage/collateralManage/shippingApply.html?type=outApply&id=" + item.id + "&projectId=" + item.projectId +"&tableName=checkout_car_apply"
        });
    },
    "click .see": function(e, a, item, index) {
        return comn.addTab({
            title: "查看占管记录",
            href:"./Modal/postLoanManage/collateralManage/shippingApply.html?type=see&tableName=checkout_car_apply&id=" + item.id + "&projectId=" + item.projectId +"&businessTypeCode=CAR_CHECKOUT_FLOW"
        });
    },
    "click .loanSee": function(e, a, item, index) {
        return comn.addTab({
            title: "查看贷款详情",
           href : "./Modal/customManage/customer/loanDetail.html?projectId=" + item.projectId+"&customerId="+item.customerId + "&loanApplyId=" + item.projectId + "&space=LOAN&releventFlowNode=LOAN_QUERY&releventFlow=LOAN_QUERY"
        });
    }
};