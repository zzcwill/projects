var args = comn.getArgs(),table_1,tableEvent_1,handle_1,table_2,tableEvent_2,handle_2; //getArgs
var projectId=args['projectId']; //项目id
var currentPlanNo=args['currentPlanNo']; //当前期数
var handle_num, tableEvent_num;
//修改表格统一配置参数
var tableConfig = {};
$.map(comn.table, function (v, k) {
    tableConfig[k] = v;
});
tableConfig['height'] = "300";
tableConfig['pagination'] = false;

//基本信息
comn.ajax({
    url: interUrl.collectionManage.loanCollectionInfoGet,
    data: {projectId:projectId},
    success: function (res) {
        $("#baseInfo").nameValues(res.data);
    }
});


//逾期记录
table_1=function(params){
    var p = params.data;
    return comn.ajax({
        url: interUrl.collectionManage.overdueList,
        data: {projectId:projectId},
        success: function (res) {
            params.success({
                'total': res.totalItem,
                rows: res.data
            });
            return params.complete();
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
            console.log(item.loanCollectionInfoList);
        }
    }
};

handle_1 = function (value, row, index) {
    return ["<a class='detail' href='javascript:;'>查看详情</a>"].join("");
};

//催收记录
table_2=function(params){
   params.success({
        rows: []
    });
    params.complete();
};

$("#table2").bootstrapTable();

tableEvent_2 = {
    "click .detail": function (e, a, item, index) { //催收详情
        $("#detailModal").modal("show").find(".detail").html(a);
    }
};

handle_2 = function (value, row, index) {
    return ["<a class='detail' href='javascript:;'>查看详情</a>"].join("");
};

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