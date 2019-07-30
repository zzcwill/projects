var table_1, handle_1, tableEvent_1;

//续保核验列表
table_1 = function(params) {
    tableData(params, $("#searchForm").values(), interUrl.feeManage.bankFeeList);
};

handle_1 = function(value, row, index) {
    var str = "";
    if (row.status == 2 || row.status == 4) {
        str = "<li><a class='advancesApply'>查看垫款申请</a></li><li><a class='detail'>查看贷款详情</a></li>";
    } else {
        str = "<li><a class='detail'>查看贷款详情</a></li>";
    }
    return ["<div class='btn-group btn-group-xs'>",
        "<button type='button' class='btn btn-primary dropdown-toggle' data-toggle='dropdown'>操作",
        "<span class='caret'></span>", "<span class='sr-only'>下拉切换</span>",
        "</button>",
        "<ul class='dropdown-menu' role='menu'>"+ str,
        "</ul>",
        "</div>"].join("");
};
tableEvent_1 = {
    "click .advancesApply": function(e, a, item, index) {
        return comn.addTab({
            title : "查看垫款详情",
            href : "./Modal/finaceManage/advanceFeeLaunch/advanceFeeApply.html?type=show&projectId="+item.projectId +"&feeId="+item.feeManageAdvanceId
        })
    },
    "click .detail": function (e, a, item, index) {
        return comn.addTab({
            title:"贷款详情",
            href: "./Modal/customManage/customer/loanDetail.html?id="+item.projectId+"&customerId="+item.customerId+"&loanApplyId="+item.projectId+"&projectId="+item.projectId + "&space=LOAN&releventFlowNode=LOAN_QUERY&releventFlow=LOAN_QUERY" + "&loanFlag=1"
        })
    }
}

$(function(){
    $("#orgId").getOrg();
    $("#coBankId").getBankAll();
})

//导出
$('#exportBtn').click(function(){
    var search = $("#searchForm").serialize();
    var downLink = interUrl.basic + interUrl.feeManage.exportBankFeeList + "?" + search ;
    console.log(downLink);
    window.open(downLink, "_blank");
});