var dataLoad_1, dataLoad_2, handle_1, handle_2, tableEvent;

dataLoad_1 = function(params) {
  return tableData(params, $.extend($("#searchForm").values(), {
    isDelivered: 1
  }), interUrl.mockList || interUrl.creditManagement.repayCardList);
};

dataLoad_2 = function(params) {
  return tableData(params, $.extend($("#searchForm").values(), {
    isDelivered: 2
  }), interUrl.mockList || interUrl.creditManagement.repayCardList);
};

handle_1 = function(value, row, index) {
  return "<div class='btn btn-xs btn-primary sended'>送出</div>";
};

handle_2 = function(value, row, index) {
  return ["<div class='btn-group btn-group-xs'>", "<button type='button' class='btn btn-primary dropdown-toggle' data-toggle='dropdown'> 操作 <span class='caret'></span></button>", "<ul class='dropdown-menu' role='menu'>", "<li><a class='edit'>修改</a></li>", "<li><a class='show'>查看</a></li>", "</ul>", "</div>"].join("");
};

function addTab(url) { comn.addTab({title: '客户还款卡管理', href: url}) }
tableEvent = {
  "click .edit": function(e, a, item, index) {
	  addTab("./Modal/creditManagement/repaymentManagement/repaymentInfo.html?projectId=" + item.projectId + "&applyId=" + item.applyId + "&type=edit");
  },
  "click .show": function(e, a, item, index) {
	  addTab( "./Modal/creditManagement/repaymentManagement/repaymentInfo.html?projectId=" + item.projectId + "&applyId=" + item.applyId + "&type=show")
  },
  "click .sended": function(e, a, item, index) {
	  addTab("./Modal/creditManagement/repaymentManagement/repaymentInfo.html?projectId=" + item.projectId + "&applyId=" + item.applyId + "&type=edit")
  }
};

$(function() {
  $(".nav-tabs li").click(function () {
    if ($(this).children().attr("href") == "#sign") {
      $("#exportBtn").removeClass("hide");
    } else {
      $("#exportBtn").addClass("hide");
    }
  });
  $('#exportBtn').click(function(){
    var search=$("#searchForm").serialize();
    var downLink = interUrl.basic + interUrl.creditManagement.repayCardExport + "?" + search +"&isDelivered=2";
    console.log(downLink);
    window.open(downLink, "_blank");
  });
  return $("#btn-search").click(function() {
    var activeTab;
    activeTab = $(".tab-content").find(".tab-pane.active").attr("id");
    return $("#" + activeTab).find("table").bootstrapTable("refresh", {url: "..."});
  });
});