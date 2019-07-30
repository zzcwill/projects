var table_1, tableEvent_1, handle_1;
table_1 = function(params) {
	tableData(params, $("#recentOverdueForm").values(), interUrl.postLoan.lawsuitList);
};

tableEvent_1 = {
	"click .proceedingReg": function(e, a, item, index) {
		comn.addTab({
			title: '进程登记',
			href: './Modal/postLoanManage/litigationManage/caseProcess.html?lawsuitId='+item.id +'&lawsuitStatus='+item.lawsuitStatus+'&projectId='+item.projectId
		});
	},
	"click .nolleApply": function(e, a, item, index) {
		comn.addTab({
			title: '撤诉申请',
			href: './Modal/postLoanManage/litigationManage/withdrawingApply.html?projectId='+item.projectId+'&lawsuitId='+item.id
		})
	},
	//改成单个按钮
	"click .seeDeail": function(e, a, item, index) {
		comn.addTab({
			title: '查看案件进程',
			href: './Modal/postLoanManage/litigationManage/seeLawsuit.html?projectId='+item.projectId+'&customerId='+item.customerId+'&lawsuitId='+item.id+"&loanApplyId="+item.id +"&businessTypeCode=LAWSUIT_APPLY_FLOW"
		})
	},
	"click .saveDamageReg": function(e, a, item, index) {
		comn.addTab({title: '保全登记',  href: ''});
	}
};

handle_1 = function(value, row, index) {
	var lawsuitStatus = "";
	if (row.lawsuitStatus == 3 || (row.lawsuitStatus >= 6 && row.lawsuitStatus < 15))
	{
		lawsuitStatus = "<li><a class='proceedingReg'>进程登记</a></li>";
	}
	if (row.lawsuitStatus == 15)
	{
		lawsuitStatus = "<li><a class='proceedingReg'>进程登记</a></li><li><a class='nolleApply'>撤诉申请</a></li>";
	}
    return ["<div class='btn-group btn-group-xs'>",
    "<button type='button' class='btn btn-primary dropdown-toggle' data-toggle='dropdown'>操作",
    "<span class='caret'></span>", "<span class='sr-only'>下拉切换</span>",
    "</button>",
    "<ul class='dropdown-menu' role='menu'>", lawsuitStatus ,
    "<li><a class='seeDeail'>查看</a></li>",
    "</ul>",
    "</div>"].join("");
};

$(function() {
	$(document).on("click", "#courtApply", function () {
		comn.addTab({title: '起诉申请',  href: './Modal/postLoanManage/litigationManage/courtApply.html?tableName=lawsuit_info'});
	})
	$("#bankName").getBankAll();
	$("#companyId").getOrg();
})


