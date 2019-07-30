var args, dataLoad_1, handle, tableEvent;

args = comn.getArgs();

dataLoad_1 = function(params) {
  var p;
  p = params.data;
  p["dealerId"] = args["dealerId"] || $("#dealerId").val();
  if(p["dealerId"]){
	  return comn.ajax({
	    url: interUrl.mockList || interUrl.carDealer.accountList,
	    data: $.extend($("#searchForm").values(), p),
	    success: function(res) {
	      params.success({
	        'total': res.totalItem,
	        rows: res.data
	      });
	      return params.complete();
	    }
	  });
  }else{
	  return params.complete();
  }
};

tableEvent = {
  "click .stop": function(e, a, item, index) {
	    return comn.ajax({
	        url: interUrl.carDealer["accountStop"],
	        data: {
	        	accountId: item['id'],
	        	status: (item['status']==0?1:0)
	        },
	        success: function(res) {
	        	tip({content: (item['status']==0?"启用":"停用")+"成功!"});
	        	return $("#table").bootstrapTable('refresh');
	        }
	      });
	  },
  "click .delete": function(e, a, item, index) {
    $("#sure").modal("show");
    return $("#OK").unbind("click").on("click", function() {
      return comn.ajax({
        url: interUrl.carDealer["accountDel"],
        data: {
        	accountId: item['id']
        },
        success: function(res) {
          tip({
            content: "删除成功!"
          });
          $("#sure").modal("hide");
          return $("#table").bootstrapTable('refresh');
        }
      });
    });
  }
};

handle = function(value, row, index) {
	var btnStatus = "<li><a class='stop'>"+(row["status"] == "1"?"停用":"启用")+"</a></li>";
	return ["<div class='btn-group btn-group-xs'>", "<button type='button' class='btn btn-primary'>操作</button>", "<button type='button' class='btn btn-primary dropdown-toggle' data-toggle='dropdown'>", "<span class='caret'></span>", "<span class='sr-only'>下拉切换</span>", "</button>", "<ul class='dropdown-menu' role='menu'>", btnStatus, "<li><a class='delete'>删除</a></li>", "</ul>", "</div>"].join("");
};

bankFormatter = function(value){
    switch(value){
    case "ICBC":return "工商银行";break;
    case "CCB":return "建设银行";break;
    case "BOC":return "中国银行";break;
    case "ABC":return "农业银行";break;
    case "CMB":return "招商银行";
    };
};
	
$(function() {
	$("#table").bootstrapTable('resetView', {height:400});
	 $("#province_1").getProvince().change(function() {
		    var v = this.value || $(this).attr('defaultValue');
		    if (v) {
		      $("#area_1").val("");
		      return $("#city_1").getCity(v).unbind("change").change(function() {
		    	  if (this.value || $(this).attr('defaultValue')) {
		              return $("#area_1").getArea(this.value || $(this).attr('defaultValue'));
		          }
		      });
		    }
		  });
	  $("#affiliations").getCompany().change(function() {
		  var v = $(this).val() || $(this).attr('defaultValue');
		  if (v) {
		    	return $("#personInCharge").getUserByCompanyId(v);
		    }else{
		    	return $("#personInCharge").html('<option value="" selected>--请选择--</option>');
		    }
		  });
	  
	if(args["dealerId"]){
		comn.ajax({
		    url: interUrl.carDealer.get,
		    data: {
		    	dealerId: args["dealerId"]
		    },
		    success: function(res) {
		      return $("#carDealerForm").values(res.data);
		    }
		  });
	}
  var validate = {
      rules: {
    	  contactPhone: {mobile: true}
      },
      messages: {
    	  contactPhone: {mobile: "手机号码格式不正确"}
      }
  };
  $("#carDealerForm").validate(validate);
  
  $("#close").on("click", function(){
	  window.parent.toUrl({
	        url: "./Modal/carDealerManage/carDealer/index.html"
	    });
  });
  
  $("#save").on("click", function() {//点击提交
	if($("#carDealerForm").valid()==false)return;
    var data = $("#carDealerForm").values();
    var _url;
    if (data.id) {
    	_url = interUrl.carDealer.update;
    } else {
    	_url = interUrl.carDealer.add;
    }
    return comn.ajax({
      url: _url,
      data: data,
      success: function(res) {
    	  var _hint;
    	  if(res.status==10000)
    		  _hint = "添加成功"
    	  else
    		  _hint = message;
		  tip({content: _hint});
		  $("#dealerId").val(res.data);
      }
    });
  });
  
  $("#addCarDealer").click(function() {
	    return $("#addAccount").modal("show");
  });
  $("#addAccountForm").validate();
  $("#saveAccount").click(function() {
	    var _dealerId = $("#dealerId").val();
	    if(_dealerId==""){
	    	tip({content:"请先保存车商信息"});
	    	return;
	    }
	    if($("#addAccountForm").valid()==false)return;
	    var data = $("#addAccountForm").values();
	    return comn.ajax({
	      url: interUrl.carDealer.accountAdd,
	      data: $.extend(data, {dealerId:_dealerId}),
	      success: function(res) {
	        $("#addAccount").modal("hide");
	        return $("#table").bootstrapTable('refresh');
	      }
	    });
   });
});