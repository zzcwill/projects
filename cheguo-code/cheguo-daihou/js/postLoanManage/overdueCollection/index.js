var table_1, handle_1, tableEvent_1;

//续保核验列表
table_1 = function(params) {
    tableData(params, $("#searchForm").values(), interUrl.postLoan.collectOverdueList);
};

handle_1 = function(value, row, index) {
    return ["<a class='detail' href='javascript:;'>查看贷款详情</a>"].join("");
};
tableEvent_1 = {
    "click .detail": function (e, a, item, index) {
        return comn.addTab({
            title:"贷款详情",
            href: "./Modal/customManage/customer/loanDetail.html?id="+item.projectId+"&loanApplyId="+item.projectId+"&projectId="+item.projectId + "&space=LOAN&releventFlowNode=LOAN_QUERY&releventFlow=LOAN_QUERY" + "&loanFlag=1&customerId="+item.customerId
        })
    }
}

$(function(){
    //$("#orgId").getOrg();
    //$("#coBankId").getBankAll();
    $("#orgId").getOrg( function() {
        $('.selectpicker').selectpicker('refresh');
    });
    $("#coBankId").getBankAll(function() {
        $('.selectpicker').selectpicker('refresh');
    });
    $(document).on("change", "#orgId", function(){
        $("#userGroupId").getGroup($(this).val());
    })
    $("#btn-reset").click(function(){
        $("#coBankId, #orgId").val("").change();
    })
})

//导出
$('#exportBtn').click(function(){
    var search = $("#searchForm").serialize();
    var downLink = interUrl.basic + interUrl.postLoan.collectOverdueListExport + "?" + search ;
    console.log(downLink);
    window.open(downLink, "_blank");
});