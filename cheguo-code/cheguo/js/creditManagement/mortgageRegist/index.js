var dataLoad_1, dataLoad_2, handle_1, handle_2, tableEvent,pledgeReturnStatus;

dataLoad_1 = function(params) {
  return tableData(params, $.extend($("#searchForm").values(), {
    pledgeStatus: 1
  }), interUrl.mockList || interUrl.creditManagement.mortageList);
};

dataLoad_2 = function(params) {
  return tableData(params, $.extend($("#searchForm").values(), {
    pledgeStatus: 2
  }), interUrl.mockList || interUrl.creditManagement.mortageList);
};

handle_1 = function(value, row, index) {
  return "<div class='btn btn-xs btn-primary info'>抵押录入</div>";
};

handle_2 = function(value, row, index) {
    if(row.pledgeReturnStatus == 2){// 抵押回传状态为已抵押时只能查看不能修改，其他状态可修改和查看
        return ["<div class='btn-group btn-group-xs'>", "<button type='button' class='btn btn-primary dropdown-toggle' data-toggle='dropdown'> 操作 <span class='caret'></span></button>", "<ul class='dropdown-menu' role='menu'>", "<li><a class='show'>查看</a></li>", "</ul>", "</div>"].join("");
    }
  return ["<div class='btn-group btn-group-xs'>", "<button type='button' class='btn btn-primary dropdown-toggle' data-toggle='dropdown'> 操作 <span class='caret'></span></button>", "<ul class='dropdown-menu' role='menu'>", "<li><a class='edit'>修改</a></li>", "<li><a class='show'>查看</a></li>", "</ul>", "</div>"].join("");
};
pledgeReturnStatus = function(value,row,index){
    return ['无需回传','未回传','已回传','回传不通过'][value] || "——"
}

function addTab(url) { comn.addTab({title: '抵押录入', href: url}) }
tableEvent = {
  "click .info": function(e, a, item, index) {
	  addTab("./Modal/creditManagement/mortgageRegist/mortgageInfo.html?projectId=" + item.projectId + "&applyId=" + item.applyId + "&space=CAR_PLEDGE" + "&releventFlowNode=PLEDGE_REGIST&releventFlow=CAR_PLEDGE_REGIST_FLOW");
  },
  "click .edit": function(e, a, item, index) {
	  addTab( "./Modal/creditManagement/mortgageRegist/mortgageInfo.html?projectId=" + item.projectId + "&applyId=" + item.applyId + "&type=edit" + "&space=CAR_PLEDGE" + "&releventFlowNode=PLEDGE_REGIST&releventFlow=CAR_PLEDGE_REGIST_FLOW");
  },
  "click .show": function(e, a, item, index) {
	  addTab( "./Modal/creditManagement/mortgageRegist/mortgageInfo.html?projectId=" + item.projectId + "&applyId=" + item.applyId + "&type=show" + "&space=CAR_PLEDGE" + "&releventFlowNode=PLEDGE_REGIST&releventFlow=CAR_PLEDGE_REGIST_FLOW")
  }
};

$(function() {
  return $("#btn-search").click(function() {
    var activeTab;
    activeTab = $(".tab-content").find(".tab-pane.active").attr("id");
    return $("#" + activeTab).find("table").bootstrapTable("refresh", {url: "..."});
  });
});
