var dataLoad_1;
var uId = comn.user.uid;
var args = comn.getArgs();
dataLoad_1= function(params){
    var p;
    p = params.data;
    comn.ajax({
        url: interUrl.mockList || interUrl.report.queryLoanAlarms,
        data: $.extend($("#searchForm").values(), p),
        success: function(res) {
            var data = JSON.parse(res.data);
            console.log(data);
            params.success({
                'total': data.totalItem,
                'rows': data.data
            });
            params.complete();
        }
    });
};
// function total(){
//     comn.ajax({
//         url:interUrl.mockList ||interUrl.report.queryBusinessStatis,
//         data: $.extend($("#searchForm").values(),{ uId : uId}),
//         success:function(res){
//             $("#getForm").values(res.data);
//         }
//     });
// };
// total();
// $("#btn-search").click(function(){
//     total();
// })
tableEvent = {
    "click .info": function(e, a, item, index) {
        console.log(item)
        return comn.addTab({
            title:"贷款详情",
            href: "./Modal/customManage/customer/loanDetail.html?id="+ item.projectId +"&projectId=" + item.projectId +"&loanApplyId="+ item.projectId +"&space=LOAN&releventFlowNode=LOAN_QUERY&releventFlow=LOAN_QUERY"
        })
    }
};

handle = function(value, row, index) {
    return ["<button type='button' class='btn btn-primary btn-xs info'>查看贷款详情</button>"].join("");
};

$(function() {
    $("#resetValue").click(function(){
        $("#orgId").val("").change();
    });
    $("#dealerGroupId").getDealerGroup();
    $("#searchForm").values(args);
    $("#orgId").getOrg( function() {
        $('.selectpicker').selectpicker('refresh');
    });
    $("#orgId").off('change').on("change", function() {
        var code = $(this).find("option:selected").attr('value');
        $("#loanBusinessGroupId").getGroup(code);
    });
    $("#loanBusinessGroupId").off('change');
    /** 合作银行 **/
    $("#loanInfoCooperationBankId").getBankAll(function() {
        $('.selectpicker').selectpicker('refresh');
    });
    $('#exportBtn').click(function(){
        var search=$("#searchForm").serialize();
        var downLink = interUrl.basic + interUrl.report.loanAlarmExport + "?" + search;
        console.log(downLink);
        window.open(downLink, "_blank");
    });
});
