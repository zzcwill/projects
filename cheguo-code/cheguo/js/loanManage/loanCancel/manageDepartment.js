
//汽车金融部type=1
//汽车金融部经理type=2
//汽车金融部总监type=3
//集团总经理type=4
$("#flowTitle").text(args['currentNodeName']);
//总部审批中心显示大数据核验报告
// if (args["currentNodeKey"] == "LOAN_CANCEL_CAR_FINANCE") {
//     $(".report").removeClass("hide")
// }
//审批信息
getApprovalInfo();


//获取流程意见
getApprovalOtherInfo();
function getApprovalOtherInfo(){
    comn.ajax({
        url: interUrl.myTask.getApprovalOtherInfo,
        data: loanApplyId,
        success: function (res) {
            if(res.data){
                $("#opinionForm").values(res.data);
            }
        }
    });
}


//判断显示提交还是退回
$("input[name='conclusion']").on('click',function(){
    var checkedV=$("input[name='conclusion']:checked").val();
    if(checkedV==1){
        $("#btn-opinion-save").show();
        $("#btn-loanReview-back").hide();
    }else{
        $("#btn-opinion-save").hide();
        $("#btn-loanReview-back").show();
    }
});

//流程意见保存和流程提交
$("#btn-opinion-save").click(function () {
    $("#opinionForm").validate();
    if($("#opinionForm").valid() == true){
        oppSureModal("是否确认提交");
        $("#sureOption").unbind("click").click(function () {
            //保存流程意见
            comn.ajax({
                url: interUrl.common.approveOpinion,
                data: $.extend($("#opinionForm").values(), argsBopInfoId, loanApplyId),
                success: function (res) {
                    $("#sureModal").modal("hide");
                    flowSubmit(interUrl.loanCancel.preSubmit, interUrl.loanCancel.submit2next, './Modal/task/myTask/index.html', loanApplyId);
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
                url: interUrl.common.approveOpinion,
                data: $.extend($("#opinionForm").values(), argsBopInfoId, loanApplyId),
                success: function (res) {
                    $("#sureModal").modal("hide");
                    flowBack2Pre();
                }
            });
        })
    }

});



//退回内勤
$("#btn-back-office").click(function(){
    $("#opinionForm").validate();
    if($("#opinionForm").valid() == true) {
        oppSureModal("是否确认退回内勤");
        $("#sureOption").unbind("click").click(function () {
            //保存流程意见
            comn.ajax({
                url: interUrl.common.approveOpinion,
                data: $.extend($("#opinionForm").values(), argsBopInfoId, id, loanApplyId),
                success: function (res) {
                    $("#sureModal").modal("hide");
                    flowBack2BudgetOfficeStaff();
                }
            });
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