var dataLoad_1, tableEvent, handle;
var _uId = comn.user.uid;
//var _uId = '3326';
var args = comn.getArgs();
dataLoad_1 = function(params){
    var p = params.data;
    var idx = $(".sortRuleStr"), sortRulesArr = [], sortRulesStr = "";
    $.each(idx, function(k, v) {
        var $el = $(v);
        sortRulesArr.push($el.find(".ruleName").val() + "," + $el.find(".ruleSort").val());
    });
    var sortRulesStr = sortRulesArr.join("|");
    console.log(sortRulesStr);
    return comn.ajax({
        url: interUrl.reportPostLoan.postLoanReport,
        data: $.extend($("#searchForm").values(), p,{
            uId: _uId,
            sortRulesSrc: sortRulesStr === "," ? "" : sortRulesStr
        }),
        success: function (res) {
            params.success({
                'total': res.totalItem,
                rows: res.data
            });
            return params.complete();
        }
    });
};
tableEvent = {
    "click .info": function(e, a, item, index) {
        return comn.addTab({
            title:"贷款详情",
            href: "./Modal/customManage/customer/loanDetail.html?id="+item.loanInfoProjectId+"&customerId="+item.customerId+"&loanApplyId="+item.loanInfoProjectId+"&projectId="+item.loanInfoProjectId + "&space=LOAN&releventFlowNode=LOAN_QUERY&releventFlow=LOAN_QUERY&loanFlag=1"
        })
    }
};

handle = function(value, row, index) {
    return ["<button type='button' class='btn btn-primary btn-xs info'>查看贷款详情</button>"].join("");
};

$(function() {
    $(".addRule").addRule();
    $("#loanBranchCompanyId").getOrg();
    $("#loanBranchCompanyId").change(function(){
        var code = $(this).val();
        $("#loanBusinessGroupId").getGroup(code);
    })
    $('#exportBtn').click(function(){
        var search=$("#searchForm").serialize();
        var downLink = interUrl.basic + interUrl.reportPostLoan.postloanInfoExport + "?" + search + '&uId=' + _uId +'&exportType=1';
        console.log(downLink);
        window.open(downLink, "_blank");
    });
});
