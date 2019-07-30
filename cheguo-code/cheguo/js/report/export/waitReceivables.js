var dataLoad_1,handle_1,tableEvent,print_Status;

print_Status = function (value, row, index) {
    return ["未打印", "已打印", "未打印(重打)"][value] || null;
};


dataLoad_1 = function(params) {
	var p;
  p = params.data;
  comn.ajax({
      url: interUrl.finance.receiptList,
      data: $.extend($("#searchForm").values(),p),
      success: function(res) {
      	//console.log(res);
        params.success({
          'total': res.data.dataCount,
          'rows': res.data.datas
        });
        $("#getForm").values(res.data.conditions); 
        params.complete();
      }
    });
};


handle_1 = function(value, row, index){
    var printStatus = ["打印", "重新打印"];
    if(row.receiptStatus==0) {
        return ["<div class='btn-group btn-group-xs'>", "<button type='button' class='btn btn-primary dropdown-toggle' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>操作", "<span class='caret'></span>", "<span class='sr-only'>下拉切换</span>", "</button>", "<ul class='dropdown-menu' role='menu'>", "<li><a class='print'>"+printStatus[row.printStatus]+"</a></li>", "<li><a class='confirmPayment'>确认收款</a></li>", "</ul>", "</div>"].join("");
    }else{
        return ["<div class='btn-group btn-group-xs'>", "<button type='button' class='btn btn-primary dropdown-toggle' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>操作", "<span class='caret'></span>", "<span class='sr-only'>下拉切换</span>", "</button>", "<ul class='dropdown-menu' role='menu'>", "<li><a class='print'>"+printStatus[row.printStatus]+"</a></li>", "<li class='disabled'><a class='alConfirmPayment'>已确认收款</a></li>", "</ul>", "</div>"].join("");
    }
};
tableEvent={
    "click .print":function(e,a,item,index){
        //doAjax(interUrl.finance.receiptPrint,{id: item.id},function(){
            var downLink = '../../../Modal/task/myTask/print.html?loanApplyId='+ item.loanApplyId+"&position=COLLECT_LIST";
            window.open(downLink, "_blank");
            //tip({content: "打印成功！"});
        //});

    },
    "click .confirmPayment":function(e,a,item,index){
        console.log(item);
        comn.ajax({
            url:interUrl.finance.receiptAmount,
            data:{id:item.id},
            success:function(res){
                tip({
                    content:"确认收款成功"
                });
                $table.bootstrapTable("refresh", {url: "..."});
            }
        })
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