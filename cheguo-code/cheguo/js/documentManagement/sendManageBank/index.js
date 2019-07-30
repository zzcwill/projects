var dataLoad_1, dataLoad_2, handle_1, handle_2, tableEvent,fileSended1,fileSended2,fileSended3,billId,okHandleFn;

dataLoad_1 = function(params) {
  return tableData(params, $.extend($("#searchForm").values(),{}), 
  interUrl.mockList || interUrl.documentManagement.sendBankList);
};

dataLoad_2 = function(params) {
  return tableData(params, $.extend($("#searchForm").values(),{
  }), interUrl.mockList || interUrl.documentManagement.hasSendBankList);
};

dataLoad_3 = function(params) {
  return tableData(params, $.extend($("#searchForm").values(), {
   billId: billId 
  }), interUrl.mockList || interUrl.documentManagement.expressList);
};

handle_2 = function(value, row, index) {
	if(row['recipientStatus'] && row['recipientStatus']==3) 
		return ["<div class='btn btn-primary btn-xs info'>查看</div>"].join("");
	return ["<div class='btn-group btn-group-xs'>", "<button type='button' class='btn btn-primary dropdown-toggle' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>操作", "<span class='caret'></span>", "<span class='sr-only'>下拉切换</span>", "</button>", "<ul class='dropdown-menu' role='menu'>",  "<li><a class='info'>查看</a></li>", "<li><a class='update'>修改</a></li>", "<li><a class='delete'>删除</a></li>", "</ul>", "</div>"].join("");
};

fileSended1 = function(value, row, index){
  if(row['fileSended'] && (row['fileSended'] & 16) == 16)return "已发";
  return "未发";
}
fileSended2 = function(value, row, index){
  if(row['fileSended'] && (row['fileSended'] & 8) == 8)return "已发";
  return "未发";
}
fileSended3 = function(value, row, index){
  if(row['fileSended'] && (row['fileSended'] & 4) == 4)return "已发";
  return "未发";
}
tableEvent = {
"click .info": function(e, a, item, index) {
	window.parent.cache.emailList = "";
    return window.parent.toUrl({
      url: "./Modal/documentManagement/sendManageBank/editExpress.html?type=show&billId="+item.id
    });
},
"click .update": function(e, a, item, index) {
		window.parent.cache.emailList = "";
    return window.parent.toUrl({
      url: "./Modal/documentManagement/sendManageBank/editExpress.html?billId="+item.id
    });
},
  "click .delete": function(e, a, item, index) {
	    $("#dialogDelete").modal("show");
	    okHandleFn = function(){
	    	$("#dialogDelete").modal("hide");
	    	return comn.ajax({
	        url: interUrl.documentManagement.delExpress,
	        data: {
	          billId: item['id']
	        },
	        success: function(res) {
	          tip({
	            content: "删除成功!!"
	          });
	          return $("#btn-search").trigger("click");
	        }
	      });
	    }
	  }
};
// 新增发件
$("#addExpress").click(function() {
  var _data = $("#table1").bootstrapTable('getSelections'); 
  if(_data == null || _data == "" || _data.length == 0){
	   $("#userDialog").modal('show');
     return;
  }
  if (_data.length>1) {
    for (var i = 0; i < _data.length - 1; i++) {
      if (_data[i].orgName != _data[i + 1].orgName) {
        $("#dialog").modal('show');
        return;
      } 
    }
  }
  _data = JSON.stringify(_data);
  window.parent.cache.emailList = _data;
  return window.parent.toUrl({
      url: "./Modal/documentManagement/sendManageBank/editExpress.html"
  });
});

// tab 切换
$("#signClick").click(function(){
	$("#signGroup1").removeClass("hide");
	$("#signGroup2").removeClass("hide");
	$("#signGroup3").addClass("hide");
	$("#signGroup4").addClass("hide");
});
$("#noSignClick").click(function(){
	$("#signGroup3").removeClass("hide");
	$("#signGroup4").removeClass("hide");
	$("#signGroup1").addClass("hide");
	$("#signGroup2").addClass("hide");
});

$("#orgName").getOrg();
$(function() {
	 	$("#delete").click(function() {
      	okHandleFn();
    });
	  $("#table2").on('click-row.bs.table', function (e, row) {
  			billId = row.id;
  			$("#divTable1").removeClass("hide");
  			$("#dataTable1").bootstrapTable("destroy").bootstrapTable(comn.table);
  });
  return $("#btn-search").click(function() {
    var activeTab;
    activeTab = $(".tab-content").find(".tab-pane.active").attr("id");
    if("noSign" == activeTab){
	    $("#divTable1").addClass("hide");
	    $("#table2").bootstrapTable("refresh", {url: "..."});
    } else {
    	$("#" + activeTab).find("table").bootstrapTable("refresh", {url: "..."});
    }
  });
  
});
