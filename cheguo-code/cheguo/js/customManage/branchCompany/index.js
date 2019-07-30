var dataLoad_1, dataLoad_2, dataTable, handle, queryParams, tableEvent, isManager;
// var _data = jQuery.parseJSON(window.parent.cache.emailList);
// console.log(_data);
// $(function() {
// 	$("#table").bootstrapTable("append", _data);
// });

dataLoad_1 = function(params) { //$.extend({status: 1}, $("#searchForm").values()),
	tableData(params, $.extend($("#searchForm").values(),{status:'1'}), interUrl.mockList || interUrl.customer.list);
};

dataLoad_2 = function(params) {
	tableData(params, $.extend($("#searchForm").values(),{status:'2,3,4,5'}), interUrl.mockList || interUrl.customer.list);
};

tableEvent = {
	"click .cusAllot": function(e, a, item, index) {
//		console.log(item);
//		return window.parent.toUrl({ //customerNumber
//			url: "./Modal/customManage/branchCompany/info.html?type=1&id=" + item.id
//		});
		comn.addTab({title: '客户信息',  href: "./Modal/customManage/branchCompany/info.html?type=1&id=" + item.id });
	},
	"click .cusClose": function(e, a, item, index) {
		removeTip();
		$("#customerHandle").modal("show");
		return $("#customerHandle").values($.extend(item, {
			closeOrReject: 1
		})).nameValues($.extend(item, {
			title: "关闭客户",
			reasonTypeHtml: "<span class='text-danger'>*</span>关闭原因",
			option: ["<option value=''>--请选择--</option>", "<option value='11'>客户不配合</option>", "<option value='12'>不买车了</option>", "<option value='13'>全款买车了</option>", "<option value='14'>选择其它服务商</option>", "<option value='15'>利率太高</option>", "<option value='16'>线下流程太繁锁</option>", "<option value='17'>办理周期太长</option>", "<option value='18'>其他</option>"].join("")
		}));
	},
	"click .cusQuit": function(e, a, item, index) {
		removeTip();
		$("#customerHandle").modal("show");
//		console.log(item);
		return $("#customerHandle").values($.extend(item, {
			closeOrReject: 2
		})).nameValues($.extend(item, {
			title: "退回客户",
			reasonTypeHtml: "<span class='text-danger'>*</span>退回原因",
			option: ["<option value=''>--请选择--</option>", "<option value='21'>客户不在本区域</option>", "<option value='22'>其他</option>"].join("")
		}));
	},
	"click .cusInfo": function(e, a, item, index) {
//		console.log(item);
//		return window.parent.toUrl({
//			url: "./Modal/customManage/branchCompany/info.html?type=3&id=" + item.id
//		});
		comn.addTab({title: '客户信息',  href: "./Modal/customManage/branchCompany/info.html?type=3&id=" + item.id });
	},
};
// $.extend({status: 1}, $("#searchForm").values()),

queryParams = function(params) {
	return {
		page: (params.limit + params.offset) / params.limit,
		pageSize: params.limit
	};
};

handle = function(value, row, index) {
	return ["<div class='btn-group btn-group-xs'>", "<button type='button' class='btn btn-primary dropdown-toggle' data-toggle='dropdown'>操作", "<span class='caret'></span>", "<span class='sr-only'>下拉切换</span>", "</button>", "<ul class='dropdown-menu' role='menu'>", "<li><a class='cusAllot'>分配客户</a></li>", "<li><a class='cusClose'>关闭客户</a></li>", "<li><a class='cusQuit'>退回客户</a></li>", "<li><a class='cusInfo'>查看详情</a></li>", "</ul>", "</div>"].join("");
};

// 最后一项时备注
// $("#select_id option:last").attr("index")

$(function() {
	$("#searchFormBtn").click(function() {
		var actieIndex;
		actieIndex = $(".tab-content").find(".tab-pane.active").attr("id");
    	return $("#" + actieIndex).find("table").bootstrapTable("refresh", {url: "..."});
	});
	$("#btn-sure").click(function() {
		var data, url;
		if($("#customerForm").valid()){
			data = $("#customerForm").values();
			if (data.closeOrReject === "1") {
				url = interUrl.customer.close;
			} else if (data.closeOrReject === "2") {
				url = interUrl.customer.branchReject;
			}
			return comn.ajax({
				url: interUrl.mockList || url,
				data: data,
				success: function(data) {
					$("#customerHandle").modal("hide");
					return window.parent.toUrl({
						url: "./Modal/customManage/branchCompany/index.html"
					});
				}
			});
		}
	});
	$(document).on("change", "#returnReasons", function() {
		if ($(this).find("option:selected").html() == "其他") {
			$("#remark").addClass("required");
			$("#returnReasons-error").remove();
		} else {
			removeTip();
		}
	})
});


function removeTip() {
	$("#remark").removeClass("required error");
	$("#returnReasons").removeClass("error");
	$("#remark-error, #returnReasons-error").remove();
	
}
