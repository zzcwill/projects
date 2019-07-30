var cancle, dataLoad_1, dataLoad_2, handle_1, handle_2, tableEvent;

cancle = null;

dataLoad_1 = function(params) {
  return tableData(params, $.extend($("#searchForm").values(), {
    bankPaymentStatus: 1
  }), interUrl.mockList || interUrl.creditManagement.bankList);
};

dataLoad_2 = function(params) {
  return tableData(params, $.extend($("#searchForm").values(), {
    bankPaymentStatus: 2
  }), interUrl.mockList || interUrl.creditManagement.bankList);
};

handle_1 = function(value, row, index) {
  return "<div class='btn btn-xs btn-primary info'>银行放款登记</div>";
};

handle_2 = function(value, row, index) {
  return "<div class='btn btn-xs btn-primary cancle'>取消登记</div>";
};

function addTab(url) { comn.addTab({title: '银行放款登记', href: url}) }
tableEvent = {
  "click .info": function(e, a, item, index) {
	  addTab( "./Modal/creditManagement/loanRegist/loanInfo.html?projectId=" + item.projectId + "&applyId=" + item.applyId)
  },
  "click .cancle": function(e, a, item, index) {
    cancle = function() {
      return comn.ajax({
        url: interUrl.creditManagement.bankCancel,
        data: {
          projectId: item['projectId'],
            applyId: item['applyId']
        },
        success: function(res) {
          var arr;
          arr = [];
          arr.push(item['projectNo']);
          $("#table_2").bootstrapTable("remove", {
            'field': 'projectNo',
            values: arr
          });
          return $("#table_1").bootstrapTable("selectPage", 1);
        }
      });
    };
    return $("#cancle").modal("show");
  }
};

$(function() {
  $("#btnSure").click(function() {
    if (typeof cancle === "function") {
      cancle();
    }
    $("#cancle").modal("hide");
    return cancle = null;
  });
  return $("#btn-search").click(function() {
    var activeTab;
    activeTab = $(".tab-content").find(".tab-pane.active").attr("id");
    return $("#" + activeTab).find("table").bootstrapTable("refresh", {url: "..."});
  });
});
