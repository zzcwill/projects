var handle_1,handle_2,handle_3,handle_4,handle_5,handle_6,tableEvent,dataLoad_1,dataLoad_2,dataLoad_3,dataLoad_4,dataLoad_5,dataLoad_6,tableData;
var args = comn.getArgs();
var uId = comn.user.uid;

handle_1 = function(value, row, index) {
	return ["<div class='btn-group btn-group-xs'>", "<button type='button' class='btn btn-primary dropdown-toggle' data-toggle='dropdown'>操作",
	 "<span class='caret'></span>",
	  "<span class='sr-only'>下拉切换</span>", 
	  "</button>", "<ul class='dropdown-menu' role='menu'>",
	  "<li><a class='showbusiness1'>查看业务详情</a></li>" , 
	  "<li><a class='showloan1'>查看费用详情</a></li>", "</ul>", "</div>"].join("");
};
handle_2 = function(value, row, index) {
	return ["<div class='btn-group btn-group-xs'>", "<button type='button' class='btn btn-primary dropdown-toggle' data-toggle='dropdown'>操作",
	 "<span class='caret'></span>",
	  "<span class='sr-only'>下拉切换</span>", 
	  "</button>", "<ul class='dropdown-menu' role='menu'>",
	  "<li><a class='showbusiness2'>查看业务详情</a></li>" , 
	  "<li><a class='showloan2'>查看费用详情</a></li>", "</ul>", "</div>"].join("");
};
handle_3 = function(value, row, index) {
	return ["<div class='btn-group btn-group-xs'>", "<button type='button' class='btn btn-primary dropdown-toggle' data-toggle='dropdown'>操作",
	 "<span class='caret'></span>",
	  "<span class='sr-only'>下拉切换</span>", 
	  "</button>", "<ul class='dropdown-menu' role='menu'>",
	  "<li><a class='showbusiness3'>查看业务详情</a></li>" , 
	  "<li><a class='showloan3'>查看费用详情</a></li>", "</ul>", "</div>"].join("");
};
handle_4 = function(value, row, index) {
	return ["<div class='btn-group btn-group-xs'>", "<button type='button' class='btn btn-primary dropdown-toggle' data-toggle='dropdown'>操作",
	 "<span class='caret'></span>",
	  "<span class='sr-only'>下拉切换</span>", 
	  "</button>", "<ul class='dropdown-menu' role='menu'>",
	  "<li><a class='showbusiness4'>查看业务详情</a></li>" , 
	  "<li><a class='showloan4'>查看费用详情</a></li>", "</ul>", "</div>"].join("");
};
handle_5 = function(value, row, index) {
	return ["<div class='btn-group btn-group-xs'>", "<button type='button' class='btn btn-primary dropdown-toggle' data-toggle='dropdown'>操作",
	 "<span class='caret'></span>",
	  "<span class='sr-only'>下拉切换</span>", 
	  "</button>", "<ul class='dropdown-menu' role='menu'>",
	  "<li><a class='showbusiness5'>查看业务详情</a></li>" , 
	  "<li><a class='showloan5'>查看费用详情</a></li>", "</ul>", "</div>"].join("");
};
handle_6 = function(value, row, index) {
	return ["<div class='btn-group btn-group-xs'>", "<button type='button' class='btn btn-primary dropdown-toggle' data-toggle='dropdown'>操作",
	 "<span class='caret'></span>",
	  "<span class='sr-only'>下拉切换</span>", 
	  "</button>", "<ul class='dropdown-menu' role='menu'>",
	  "<li><a class='showbusiness6'>查看业务详情</a></li>" , 
	  "<li><a class='showloan6'>查看费用详情</a></li>", "</ul>", "</div>"].join("");
};

