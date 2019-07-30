var dataLoad_1, tableEvent, handle_1, feeTypeCode, feeStatus;
var args = comn.getArgs();
dataLoad_1 = function(params) {
	tableData(params,$.extend($("#searchForm").values(), {
    isIncome: 2
  }), interUrl.feeManage.list);
};
feeTypeCode =function(value, row, index){
	return [null, "业务费用", "风险费用"][value] || null;
};
feeStatus =function(value, row, index){
	return [null, "待提交", "审批中", "审批通过", "已收款"][value] || null;
};

tableEvent_1 = {
	"click .show": function(e, a, item, index) {
	  comn.addTab({title: '收款登记详情',
	    href: "./Modal/finaceManage/collectionRegistration/collectionInfo.html?type=show&feeId=" + item.id + "&status=" + item.status});
	},
	"click .approve": function(e, a, item, index) {
	  comn.addTab({title: '提交收款登记',
	    href: "./Modal/finaceManage/collectionRegistration/collectionInfo.html?type=approve&feeType=tip&feeId=" + item.id });
	}
};

handle_1 = function(value, row, index) {
	if(row.status == 1){
		return ['<a class="approve" href="javascript:;">提交审批</a>'].join("");
	}else{
		return ['<a class="show" href="javascript:;">查看详情</a>'].join("");
	}
};

$(function(){
	$('#searchForm input[name=startApplyDate],  #searchForm input[name=startActualDate]').getMonthDayFirst();
	$('#searchForm input[name=endApplyDate], #searchForm input[name=endActualDate]').getToday();

	$("#table").bootstrapTable(comn.table);

	$("#register").click(function(){    
	    comn.addTab({title: '收款登记',  href: './Modal/finaceManage/collectionRegistration/collectionInfo.html?feeType=tip' });
	});
	
});
