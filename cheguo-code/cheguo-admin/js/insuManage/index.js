var args, dataLoad_1, tableEvent, handle, zTreeOnClick,g_isModify = false;

jQuery.browser = {};

(function() {
  jQuery.browser.msie = false;
  jQuery.browser.version = 0;
  if (navigator.userAgent.match(/MSIE ([0-9]+)\./)) {
    jQuery.browser.msie = true;
    return jQuery.browser.version = RegExp.$1;
  }
})();

args = comn.getArgs();
dataLoad_1 = function(params) {
  var _insuId = $("#insuId").val();
  if(_insuId){
	   return comn.ajax({
	    url: interUrl.mockList || interUrl.insu.typeGet,
	    data: {insuId:_insuId},
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

typeFormatter = function(value){
    switch(value){
    case "1":return "商业险";break;
    case "2":return "交强险";break;
    };
};

tableEvent = {
  "click .stop": function(e, a, item, index) {
	    return comn.ajax({
	        url: interUrl.insu["typeSetStatus"],
	        data: {
	        	typeId: item['id'],
	        	status: item["status"]==1?0:1
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
        url: interUrl.insu["typeDel"],
        data: {
        	typeId: item['id']
        },
        success: function(res) {
          tip({content: "删除成功!"});
          $("#sure").modal("hide");
          return $("#btn-search").trigger("click");
        }
      });
    });
  },
  "click .modify": function(e, a, item, index){
	  $("#addType").modal("show");
	  $("#addType").find(".modal-title").html("修改险种");
	  $("#addTypeForm").values(item);
  }
};

handle = function(value, row, index) {
	var btnStatus = "<li><a class='stop'>"+(row["status"] == "1"?"停用":"启用")+"</a></li>";
    return ["<div class='btn-group btn-group-xs'>", "<button type='button' class='btn btn-primary'>操作</button>", "<button type='button' class='btn btn-primary dropdown-toggle' data-toggle='dropdown'>", "<span class='caret'></span>", "<span class='sr-only'>下拉切换</span>", "</button>", "<ul class='dropdown-menu' role='menu'>", "<li><a class='modify'>修改</a></li>", btnStatus, "<li><a class='delete'>删除</a></li>", "</ul>", "</div>"].join("");
};
	
current_node = null;

zTreeOnClick = function(event, treeId, treeNod) {
	current_node = treeNod;
	$("#guaranteeName").html(current_node.organizationName);
	
	openBank();
};

openBank = function(){
	$("#orgForm").values(current_node);
	setButtonStatus();
	
	$("#allGuarantee").html();
	comn.ajax({
	    url: interUrl.insu.get,
	    data: {insuId:current_node.id},
	    success: function(res) {
	    	var _html = "";
	    	if(res.data){
		    	$("#allGuarantee").html(res.data.organizationName);
	    	}
	    }
	  });
	$("#table").bootstrapTable('refresh');
	
	$("#stop .title").html(current_node['status']==0?"启用":"停用");
	
	if(current_node.getParentNode()){
		$("#orgForm").find("#parentOrg").val(current_node.getParentNode().bankName);
		$("#orgForm").find("#parentOrgId").val(current_node.parentId);
	}else
		$("#orgForm").find("#parentOrg").val("");
};

openTree = function(){
	comn.ajax({
	    url: interUrl.insu.tree,
	    success: function(res) {
	      var treeObj;
	      treeObj = $.fn.zTree.init($("#tree"), {
	        showLine: true,
	        expand: true,
	        callback: {
	          onClick: zTreeOnClick
	        },
	        data: {
	          key: {
	            name: "insuranceCompanyName"
	          },
	          simpleData: {
	            enable: true,
	            idKey: "id",
	            pIdKey: "parentId",
	            rootPId: 0
	          }
	        }
	      }, res.data);
	      
	      /*var node = treeObj.getNodes()[0];
	      if(node){
		      treeObj.selectNode(node);
		      zTreeOnClick(null, null, node);
		  }*/
	      
	      return treeObj.expandAll(true);
	    }
	  });
}
setButtonStatus = function(){
	  var span = $('#modify').find("span:last");
	  if(g_isModify==true){
		  span.html("&nbsp;取消&nbsp;");
		  $("#orgForm").find(":input").attr("disabled",false);
		  $("#orgForm").find("#parentOrg").attr("disabled",true);
		  $("#orgForm").find("#save").show();
	  }else{
		  span.html("&nbsp;修改&nbsp;");
	      $("#orgForm").find(":input").not(":button").attr("disabled",true);
	  	  $("#orgForm").find("#save").hide();
	  }
}
saveOrg = function(_form, _callback){
	var _data = _form.values();
	var _url = _data.id?interUrl.insu.update:interUrl.insu.add;
    return comn.ajax({
      url: _url,
      data: _data,
      success: function(res) {
    	if(res.status==10000){
    		if(_callback)_callback();
	        openTree();
	        g_isModify = false;
	        setButtonStatus();
    	}else{
    		tip({content: res.message});
    	}
      }
    });
}

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
	$("#province_2").getProvince().change(function() {
	    if (this.value) {
	      $("#area_2").val("");
	      return $("#city_2").getCity(this.value).unbind("change").change(function() {
	        if (this.value) {
	          return $("#area_2").getArea(this.value);
	        }
	      });
	    }
	  });
	
var validate = {
	      rules: {
	    	  companyPhone: {phoneMix: true},
	    	  companyFax: {telephone: true}
	      },
	      messages: {
	    	  companyPhone: {phoneMix: "公司电话格式不正确"},
	    	  companyFax: {telephone: "传真格式不正确"}
	      }
	};
  $("#addOrgForm").validate(validate);
  $("#orgForm").validate(validate);
  $("#add").click(function() {
	  $("#addOrg").modal("show");
	  if(current_node){
		  $("#addOrg").find("#parentOrgId").val(current_node.id);
		  $("#addOrg").find("#parentOrg").val(current_node.bankName);
	  }
  });
  $("#saveOrg").click(function() {
	  if($("#addOrgForm").valid()==false)return;
	  saveOrg($("#addOrgForm"), function(){$("#addOrg").modal("hide");});
 });
  $("#modify").click(function(){
	  g_isModify = g_isModify?false:true;
	  setButtonStatus();
  });
  $("#save").click(function(){
	  if($("#orgForm").valid()==false)return;
	  saveOrg($("#orgForm"));
  });
  $("#stop").click(function() {
	  if(!current_node){
		  tip({content: "请选择一个保险公司!"});
	  }
	  return comn.ajax({
	        url: interUrl.insu["setStatus"],
	        data: {
	        	insuId: current_node['id'],
	        	status: (current_node['status']==0?1:0)
	        },
	        success: function(res) {
	        	tip({content: "操作成功!"});
	        	openTree();
	        }
	      });
  });
  $("#del").click(function() {
	  if(!current_node){
		  tip({content: "请选择一个保险公司!"});
	  }
	  $("#sure").modal("show");
	  return $("#OK").unbind("click").on("click", function() {
	      return comn.ajax({
	        url: interUrl.insu["del"],
	        data: {
	        	insuId: current_node.id
	        },
	        success: function(res) {
	        	tip({content: "操作成功!"});
	        	$("#sure").modal("hide");
	        	openTree();
	        }
	      });
	    });
  });
  
  	$("#addTypeBtn").click(function() {
	    return $("#addType").modal("show");
	});
  	$("#addTypeForm").validate();
	$("#saveType").click(function() {
		if($("#addTypeForm").valid()==false)return;
		    var _insuId = $("#insuId").val();
		    if(_insuId==""){
		    	tip({content:"请先选择保险公司"});
		    	return;
		    }
		    var _typeId = $('#typeId').val();
		    var _url = _typeId==''?interUrl.insu.typeAdd:interUrl.insu.typeUpdate;
		    var data = $("#addTypeForm").values();
		    return comn.ajax({
		      url: _url ,
		      data: $.extend(data, {insuranceId:_insuId,id:_typeId}),
		      success: function(res) {
		        $("#addType").modal("hide");
		        return $("#btn-search").trigger("click");
		      }
		    });
	 });
  
  openTree();
});

