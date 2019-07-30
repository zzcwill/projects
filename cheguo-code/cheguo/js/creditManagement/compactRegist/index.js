var dataLoad_1, dataLoad_2, handle_1, handle_2, tableEvent;

dataLoad_1 = function(params) {
  return tableData(params, $.extend($("#searchForm").values(), {
    isRegistered: 1
  }), interUrl.mockList || interUrl.creditManagement.loanContractList);
};

dataLoad_2 = function(params) {
  return tableData(params, $.extend($("#searchForm").values(), {
    isRegistered: 2
  }), interUrl.mockList || interUrl.creditManagement.loanContractList);
};

handle_1 = function(value, row, index) {
  return "<div class='btn btn-xs btn-primary edit2'>合同登记</div>";
};

handle_2 = function(value, row, index) {
  return ["<div class='btn-group btn-group-xs'>", "<button type='button' class='btn btn-primary dropdown-toggle' data-toggle='dropdown'> 操作 <span class='caret'></span></button>", "<ul class='dropdown-menu' role='menu'>", "<li><a class='edit'>修改</a></li>", "<li><a class='show'>查看</a></li>", "</ul>", "</div>"].join("");
};

function addTab(url) { comn.addTab({title: '合同资料录入', href: url}) }

tableEvent = {
  "click .info": function(e, a, item, index) {
	  addTab("./Modal/creditManagement/compactRegist/contractsInfo.html?projectId=" + item.projectId);
  },
  "click .edit": function(e, a, item, index) {
	  addTab("./Modal/creditManagement/compactRegist/contractsInfo.html?projectId=" + item.projectId + "&type=edit&registered=registered");
  },
  "click .edit2": function(e, a, item, index) {
    addTab("./Modal/creditManagement/compactRegist/contractsInfo.html?projectId=" + item.projectId + "&type=edit");
  },
  "click .show": function(e, a, item, index) {
	  addTab("./Modal/creditManagement/compactRegist/contractsInfo.html?projectId=" + item.projectId + "&type=show");
  }
};

$(function() {
  return $("#btn-search").click(function() {
    var activeTab;
    activeTab = $(".tab-content").find(".tab-pane.active").attr("id");
    return $("#" + activeTab).find("table").bootstrapTable("refresh", {url: "..."});
  });
});
