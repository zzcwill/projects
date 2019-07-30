var payment,handle,tableEvent, queryStatus, querySource;
$(".today").getToday();
//获取机构地址
$("#orgList").getOrg();

payment=function(params){
    var p;
    p = params.data;
    tableData(
        params,
        $.extend($("#searchForm").values(), p),
        interUrl.mockList || interUrl.gr.queryVinLog
    )
};

queryStatus = function (value, row, index) {
    return ['查询失败', '查询成功','查询成功解析异常','查询成功解析正确'][value]
};

querySource = function (value, row, index) {
   if(value == 1){
       return "书虫";
   }
   return "未知";
};
handle=function(value,row,index){
    var result=[];
    if(row.transStatus==4&&row.userName==window.parent.userName.innerHTML){
        result.push('<li><a href="javascript:;" class="reSubmit">重新提交</a></li><li><a href="javascript:;" class="artificial">人工处理</a></li>')
    }
    return ['<div class="dropdown">',
        '<button class="btn btn-primary btn-xs dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">操作',
        '<span class="caret"></span>',
        '</button>',
        '</div>'].join("")
};
tableEvent={

};
// 查询
$("#btn-search").on("click",function(){
    $("#table").bootstrapTable('refresh',{url:'...'})
})

