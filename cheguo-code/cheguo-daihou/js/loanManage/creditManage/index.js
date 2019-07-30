var dataLoad_1, handle, tableEvent;

dataLoad_1 = function(params) {
	tableData(params, $("#searchForm").values(), interUrl.credit.creditList);
};

tableEvent = {
	"click .info": function(e, a, item, index) {
//		return window.parent.toUrl({
//			url: "./Modal/loanManage/creditManage/creditInfo.html?type=1&businessId=" + item.id
//		});
		comn.addTab({title: '征信详情',  href: './Modal/loanManage/creditManage/creditInfo.html?type=1&businessId=' + item.id });
	},
	"click .again": function(e, a, item, index) {
//		return window.parent.toUrl({
//			url: "./Modal/customManage/cheguoCustomer/credit.html?type=1&creditId=" + item.id
//		});
		comn.addTab({title: '发起征信',  href: './Modal/customManage/cheguoCustomer/credit.html?type=1&creditId=' + item.id });
	},
	"click .change": function(e, a, item, index) {
//		return window.parent.toUrl({
//			url: "./Modal/customManage/cheguoCustomer/credit.html?type=1&creditId=" + item.id
//		});
		comn.addTab({title: '发起征信',  href: './Modal/customManage/cheguoCustomer/credit.html?type=1&creditId=' + item.id });
	}
};

handle = function(value, row, index) {
	if(row.creditStatus == 0){
		var modifyMenu = "<li><a class='change'>修改</a></li>";
	}else{
		var modifyMenu = '';
	}
	//return ["<div class='btn-group btn-group-xs'>", "<button type='button' class='btn btn-primary dropdown-toggle' data-toggle='dropdown'>操作", "<span class='caret'></span>", "<span class='sr-only'>下拉切换</span>", "</button>", "<ul class='dropdown-menu' role='menu'>", "<li><a class='info'>查看详情</a></li>", modifyMenu, "<li><a class='again'>重新发起征信</a></li>", "</ul>", "</div>"].join("");
    return ["<div class='btn-group btn-group-xs'>", "<button type='button' class='btn btn-primary dropdown-toggle' data-toggle='dropdown'>操作", "<span class='caret'></span>", "<span class='sr-only'>下拉切换</span>", "</button>", "<ul class='dropdown-menu' role='menu'>", "<li><a class='info'>查看详情</a></li>", modifyMenu, "</ul>", "</div>"].join("");
};

$(document).on("click", "#launchedCredit", function() {
//	return window.parent.toUrl({
//		url: "./Modal/customManage/cheguoCustomer/credit.html?type=0"
//	});
	comn.addTab({title: '发起征信',  href: './Modal/customManage/cheguoCustomer/credit.html?type=0' });
})
