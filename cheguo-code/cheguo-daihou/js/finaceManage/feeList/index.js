var dataLoad_1, tableEvent, handle;
var args = comn.getArgs();
//列表信息
dataLoad_1 = function(params) {
    tableData(params, $("#searchForm").values(), interUrl.feeManage.feeDetailList, function(){
        //收支金额
        comn.ajax({
            url : interUrl.feeManage.feeDetailListStatis,
            data : $("#searchForm").values(),
            success : function(res) {
                $("#detailListStatis").nameValues(res.data);
            }
        })
    });
};
$("#table").bootstrapTable(comn.table);
tableEvent = {
    "click .show": function(e, a, item, index) {
        comn.addTab({
            title : '贷款详情',
            href: "./Modal/customManage/customer/loanDetail.html?loanApplyId="+ item.loanApplyId+"&customerId="+item.customerId +"&projectId="+ item.projectId +"&space=LOAN&releventFlowNode=LOAN_QUERY&releventFlow=LOAN_QUERY"
        });

    },
    "click .showCollectionRegistration": function(e, a, item, index) {
        return comn.addTab({
            title : '收款登记详情',
            href: "./Modal/finaceManage/collectionRegistration/collectionInfo.html?type=show&feeId=" + item.id + "&status=" + item.status
        });
    },
    "click .showFeeList": function(e, a, item, index) {
        return comn.addTab({
            title : '垫款费用详情',
            href: "./Modal/finaceManage/advanceFeeLaunch/advanceFeeApply.html?type=show&feeId=" + item.bussinessId + "&status=" + item.status +"&typeOption=none"
        });
    },
    "click .showCoustLaunch": function(e, a, item, index) {
        return comn.addTab({
            title : '费用详情',
            href: "./Modal/finaceManage/costLaunch/costInfo.html?type=show&feeId=" + item.id + "&status=" + item.status +"&typeOption=none"
        });
    }
};

handle = function(value, row, index) {
    var feeStatus = "";
    if (row.isIncome == "2") {
        feeStatus = "<li><a class='showCollectionRegistration'>查看收款登记详情</a></li>"
    } else if ((row.isIncome == "1") && (row.feeCategoryCode == "30") && (row.bussinessId != null)) {
        feeStatus = "<li><a class='showFeeList'>查看垫款费用详情</a></li>"
    } else {
        feeStatus = "<li><a class='showCoustLaunch'>查看费用详情</a></li>"
    }
    return ["<div class='btn-group btn-group-xs'>",
        "<button type='button' class='btn btn-primary dropdown-toggle' data-toggle='dropdown'>操作",
        "<span class='caret'></span>", "<span class='sr-only'>下拉切换</span>",
        "</button>",
        "<ul class='dropdown-menu' role='menu'>",
        feeStatus,
        "<li><a class='show'>查看贷款详情</a></li>",
        "</ul>",
        "</div>"].join("");
};

//导出
$('#exportBtn').click(function(){
    var search = $("#searchForm").serialize();
    var downLink = interUrl.basic + interUrl.feeManage.feeDetailListExport + "?" + search ;
    console.log(downLink);
    window.open(downLink, "_blank");
});

$(function(){
    $("#launchOrgId").getOrg();
    $("#coBankId").getBankAll();
    $(document).on("change", "#launchOrgId", function(){
        $("#userGroupId").getGroup($(this).val());
    })
})