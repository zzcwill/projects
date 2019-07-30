var dataLoad, handle, tableEvent;
var getDate = new Date().toLocaleDateString(); //获取当前日期
var nowdate = (new Date(getDate))/1000; //把当前日期变成时间戳
var timeFlag = false;
dataLoad=function(params){
    var p;
    p = params.data;
	var o = $("#searchForm").values();
	o.sendTimeStart = (timeFlag === false) ? getTwoDaysAgo(nowdate - 24 * 60 *60) : $("#loanDate").val();
    comn.ajax({
        url:"creditCard/list",
        data:$.extend(o, p),
        success:function(res){
            params.success({
                'total': res.totalItem,
                'rows': res.data
            });
            params.complete();
			timeFlag = true;
        }
    })
}
handle=function(value,row,index){
	return ["<div class='btn btn-primary btn-xs tryAgain'>重新发送<div/>"].join("");
}
//批量重发
$("#reSend").click(function(){
	var arr = $("#table").bootstrapTable('getAllSelections'), ids = []; 
	$.each(arr, function(index, item){
		comn.ajax({
			url: 'creditCard/retry',
			data: { taskId: item.taskId },
			success: function(res){
				$("#btn-search").trigger("click"); 
			} 
		})
	});
})

tableEvent=function(){ }

oprType = function(value, row, index) { return ['新增', '修改', '删除'][value]; }
response = function(value, row, index) { 
	var str = "";
	if(value == "SUCCESS"){
		str = "成功!";

	}else if(value == "FAILURE"){
		str = "失败!";
	}
	return str;
}

typeCode = function(value, row, index) { 
	var str = "";
	switch (value) {
		case 'CREDIT': str = "R1征信"; break;
		case 'LOAN_AND_CUSTOMER': str = "R2申贷"; break;
		case 'SEND_DOCUMENT': str = "R3收件"; break;
		case 'RECEIVE_DOCUMENT_FEEDBACK': str = "R4发件反馈"; break;
		case 'LAWSUIT': str = "R5诉讼"; break;
		case 'OVERDUE': str = "R6逾期催收"; break;
		case 'TOWCAR': str = "R7拖车"; break;
		case 'FRONT_CAPITAL': str = "R8垫款"; break;
		case 'MORTGAGE': str = "R9入库"; break;
		case 'UNMORTGAGE': str = "R10超期未抵押"; break;
        case 'MORTGAGE_REGISTER': str = "R11抵押登记"; break;
	}
	return str;
}
$(function () {
	$("#orgId").getOrg();
	$("#bankId").getBank();
	$(".loanDate").val(getTwoDaysAgo(nowdate - 24 * 60 *60))
});
function getTwoDaysAgo(nS) {
	var date = new Date(parseInt(nS) * 1000);
	y = date.getFullYear();
	m = date.getMonth() < 9 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
	d = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
	return y + "-" + m + "-" + d;
}