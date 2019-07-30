var dataLoad_1, dataLoad_2, handle_1, handle_2, tableEvent, fileSended1, fileSended2, billId, okHandleFn;

dataLoad_1 = function(params) {
	  return tableData(params, $.extend($("#searchForm").values(), {
	  }), interUrl.mockList || interUrl.purchase.useNotList);
	};

dataLoad_2 = function(params) {
	  return tableData(params, $.extend($("#searchForm").values(),{
	  }), interUrl.mockList || interUrl.purchase.useList);
	};	
	
$(function() {
	$("select[name='orgId']").getOrg();
	$(document).on("change", "#orgId", function() {
			var code = $(this).find("option:selected").attr('value');
			$("#bussinessId").getGroup(code);
			return
		});
});
		
$("#useNotListTab").click(function(){
	$("#divBillNo").addClass("hide");
});
$("#useListTab").click(function(){
	$("#divBillNo").removeClass("hide");
});

handle_1 = function(value, row, index) {
	  return "<div class='btn btn-xs btn-primary out'>领用出库</div>";
	};
handle_2 = function(value, row, index) {
	  return ["<div class='btn-group btn-group-xs'>", "<button type='button' class='btn btn-primary dropdown-toggle' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>操作", "<span class='caret'></span>", "<span class='sr-only'>下拉切换</span>", "</button>", "<ul class='dropdown-menu' role='menu'>",  "<li><a class='info'>查看</a></li>", "<li><a class='update'>修改</a></li>", "<li><a class='delete'>删除</a></li>", "</ul>", "</div>"].join("");
	};
handle_3 = function(value, row, index) {
	  var aa="";
	  aa=row.carBrandName+row.carMakeName+row.carModelName
	  return aa;
    };
handle_4 = function(value, row, index) {
	  var aa="";
	  aa=row.carBrandName+row.carMakeName+row.carModelName
	  return aa;
	};
	


tableEvent = {
  "click .out": function(e, a, item, index) {
	  window.parent.cache.emailList = item;
	  console.log(item)
	    return window.parent.toUrl({
	    url: "./Modal/stockManage/userStock/leadingOut.html?type=1"
//  	return comn.addTab({
//  		title : '領用出庫',
//  		href : "./Modal/stockManage/userStock/leadingOut.html?id="+item.projectId
  	});
  },
  "click .info": function(e, a, item, index) {
  	window.parent.cache.emailList = item;
    return window.parent.toUrl({
      url: "./Modal/stockManage/userStock/leadingOut.html?type=2"
//    return comn.addTab({
//    	title : '領用出庫',
//    	href : "./Modal/stockManage/userStock/leadingOut.html?type=show&id="+item.projectId+"bussinessId="+item.bussinessId
    });
  },
  "click .update": function(e, a, item, index) {
//	  return comn.addTab({
//	    	title : '領用出庫',
//	    	href : "./Modal/stockManage/userStock/leadingOut.html?id="+item.projectId+"bussinessId="+item.bussinessId
  	window.parent.cache.emailList = item;
    return window.parent.toUrl({
      url: "./Modal/stockManage/userStock/leadingOut.html?type=1"
    });
  },
  "click .delete": function(e, a, item, index) {
   $("#sure").modal("show");
 //   alert(item['projectId'])
  	$("#OK").click(function() {
  		comn.ajax({
  	        url: interUrl.purchase.saveStock,
  	        data: {
  	          projectId: item['projectId'],
  		      type:2
  	        },
  	        success: function(res) {
  	          tip({
  	            content: "删除成功!"
  	          });
  	         // return $("#btn-search").trigger("click");
  	      	  $("#sure").modal("hide");
  	      	$("#table2").bootstrapTable("refresh");
  	      $("#table1").bootstrapTable("refresh");
  	        }
  	      });
	});
  }
};


$("#btn-search-test").click(function() {
    var activeTab;
    activeTab = $(".tab-content").find(".tab-pane.active").attr("id");
    return $("#" + activeTab).find("table").bootstrapTable("selectPage", 1);
  });

