//boostarp-table插件相关start
var table_1 = function(params) {
    var o = $("#searchForm").values();
    o.coBankId = $("#coBankId").val() ? ($("#coBankId").val()).join(",") : '';
    var p = params.data;
    return comn.ajax({
        url: interUrl.feeManage.feeManageAdvancesListing,
        data: $.extend(o, p),
        success: function (res) {
            params.success({
                'total': res.totalItem,
                rows: res.data
            });
            params.complete();
        }
    });    
};

var handle_1 = function(value, row, index) {
    var str = "<li><a class='detail'>查看贷款详情</a></li>";

    return ["<div class='btn-group btn-group-xs'>",
        "<button type='button' class='btn btn-primary dropdown-toggle' data-toggle='dropdown'>操作",
        "<span class='caret'></span>", "<span class='sr-only'>下拉切换</span>",
        "</button>",
        "<ul class='dropdown-menu' role='menu'>"+ str,
        "</ul>",
        "</div>"].join("");
};
var tableEvent_1 = {
    "click .detail": function (e, a, item, index) {
        return comn.addTab({
            title:"贷款详情",
            href: "./Modal/customManage/customer/loanDetail.html?id="+item.projectId+"&customerId="+item.customerId+"&loanApplyId="+item.projectId+"&projectId="+item.projectId + "&space=LOAN&releventFlowNode=LOAN_QUERY&releventFlow=LOAN_QUERY" + "&loanFlag=1"
        })
    }
}
//boostarp-table插件相关end

$(function(){
    //导出数据接口
    $('#exportBtn').click(function(){
        var search = $("#searchForm").serialize();
        var downLink = interUrl.basic + interUrl.feeManage.feeManageAdvancesListingExport + "?" + search ;
        window.open(downLink, "_blank");
    });   
    
    //清楚查询条件
    $("#btn-reset").click(function () {
        $(".selectpicker").val("").change();
        $(".selectpicker").selectpicker('val', []);
    });    
    
    //首次加载执行方法
    $("#orgId").getOrg('', function () {
        $('.selectpicker').selectpicker('refresh');
    }, '');
    $("#coBankId").getBankAll('', function () {
        $('.selectpicker').selectpicker('refresh');
    }, '-1');  
});