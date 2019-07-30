var cusStatus, dataLoad_1, handle, tableEvent, typeofGroup = 0;

dataLoad_1 = function(params) {
  var p;
  p = params.data;
  return comn.ajax({
    url: interUrl.mockList || interUrl.gr.list,
    data: $.extend($("#searchForm").values(), p),
    success: function(res) {
      typeofGroup = res.data.isgroup;
      params.success({
        'total': res.data.data.totalItem,
        rows: res.data.data.data
      });
      return params.complete();
    }
  });
};


function addTab(url) { comn.addTab({title: '客户管理', href: url}) }
tableEvent = {
  "click .show": function(e, a, item, index) {
	  addTab("./Modal/customManage/customer/manage.html?type=show&customerId=" + item.id);
  },
  "click .update": function(e, a, item, index) {
	  addTab("./Modal/customManage/customer/manage.html?customerId=" + item.id);
  },
  "click .delete": function(e, a, item, index) {
    $("#sure").modal("show");
    return $("#OK").unbind("click").on("click", function() {
      return comn.ajax({
        url: interUrl.gr["delete"],
        data: {
          id: item['id']
        },
        success: function(res) {
          tip({
            content: "删除成功!!"
          });
          $("#sure").modal("hide");
          return $("#btn-search").trigger("click");
        }
      });
    });
  }
};

handle = function(value, row, index) {
  return ["<div class='btn-group btn-group-xs'>",
      "<button type='button' class='btn btn-primary dropdown-toggle' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>操作",
      "<span class='caret'></span>", "<span class='sr-only'>下拉切换</span>", "</button>",
      "<ul class='dropdown-menu' role='menu'>",
      "<li><a class='show'>查看详情</a></li>", (typeofGroup === 1 ? ("<li><a class='update'>修改</a></li><li><a class='delete'>删除</a></li>") : ((row.managementType && row.managementType == "1") ? ("<li><a class='update'>修改</a></li><li><a class='delete'>删除</a></li>") : "")), "</ul>", "</div>"].join("");
};



cusStatus = function(value, row, index) {
  if (typeof value === "string") {
    value = parseInt(value);
  }
  return (value === 1 && "未生效") || (value === 2 && "生效");
};

$(function() {

  $("select[name='cardType']").change(function(){
	  if(this.value == "1"){
		  $(this).parents("form").find("input[name='cardNo']").eq(0).addClass("idCard");
	  }else{
		  $(this).parents("form").find("input[name='cardNo']").eq(0).removeClass("idCard"); 
	  }
  });

  $("#add").click(function() {
    return $("#addUser").modal("show");
  });
  $("#addUserForm").validate({
    submitHandler: function(form) {
      return console.log("submit");
    }
  });

  $("#save").click(function() {
	  if($("#addUserForm").valid()){
		var data;
		data = $("#addUserForm").values();
		comn.ajax({
		  url: interUrl.gr.add,
		  data: data,
		  success: function(res) {
			$("#addUser").modal("hide");
			$("#table").bootstrapTable("insertRow", {index: 0, row: res.data});
		  }
		});
	  }
  });

});
