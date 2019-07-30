
//四种按钮
var opinionSave,loanReviewBack,loan;
opinionSave=$("#btn-opinion-save"); //提交
loanReviewBack=$("#btn-loanReview-back"); //退回上一步
loan=$("#btn-close-loan"); //关闭贷款

//初级审核:type=1
//中级审核:type=2
//分公司总经理:type=3
$("#flowTitle").text(args['currentNodeName']);
if(type==1){
  loan.show();
}

//审批信息
getApprovalInfo();

//获取修改清单
getModify();

//判断显示提交还是退回
$("input[name='conclusion']").on('click', function () {
  var checkedV = $("input[name='conclusion']:checked").val();
  if(checkedV == 1){
    opinionSave.show();
    loanReviewBack.hide();
  }else{
    opinionSave.hide();
    loanReviewBack.show();
  }
});

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
          flowSubmit(interUrl.loanModify.preSubmit, interUrl.loanModify.submit2next, './Modal/task/myTask/index.html', loanApplyId);
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

//区域经理关闭作废流程
$("#btn-close-loan").click(function(){
  $("#opinionForm").validate();
  if($("#opinionForm").valid() == true) {
    oppSureModal("是否确认关闭流程");
    $("#sureOption").unbind("click").click(function () {
      flowCloseLoanApply();
    })
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

$('#loadCredit').getLoad();
