var table_1, table_2,handle_1, handle_2, handle_3, tableEvent_1, tableEvent_2;
var activeTab=$(".tab-content").find(".tab-pane.active").attr("id");
//表单中的日期
$("#startDay").getLastMonthDay1();
$("#now").getToday();
//点击切换头部表单
$("#nav li").click(function(){
    var index = $(this).index();
    $("form").hide();
    $("form").eq(index).show();
});
//待登记
table_1 = function(params) {
    var p = params.data;
    p['status'] = 1;
    tableData(params, $.extend($("#loanInsuranceForm1").values(), p), interUrl.insurance.loanInsuranceList);
};

handle_1 = function(value, row, index) {
    return ["<div class='btn-group btn-group-xs'>", 
    "<button type='button' class='btn btn-primary dropdown-toggle' data-toggle='dropdown'>操作", 
    "<span class='caret'></span>", "<span class='sr-only'>下拉切换</span>", 
    "</button>", "<ul class='dropdown-menu' role='menu'>",
    "<li><a class='edit'>保单管理</a></li>" , 
    "<li><a class='info'>查看贷款详情</a></li>", "</ul>", "</div>"].join("");
};

handle_3 = function(value, row, index) {
    return value+"+"+row.carMakeName+"+"+row.carModelName;
};
tableEvent_1 = {
    "click .edit": function(e, a, item, index) {
        return comn.addTab({
            href:'./Modal/insuranceManage/firstInsurance/insuranceInfo.html?projectId='+a+"&predictedPurchasetax="+item['predictedPurchasetax'],
            title: '保单信息录入'
        })
    },
    "click .info": function(e, a, item, index) {
        return comn.addTab({
            href: "./Modal/customManage/customer/loanDetail.html?id="+item.projectId+"&loanApplyId="+item.relativeApplyId1+"&businessTypeCode=" + item.flowType+"&projectId="+item.projectId+"&space=LOAN&releventFlowNode=LOAN_QUERY&releventFlow=LOAN_QUERY",
            title: '查看贷款项目'
        })
    }

};
//已登记
table_2 = function(params) {
    var p = params.data;
    p['status'] = 2;
    tableData(params, $.extend($("#loanInsuranceForm2").values(), p), interUrl.insurance.loanInsuranceList);
};
handle_2 = function(value, row, index) {
    return ["<a class='modify' href='javascript:;'>查看保单详情</a>"].join("");
};
tableEvent_2 = {
    "click .modify": function(e, a, item, index) {
        return comn.addTab({
            title:"保单详情",
            href:'./Modal/insuranceManage/firstInsurance/insuranceInfo.html?projectId='+a+"&predictedPurchasetax="+item['predictedPurchasetax']
        })
    }
};
//查询列表
$("#btn-search").click(function() {
    if(activeTab === "todo"){
        $("#table1").bootstrapTable("refresh", {url: "..."});
    }else if(activeTab === "done"){
        $("#table2").bootstrapTable("refresh", {url: "..."});
    }
});