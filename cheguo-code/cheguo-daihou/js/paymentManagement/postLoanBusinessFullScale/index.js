var table, handle_1, loanInfo, paymentConditions, datehand, loanType, Event_1

handle_1 = function (value, row, index){
    return `<a href="javascript:void(0)" class="detail">查看详情</a>`
}
Event_1 ={
    "click .detail":function (e, a, item, index){
        var projectId = item.projectId;
        var customerId = item.customerId;
        return comn.addTab({
            title: "贷款详情",
            href: "./Modal/customManage/customer/loanDetail.html?id=" + projectId + "&customerId=" + customerId + "&loanApplyId=" + projectId + "&projectId=" + projectId + "&space=LOAN&releventFlowNode=LOAN_QUERY&releventFlow=LOAN_QUERY" + "&loanFlag=1"
        })
    }
} 
loanType = function (value, row, index){
            if (row.businessType == 0)
            {
                return "待放款"
            }
            else if (row.businessType == 1)
            {
                return "已放款"
            }
            else if (row.businessType == 2) {
                return "已作废"
            }
}
loanInfo = function (value, row, index) {
    var loanType = ""; 
    if (row.loanType == 5)
    {
        loanType = "车主贷"
    }
    else if (row.loanType == 6) {
        loanType = "车价贷 "
    }
    else if (row.loanType == 7) {
        loanType = "易融贷"
    }
    else if (row.loanType == 8) {
        loanType = "车信贷"
    }
    else if (row.loanType == 9) {
        loanType = "微车贷"
    }
    var str = [
        '产品：' + loanType + '<br />',
        '金额：' + (row.loanAmount || '--') + '<br />',
        '期限：' + (row.loanTerm || '--'),
    ].join('')
    return str;
}
datehand = function (value, row, index) {
    var str = [
        '发起：' + (row.createTime || '--') + '<br />',
        '付款：' + (row.paymentDate || '--') + '<br />',
        '放款：' + (row.bankLoanDate || '--'),
    ].join('')
    return str;
}
paymentConditions = function (value, row, index) {
    var str = [
        '当前期数：' + (row.currentPlanNoDesc || '--') + '<br />',
        '连续逾期：' + (row.continuousOverdueTimes || '--') + '<br />',
        '累计逾期：' + (row.accumulatedOverdueTimes || '--'),
    ].join('')
    return str;
}

table = function (params) {
    return comn.ajax({
        url: interUrl.paymentManagement.repaymentManageList,
        data: $.extend($("#messageForm").values(), params.data),
        success: function (res) {
            params.success({
                'total': res.totalItem,
                 rows: res.data
            });
            return params.complete();
        }
    });
}


$(function(){

})

