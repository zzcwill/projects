//bootstrap-table配置start
var dataLoad_1= function(params){
    var p = params.data;
    comn.ajax({
        url: interUrl.carCreditLoan.otherOrgPaymentList,
        data: $.extend($("#searchForm").values(), p),
        success: function(res) {
            params.success({
                'total': res.totalItem,
                'rows': res.data
            });
            params.complete();
        }
    });
};

var tableEvent = {
    "click .info": function(e, a, item, index) {
        return comn.addTab({
            title:"贷款详情",
            href: "./Modal/customManage/customer/loanDetail.html?id="+ item.projectId +"&projectId=" + item.projectId +"&loanApplyId="+ item.projectId +"&space=LOAN&releventFlowNode=LOAN_QUERY&releventFlow=LOAN_QUERY"
        })
    }
};

var handle = function(value, row, index) {
    return ["<button type='button' class='btn btn-primary btn-xs info'>查看贷款详情</button>"].join("");
};
//bootstrap-table配置end

//报警日期初始化
function warnDayInit() {
    //根据毫秒转日期
    function msToTime() {
        var t = new Date()
        var y = t.getFullYear()
        var m = t.getMonth() + 1
        var d = t.getDate()
        m = m < 10 ? '0' + m : m
        d = d < 10 ? '0' + d : d
        var str = y + '-' + m + '-' + d
        return str
    }

    $('#paymentDateBegin').val(msToTime());
    $('#paymentDateEnd').val(msToTime());

}
warnDayInit();

$(function() {
    //清空查询条件
    $("#resetValue").click(function(){
        $("#orgId").val("").change();
    });

    //机构列表获取
    $("#orgId").getOrg( function() {
        $('.selectpicker').selectpicker('refresh');
    });
    
    //机构改变事件
    $("#orgId").on("change", function() {
        var code = $(this).find("option:selected").attr('value');
        $("#loanBusinessGroupId").getGroup(code);
    });

    //导出报表点击事件
    $('#exportBtn').click(function(){
        var search=$("#searchForm").serialize();
        var downLink = interUrl.basic + interUrl.carCreditLoan.otherOrgPaymentExport + "?" + search;
        window.open(downLink, "_blank");
    });
});
