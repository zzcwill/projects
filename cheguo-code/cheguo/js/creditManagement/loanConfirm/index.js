var dataLoad_1, dataLoad_2, handle_1, handle_2, tableEvent;

dataLoad_1 = function(params) {
  return tableData(params, $.extend($("#searchForm").values(), {
    pledgeStatus: 1
  }), interUrl.mockList || interUrl.creditManagement.licensePlateInfoVo);
};

dataLoad_2 = function(params) {
  return tableData(params, $.extend($("#searchForm").values(), {
    pledgeStatus: 2
  }), interUrl.mockList || interUrl.creditManagement.licensePlateInfoVo);
};

handle_1 = function(value, row, index) {
  return "<div class='btn btn-xs btn-primary info'>放款确认</div>";
};

handle_2 = function(value, row, index) {
  return ["<div class='btn-group btn-group-xs'>", "<button type='button' class='btn btn-primary dropdown-toggle' data-toggle='dropdown'> 操作 <span class='caret'></span></button>", "<ul class='dropdown-menu' role='menu'>", "<li><a class='edit'>修改</a></li>", "<li><a class='show'>查看</a></li>", "</ul>", "</div>"].join("");
};

tableEvent = {
  "click .info": function(e, a, item, index) {
    return window.parent.toUrl({
      url: "./Modal/creditManagement/mortgageRegist/mortgageInfo.html"
    });
  }
};

$(function() {
  return $("#btn-search").click(function() {
    var activeTab;
    activeTab = $(".tab-content").find(".tab-pane.active").attr("id");
    return $("#" + activeTab).find("table").bootstrapTable("refresh", {url: "..."});
  });
});
