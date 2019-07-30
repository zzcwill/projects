var dataLoad_4, tableEvent_4, handle_4;

//贷款发起征信记录
dataLoad_4 = function(params) {
	var p;
	data = {
		loanApplyId: args["loanApplyId"],
		creditId: args["creditApplyId"],
		customerId : args["customerId"],
		projectId: args["projectId"]
	}
	p = params.data;
	return comn.ajax({
		async: false,
		url: interUrl.credit.CustomerCreditList,
		data: data,
		success: function(res) {
			console.log(res);
			params.success({
				'total': res.totalItem,
				rows: res.data
			});
			$("#table_4").bootstrapTable('load', res.data);
			return params.complete();
		}
	});
};

tableEvent_4 = {
	"click .loanStart1": function(e, a, item, index) {
//		return window.parent.toUrl({
//		url: "./Modal/loanManage/creditManage/creditInfo.html?type=1&businessId="+item.creditId //地址待定
//	    });
	     comn.addTab({title: '征信详情',  href: './Modal/loanManage/creditManage/creditInfo.html?type=1&businessId='+item.creditId });
	}
};

handle_4 = function(value, row, index) {
	return ["<button type='button' class='btn btn-primary btn-xs loanStart1'>查看详情</button>"].join("");
};
$("#table_4").bootstrapTable();

$(function () {
	$("#flowTitle").text(args['currentNodeName']);
	comn.ajax({
		url: interUrl.myTask.getSurvery,
		data: loanApplyId,
		success: function (res) {
		  //判断主副签单员
		  if (args['sign'] == 'vice') {
			$("#main-sign").show();
		  } else if (args['sign'] == 'main') {
			  if(res.data.loanAmount>=200000){
				  $("#vice-sign").show(); 
			  }
		  }
		  $("#assignForm").values(res.data);
		  if(res.data.carType==='2'){
			$("#isSecondCar").show();
		  }
		  $("#getPos").data("pos", res.data.visitAddressLongitude + "," + res.data.visitAddressLatitude);
		}
	});


	$("#btn-search").click(function () {
		$("#table_sign").bootstrapTable('selectPage', 1);
	});

	$("#btn-save").click(function () {
		comn.ajax({
			url: interUrl.myTask.editAssign,
			data: $("#assignForm").values(),
			success: function (res) {
				window.parent.toUrl({url: "./Modal/task/myTask/index.html"});
			}
		})
	});

	//判断显示提交还是退回
	$("input[name='conclusion']").on('click', function () {
		var checkedV = $("input[name='conclusion']:checked").val();
		if (checkedV == 1) {
			$("#btn-opinion-save").show();
			$("#btn-loanReview-back").hide();
		} else {
			$("#btn-opinion-save").hide();
			$("#btn-loanReview-back").show();
			if(args['sign'] == 'main'){
				$("#btn-close-loan").removeClass("hide"); // 主签单元显示撤消流程按钮 
			}
		}
	});
	//opinionForm单独保存
	$("#saveBtn").click(function(){
      oppSureModal("是否确认保存");
      $("#sureOption").unbind("click").click(function () {
        //保存流程意见
        comn.ajax({
          url: interUrl.common.opinionOnly,
          data: $.extend($("#opinionForm").values(), argsBopInfoId),
          success: function (res) {
            $("#sureModal").modal("hide");
            tip({
                  content: "保存成功！"
                });
          }
        });
      });
});
	//页面加载获取opinion内容
	$("#opinionText").getOpinion_s(argsBopInfoId);
	//流程部分Begin
	//流程意见保存和流程提交
	$("#btn-opinion-save").click(function () {
	  $("#opinionForm").validate();
	  if($("#opinionForm").valid() == true){
		  oppSureModal("是否确认提交");
		  $("#sureOption").unbind("click").click(function () {
			  //保存流程意见
			  comn.ajax({
				  url: interUrl.common.opinion,
				  data: $.extend($("#opinionForm").values(), argsBopInfoId),
				  success: function (res) {
					  $("#sureModal").modal("hide");
					  flowSubmit(interUrl.myTask.preSubmit, interUrl.myTask.submit2next, './Modal/task/myTask/index.html', loanApplyId);
				  }
			  });
		  })
	  }
	});

	//退回上一步
	$("#btn-loanReview-back").click(function () {
	  $("#opinionForm").validate();
	  if($("#opinionForm").valid() == true) {
		  oppSureModal("是否确认退回");
		  $("#sureOption").unbind("click").click(function () {
			  //保存流程意见
			  comn.ajax({
				  url: interUrl.common.opinion,
				  data: $.extend($("#opinionForm").values(), argsBopInfoId),
				  success: function (res) {
					  $("#sureModal").modal("hide");
					  flowBack2Pre();
				  }
			  });
		  })
	  }
	});

	//区域经理关闭贷款
	$("#btn-close-loan").click(function(){
	  $("#opinionForm").validate();
	  if($("#opinionForm").valid() == true) {
		oppSureModal("是否确认关闭贷款！");
		$("#sureOption").unbind("click").click(function () {
		  flowCloseLoanApply();
		})
	  }
	});
});


