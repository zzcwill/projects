var table_1, handle_1, tableEvent_1;


//获取银行报表
var dataArr =[["#bankCode", "BankStatementReportSource"]];
$.getCommonMethodPort(dataArr);


table_1 = function(params) {
  tableData(params, $("#searchForm").values(),  interUrl.parameterData.dataTransmissionList);
}
handle_1 = function (value, row, index) {
   var str = "<button type='button' class='btn btn-primary btn-xs downloadBankReport'>数据匹配情况下载</button>";
   if(row.couldDownloadDetail === 0){
    str = ''
   }

  return [str].join("");
};
tableEvent_1 = {
  "click .downloadBankReport": function(e, a, item, index) {
      var downLink = interUrl.basic + interUrl.parameterData.dataTransmissionDownloadDetails + "?batchId=" + item.id;
      //console.log(downLink);
      window.open(downLink, "_blank");
  },
};
