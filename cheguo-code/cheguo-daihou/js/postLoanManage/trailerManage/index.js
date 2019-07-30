var table_1, handle_1, handle_2, tableEvent_1, indexSort;
//获取银行列表
	$("#bankId").getBankAll();
//获取机构列表
	$("#orgId").getOrg();
table_1 = function(params) {
        tableData(params, $("#trailerForm").values(),  interUrl.trailer.getList);
}
handle_1 = function (value, row, index) {
	return ["<div class='btn-group btn-group-xs'>", 
			"<button type='button' class='btn btn-primary dropdown-toggle' data-toggle='dropdown'>操作", 
			"<span class='caret'></span>", "<span class='sr-only'>下拉切换</span>", 
			"</button>",
				"<ul class='dropdown-menu' role='menu'>", 
					row.status == 1 ? "<li><a class='outApply'>登记</a></li>" : "<li><a class='loanSee'>查看拖车登记</a></li>", 
					"<li><a class='see'>查看基本详情</a></li>",
				"</ul>",
			"</div>"].join("");
};
handle_2 = function (value, row, index) {
	return [null, "待拖车", "已入库", "已撤销"][value] || null;
};
indexSort = function (value, row, index) {
	return index + 1;
};
tableEvent_1 = {
    "click .outApply": function(e, a, item, index) {
        return comn.addTab({
            title: "拖车登记",
            href:"./Modal/postLoanManage/trailerManage/trailerRecord.html?type=trailerRecord&id=" + item.id + "&launchUserId=" + item.launchUserId
        });
    },
    "click .see": function(e, a, item, index) {
        return comn.addTab({
            title : '贷款详情',
            href : "./Modal/customManage/customer/loanDetail.html?projectId=" + item.projectId +"&customerId="+item.customerId +"&loanApplyId=" + item.projectId + "&space=LOAN&releventFlowNode=LOAN_QUERY&releventFlow=LOAN_QUERY"
        });
    },
    "click .loanSee": function(e, a, item, index) {
        return comn.addTab({
            title: "查看拖车登记",
            href:"./Modal/postLoanManage/trailerManage/trailerRecord.html?type=trailerRecordSee&id=" + item.id + "&launchUserId=" + item.launchUserId+"&loanApplyId="+item.id +"&businessTypeCode=TOW_CAR_APPLY_FLOW"
        });
    }
};
$("#btn-Apply").unbind('click').click(function () {
	return comn.addTab({
            title: "拖车申请",
            href:"./Modal/postLoanManage/trailerManage/trailerApply.html?type=trailerApply&tableName=drag_car_apply"
        });
});