var args = comn.getArgs();
var projectId=args['projectId'];

comn.table.height = '274';

//boostarp-table相应配置start
//逾期记录
var table_1=function(params){
    var p = params.data;
    comn.ajax({
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

//催收记录
var table_2=function(params){
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


var tableEvent_2 = {
    "click .detail": function (e, a, item, index) { //催收详情
        $("#detailModal").modal("show").find(".detail").html(a);
    }
};

var handle_2 = function (value, row, index) {
    return ["<a class='detail' href='javascript:;'>查看详情</a>"].join("");
};

//催收附件数
var tableEvent_num = {
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
                window.parent.switchImage(imgArr,0);
            }
        })
    }
}
var handle_num = function (value, row, index) {
    return row.fileCout > 0 ? ["<a class='postloanNum' href='javascript:;'>"+ row.fileCout +"</a>"].join("") : '--';
}
//boostarp-table相应配置end


$(function(){
    function getInfo() {
        //基本信息
        comn.ajax({
            url: interUrl.collectionManage.loanCollectionInfoGet,
            data: {projectId:projectId},
            success: function (res) {
                function nameValues(obj) {
                    $("#baseInfo").find("[data-name]").each(function(index, item) {
                        var key = $(this).data("name");
                        $(item).html(obj[key]);
                    });
                }

                nameValues(res.data);
                $("[name='overdueTotalAmount']").val(res.data.overdueTotalAmount);
                $("[name='advanceBalanceAmount']").val(res.data.advanceBalanceAmount);
            }
        });        
    }

    //首次加载执行的方法
    getInfo();
})