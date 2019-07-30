var args = comn.getArgs(); //getArgs
var uId = comn.user.uid;
var argsBopInfoId={bopInfoId:args['bopInfoId']};
var feeApplyId={feeApplyId: args['feeId']};
function processChoose(n){
  $("#switch_1").html($("#tpl_" + n).html() || "");
}

//初始化费用信息
comn.ajax({
  url: interUrl.feeManage.get,
  data: {feeId:args['feeId']},
  success: function (res) {
    processChoose(res.data.feeCategoryCode);
    $('#feeCategoryCode').getFeeCategoryCode(res.data.feeCategoryCode);
    $('#feeCode').getFeeCode(res.data.feeCategoryId, res.data.feeCode);
    if(res.data.lawsuitStatus){
      $("#costForm [name='lawsuitStatusName']").val(lawsuitStatus(res.data.lawsuitStatus));
    }
    $("#costForm").values(res.data);
    $('#costForm input[name=approveAmount]').val(res.data.applyAmount);
    $('#getFinace').click(function(){
      comn.addTab({
        title:"贷款详情",
        href: "./Modal/customManage/customer/loanDetail.html?loanApplyId="+ res.data.loanApplyId+"&customerId="+res.data.customerId +"&projectId="+ res.data.projectId +"&space=LOAN&releventFlowNode=LOAN_QUERY&releventFlow=LOAN_QUERY"
      });
    });
  }
});

//判断显示提交还是退回
$("input[name='conclusion']").on('click', function () {
    var checkedV = $("input[name='conclusion']:checked").val();
    if (checkedV == 1) {
        $("#btn-opinion-save").show();
        $("#btn-loanReview-back").hide();
        $('#btn-close-loan').addClass('hide');
    } else {
        $("#btn-opinion-save").hide();
        $("#btn-loanReview-back").show();
        $('#btn-close-loan').removeClass('hide');
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
    $("#costForm").validate();
    if($("#costForm").valid() == true) {
   comn.ajax({
       url: interUrl.feeManage.save,
       data: $.extend($("#costForm").values(), {uId: uId}),
       success: function (res) {
           //tip({content: res.message || "保存成功!"});
           
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
                   flowSubmit(interUrl.feeManage.applyPreSubmit, interUrl.feeManage.applySubmit2next, './Modal/task/myTask/index.html', feeApplyId);
                 }
               });
             })
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
                    //退回上一步
                    comn.ajax({
                        url: interUrl.feeManage.applyBack2pre,
                        data: feeApplyId,
                        success: function (res1) {
                            tip({content: res1.message});
                            comn.closeTab();
                        }
                    });
                }
            });
        })
    }
});
//关闭费用申请
$('#btn-close-loan').click(function(){
  $("#opinionForm").validate();
  if($("#opinionForm").valid() == true) {
    oppSureModal("是否确认关闭贷款！");
    $("#sureOption").unbind("click").click(function () {
      $("#sureModal").modal("hide");
      comn.ajax({
          url: interUrl.feeManage.applyCancel,
          data: feeApplyId,
          success: function (res) {
              tip({content: res.message});
              comn.closeTab();
          }
      });
    });
  }
});