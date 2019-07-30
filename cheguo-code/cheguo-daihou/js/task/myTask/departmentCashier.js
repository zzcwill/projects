var table_pay,tableEvent_pay,handle_pay;
//$.extend($.validator.defaults,{ignore:""});   //隐藏表单也验证
//审批信息
//getApprovalInfo();
$("#flowTitle").text(args['currentNodeName']);
var controlPre=true;
comn.ajax({
    url: interUrl.myTask.approvalInfo,
    data: loanApplyId,
    success: function(res) {
        if(res.data.carType=='2'){
            $("#sc-isAdvance").show();
        }
        if(res.data.maritalStatus!=1){
            $("#singleImg").show();
        }
        $("#approvalInfoForm").values(res.data);
        //银行直销逻辑判断  businessTypeId
        if(res.data.businessTypeId==2){
            $("#yhzx").show();
            $("#ptlc").remove();
            $("#paymentGetForm2").show();
            $("#paymentGetForm").hide();
            controlPre=false;
            getLoanCollection(); //获取收款信息
        }else{
            controlPre=true;
            getCarDealerPayment();
        }
    }
});


//普通流程-获取付款信息
function getCarDealerPayment(){
    comn.ajax({
        url: interUrl.myTask.getCarDealerPayment,
        data: loanApplyId,
        success: function (res) {
            var today=getDate();
            $("#paymentGetForm").values(res.data);
            $("[name='dealerPaymentDate']").val(today);
            table_pay = function(params) {
                var p=params.data;
                p['dealerId']=res.data.dealerId;
                return comn.ajax({
                    url: interUrl.myTask.getAccountList,
                    data: p,
                    success: function(res) {
                        params.success({
                            'total':res.totalItem,
                            rows: res.data
                        });
                        return params.complete();
                    }
                });
            };
            tableEvent_pay = {
                "click .pay": function(e, a, item, index) {
                    $("[name='dealerAccountName']").val(item.accountName);
                    $("[name='dealerAccountNo']").val(item.cardNumber);
                    $("[name='dealerBank']").val(item.subBankName);
                    $("#payModal").modal("hide");
                }
            };
            handle_pay = function(value, row, index) {
                return ["<a class='pay' href='javascript:;'>选择</a>"].join("");
            };
            $("#table_pay").bootstrapTable("refresh");
        }
    });
}



//选择收款人
$("#accountSelect").click(function(){
    $("#payModal").modal("show");
});

//保存付款信息
$("#btn-save-pay").click(function(){
    $("#paymentGetForm").validate();
    if($("#paymentGetForm").valid() == true){
        comn.ajax({
            url: interUrl.myTask.paymentSave,
            data: $.extend($("#paymentGetForm").values(),loanApplyId),
            success: function (res) {
                tip({content:res.message || "保存成功!"});
            }
        });
    }
});

//银行直销流程
//获取收款信息
function getLoanCollection(){
    comn.ajax({
        url: interUrl.myTask.getLoanCollection,
        data: loanApplyId,
        success: function (res) {
            if(res.data){
                $("#paymentGetForm2").values(res.data);
                if(!res.data.collectedDate){
                    $("#collectedDate").val(getDate());
                }
            }
        }
    });
}

//保存收款信息
function saveLoanCollection(){
    comn.ajax({
        url: interUrl.myTask.saveLoanCollection,
        data: $.extend($("#paymentGetForm2").values(),loanApplyId),
        success: function (res) {
            tip({content:res.message || "保存成功!"})
        }
    });
}

$("#btn-save-pay2").click(function(){
    $("#paymentGetForm2").validate();
    if($("#paymentGetForm2").valid() == true){
        saveLoanCollection();
    }
});

//普通流程保存收付款信息
function savePayment1(){
    oppSureModal("是否确认提交");
    $("#sureOption").unbind("click").click(function () {
        comn.ajax({
            url: interUrl.myTask.paymentSave,
            data: $.extend($("#paymentGetForm").values(), loanApplyId),
            success: function (res) {
                $("#sureModal").modal("hide");
                //保存流程意见
                comn.ajax({
                    url: interUrl.common.opinion,
                    data: $.extend($("#opinionForm").values(), argsBopInfoId, {conclusion: 1}),
                    success: function (res1) {
                        //sign lists
                        comn.ajax({
                            url: interUrl.myTask.preSubmit,
                            data: loanApplyId,
                            success: function (res1) {
                                var nextNodeUserName = res1.data.userTasks[0].userName;
                                var nextNodeUserId = res1.data.userTasks[0].userId;
                                var nodeCode = {nodeCode: res1.data.nextFlowNodeCode};
                                var p3 = {nextNodeUserName: nextNodeUserName, nextNodeUserId: nextNodeUserId};
                                comn.ajax({
                                    url: interUrl.myTask.submit2next,
                                    data: $.extend(loanApplyId, p3),
                                    success: function (res2) {
                                        tip({content: res2.message});
                                        comn.closeTab();
                                    }
                                })
                            }
                        });
                    }
                });
            }
        });
    })
}

//银行直销流程保存收付款信息
function savePayment2(){
    oppSureModal("是否确认提交");
    $("#sureOption").unbind("click").click(function () {
        comn.ajax({
            url: interUrl.myTask.saveLoanCollection,
            data: $.extend($("#paymentGetForm2").values(), loanApplyId),
            success: function (res) {
                $("#sureModal").modal("hide");
                //保存流程意见
                comn.ajax({
                    url: interUrl.common.opinion,
                    data: $.extend($("#opinionForm").values(), argsBopInfoId, {conclusion: 1}),
                    success: function (res1) {
                        //sign lists
                        comn.ajax({
                            url: interUrl.myTask.preSubmit,
                            data: loanApplyId,
                            success: function (res1) {
                                var nextNodeUserName = res1.data.userTasks[0].userName;
                                var nextNodeUserId = res1.data.userTasks[0].userId;
                                var nodeCode = {nodeCode: res1.data.nextFlowNodeCode};
                                var p3 = {nextNodeUserName: nextNodeUserName, nextNodeUserId: nextNodeUserId};
                                comn.ajax({
                                    url: interUrl.myTask.submit2next,
                                    data: $.extend(loanApplyId, p3),
                                    success: function (res2) {
                                        tip({content: res2.message});
                                        comn.closeTab();
                                    }
                                })
                            }
                        });
                    }
                });
            }
        });
    })
}
//流程意见保存和流程提交,退回上一步
$("#btn-opinion-save").click(function () {
    if(controlPre){
        $("#paymentGetForm").validate();
        $("#opinionForm").validate();
        if($("#paymentGetForm").valid() == true && $("#opinionForm").valid() == true){
            savePayment1();
        }
    }else{
        $("#paymentGetForm2").validate();
        $("#opinionForm").validate();
        if($("#paymentGetForm2").valid() == true && $("#opinionForm").valid() == true){
            savePayment2();
        }
    }

});

//退回上一步
$("#btn-loanReview-back").click(function () {
    $("#opinionForm").validate();
    if($("#opinionForm").valid() == true){
        oppSureModal("是否确认退回");
        $("#sureOption").unbind("click").click(function () {
            //保存流程意见
            comn.ajax({
                url: interUrl.common.opinion,
                data: $.extend($("#opinionForm").values(), argsBopInfoId, {conclusion: 0}),
                success: function (res1) {
                    $("#sureModal").modal("hide");
                    //退回上一步
                    comn.ajax({
                        url: interUrl.myTask.back2pre,
                        data: loanApplyId,
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
