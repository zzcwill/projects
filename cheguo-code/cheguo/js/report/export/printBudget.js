var dataLoad_1,print_Status,handle_1,tableEvent;
var uId = comn.user.uid;
console.log(uId);
dataLoad_1=function(params){
    var p;
    p=params.data;
    comn.ajax({
        url:interUrl.finance.printapplicationList,
        data: $.extend($("#searchForm").values(),p),
        success:function(res){
            params.success({
                "total":res.totalItem,
                'rows':res.data
            });
            params.complete();
        }
    })
};
handle_1=function(value,row,index){
        return ["<div class='btn btn-xs btn-primary print'>"+row.operationFlag+"</div>"].join();
}
tableEvent={
    "click .print":function(e,a,item,index){
        console.log(item);
        //doAjax(interUrl.myTask.printBudgetInfo,{position:"PRINT_LIST"},function(){
            var downLink = '../../../Modal/task/myTask/print.html?loanApplyId='+ item.loanApplyId+"&position=PRINT_LIST";
            window.open(downLink, "_blank");
            //tip({content: "打印成功！"});
        //});
    }
    //"click .reprint":function(e,a,item,index){
    //    console.log("重新打印")
    //}
}
var $table = $('#table');
$(function(){
    $table.bootstrapTable({
        "undefinedText": "--",
        "classes": "table-striped table-hover table",
        "pagination": true,
        "sidePagination": "server",
        "queryParams": "queryParams",
        "paginationFirstText": "第一页",
        "paginationPreText": "上一页",
        "paginationNextText": "下一页",
        "paginationLastText": "最后一页",
        "clickToSelect": true,
        "pageNumber":  1,
        "pageSize": 100,
        "pageList": [10,25,50,100,500,1000],
        "height": "500"
    });
    $("#orgList").getOrg();
    $("#bankList").bank_Get();
    //$("#getGuaranteeList").getGuarantee_Get();
    $("#searchBtn").unbind('click').on("click", function(params){
        $table.bootstrapTable("refresh", {url: "..."});
    });
});
function doAjax(url, data,callback) {
    comn.ajax({
        url: url,
        data: data,
        success: function(res) {
            return typeof callback === "function" ? callback(res) : void 0;
        }
    });
}

$('#batchPrint').on('click',function(){
    var tableData,idData,printLink;
    tableData = $('#table').bootstrapTable('getSelections');
    idData = [];
    if(!tableData.length) return;
    tableData.forEach(function(item){
        idData.push(item.loanApplyId);
    });
    printLink = '../../../Modal/report/export/batchPrint.html?loanApplyId='+ JSON.stringify(idData) +'&position=PRINT_LIST';
    //console.log(tableData);
    window.open(printLink,'_blank');
});