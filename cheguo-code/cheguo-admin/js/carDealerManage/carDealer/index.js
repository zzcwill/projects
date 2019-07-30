var dataLoad_1, handle, tableEvent;

dataLoad_1 = function(params) {
  var p;
  p = params.data;
  return comn.ajax({
    url: interUrl.mockList || interUrl.carDealer.list,
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

tableEvent = {
  "click .modify": function(e, a, item, index) {
	    return window.parent.toUrl({
	        url: "./Modal/carDealerManage/carDealer/carDealer.html?dealerId="+item['id']
	    });
	  },
  "click .enable": function(e, a, item, index) {
	    return comn.ajax({
	        url: interUrl.carDealer["setStatus"],
	        data: {
	        	dealerId: item['id'],
	        	status: (item['status']==0?1:0)
	        },
	        success: function(res) {
	        	tip({content: (item["status"]==1?"停用":"启用")+"成功!"});
	        	return $("#btn-search").trigger("click");
	        }
	      });
	  },
  "click .delete": function(e, a, item, index) {
    $("#sure").modal("show");
    return $("#OK").unbind("click").on("click", function() {
      return comn.ajax({
        url: interUrl.carDealer["delete"],
        data: {
        	dealerId: item['id']
        },
        success: function(res) {
          tip({
            content: "删除成功!"
          });
          $("#sure").modal("hide");
          return $("#btn-search").trigger("click");
        }
      });
    });
  }
};

handle = function(value, row, index) {
	var btnStatus = "<li><a class='enable'>"+(row["status"] == "1"?"停用":"启用")+"</a></li>";
	return ["<div class='btn-group btn-group-xs'>", "<button type='button' class='btn btn-primary'>操作</button>", "<button type='button' class='btn btn-primary dropdown-toggle' data-toggle='dropdown'>", "<span class='caret'></span>", "<span class='sr-only'>下拉切换</span>", "</button>", "<ul class='dropdown-menu' role='menu'>", "<li><a class='modify'>修改</a></li>", btnStatus, "<li><a class='delete'>删除</a></li>", "</ul>", "</div>"].join("");
};

$(function(){
	$("#addCarDealer").click(function() {
	    return window.parent.toUrl({
	        url: "./Modal/carDealerManage/carDealer/carDealer.html"
	    });
	});
	$("#affiliations").getCompany().change(function() {
		if(this.value=="") return $("#groupId").html('<option value="" selected>--请选择--</option>');
	      return $("#groupId").getGroup(this.value);
	});
	$("#carDealerAdd").click(function() {
	    var o, url;
	    o = $("#carDealer").find("form").values();
	    if (o.id) {
	      url = interUrl.carDealer.update;
	    } else {
	      url = interUrl.carDealer.add;
	    }
	    return comn.ajax({
	      url: url,
	      data: o,
	      success: function(res) {
	        $("#table_4").bootstrapTable('selectPage', 1);
	        tip({
	          content: "添加成功"
	        });
	        return $("#addRelationUser").modal("hide");
	      }
	    });
	  });
})
