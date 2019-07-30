var dataLoad_1, tableEvent, handle_1, feeTypeCode, feeStatus;
var args = comn.getArgs();
dataLoad_1 = function(params) {
    tableData(params, $("#searchForm").values(), interUrl.feeManage.feeManageAdvanceList);
};
feeTypeCode =function(value, row, index){
    return [null, "业务费用", "风险费用"][value] || null;
};
feeStatus =function(value, row, index){
    return ["待发起 ", "待提交", "审批中", "审批通过", "已付款"][value] || null;
};

tableEvent_1 = {
    "click .show": function(e, a, item, index) {
        comn.addTab({title: '费用申请详情',
            href: "./Modal/finaceManage/advanceFeeLaunch/advanceFeeApply.html?type=show&feeId=" + item.id + "&status=" + item.status +"&typeOption=none"});
    },
    "click .approve": function(e, a, item, index) {
        comn.addTab({title: '提交费用申请',
            href: "./Modal/finaceManage/advanceFeeLaunch/advanceFeeApply.html?type=approve&feeId=" + item.id});
    },
    "click .lauchFee": function(e, a, item, index) {
        comn.addTab({title: '垫款费用修改',
            href: "./Modal/finaceManage/advanceFeeLaunch/advanceFeeApply.html?type=modify&feeId=" + item.id});
    }
};

handle_1 = function(value, row, index) {
    if(row.status == 1){
        return ['<a class="approve" href="javascript:;">提交审批</a>'].join("");
    }else if(row.status == 4){
        return ['<a class="show" href="javascript:;">查看详情</a>'];
    } else {
        return ['<a class="show" href="javascript:;">查看详情</a>'].join("");
    }
};

$(function(){
    $("#orgId").getOrg();
    $("#coBankId").getBankAll();
    $('#searchForm input[name=startApplyDate], #searchForm input[name=startActualDate]').getMonthDayFirst();
    $('#searchForm input[name=endApplyDate], #searchForm input[name=endActualDate]').getToday();
    console.log("comn.table:",comn.table)
    $("#table").bootstrapTable(comn.table);

    $("#register").click(function(){
        comn.addTab({
            title: '垫款费用申请',
            href: './Modal/finaceManage/advanceFeeLaunch/advanceFeeApply.html?t=' + (new Date().getTime()) +"&feeType=tip"});
    });
});
