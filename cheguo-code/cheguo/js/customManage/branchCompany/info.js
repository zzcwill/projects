var dataLoad_7, tableEvent, id, args=comn.getArgs(), _dealerId;
var cus = [];
id = args["id"];
comn.ajax({
  url: interUrl.customer.get,
  data: {
    id: args['id']
  },
  success: function(res) {
  	cus = res.data;
      _dealerId = cus.dealerId;
      if (_dealerId) {
      	$(".isDealerId").removeClass("hide");
	  }
	  
   	  $("#customerForm").values(res.data);

      if(cus.dealerSource&&cus.dealerSource!=null&&cus.dealerSource!=''){
          $('.cyb').text(cus.dealerSource)
      }
      else{
          $('.cyb_hide').hide()
      }
      if(cus.loanType == 5){
          $(".carOwnerLoan").removeClass("hide");
      } else {
          $(".noCarOwner").removeClass("hide");
      }
  }
});

dataLoad_7 = function(params) {
	var o = $("#userInfo").values();
	//o.orgId = _dealerId ? '' : (o.orgId==null ? comn.user.companyId : o.orgId);
	o.orgId =o.orgId==null ? comn.user.companyId : o.orgId;
    o.dealerId = $("#dealerId").val();
	tableData(params, o, interUrl.mockList || interUrl.gr.userList);
};



//线上客户分配 type=1
//线上客户接受 type=2
//客户详情 type=3
var type = args['type'];
if (type == 1) {
    $("#flowTitle").text("线上客户分配");
    $("#allotArea").show();
} else if (type == 2) {
    $("#flowTitle").text("线上客户接受");
    $("#launchArea").show();
} else if (type == 3 || type == 4 ) {
    $("#flowTitle").text("客户详情");
    //$(".seeFieldset").attr("disabled", "disabled"); //查看时禁用所有编辑操作
}

$(document).on("click", "#btn-launchedCredit", function() {
	return window.parent.toUrl({
		url: "./Modal/customManage/cheguoCustomer/credit.html?type=2&importId=" + args["id"]
	});
})

$("#btn-flowClose").click(function(){
		removeTip();
		$("#customerHandle").modal("show");
		$("#reasonTypeHtml").html("<span class='text-danger'>*</span>关闭原因");
		return $("#sumbitReason").values($.extend(cus, {
			closeOrReject: 1
		})).nameValues($.extend(cus, {
			title: "关闭客户",
			option: ["<option value=''>--请选择--</option>", "<option value='11'>客户不配合</option>", "<option value='12'>不买车了</option>", "<option value='13'>全款买车了</option>", "<option value='14'>选择其它服务商</option>", "<option value='15'>利率太高</option>", "<option value='16'>线下流程太繁锁</option>", "<option value='17'>办理周期太长</option>", "<option value='18'>其他</option>"].join("")
		}));
});
$("#btn-flowCancel").click(function(){
		removeTip();
		$("#reasonTypeHtml").html("<span class='text-danger'>*</span>退回原因");
    $("#customerHandle").modal("show");
		return $("#sumbitReason").values($.extend(cus, {
			closeOrReject: 2
		})).nameValues($.extend(cus, {
			title: "退回客户",
			option: ["<option value=''>--请选择--</option>", "<option value='21'>客户不在本区域</option>", "<option value='22'>其他</option>"].join("")
		}));
});

$(function() {
	//$("#orgList").getOrg();
  $("#userSearch").click(function() {
    return $("#table_7").bootstrapTable('selectPage', '1');
  });

  $(document).on("click", "#btn-back", function() {
  	var type = args['type'];
  	if(type == 4){
  		window.parent.toUrl({
      	url: "./Modal/customManage/groupCompany/index.html"
    	});
  	}else {
  		window.parent.toUrl({
      	url: "./Modal/customManage/branchCompany/index.html"
    	});
  	}
  });

    $("#btn-allot").on("click", function() {
        //$("#orgList").getOrg(_dealerId ? '' : comn.user.companyId); //弹出层根据车商id判断是否有特定机构。
        $("#orgList").getOrg(comn.user.companyId); //恢复原样，不管是否具有车商id都传user的companyId。
        $("#table_7").bootstrapTable("destroy").bootstrapTable(comn.table);
    });
  $("#checkSure").click(function() {
    var _data = $("#table_7").bootstrapTable('getSelections');
    if(_data == "" || _data.length == 0){
    	$("#showUserModal").modal("show");
    	$("#addUserModal").modal("hide");
    	return;
    }
    return comn.ajax({
      url: interUrl.customer.allot,
      data: {
        id: args['id'],
        managerId: _data[0].uid
      },
      success: function(res) {
        $("#addUserModal").modal("hide");
        return window.parent.toUrl({
					url: "./Modal/customManage/branchCompany/index.html"
				});
      }
    });
  });
  $("#btn-allot").click(function() {
    return $("#addUserModal").modal("show");
  });

	$("#btn-sure").click(function() {
		var data, url;
		if($("#sumbitReason").valid()){
			data = $("#sumbitReason").values();
			if (data.closeOrReject === "1") {
				url = interUrl.customer.close;
			} else if (data.closeOrReject === "2") {
				//url = interUrl.customer.branchReject;
				url = interUrl.customer.reject;
			}
			return comn.ajax({
				url: interUrl.mockList || url,
				data: data,
				success: function(data) {
					$("#customerHandle").modal("hide");
					return window.parent.toUrl({
						url: "./Modal/customManage/branchCompany/index.html"
					});
				}
			});
		}
	});
	
	$(document).on("change", "#returnReasons", function() {
		if ($(this).find("option:selected").html() == "其他") {
			$("#remark").addClass("required");
			$("#returnReasons-error").remove();
		} else {
			removeTip();
		}
	})
});

function removeTip() {
	$("#remark").removeClass("required error");
	$("#returnReasons").removeClass("error");
	$("#remark-error, #returnReasons-error").remove();
}
