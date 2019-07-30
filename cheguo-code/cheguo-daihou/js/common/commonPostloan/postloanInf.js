var table_1, tableEvent_1, handle_1, table_2, handle_2, table_4, table_5, tableEvent_table_4, handle_table_4, tableEvent_table_5, handle_table_5, lawsuitStatus, handle_num, tableEvent_num;
var args = comn.getArgs(); //getArgs
var projectId=args['projectId']; //项目id
lawsuitStatus = function (value, row, index) {
    return [null, "起诉申请中", "起诉审批中", "起诉申请通过", "撤诉申请中", "撤诉审批中", "撤诉申请通过", "已立案", "已开庭(传票)", "已判决", "执行中", "执行终结", "恢复执行中", "执行完毕", "已撤诉", "达成调解"][value] || null;
}
//修改表格统一配置参数
var tableConfig = {};
$.map(comn.table, function (v, k) {
    tableConfig[k] = v;
});
tableConfig['height'] = "";
// tableConfig['pagination'] = false;
//逾期记录
table_1=function(params){
    var p = params.data;
    return comn.ajax({
        url: interUrl.collectionManage.overdueList,
        data: $.extend({ projectId: projectId }, p),
        success: function (res) {
            params.success({
                'total': res.totalItem,
                rows: res.data
            });
            params.complete();
        }
    });
};

$("#table1").bootstrapTable(tableConfig);

tableEvent_1 = {
    "click .detail": function (e, a, item, index) { //逾期详情
        if(item.loanCollectionInfoList.length==0){
            tip({content:"无催收记录!"});
        }else{
            $("#table2").bootstrapTable("load",item.loanCollectionInfoList);
        }
    }
};

handle_1 = function (value, row, index) {
    return ["<a class='detail' href='javascript:;'>查看详情</a>"].join("");
};

//催收记录
table_2=function(params){
    var p = params.data;
    comn.ajax({
        url: interUrl.collectionManage.loanCollectionInfoCollectionList,
        data: $.extend({ projectId: projectId }, p),
        success: function (res) {
            params.success({
                'total': res.totalItem,
                rows: res.data
            });
            params.complete();
        }
    });
};

$("#table2").bootstrapTable();

handle_2 = function (value, row, index) {
    if (value && value.length > 10) {
        return "<span class='valueNowrap' title='" + value + "'>" + value.substr(0, 10) + "...</span>";
    } else {
        return value;
    }
};

//拖车情况
table_4 = function (params) {
    tableData(params, {projectId:projectId}, interUrl.trailer.getDragAndCheckoutCar);
}

$("#table4").bootstrapTable(tableConfig);
//查看附件
tableEvent_table_4 = {
    "click .dragDetail": function (e, a, item, index) {
        return comn.addTab({
            title: "查看拖车登记",
            href:"./Modal/postLoanManage/trailerManage/trailerRecord.html?type=trailerRecordSee&id=" + item.id + "&launchUserId=" + item.launchUserId+"&loanApplyId="+item.id +"&businessTypeCode=TOW_CAR_APPLY_FLOW"
        });
    }
};

handle_table_4 = function(value, row, index) {
    return ["<a class='dragDetail' href='javascript:;'>查看详情</a>"].join("");
};

//诉讼情况
table_5 = function(params) {
    tableData(params, {projectId: projectId}, interUrl.postLoan.getLawsuitInfoList);
}
$("#table5").bootstrapTable(tableConfig);
//查看附件
tableEvent_table_5 = {
    "click .LawsuitDetail": function (e, a, item, index) {
        comn.addTab({
            title: '查看案件进程',
            href: './Modal/postLoanManage/litigationManage/seeLawsuit.html?projectId='+item.projectId+'&lawsuitId='+item.id+"&loanApplyId="+item.id +"&businessTypeCode=LAWSUIT_APPLY_FLOW"
        })
    }
};

handle_table_5 = function(value, row, index) {
    return ["<a class='LawsuitDetail' href='javascript:;'>查看详情</a>"].join("");
};

//费用收支情况
var _feeCategoryCodes = [];
$(".feeCategoryCode input:checked").each(function(){
    _feeCategoryCodes.push($(this).val());
});

fee(_feeCategoryCodes);
function fee(_feeCategoryCodes){
    var _arrStr = _feeCategoryCodes.join(",");
    if (_arrStr == "") {
        tip({content: "请选择费用类别"});
        return false;
    }
    table_3 = function(params) {
        var p = params.data;
        return comn.ajax({
            url: interUrl.sz.list,
            data: {
                projectId: projectId,
                feeCategoryCodes : _arrStr
            },
            success: function (res) {
                params.success({
                    'total': res.totalItem,
                    rows: res.data.feeManageList
                });
                $("#TotalSpending").values(res.data);
                return params.complete();
            }
        });
    }
    $("#table3").bootstrapTable("refresh", {url: "..."});
}
$("#table3").bootstrapTable(tableConfig);
$(".feeCategoryCode input").on("change", function(){
    if($(this).is(":checked")){
        _feeCategoryCodes.push($(this).val());
    }else{
        var index = _feeCategoryCodes.indexOf($(this).val());
        _feeCategoryCodes.splice(index,1);
    }
    fee(_feeCategoryCodes);
});

//催收附件数
tableEvent_num = {
    "click .postloanNum": function (e, a, item, index) { //催收附件数
        comn.ajax({
            url : interUrl.collectionManage.getPostLoanFileList,
            data : {
                tableName : 'loan_overdue_info',
                tableKeyValue : item.id
            },
            success : function(res) {
                //查看图片
                var imgArr=[];
                for (i = 0; i < res.data.length; i++) {
                    imgArr.push(res.data[i].filePath);
                }
                console.log(imgArr);
                window.parent.switchImage(imgArr,0);
            }
        })
    }
}
handle_num = function (value, row, index) {
    return row.fileCout > 0 ? ["<a class='postloanNum' href='javascript:;'>"+ row.fileCout +"</a>"].join("") : '--';
}