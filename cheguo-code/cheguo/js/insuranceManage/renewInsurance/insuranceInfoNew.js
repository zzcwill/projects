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
    if (row.status == null) {
        return ["<div class='btn-group btn-group-xs'>",
            "<button type='button' class='btn btn-primary see'>查看",
            "</button>", "</div>"].join("");
    } else {
        return ["<div class='btn-group btn-group-xs'>",
            "<button type='button' class='btn btn-primary see_2'>查看",
            "</button>", "</div>"].join("");
    }

};
handle_2 = function(value, row, index) {
    return ["<div class='btn-group btn-group-xs'>",
        "<button type='button' class='btn btn-primary see2'>查看",
        "</button>", "</div>"].join("");
};
tableEvent_1 = {
    "click .see": function(e, a, item, index){
        return comn.addTab({
            href:'./Modal/insuranceManage/renewInsurance/insuranceEntry.html?type=see&flag=0&id=' + item.id + "&projectId=" + item.projectId,
            title: '保单信息'
        })
    },
    "click .see_2": function(e, a, item, index){
        return comn.addTab({
            href:'./Modal/insuranceManage/firstInsurance/insuranceEntry.html?type=see&flag=1&id=' + item.id + "&projectId=" + item.projectId,
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
        telInfo = item;
        if (item.spouseName == "") {
            $("#hiddenSection").hide();
        }
        //获取省
        var province = (function(){
            if(item.homeAddressPname == null) {
                return ""
            } else {
                return item.homeAddressPname
            }
        })(item);
        //判断家庭住址的省市信息是否一样，然后做拼接
        var city = (function(){
            if(item.homeAddressCname === item.homeAddressPname) {
                return "";
            } else if (item.homeAddressCname == null){
                return "";
            } {
                return item.homeAddressCname;
            }
        })(item);
        //判断区
        var area = (function(){
            if(item.homeAddressRname == null) {
                return ""
            } else {
                return item.homeAddressRname
            }
        })(item);
        //判断具体地址
        var detailAddress = (function(){
            if(item.homeAddressDetail == null) {
                return ""
            } else {
                return item.homeAddressDetail
            }
        })(item);
        var address = province + city + area + detailAddress;
        item.address = address;
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