var args, dataLoad_1, dataLoad_2, handle_1, handle_2, tableEvent;

args = comn.getArgs();

dataLoad_1 = function(params) {
  return tableData(params, $.extend($("#searchForm").values(), {
    isRegistered: 2
  }), interUrl.mockList || interUrl.creditManagement.licensePlateInfoVo);
};

dataLoad_2 = function(params) {
  return tableData(params, $.extend($("#searchForm").values(), {
    isRegistered: 1
  }), interUrl.mockList || interUrl.creditManagement.licensePlateInfoVo);
};

handle_1 = function(value, row, index) {
  return "<div class='btn btn-xs btn-primary info'>上牌录入</div>";
};

handle_2 = function(value, row, index) {
  return ["<div class='btn-group btn-group-xs'>", "<button type='button' class='btn btn-primary dropdown-toggle' data-toggle='dropdown'> 操作 <span class='caret'></span></button>", "<ul class='dropdown-menu' role='menu'>", "<li><a class='edit'>修改</a></li>", "<li><a class='show'>查看</a></li>", "</ul>", "</div>"].join("");
};

function addTab(url) { comn.addTab({title: '上牌信息录入', href: url}) }

tableEvent = {
  "click .info": function(e, a, item, index) {
	  addTab( "./Modal/creditManagement/licenseRegist/licenseInfo.html?projectId=" + item.projectId + "&plateId=" + (item.plateId || ''))
  },
  "click .edit": function(e, a, item, index) {
	  addTab("./Modal/creditManagement/licenseRegist/licenseInfo.html?projectId=" + item.projectId + "&plateId=" + (item.plateId || '') + "&type=edit")
  },
  "click .show": function(e, a, item, index) {
	  addTab("./Modal/creditManagement/licenseRegist/licenseInfo.html?projectId=" + item.projectId + "&plateId=" + (item.plateId || '') + "&type=show")
  }
};

$(function() {
  return $("#btn-search").click(function() {
    var activeTab;
    activeTab = $(".tab-content").find(".tab-pane.active").attr("id");
    return $("#" + activeTab).find("table").bootstrapTable("refresh", {url: "..."});
  });
});
