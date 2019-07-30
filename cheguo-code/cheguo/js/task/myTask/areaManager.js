var table_isReg;
//四种按钮
var opinionSave,loanReviewBack,finance,loan,loanOfficeBack;
opinionSave=$("#btn-opinion-save"); //提交
loanReviewBack=$("#btn-loanReview-back"); //退回上一步
finance=$("#btn-close-finance"); //融通
loan=$("#btn-close-loan"); //关闭贷款
loanOfficeBack=$("#btn-back-office"); //退回业务录入
//初级审核:type=1
//中级审核:type=2
//分公司总经理:type=3
$("#flowTitle").text(args['currentNodeName']);
if(type==1){
  opinionSave.show();
  loanReviewBack.hide();
  loanOfficeBack.hide();
  finance.hide();
  loan.hide();
}else if(type==2){
  opinionSave.show();
  loanReviewBack.hide();
  loanOfficeBack.hide();
  finance.show();
  loan.hide();
}else if(type==3){
  opinionSave.show();
  loanReviewBack.hide();
  loanOfficeBack.hide();
  finance.show();
  loan.hide();
}

//审批信息
getApprovalInfo();
//节点在分总司总经理和中级审核时显示风险预警
if (args["currentNodeKey"] == "LOAN_APPROVE_OFFICE_STAFF" || args["currentNodeKey"] == "LOAN_GENERAL_MANAGER") {
  $(".isventureW").removeClass("hide");
}
function score(a){    //评分展示
	var this_ =  $(".score");
	if(type == 1 || type == 2 || type == 3){
		this_.children('.scoreNum').html(a);
		if(a >= 101){
			this_.attr("fors","03").show();
		}else if(a >= 81 && a <= 100){
			this_.attr("fors","02").show();
		}else if(a < 81){
			this_.attr("fors","01").show();
		};
	}
	
};



//判断显示提交还是退回
$("input[name='conclusion']").on('click', function () {
  var checkedV = $("input[name='conclusion']:checked").val();
  if(type==1 && checkedV == 1){
    opinionSave.show();
    loanReviewBack.hide();
    finance.hide();
    loan.hide();
  }else if(type==1 && checkedV == 0){
    opinionSave.hide();
    loanReviewBack.show();
    finance.hide();
    loan.show();
  }else if(type==2 && checkedV==1){
    opinionSave.show();
    loanReviewBack.hide();
    loanOfficeBack.hide();
    finance.show();
    loan.hide();
  }else if(type==2 && checkedV==0){
    loanOfficeBack.show();
    opinionSave.hide();
    loanReviewBack.show();
    finance.hide();
    loan.hide();
  }else if(type==3 && checkedV==1){
    opinionSave.show();
    loanReviewBack.hide();
    loanOfficeBack.hide();
    finance.show();
    loan.hide();
  }else if(type==3 && checkedV==0){
    opinionSave.hide();
    loanReviewBack.show();
    loanOfficeBack.show();
    finance.hide();
    loan.hide();
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
    oppSureModal("是否确认关闭贷款");
    $("#sureOption").unbind("click").click(function () {
      flowCloseLoanApply();
    })
  }
});

//分公司总经理融通
$("#btn-close-finance").click(function(){
  $("#opinionForm").validate();
  if($("#opinionForm").valid() == true) {
    oppSureModal("是否确认融通");
    $("#sureOption").unbind("click").click(function () {
      //保存流程意见
      comn.ajax({
        url: interUrl.common.opinion,
        data: $.extend($("#opinionForm").values(), argsBopInfoId),
        success: function (res) {
          $("#sureModal").modal("hide");
          flowSubmit(interUrl.myTask.preLongTop, interUrl.myTask.submit2LongTop, './Modal/task/myTask/index.html', loanApplyId);
        }
      });
    })
  }
});

//退回业务录入
$("#btn-back-office").click(function(){
  $("#opinionForm").validate();
  if($("#opinionForm").valid() == true) {
    oppSureModal("是否确认退回内勤");
    $("#sureOption").unbind("click").click(function () {
      //保存流程意见
      comn.ajax({
        url: interUrl.common.opinion,
        data: $.extend($("#opinionForm").values(), argsBopInfoId, id),
        success: function (res) {
          $("#sureModal").modal("hide");
          flowBack2BudgetOfficeStaff();
        }
      });
    })
  }
});


$('#loadCredit').getLoad();
	


$(function(){		
	comn.ajax({
		url: interUrl.myTask.isReg,
		data: {
			loanApplyId: args['loanApplyId']
		},
		success: function(res) {
			var html = "";
			var item = res.data;
			var len = item.length;
			for (i = 0; i < len; i++) {
				var color = item[i].hasError ? "b3b3b3" : (item[i].cheguoRegisterStatus ? "3bc995" : "ff5d5d");
				var icon = (item[i].hasError && "glyphicon-question-sign") || (item[i].cheguoRegisterStatus && "glyphicon-ok-sign") || "glyphicon-remove-sign";
				html += [
					"<tr>",
						"<td>"+ item[i].name +"</td>",
						"<td>"+ item[i].phone +"</td>",
						"<td>"+ item[i].relationship +"</td>",
						"<td id='isUser'>"+ '<span class="glyphicon '+ icon +'" aria-hidden="true" style="color:#'+ color +'; font-size:20px;"></span>' +"</td>",
					"</tr>"
				].join("");
			}
			$("#table_isReg tbody").append(html);
		}
	});
  comn.ajax({
    url: interUrl.myTask.isRegB,
    data: {
      loanApplyId: args['loanApplyId']
    },
    success: function(res) {
      var html = "";
      var o = res.data;
      html = [
        "<tr>",
        "<td>"+ o.dealerName +"</td>",
        "<td>"+ o.contactPhone +"</td>",
        "<td>"+ carDealerType(o.carDealerType) +"</td>",
        "<td>"+ (o.carDealerSttMsg || '未注册') +"</td>",
        "</tr>"
      ].join("");
      $("#table_isRegB tbody").append(html);
    }
  });
});

//中级审核先校验风险预警,判断是否显示不同等级的页签
if (args["currentNodeKey"] === "LOAN_APPROVE_OFFICE_STAFF") {
  comn.ajax({
    url: interUrl.common.getRiskRule,
    data:{
      loanApplyId : args["loanApplyId"],
      currentNodeKey: args["currentNodeKey"]
    },
    success: function(res) {
      if (res.data) {
        $.each(res.data, function(i, v) {
          if (v.risklevel === "红色预警") {
            console.log("red:"+ i);
            $("#isShowWarning").removeClass("hide");
            return false;
          } else if (v.risklevel === "黄色预警") {
            console.log("yellow:"+ i);
            $("#isShowWarning").css("background-position", "0 -30px").removeClass("hide");
            return false;
          }
          console.log("out:"+i);
        })
      }
    }
  })
}