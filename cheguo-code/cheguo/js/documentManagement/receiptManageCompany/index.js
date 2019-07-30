var dataLoad_1, dataLoad_2, dataLoad_3, dataLoad_4, handle_1, handle_2, tableEvent,billId ,handleFn;

dataLoad_1 = function(params) {
  return tableData(params, $.extend($("#searchForm").values(), {
    recipientStatus: 1
  }), interUrl.mockList || interUrl.documentManagement.recipientCompanyList);
};
dataLoad_2 = function(params) {
  tableData(params, $.extend($("#searchForm").values(),{billId:billId}), 
  interUrl.mockList || interUrl.documentManagement.expressList);
};

dataLoad_3 = function(params) {
  return tableData(params, $.extend($("#searchForm").values(), {
    recipientStatus: 3
  }), interUrl.mockList || interUrl.documentManagement.recipientCompanyList);
};

handle_1 = function(value, row, index) {
  return "<div class='btn btn-xs btn-primary receipt'>收件</div>";
};

handle_2 = function(value, row, index) {
	var hideValue = $("#hideValue").text();
	if(hideValue == '1'){
  	return ["<div class='btn-group btn-group-xs'>", "<button type='button' class='btn btn-primary dropdown-toggle' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>操作", "<span class='caret'></span>", "<span class='sr-only'>下拉切换</span>", "</button>", "<ul class='dropdown-menu' role='menu'>",  "<li><a class='unReceipt'>未收到</a></li>", "<li><a class='missing'>资料缺失</a></li>", "</ul>", "</div>"].join("");
	}
};
handle_3 = function(value, row, index) {
  return "<div class='btn btn-xs btn-primary cancelReceipt'>取消收件</div>";
};

tableEvent = {
  "click .receipt": function(e, a, item, index) {
    $("#dialog").modal("show");
    handleFn = function(){
    	 $("#dialog").modal("hide");
    	return comn.ajax({
    		url: interUrl.documentManagement.recipient,
    		data: {
          billId: item['id']
        },
        success: function(res) {
        	tip({
            content: "收件成功!!"
          });
          return window.parent.toUrl({
						url: "./Modal/documentManagement/receiptManageCompany/index.html"
					});
	        }
    	});
    };
  },
  "click .unReceipt": function(e, a, item, index) {
    $("#addDesc").modal("show");
    handleFn = function(){
    	if ($("#addDescFrom").valid()) {
        var data;
        data = $("#addDescFrom").values();
        $("#addDesc").modal("hide");
        return comn.ajax({
          url: interUrl.documentManagement.recipientTemp,
          data: $.extend(data, {
        	  billId: billId,
        	  documentDeliverId: item['id'],
              recipientStatus : 1
            }),
          success: function(res) {
            tip({
              content: "添加成功!!"
            });
            return $("#btn-search").trigger("click");
          }
        });
      };
    };
  },
  "click .missing": function(e, a, item, index) {
    $("#addDesc").modal("show");
    handleFn = function(){
    	if ($("#addDescFrom").valid()) {
        var data;
        data = $("#addDescFrom").values();
         $("#addDesc").modal("hide");
        return comn.ajax({
          url: interUrl.documentManagement.recipientTemp,
          data: $.extend(data, {
        	  billId: billId,
        	  documentDeliverId: item['id'],
              recipientStatus : 2
            }),
          success: function(res) {
            tip({
              content: "添加成功!!"
            });
            return $("#btn-search").trigger("click");
          }
        });
      };
    };
  },
  "click .cancelReceipt": function(e, a, item, index) {
    $("#dialogCancel").modal("show");
    handleFn = function(){
    	$("#dialogCancel").modal("hide");
    	return comn.ajax({
    		url: interUrl.documentManagement.recipientCancel,
    		data: {
          billId: item['id']
        },
        success: function(res) {
        	tip({
            content: "操作成功!!"
          });
          return window.parent.toUrl({
						url: "./Modal/documentManagement/receiptManageCompany/index.html"
					});
        }
    	});
    };
  }
};

$("#bankName").getBank();
$(function() {
  $("#table1").on('click-row.bs.table', function (e, row) {
  			billId = row.id;
  			$("#divTable1").removeClass("hide");
  			$("#dataTable1").bootstrapTable("destroy").bootstrapTable(comn.table);
  });
  $("#table2").on('click-row.bs.table', function (e, row) {
  			billId = row.id;
  			$("#divTable1").removeClass("hide");
  			$("#dataTable1").bootstrapTable("destroy").bootstrapTable(comn.table);
  });
	$("#save,#ok,#okCancel").click(function() { 
      handleFn();
  });
  $("#tabSign").click(function(){
  	$("#hideValue").text("1");
  	$("#divTable1").addClass("hide");
  });
   $("#tabNoSign").click(function(){
  	$("#hideValue").text("2");
  	$("#divTable1").addClass("hide");
  });
  return $("#btn-search").click(function() {
    var activeTab;
    activeTab = $(".tab-content").find(".tab-pane.active").attr("id");
    $("#divTable1").addClass("hide");
    return $("#" + activeTab).find("table").bootstrapTable("refresh", {url: "..."});
  });
});
