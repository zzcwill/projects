var table_insurance, table_insuranceTel,handle_1, handle_2, tableEvent_1, tableEvent_2;

//保单信息
var data = {
    projectId: args["projectId"],
    flag : 0
}
table_insurance = function(params) {
    tableData(params, data, interUrl.insurance.getRenewInsuranceListInfo);
};
handle_1 = function(value, row, index) {
    return ["<a class='see' href='javascript:;'>查看</a>"].join("");
};
tableEvent_1 = {
    "click .see": function(e, a, item, index){
        return comn.addTab({
            href:'./Modal/insuranceManage/renewInsurance/insuranceEntry.html?type=see&id=' + item.id + "&projectId=" + item.projectId,
            title: '保单信息'
        })
    }
};
//续保电话信息
table_insuranceTel = function(params) {
    tableData(params, data, interUrl.insurance.getRenewInsuranceListPhone);
};
handle_2 = function(value, row, index) {
    return ["<a class='see2' href='javascript:;'>查看</a>"].join("");
};
tableEvent_2 = {
    "click .see2": function(e, a, item, index){
        return comn.addTab({
            href:'./Modal/insuranceManage/renewInsurance/addRecord.html?type=see&id=' + item.id + "&projectId=" + item.projectId,
            title: '保单联系人信息修改'
        })
    }
};
//电话tab详情表头数据渲染
comn.ajax({
    url: interUrl.insurance.getCOntact,
    data: data,
    success: function(res) {
        var item = res.data;
        if (item.spouseName == "") {
            $("#hiddenSection").hide();
        }
        $("#contactInfo").nameValues(item);
    }
})
var insuranceStatus = function (value, row, index) {
    return ["首保", "首保"][value] || "续保";
};
var insuranceStatus_1 = function (value, row, index) {
    return ["是", "是"][value] || "否";
};

var insuranceStatusTemp = function (value, row, index) {
    return [null, "公司", "车行", "客户"][value] || null;
};

var contactObj = function (value, row, index) {
    return [null, "本人", "配偶"][value] || null;
};
var resultsTracking = function (value, row, index) {
    return [null, "客户已保", "车行已保", "无法接通", "待跟进", "无法沟通", "同意续保"][value] || null;
};
$("#table_insurance, #table_insuranceTel").bootstrapTable(comn.table);