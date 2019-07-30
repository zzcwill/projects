var documentCheckStatus,documentKeepAddr;
var dataLoad_1 = function(params){
  tableData(params, $("#searchForm").values(), interUrl.credit.loanDocumentCheckList);
}

//var documentCheckStatus = function(val){
//  return [null, '待核对', '有误', '无误'][val];
//};
documentCheckStatus = function(value,row,index){
    return [null,'核对有误','未核对', '核对无误'][value];
};
var handle_1 = function(){
  return ["<div class='btn btn-xs btn-primary check'>资料核对</div>"].join("");
}
tableEvent = {
  'click .check': function(e, a, item, index){
	comn.addTab({
	  title:"贷款详情",
	  href: "./Modal/customManage/customer/loanDetail.html?id="+item.projectId+"&loanApplyId="+item.relativeApplyId1+"&businessTypeCode=" + item.flowType+"&projectId="+item.projectId + "&space=LOAN&releventFlowNode=LOAN_DOCUMENT_CHECK&releventFlow=LOAN_DOCUMENT_CHECK" + "&loanFlag=2"+"&invoiceVertifyFlag=2"
	});
  }
};


$(function () {
    var dataArr =[["#financeChannel", "FinanceChannelType"]];
    $.getCommonMethodPort(dataArr);
  $("#org").getOrg();

  $("#export").click(function(){
	  var search=$("#searchForm").serialize();
	  var downLink = interUrl.basic + interUrl.gr.documentExport + "?" + search;
    window.open(downLink, "_blank");
  });

});
