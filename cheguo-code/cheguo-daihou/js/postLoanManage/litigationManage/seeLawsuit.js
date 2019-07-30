var args, data;
args = comn.getArgs();
data = {
	lawsuitId : args["lawsuitId"],
	projectId : args["projectId"]
}

//添加案件进程记录
table_1 = function (params) {
	return tableData(params, {
		lawsuitId: data.lawsuitId
	}, interUrl.postLoan.caseProcessInfo);
};

tableEvent_caseProcessRecord = {
	"click .caseProcessDetail": function(e, a, item, index) {
		$("#caseProcessRecordDetail").modal("show");
	    $("#modalTitle").text("案件进程");
	    $("#lawsuitDesc").val(item.lawsuitDesc);
	},
	"click .caseProcessImg": function (e, a, item, index) {
		var len = item.processFiles.length;
		var processImg = [];
		for (i = 0; i < len; i++) {
			processImg.push(item.processFiles[i].processFile);
		}
		window.parent.switchImage(processImg, 0, 2);
	}
};

handle_caseProcessRecord = function(value, row, index) {
	var seeProcessImg = "";
	var lawsuitDesc = "";
	var isImg = row.processFiles.length;
	if (isImg) {
		seeProcessImg = "<li><a class='caseProcessImg'>查看附件</a></li>"
	} else {
		seeProcessImg = "<li><a>无案件图片</a></li>"
	}
	if (row.lawsuitDesc) {
		lawsuitDesc = "<li><a class='caseProcessDetail'>查看详情</a></li>"
	} else {
		lawsuitDesc = "<li><a>无详情</a></li>"
	}
    return ["<div class='btn-group btn-group-xs'>",
    		"<button type='button' class='btn btn-primary dropdown-toggle' data-toggle='dropdown'>操作",
    		"<span class='caret'></span>", "<span class='sr-only'>下拉切换</span>",
    		"</button>",
    		"<ul class='dropdown-menu' role='menu'>",
		    lawsuitDesc,
		    seeProcessImg,
		    "</ul>",
    		"</div>"].join("");
};

//基本信息
comn.ajax({
	url: interUrl.postLoan.caseProcessGet,
	data: {
		lawsuitId : data.lawsuitId
	},
	success: function(res) {
		$("#caseProcessList").values(res.data);
	}
});
//诉讼基本信息
comn.ajax({
  url: interUrl.postLoan.caseProcessGet,
  data: {
    lawsuitId: args["lawsuitId"]
  },
  success: function(res) {
    $("#caseProcessList1").values(res.data);
  }
});
$(function() {
	//查看贷款详情
	$("#documentDetail").click(function() {
	  	return comn.addTab({
	  		title : '贷款详情',
	  		href : "./Modal/customManage/customer/loanDetail.html?projectId=" + data.projectId+"&customerId="+args.customerId + "&loanApplyId=" + data.projectId + "&space=LOAN&releventFlowNode=LOAN_QUERY&releventFlow=LOAN_QUERY"
	  	});
	});
})

