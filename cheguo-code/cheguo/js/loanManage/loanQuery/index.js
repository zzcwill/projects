var dataLoad_1, handle, tableEvent, payStatus;
//还没有手动操作改变，贷款类型
var isNoChangeLoanType = true;
//是否是点击查询按钮查询 (而不是点击分页数查询) -查询接口优化(数据和总条数分两次调接口)
var isNoClickSearch = true;
//数据总条数-查询接口优化需要
var dataTotalItem = '';


dataLoad_1 = function (params) {
    var p = params.data;
    var data = $.extend($("#searchForm").values(), p);

    if(isNoChangeLoanType) {
        data.loanType = '6'; 
    }    

    comn.ajax({
        url: interUrl.gr.loanInfoList,
        data: data,
        success: function (res) {
            params.success({
                'total': dataTotalItem,
                'rows': res.data
            });
            params.complete();
            //如果点击查询按钮有可能会变总数
            if(isNoClickSearch) {
                isNoClickSearch = false;
                
                params.success({
                    'total': '',
                });
                params.complete();

                data.onlyCount = true;
                $.ajax({
                    type:"post",
                    url: interUrl.basic + interUrl.gr.loanInfoList,
                    data: data,
                    success: function (res2) {
                        params.success({
                            'total': res2.totalItem,
                        });
                        dataTotalItem = res2.totalItem;
                        params.complete();
                    }
                });                
            }
            
        }
    });
};
tableEvent = {
    "click .info": function (e, a, item, index) {
        var type;
        if (item.loanType == 5) {
            type = 'ownersStaging';
        }
        //影像管理传 id的值（即projectId, 已和文林确认）
        return comn.addTab({
            title: "贷款详情",
            href: "./Modal/customManage/customer/loanDetail.html?id=" + item.projectId + "&loanApplyId=" + item.relativeApplyId1 + "&businessTypeCode=" + item.flowType + "&projectId=" + item.projectId + "&space=LOAN&releventFlowNode=LOAN_QUERY&releventFlow=LOAN_QUERY" + "&loanFlag=1&type=" + type
        })
    },
    "click .pay": function (e, a, item, index) {
        return comn.addTab({
            title: "付款详情",
            href: "./Modal/task/myTask/transaction.html?&customerName=" + item.customerName + '&projectNo=' + item.projectNo + '&loanApplyId=' + item.relativeApplyId1 + '&projectId=' + item.projectId
        });
    }
};
handle = function (value, row, index) {
    var pay;
    if (row.id) {
        pay = '<li><a href="javascript:;" class="pay">查看付款详情</a></li>'
    };
    return ['<div class="dropdown">',
        '<button class="btn btn-primary btn-xs dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">操作',
        '<span class="caret"></span>',
        '</button>',
        '<ul class="dropdown-menu" aria-labelledby="dropdownMenu1">',
        '<li><a href="javascript:;" class="info">查看贷款详情</a></li>',
        pay,
        '</ul>',
        '</div>'].join("");
};
payStatus = function (value, row, index) {
    return ['--', '付款中', '付款成功', '付款失败', '人工付款'][value]
}
$(function () {
    $("#lauchOrgId").getOrg(); //机构
    var dataArr = [["#carType", "CarType"]];
    $.getCommonMethodPort(dataArr);

    //默认选中车价贷
    $("#loanType").val('6');
    $("#status").getLoanFlowStatusList('6');

    $("#loanType").on('change', function () {
        isNoChangeLoanType = false;

        var val = $(this).val();
        if (val) {
            $("#status").getLoanFlowStatusList(val); //贷款状态
        } else {
            $("#status").html('<option value="">--请选择--</option>')
        }

    });

    //查询按钮点击事件
    $("#btn-search-query").click(function () {
        isNoClickSearch = true;

        $("#table").bootstrapTable("refresh", { url: "..." });
    });

    //清除查询条件点击事件，去默认车价贷查询
    $('#btn-clear-query').click(function () {
        isNoChangeLoanType = false;
    });
});
