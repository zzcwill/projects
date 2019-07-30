var dataLoad_1, dataLoad_2, handle_1, handle_2,  tableEvent, args = comn.getArgs(), type, _data, timelineLoanLaunch, unPledgeInterval, carDealerCompany, loanBranchCompanyId, loanBusinessGroupName,moduleType,t;
var uId = args["uId"];
t = args["t"];

timelineLoanLaunch = args["timelineLoanLaunch"];
unPledgeInterval = args["unPledgeInterval"];
flowStatus = args["flowStatus"];
carDealerCompany = args["carDealerCompany"];
timelineLoanSign = args["timelineLoanSign"];
timelineCompanyPay = args["timelineCompanyPay"];
timelineBankPay = args["timelineBankPay"];
loanBusinessGroupId = args["loanBusinessGroupId"];
loanBranchCompanyId = args["loanBranchCompanyId"];
loanBusinessGroupName = args["loanBusinessGroupName"];
timelineLoanLaunchBegin = args["timelineLoanLaunchBegin"];
timelineLoanLaunchEnd = args["timelineLoanLaunchEnd"];
timelineLoanSignBegin = args["timelineLoanSignBegin"];
timelineLoanSignEnd = args["timelineLoanSignEnd"];
timelineCompanyPayBegin = args["timelineCompanyPayBegin"];
timelineCompanyPayEnd = args["timelineCompanyPayEnd"];
timelineBankPayBegin = args["timelineBankPayBegin"];
timelineBankPayEnd = args["timelineBankPayEnd"];
moduleType = args["moduleType"];
dataLoad_1 = function(params) {
  tableData(params, $.extend(_data,{
    timelineLoanLaunch: timelineLoanLaunch, 
    unPledgeInterval: unPledgeInterval,
    flowStatus: flowStatus,
    carDealerCompany: carDealerCompany,
    timelineLoanSign: timelineLoanSign,
    timelineCompanyPay: timelineCompanyPay,
    timelineBankPay: timelineBankPay,
    loanBusinessGroupId: loanBusinessGroupId,
    loanBranchCompanyId: loanBranchCompanyId,
    loanBusinessGroupName: loanBusinessGroupName,
    timelineLoanLaunchBegin: timelineLoanLaunchBegin,
    timelineLoanLaunchEnd: timelineLoanLaunchEnd,
    timelineLoanSignBegin: timelineLoanSignBegin,
    timelineLoanSignEnd: timelineLoanSignEnd,
    timelineCompanyPayBegin: timelineCompanyPayBegin,
    timelineCompanyPayEnd: timelineCompanyPayEnd,
    timelineBankPayBegin: timelineBankPayBegin,
    timelineBankPayEnd: timelineBankPayEnd,
    uId: uId

  }), interUrl.mockList || interUrl.report.businessQuery);
};

dataLoad_2 = function(params) {
  tableData(params, $("#searchForm").values(), interUrl.mockList || interUrl.report.feeQuery);
};

function indexFormatter(value, row, index){
return index+1;
}
function dateFormatter(value, row, index){
    if (typeof(value) !== 'undefined') {
        return value.substring(0,10);
    };
    return null;
}
tableEvent = {
  "click .info": function(e, a, item, index) {
    if (t=='mobile') {
      return;
      window.location.href="../../../../loan/Modal/customManage/customer/loanDetail.html?projectId="+item.loanInfoProjectId+"&id="+item.loanInfoProjectId+"&businessTypeCode=LOAN_CANCEL_FLOW&space=LOAN&releventFlowNode=LOAN_QUERY&releventFlow=LOAN_QUERY" + "&t="+t
    }else{
      return window.comn.addTab({
        title: "查看贷款详情",
        href: "./Modal/customManage/customer/loanDetail.html?projectId="+item.loanInfoProjectId+"&id="+item.loanInfoProjectId+"&businessTypeCode=LOAN_CANCEL_FLOW&space=LOAN&releventFlowNode=LOAN_QUERY&releventFlow=LOAN_QUERY" + "&t="+t
      });
    }
  },
  "click .urge": function(e, a, item, index) {
    return window.comn.addTab({
      title: "查看贷款详情",
      href: "./Modal/customManage/customer/loanDetail.html?id="+item.loanInfoProjectId
    });
  }
};
// function deleteData

handle_1 = function(value, row, index) {
  return ["<button type='button' class='btn btn-primary btn-xs info'>查看贷款详情</button>"].join("");
};
// handle_2 = function(value, row, index) {
//   return ["<button type='button' class='btn btn-primary btn-xs urge'>催办</button>"].join("");
// };

var type = args['type'];
if (type == 1) {
    $("#loanTitle").text("贷款详情");
} else if (type == 2 ) {
    $("#loanTitle").text("贷款详情");
} else if (type == 3) {
    $("#loanTitle").text("在办贷款跟踪详情");
} else if (type == 4) {
    $("#loanTitle").text("车商客户贷款详情");
}

