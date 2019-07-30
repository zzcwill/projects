var SettlementRegistration,editTableEvent,jqzt, _sum;




// 登记结清数据列表请求渲染
SettlementRegistration=function(params){
	tableData(params, $.extend($("#searchForm").values(),{
    	isRegistered: 1
    }),interUrl.mockList || interUrl.SettlementRegistration.SettlementUrl, function (data) {
      _sum = data.totalItem;
  });
};

// 点击查询
$("#btn-search2").click(function() {
    return $("#sign").find("#table").bootstrapTable("refresh", {url:"..."});
});
//导出
$('#exportBtn').click(function(){
  if (Number(_sum) > 20000) {
      return tip({content: "数据超过20000,请添加筛选条件。"})
  } else {
      var search=$("#searchForm").serialize();
      var downLink = interUrl.basic + interUrl.SettlementRegistration.export + "?" + search ;
      console.log(downLink);
      window.open(downLink, "_blank");
  }
});
// 列表的自定义按钮
SettlemenStatus = function(value, row, index) {
	//console.log(row);
	/*console.log(index);
	console.log(value);*/
	/*
		index为索引
		row为返回当前一条记录的对象
		value为当前值
	*/
		return ["<div class='btn-group btn-group-xs'>",
					"<button type='button' class='btn btn-primary dropdown-toggle' data-toggle='dropdown'>操作",
						"<span class='caret'></span>", "<span class='sr-only'>下拉切换</span>",
					"</button>",
					"<ul class='dropdown-menu' role='menu'>",
						row.settlementStatusName == "未结清" ? "<li><a class='SettlementProcessing'>结清处理</a></li>" : "<li><a class='SettlementProcessing2'>查看结清详情</a></li>",
						"<li><a class='CheckDetails'>查看基本详情</a></li>",
					"</ul>",
				"</div>"].join("");
};

// 当前列的按钮事件绑定
editTableEvent = {
	// 结清处理按钮点击时
	"click .SettlementProcessing": function(e, a, item, index) {
		return comn.addTab({
			title:"结清处理",
			href: "./Modal/SettlementRegistration/SettlementProcessing/SettlementProcessing.html?projectId="+item.projectId+"&settlementStyle=tip&currentNodeCode=LAUNCH_LOAN_CLEAR"
		});
	},
	"click .SettlementProcessing2":function(e, a, item, index){
		return comn.addTab({
			title:"查看结清详情",
			href: "./Modal/SettlementRegistration/SettlementProcessing/SettlementProcessing.html?projectId="+item.projectId+"&disble=0"+"&xiangqing=1"+"&str=查看结清详情"+"&jqList=1&loanApplyId="+item.id +"&businessTypeCode=LOAN_CLEAR_FLOW"
		});
	},
	// 查看贷款详情时
	"click .CheckDetails": function(e, a, item, index) {
		return comn.addTab({
			title:"贷款详情",
			href: "./Modal/customManage/customer/loanDetail.html?projectId="+item.projectId + "&space=LOAN&releventFlowNode=LOAN_QUERY&releventFlow=LOAN_QUERY" + "&loanFlag=1&customerId="+item.customerId
		});
	}
};
