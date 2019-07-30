
//判断显示提交还是退回
$("input[name='conclusion']").on('click', function () {
    var checkedV = $("input[name='conclusion']:checked").val();
    if (checkedV == 1) {
        $("#btn-opinion-save").show();
        $("#btn-loanReview-back").hide();
    } else {
        $("#btn-opinion-save").hide();
        $("#btn-loanReview-back").show();
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
    $("#approvalBaseInfoForm").validate();
    if($("#approvalBaseInfoForm").valid() == true) {
           comn.ajax({
               url: interUrl.myTask.editLoanerInfo,
               data: $.extend($("#approvalBaseInfoForm").values(), loanApplyId),
               success: function (res) {
                   //tip({content: res.message || "保存成功!"});
                   $("#approvalBudgetInfoForm").validate();
				   if($("#approvalBudgetInfoForm").valid() == true) {
					   comn.ajax({
						   url: interUrl.myTask.saveBudgetInfo,
						   data: $.extend($("#approvalBudgetInfoForm").values(), loanApplyId),
						   success: function (res) {
							   //tip({content: res.message || "保存成功!"});
							   comn.ajax({
								   url: interUrl.myTask.approvalAsserts,
								   data: loanApplyId,
								   success: function (res) {
									   $("#approvalGuarantorForm").values(res.data);

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
													   flowSubmit(interUrl.myTask.preSubmit,interUrl.myTask.submit2next,'./Modal/task/myTask/index.html',loanApplyId);
												   }
											   });
										   })
									   }
								   }
							   });
						   }
					   });
				   }else{
                       $(".nav-tabs li").removeClass('active');
                       $(".tab-content .tab-pane").removeClass('active');
                       $("#budget-li,#budget").addClass('active');
                   }
               }
           });

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

$('#loadCredit').getLoad();
