var dataLoad_1, handle, tableEvent,contractStatus;

//dataLoad_1 = function(params) {
//	alert('aaa');
//	tableData(params, $("#searchForm").values(), interUrl.mockList || interUrl.purchase.contractlist);
//};
dataLoad_1 = function(params) {
	  var p;
	  p = params.data;
	  return comn.ajax({
	    url: interUrl.mockList || interUrl.purchase.contractlist,
	    data: $.extend($("#searchForm").values(), p),
	    success: function(res) {
	      params.success({
	        'total': res.totalItem,
	        rows: res.data
	      });
	      return params.complete();
	    }
	  });
	};
contractStatus = function(value){
		var arrayValue = "";
	    if(1 == value){
			arrayValue="已签合同";
		}else if(2 == value){
			arrayValue="入库中";
		}else if(3==value){
			arrayValue="已入库";
		}
		return arrayValue;
	}

$(function(){
	$("#handingApplyOrgName").getOrg();//机构 handingApplyOrgId
    // 新增合同
	$("#addCarDealer").click(function(item) {
		return window.parent.toUrl({
			url: "./Modal/purchaseManage/purchaseContract/addpurchaseContract.html"
		});
	});
	 $("#btn-search1").click(function() {
	    $("#table").bootstrapTable('selectPage', 1);
	  });
});

// 删除
tableEvent = {
		"click .delete": function(e, a, item, index) {
		    $("#sure").modal("show");  // 提示是否需要删除
		    $("#deleteId").val(item['id']);
		  },
		  "click .update": function(e, a, item, index) {
				return window.parent.toUrl({
					url: "./Modal/purchaseManage/purchaseContract/addpurchaseContract.html?id=" + item.id // 地址待定
				});
		},
		"click .info": function(e, a, item, index) {
			return window.parent.toUrl({
				url: "./Modal/purchaseManage/purchaseContract/addpurchaseContract.html?type=1&id=" + item.id // 地址待定
			});
	}
}
handle = function(value, row, index) {
	if (row['contractStatus'] == 1) {
		return [
				"<div class='btn-group btn-group-xs'>",
				"<button type='button' class='btn btn-primary dropdown-toggle' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>操作",
				"<span class='caret'></span>",
				"<span class='sr-only'>下拉切换</span>", "</button>",
				"<ul class='dropdown-menu' role='menu'>",
				"<li><a class='update'>修改</a></li>",
				"<li><a class='delete'>删除</a></li>",
				"<li><a class='info' id='info'>查看详情</a></li>", "</ul>", "</div>" ]
				.join("");
	} else {
		return [
				"<div class='btn-group btn-group-xs'>",
				"<button type='button' class='btn btn-primary dropdown-toggle' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>操作",
				"<span class='caret'></span>",
				"<span class='sr-only'>下拉切换</span>", "</button>",
				"<ul class='dropdown-menu' role='menu'>",
				"<li><a class='info' id='info' >查看详情</a></li>", "</ul>", "</div>" ]
				.join("");
	}
	};

$("#OK").click(function() {
 return comn.ajax({
	        url: interUrl.purchase.contractdelete,
	        data: {
	        	id : $("#deleteId").val()
	        },
	        success: function(res) {
	          tip({
	            content: "删除成功!"
	          });
	          $("#sure").modal("hide");
	          $("#table").bootstrapTable('refresh');
	        }
	});
});