tableEvent = {
	"click .showbusiness1": function(e, a, item, index) {
		var space = $("#searchForm").serialize();
		comn.addTab({
			title: '业务详情',
			href:"./Modal/report/businessFlow/index.html?loanInfoCooperationBank=" + item.cooperationBank + "&" + space
	  }); 
	},
	"click .showloan1": function(e, a, item, index) {
		var space = $("#searchForm").serialize();
		comn.addTab({
			title: "费用详情",
			href:"./Modal/report/loanCostFlow/index.html?loanInfoCooperationBank=" + item.cooperationBank + "&" + space
	  }); 
	},
	"click .showbusiness2": function(e, a, item, index) {
		var space = $("#searchForm").values();
		space.carDealerCompany=item.carDealerCompanyName;
		comn.addTab({
			title: '业务详情',
			href:"./Modal/report/businessFlow/index.html?loanBranchCompanyId=" + space.loanBranchCompanyId + "&loanBusinessGroupId=" + space.loanBusinessGroupId + "&timelineLoanSignBegin=" + space.timelineLoanSignBegin + "&timelineLoanSignEnd=" + space.timelineLoanSignEnd + "&timelineCompanyPayBegin=" + space.timelineCompanyPayBegin + "&timelineCompanyPayEnd=" + space.timelineCompanyPayEnd + "&timelineBankPayBegin=" + space.timelineBankPayBegin + "&timelineBankPayEnd=" + space.timelineBankPayEnd + "&loanCarType=" + space.loanCarType + "&loanInfoBusinessType=" + space.loanInfoBusinessType + "&carDealerCompany=" + space.carDealerCompany
	  }); 
	},
	"click .showloan2": function(e, a, item, index) {
		var space = $("#searchForm").values();
		space.carDealerCompany=item.carDealerCompanyName;
		comn.addTab({
			title: "费用详情",
			href:"./Modal/report/loanCostFlow/index.html?loanBranchCompanyId=" + space.loanBranchCompanyId + "&loanBusinessGroupId=" + space.loanBusinessGroupId + "&timelineLoanSignBegin=" + space.timelineLoanSignBegin + "&timelineLoanSignEnd=" + space.timelineLoanSignEnd + "&timelineCompanyPayBegin=" + space.timelineCompanyPayBegin + "&timelineCompanyPayEnd=" + space.timelineCompanyPayEnd + "&timelineBankPayBegin=" + space.timelineBankPayBegin + "&timelineBankPayEnd=" + space.timelineBankPayEnd + "&loanCarType=" + space.loanCarType + "&loanInfoBusinessType=" + space.loanInfoBusinessType + "&carDealerCompany=" + space.carDealerCompany
	  }); 
	},
	"click .showbusiness3": function(e, a, item, index) {
		var space = $("#searchForm").values();
		space.loanBranchCompanyId=item.branchCompanyId;
		comn.addTab({
			title: '业务详情',
			href:"./Modal/report/businessFlow/index.html?loanBranchCompanyId=" + space.loanBranchCompanyId + "&loanBusinessGroupId=" + space.loanBusinessGroupId + "&timelineLoanSignBegin=" + space.timelineLoanSignBegin + "&timelineLoanSignEnd=" + space.timelineLoanSignEnd + "&timelineCompanyPayBegin=" + space.timelineCompanyPayBegin + "&timelineCompanyPayEnd=" + space.timelineCompanyPayEnd + "&timelineBankPayBegin=" + space.timelineBankPayBegin + "&timelineBankPayEnd=" + space.timelineBankPayEnd + "&loanCarType=" + space.loanCarType + "&loanInfoBusinessType=" + space.loanInfoBusinessType + "&carDealerCompany=" + space.carDealerCompany
	  }); 
	},
	"click .showloan3": function(e, a, item, index) {
		var space = $("#searchForm").values();
		space.loanBranchCompanyId=item.branchCompanyId;
		comn.addTab({
			title: "费用详情",
			href:"./Modal/report/loanCostFlow/index.html?loanBranchCompanyId=" + space.loanBranchCompanyId + "&loanBusinessGroupId=" + space.loanBusinessGroupId + "&timelineLoanSignBegin=" + space.timelineLoanSignBegin + "&timelineLoanSignEnd=" + space.timelineLoanSignEnd + "&timelineCompanyPayBegin=" + space.timelineCompanyPayBegin + "&timelineCompanyPayEnd=" + space.timelineCompanyPayEnd + "&timelineBankPayBegin=" + space.timelineBankPayBegin + "&timelineBankPayEnd=" + space.timelineBankPayEnd + "&loanCarType=" + space.loanCarType + "&loanInfoBusinessType=" + space.loanInfoBusinessType + "&carDealerCompany=" + space.carDealerCompany
	  }); 
	},
	"click .showbusiness4": function(e, a, item, index) {
		var space = $("#searchForm").values();
		space.loanBranchCompanyId=item.branchCompanyId;
		space.loanBusinessGroupId=item.businessGroupId;
		comn.addTab({
			title: '业务详情',
			href:"./Modal/report/businessFlow/index.html?loanBranchCompanyId=" + space.loanBranchCompanyId + "&loanBusinessGroupId=" + space.loanBusinessGroupId + "&timelineLoanSignBegin=" + space.timelineLoanSignBegin + "&timelineLoanSignEnd=" + space.timelineLoanSignEnd + "&timelineCompanyPayBegin=" + space.timelineCompanyPayBegin + "&timelineCompanyPayEnd=" + space.timelineCompanyPayEnd + "&timelineBankPayBegin=" + space.timelineBankPayBegin + "&timelineBankPayEnd=" + space.timelineBankPayEnd + "&loanCarType=" + space.loanCarType + "&loanInfoBusinessType=" + space.loanInfoBusinessType + "&carDealerCompany=" + space.carDealerCompany
	  }); 
	},
	"click .showloan4": function(e, a, item, index) {
		var space = $("#searchForm").values();
		space.loanBranchCompanyId=item.branchCompanyId;
		space.loanBusinessGroupId=item.businessGroupId;
		comn.addTab({
			title: "费用详情",
			href:"./Modal/report/loanCostFlow/index.html?loanBranchCompanyId=" + space.loanBranchCompanyId + "&loanBusinessGroupId=" + space.loanBusinessGroupId + "&timelineLoanSignBegin=" + space.timelineLoanSignBegin + "&timelineLoanSignEnd=" + space.timelineLoanSignEnd + "&timelineCompanyPayBegin=" + space.timelineCompanyPayBegin + "&timelineCompanyPayEnd=" + space.timelineCompanyPayEnd + "&timelineBankPayBegin=" + space.timelineBankPayBegin + "&timelineBankPayEnd=" + space.timelineBankPayEnd + "&loanCarType=" + space.loanCarType + "&loanInfoBusinessType=" + space.loanInfoBusinessType + "&carDealerCompany=" + space.carDealerCompany
	  }); 
	},
	"click .showbusiness5": function(e, a, item, index) {
		var space = $("#searchForm").values();
		space.loanBranchCompanyId=item.branchCompanyId;
		space.loanBusinessGroupId=item.businessGroupId;
		comn.addTab({
			title: '业务详情',
			href:"./Modal/report/businessFlow/index.html?loanCustomerManagerRealname=" + item.customerManagerRealname + "&loanBranchCompanyId=" + space.loanBranchCompanyId + "&loanBusinessGroupId=" + space.loanBusinessGroupId + "&timelineLoanSignBegin=" + space.timelineLoanSignBegin + "&timelineLoanSignEnd=" + space.timelineLoanSignEnd + "&timelineCompanyPayBegin=" + space.timelineCompanyPayBegin + "&timelineCompanyPayEnd=" + space.timelineCompanyPayEnd + "&timelineBankPayBegin=" + space.timelineBankPayBegin + "&timelineBankPayEnd=" + space.timelineBankPayEnd + "&loanCarType=" + space.loanCarType + "&loanInfoBusinessType=" + space.loanInfoBusinessType + "&carDealerCompany=" + space.carDealerCompany
	  }); 
	},
	"click .showloan5": function(e, a, item, index) {
		var space = $("#searchForm").values();
		space.loanBranchCompanyId=item.branchCompanyId;
		space.loanBusinessGroupId=item.businessGroupId;
		comn.addTab({
			title: "费用详情",
			href:"./Modal/report/loanCostFlow/index.html?loanCustomerManagerRealname=" + item.customerManagerRealname + "&loanBranchCompanyId=" + space.loanBranchCompanyId + "&loanBusinessGroupId=" + space.loanBusinessGroupId + "&timelineLoanSignBegin=" + space.timelineLoanSignBegin + "&timelineLoanSignEnd=" + space.timelineLoanSignEnd + "&timelineCompanyPayBegin=" + space.timelineCompanyPayBegin + "&timelineCompanyPayEnd=" + space.timelineCompanyPayEnd + "&timelineBankPayBegin=" + space.timelineBankPayBegin + "&timelineBankPayEnd=" + space.timelineBankPayEnd + "&loanCarType=" + space.loanCarType + "&loanInfoBusinessType=" + space.loanInfoBusinessType + "&carDealerCompany=" + space.carDealerCompany
	  }); 
	},
	"click .showbusiness6": function(e, a, item, index) {
		var space = $("#searchForm").values();
		space.loanBranchCompanyId=item.branchCompanyId;
		space.loanBusinessGroupId=item.businessGroupId;
		comn.addTab({
			title: '业务详情',
			href:"./Modal/report/businessFlow/index.html?loanRiskManagerRealname=" + item.riskManagerRealname + "&loanBranchCompanyId=" + space.loanBranchCompanyId + "&loanBusinessGroupId=" + space.loanBusinessGroupId + "&timelineLoanSignBegin=" + space.timelineLoanSignBegin + "&timelineLoanSignEnd=" + space.timelineLoanSignEnd + "&timelineCompanyPayBegin=" + space.timelineCompanyPayBegin + "&timelineCompanyPayEnd=" + space.timelineCompanyPayEnd + "&timelineBankPayBegin=" + space.timelineBankPayBegin + "&timelineBankPayEnd=" + space.timelineBankPayEnd + "&loanCarType=" + space.loanCarType + "&loanInfoBusinessType=" + space.loanInfoBusinessType + "&carDealerCompany=" + space.carDealerCompany
	  }); 
	},
	"click .showloan6": function(e, a, item, index) {
		var space = $("#searchForm").values();
		space.loanBranchCompanyId=item.branchCompanyId;
		space.loanBusinessGroupId=item.businessGroupId;
		comn.addTab({
			title: "费用详情",
			href:"./Modal/report/loanCostFlow/index.html?loanRiskManagerRealname=" + item.riskManagerRealname + "&loanBranchCompanyId=" + space.loanBranchCompanyId + "&loanBusinessGroupId=" + space.loanBusinessGroupId + "&timelineLoanSignBegin=" + space.timelineLoanSignBegin + "&timelineLoanSignEnd=" + space.timelineLoanSignEnd + "&timelineCompanyPayBegin=" + space.timelineCompanyPayBegin + "&timelineCompanyPayEnd=" + space.timelineCompanyPayEnd + "&timelineBankPayBegin=" + space.timelineBankPayBegin + "&timelineBankPayEnd=" + space.timelineBankPayEnd + "&loanCarType=" + space.loanCarType + "&loanInfoBusinessType=" + space.loanInfoBusinessType + "&carDealerCompany=" + space.carDealerCompany
	  }); 
	}
};
$('#searchForm input[name=timelineLoanSignBegin]').getMonthDayFirst();
$('#searchForm input[name=timelineLoanSignEnd]').getToday();
dataLoad_1 = function(params) {
	tableData(params, $.extend($("#searchForm").values(), {uId:uId , type: 1}), interUrl.report.customerNumtatistic);
};
dataLoad_2 = function(params) {
	tableData(params, $.extend($("#searchForm").values(), {uId:uId , type: 2}), interUrl.report.customerNumtatistic);
};
dataLoad_3 = function(params) {
	tableData(params, $.extend($("#searchForm").values(), {uId:uId , type: 3}), interUrl.report.customerNumtatistic);
};
dataLoad_4 = function(params) {
	tableData(params, $.extend($("#searchForm").values(), {uId:uId , type: 4}), interUrl.report.customerNumtatistic);
};
dataLoad_5 = function(params) {
	tableData(params, $.extend($("#searchForm").values(), {uId:uId , type: 5}), interUrl.report.customerNumtatistic);
};
dataLoad_6 = function(params) {
	tableData(params, $.extend($("#searchForm").values(), {uId:uId , type: 6}), interUrl.report.customerNumtatistic);
};
function total(){
	comn.ajax({
		url:interUrl.mockList || interUrl.report.queryStatisCustomerNum,
		data:$.extend($("#searchForm").values(),{ uId : uId}),
		success:function(res){
			$("#getForm").values(res.data);
		}
	});
}
total();
$(function(){
	$("#loanBranchCompanyId").getOrg();
	$("#loanBranchCompanyId").on("change", function() {
    var code = $(this).find("option:selected").attr('value');
    $("#loanBusinessGroupId").getGroup(code);
  });


	//$('#searchForm input[name=timelineLoanSignBegin]').getMonthDayFirst();
	//$('#searchForm input[name=timelineLoanSignEnd]').getToday();

	$("#table_1").bootstrapTable(comn.table);
	$("#table_2").bootstrapTable(comn.table);
	$("#table_3").bootstrapTable(comn.table);
	$("#table_4").bootstrapTable(comn.table);
	$("#table_5").bootstrapTable(comn.table);
	$("#table_6").bootstrapTable(comn.table);

  $('#btn-search').off('click').click(function(){
  	var sign = $('#searchForm input[name=timelineLoanSignBegin]').val();
  	var comPay = $('#searchForm input[name=timelineCompanyPayBegin]').val();
  	var bankPay = $('#searchForm input[name=timelineBankPayBegin]').val();
		if ( !(sign || comPay || bankPay) ) {
			tip({content: "签单日期，公司付款日期，银行放款日期至少填写一个！"});
			return false;
		}
		$("#table_1").bootstrapTable('refresh', {url: "..."});
		$("#table_2").bootstrapTable('refresh', {url: "..."});
		$("#table_3").bootstrapTable('refresh', {url: "..."});
		$("#table_4").bootstrapTable('refresh', {url: "..."});
		$("#table_5").bootstrapTable('refresh', {url: "..."});
		$("#table_6").bootstrapTable('refresh', {url: "..."});
	  $('#getForm')[0].reset();
	  total();
  });
	$('#table_1, #table_2， #table_3， #table_4， #table_5').bootstrapTable({
		classes: "table-striped table-hover table",
		clickToSelect: true,
		pagination: true,
		paginationFirstText: "第一页",
		paginationLastText: "最后一页",
		paginationNextText: "下一页",
		paginationPreText: "上一页",
		queryParams: "queryParams",
		sidePagination: "server",
		undefinedText: "--"
	});
});