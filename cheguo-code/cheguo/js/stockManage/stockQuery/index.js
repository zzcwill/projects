var dataLoad_1
dataLoad_1 = function(params) {
	var p;
	  p = params.data;
	  return comn.ajax({
	    url: interUrl.mockList || interUrl.purchase.userStockList,
	    data: $.extend($("#searchForm").values(), p),
	    success: function(res) {
	      params.success({
	        'total': res.totalItem,
	        rows: res.data
	      });
	      $("#stockTotal").text("库存总数：" + res.totalItem);
	      return params.complete();
	    }
	  });
};

$("#orgId").getOrg();


$("#orgId").change(function(){
	if(this.value != ""){
		$("#groupId").getGroup(this.value);
	}else {
		$("#groupId option:not(:first) ").remove();
	}
});