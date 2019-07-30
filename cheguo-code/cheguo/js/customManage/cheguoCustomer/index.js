var dataLoad_1, dataLoad_2, dataTable, handle, queryParams, tableEvent;

dataTable = {
	getData_1: null,
	getData_2: null
};

tableEvent = {
	"click .cusStart": function(e, a, item, index) {
		tip({
			content: '因系统优化，请从APP发起征信！'
		})		
		// window.parent.cache.credit = item;
		// comn.addTab({
		// 	title: '发起征信',
    //         //href:  "./Modal/customManage/cheguoCustomer/credit.html?type=4" //此链接供车果客户使用，2017-11-15开始作废不再表示type=4
    //         href:  "./Modal/customManage/cheguoCustomer/credit.html?type=2&id="+item.id //2017-11-15开始执行同客户导入一致，因为车国C端无法提供订单编号（dealerOrder），B端能提供，故作废type=4
		// })
	},
	"click .cusClose": function(e, a, item, index) {
		$("#customerHandle").modal("show");
		return $("#customerHandle").values($.extend(item, {
			closeOrReject: 1
		})).nameValues($.extend(item, {
			title: "关闭客户",
			option: ["<option value=''>--请选择--</option>", "<option value='11'>客户不配合</option>", "<option value='12'>不买车了</option>", "<option value='13'>全款买车了</option>", "<option value='14'>选择其它服务商</option>", "<option value='15'>利率太高</option>", "<option value='16'>线下流程太繁锁</option>", "<option value='17'>办理周期太长</option>"].join("")
		}));
	},
	"click .cusQuit": function(e, a, item, index) {
		$("#customerHandle").modal("show");
		return $("#customerHandle").values($.extend(item, {
			closeOrReject: 2
		})).nameValues($.extend(item, {
			title: "退回客户",
			option: ["<option value=''>--请选择--</option>", "<option value='21'>客户不在本区域</option>", "<option value='22'>其它</option>"].join("")
		}));
	}
};

dataLoad_2 = function(params) {
	tableData(params, $.extend({status: "2,3,4"}, $("#searchForm").values()), interUrl.mockList || interUrl.customer.list);
};

dataLoad_1 = function(params) {
	tableData(params, $.extend({status: 1}, $("#searchForm").values()), interUrl.mockList || interUrl.customer.list);
};

queryParams = function(params) {
	return {
		page: (params.limit + params.offset) / params.limit,
		pageSize: params.limit
	};
};

handle = function(value, row, index) {
	return ["<div class='btn-group btn-group-xs'>", "<button type='button' class='btn btn-primary dropdown-toggle' data-toggle='dropdown'>操作", "<span class='caret'></span>", "<span class='sr-only'>下拉切换</span>", "</button>", "<ul class='dropdown-menu' role='menu'>", "<li><a class='cusStart'>发起征信</a></li>", "<li><a class='cusClose'>关闭客户</a></li>", "<li><a class='cusQuit'>退回客户</a></li>", "</ul>", "</div>"].join("");
};

$(function() {
	$("#btn-search").click(function() {
		var actieIndex;
		actieIndex = $(".tab-content > .tab-pane.active").index();
		console.log(actieIndex);
		if (actieIndex === 1) {
			return $("#table").bootstrapTable('refresh', {url: '...'});
		} else if (actieIndex === 2) {
			return $("#table_2").bootstrapTable('refresh', {url: '...'});
		}
	});
	return $("#btn-sure").click(function() {
		var o, url;
		o = $(this).parents("form").values();
		if (o.closeOrReject === "1") {
			url = interUrl.customer.close;
		} else if (o.closeOrReject === "2") {
			url = interUrl.customer.reject;
		}
		return comn.ajax({
			url: interUrl.mockList || url,
			data: o,
			success: function(data) {
				$("#customerHandle").modal("hide");
				return $("#table").bootstrapTable('selectPage', 1);
			}
		});
	});
});
