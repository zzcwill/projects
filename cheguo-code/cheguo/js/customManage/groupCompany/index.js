var dataLoad_1, dataLoad_2, dataTable, handle, queryParams, tableEvent;

dataLoad_1 = function(params) {
	tableData(params,  $.extend($("#searchForm").values(),{status:'0'}), interUrl.mockList || interUrl.customer.groupList);
};

dataLoad_2 = function(params) { //$.extend({status: 2}, $("#searchForm").values())
	tableData(params, $("#searchForm").values(), interUrl.mockList || interUrl.customer.groupList);
};

tableEvent = {
	"click .cusInfo": function(e, a, item, index) {
		console.log(item);
		return window.parent.toUrl({
			url: "./Modal/customManage/branchCompany/info.html?type=4&id=" + item.id
		});
	},
	"click .allotOrg": function(e, a, item, index) {
		console.log(item);
		var _data = $("#table").bootstrapTable('getSelections'); 
		if (_data.length>0) {
	      $("#userDialog").modal("show");
	      $("#userId").val(item.id);
	      $("#orgName").getOrg();
		}else{
		  $("#dialog").modal("show");
		}
	}
};
// $.extend({status: 1}, $("#searchForm").values()),

queryParams = function(params) {
	return {
		page: (params.limit + params.offset) / params.limit,
		pageSize: params.limit
	};
};

handle = function(value, row, index) {
	return ["<button type='button' class='btn btn-primary btn-xs cusInfo'>查看详情</button>"].join("");
};

// 最后一项时备注
// $("#select_id option:last").attr("index")


$(function() {
	$("#searchFormBtn").click(function() {
    var activeTab;
    activeTab = $(".tab-content").find(".tab-pane.active").attr("id");
    return $("#" + activeTab).find("table").bootstrapTable("refresh", {url: "..."});
  }); 
  $("#allotOrg").click(function() {
	  var _data = $("#table").bootstrapTable('getSelections'); 
	  console.log(_data);
	  if (_data.length>0) {
	 	$("#userDialog").modal("show");
	 	var ids = "";
	 	for (var i = 0; i < _data.length; i++) {
	 		ids = ids + _data[i].id + ",";
	    }
	 	ids = ids.substr(0,ids.length - 1);
	 	 $("input[name='ids']").val(ids); 
	 	 $("#orgName").getOrg();
	  }else{
	    $("#dialog").modal("show");
	  }
	});
	$("#btn-sure").click(function(){
		if($("#orgForm").valid()){
			var data = $("#orgForm").values();
			console.log(data);
			$("#userDialog").modal("hide");
			comn.ajax({
		    url: interUrl.mockList || interUrl.customer.groupBranch,
		    data: data,
		    success: function(res) {
		      tip({
					content: "分配成功!!"
				});
				return window.parent.toUrl({
					url: "./Modal/customManage/groupCompany/index.html"
				});
		    }
		});
		}
	});
});
