var dataLoad_1, handle, tableEvent;

dataLoad_1 = function(params) {
	var p;
	p = params.data;
	//p['customerStatus'] = 1;
	return comn.ajax({
		url: interUrl.mockList || interUrl.gr.creditList,
		data: $.extend($("#searchForm").values(), p),
		success: function(res) {
			params.success({
				'total': res.totalItem,
				rows: res.data
			});
			return params.complete();
		}
	});
};

tableEvent = {
	"click .loanStart": function(e, a, item, index) {
		$("#table_2").bootstrapTable('refresh', {query:{cardNo:item.cardNo,filterId:item.id,filterType:1}});
		$("#risk").modal("show");
		$("#sure").click(function(){
			$("#risk").modal("hide");
			comn.addTab({
				title: '贷款评审',
				href: './Modal/loanManage/loanReview/loanStart.html?scoreType=edit&type=1&creditApplyId=' + item.id + "&space=LOAN&releventFlow=LOAN_APPLY_FLOW&releventFlowNode=LOAN_LAUNCH"
			});
		});

	}
};

handle = function(value, row, index) {
	return ["<button type='button' class='btn btn-primary btn-xs loanStart'>发起贷款评审</button>"].join("");
};

dataLoad_2 = function(params) {
	if(!params.data.cardNo)return;
	comn.ajax({
		url: interUrl.credit.creditRisk,
		data: params.data,
		success: function(res) {
			params.success({
				'total': 10,
				rows: res.data
			});
			params.complete();
			if(res.data.length==0){
				$("#sure").click();
				return;
			}
			$("#table_2").bootstrapTable('load', res.data);
		}
	});
}
tableEvent_2 = {
	"click .loanStart2": function(e, a, item, index) {
		if(item.type == '历史项目'){
//			return window.parent.toUrl({
//			url: "./Modal/loanManage/loanReview/loanStart.html?type=2&loanApplyId="+item.creditId //地址待定
//		    });
		    comn.addTab({title: '贷款详情',  href: './Modal/loanManage/loanReview/loanStart.html?type=2&startCredit=1&loanApplyId='+item.creditId+'&businessTypeCode=LOAN_APPLY_FLOW'});
		}else if(item.type == '历史担保'){
//			return window.parent.toUrl({
//			url: "./Modal/loanManage/loanReview/loanStart.html?type=2&loanApplyId="+item.creditId //地址待定
//		    });
		    comn.addTab({title: '贷款详情',  href: './Modal/loanManage/loanReview/loanStart.html?type=2&startCredit=1&loanApplyId='+item.creditId+'&businessTypeCode=LOAN_APPLY_FLOW'});
		}else if(item.type == '历史征信'){
//			return window.parent.toUrl({
//			url: "./Modal/loanManage/creditManage/creditInfo.html?type=1&businessId="+item.creditId //地址待定
//		    });
		    comn.addTab({title: '征信详情',  href: './Modal/loanManage/creditManage/creditInfo.html?type=1&startCredit=1&businessId='+item.creditId });
		}
		
	}
};
handle_2 = function(value, row, index) {
	return ["<button type='button' class='btn btn-primary btn-xs loanStart2'>查看</button>"].join("");
};

$(function(){
	$("#table_2").bootstrapTable();
})
