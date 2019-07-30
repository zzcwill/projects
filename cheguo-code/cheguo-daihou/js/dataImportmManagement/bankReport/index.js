var table_1, handle_1, tableEvent_1,table_2;
//获取银行报表
$("#endTime").getToday();
var dataArr =[["#bankCode", "BankStatementReportSource"],["#fileType", "BankStatementReportType"]];
$.getCommonMethodPort(dataArr);
var timestamp=new Date().getTime(); //获取时间戳 - 获取到年月日时分秒
var getDate = new Date().toLocaleDateString(); //获取当前日期:年月日
var nowdate = (new Date(getDate))/1000; //把当前日期变成时间戳 - 年月日
$("#timeNum").val(timestamp); //资产方编号以时间戳来取值
function getTwoDaysAgo(nS) {
  var date = new Date(parseInt(nS) * 1000);
  y = date.getFullYear();
  m = date.getMonth() < 9 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
  d = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
  return y + "-" + m + "-" + d;
}
$("#startTime").val(getTwoDaysAgo(nowdate - 24 * 60 *60 * 3));


//银行报表列表方法
table_1 = function(params) {
  tableData(params, $("#searchForm").values(),  interUrl.bankReport.bankList);
}
handle_1 = function (value, row, index) {
  var _status = [
            "<li><a class='downloadBankReport'>下载</a></li>",
            "<li><a class='lookloadBankReport' data-toggle='modal' data-target='#caseChoice'>查看下载记录</a></li>"
         ].join("");

  return ["<div class='btn-group btn-group-xs'>",
      "<button type='button' class='btn btn-primary dropdown-toggle' data-toggle='dropdown'>操作",
      "<span class='caret'></span>", "<span class='sr-only'>下拉切换</span>",
      "</button>", "<ul class='dropdown-menu' role='menu'>",
      _status, "</ul>", "</div>"
  ].join("");         
};

//查看贷款记录-默认id为空
var table_2_id = '';
tableEvent_1 = {
  "click .downloadBankReport": function(e, a, item, index) {
      var downLink = interUrl.basic + interUrl.bankReport.download + "?bankStatementId=" + item.id;
      //console.log(downLink);
      window.open(downLink, "_blank");
  },
  "click .lookloadBankReport": function(e, a, item, index) {
    $('#oneFileName').text(item.fileName);
    table_2_id = item.id;
    $("#table2").bootstrapTable("refresh");
  },  
};



//查看贷款记录方法
table_2 = function(params) {
  tableData(params,{
    bankStatementId: table_2_id,
  }, interUrl.bankReport.bankStatementListDownloadLogs);
};