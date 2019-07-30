var table_pay,tableEvent_pay,handle_pay,flowType,conclusion,choosePay=null, dealerId;
flowType={flowType:"LOAN_MODIFY_FLOW"};
var judge, businessTypeId;
//$.extend($.validator.defaults,{ignore:""});   //隐藏表单也验证
//审批信息
comn.ajax({
  url: interUrl.myTask.approvalInfo,
  data:loanApplyId,
  success: function(res) {
    if(res.data.carType==2){
      $("#sc-isAdvance").show();
    }
	businessTypeId = businessTypeId || res.data.businessTypeId;
	if(res.data.businessTypeId == 2){
	  $("input[name='receivableAmount']").closest(".input-tip").removeClass("hide");
	  $("input[name='requiredAmount']").closest(".input-tip").addClass("hide"); 
	}
     $("#approvalInfoForm").values(res.data);
    if(res.data.businessTypeId==2){//如果是银行直销模式,账户信息-处理方式默认选中差额,去除全额选项
      $("#paymentGetForm1").show(); //差额表单
      $(".yhzx_hide").hide();
      $("#payeeMethod_1").prop("checked",true);
      $("#payeeMethod_2").parent('label').remove();
      $("#payeeAmount").attr("readonly",true);
      getPaymentInfo(interUrl.loanChange.getLoanRefundBalance,1,"1",2);//获取退款信息
    }else{
      //退款信息部分
      // getLoanRefundPayeeMethod 获取付款方式
      comn.ajax({
        url: interUrl.loanModify.getLoanRefundPayeeMethod,
        data: loanApplyId,
        success: function(res) {
          var _url;
          var payeeMethod=res.data.payeeMethod;
          if(payeeMethod=="1"){
            $("#paymentGetForm1").show();
            _url=interUrl.loanChange.getLoanRefundBalance; //差额获取
            judge=1;
          }else{
            $("#paymentGetForm2").show();
            _url=interUrl.myTask.getCarDealerPayment; //全额获取
            judge=2;
          }
          getPaymentInfo(_url,judge,payeeMethod);//获取退款信息
        }
      });
    }
      //get pay lists
      if(res.data.coBankId){
        $("#payModal").on("shown.bs.modal", function() {
          table_pay = function (params) {
            var p = params.data;
            //p['dealerId'] = $("#dealerId").val() || dealerId;
            p['dealerId'] = res.data.dealerId || dealerId;
            return comn.ajax({
              url: interUrl.myTask.getAccountList,
              data: $.extend(p,{discountCaseId: res.data.discountCaseId}),
              success: function (res) {
                params.success({
                  'total': res.totalItem,
                  rows: res.data
                });
                return params.complete();
              }
            });
          };
          //$("#payModal").bootstrapTable("load",res.data.guaranteeCompanyAccountList);
          tableEvent_pay = {
            "click .pay": function (e, a, item, index) {
              $("[name='dealerAccountName']").val(item.accountName);
              $("[name='dealerAccountNo']").val(item.cardNumber);
              $("[name='dealerBank']").val(item.subBankName);
              $("#payModal").modal("hide");
            }
          };
          handle_pay = function (value, row, index) {
            return ["<a class='pay' href='javascript:;'>选择</a>"].join("");
          };
          $("#table_pay").bootstrapTable("refresh");
        })
        }
      var dataArr =[["#customerSource", "CustomerSource", res.data.customerSource],[".loanTerm", "LoanTerm", res.data.loanTerm]];
      $.getCommonMethodPort(dataArr);
      }
});


//获取修改清单
getModify();

//获取收款信息
function getPaymentInfo(_url,judge,payeeMethod){
  comn.ajax({
    url: _url,
    data: $.extend(loanApplyId,{payeeMethod:payeeMethod}),
    success: function(res) {
	  dealerId = res.data.dealerId;
      //获取付款方式
      if(judge==1){
        var paymentDirection=res.data.paymentDirection;
        $('#payType').payTypeMent(args['loanApplyId'],res.data.payType, args["businessTypeCode"], args["currentNodeKey"]);

        $("#paymentGetForm1").values(res.data);
        if(paymentDirection=="1" || paymentDirection=="0"){
          $(".paymentDirection").text("收款");
        }else if(paymentDirection=="2" && (!businessTypeId || businessTypeId==1)){
		  $(".paymentDirection").text("付款");
        }else if(paymentDirection=="2" && businessTypeId==2){
          $(".paymentDirection").text("退款");
        }

      }else{
        $("#paymentGetForm2").values(res.data);
        $('#payType2').payTypeMent(args['loanApplyId'],res.data.payType, args["businessTypeCode"], args["currentNodeKey"]);

      }

    }
  });
}

//保存收款信息-全收全付
$("#btn-payment-save2").click(function () {
  $("#paymentGetForm2").validate();
  if($("#paymentGetForm2").valid() == true){
    if(comn.diffDate($('input[name=dealerPaymentDate]').val())){
      comn.ajax({
        url: interUrl.myTask.paymentSave,
        data: $.extend($("#paymentGetForm2").values(),loanApplyId),
        success: function(res) {
          tip({content:res.message || '保存成功!'})
        }
      });
    }else{
      tip({
        content:'付款日期不能大于当前日期'
      })
    }

  }
});

//保存收款信息-差额
$("#btn-payment-save1").click(function () {
  $("#paymentGetForm1").validate();
  if($("#paymentGetForm1").valid() == true){
    comn.ajax({
      url: interUrl.loanChange.saveLoanRefundBalance,
      data: $.extend($("#paymentGetForm1").values(),loanApplyId),
      success: function(res) {
        tip({content:res.message || '保存成功!'})
      }
    });
  }
});
//担保公司选择收款人-全额
$("#accountSelect2").click(function(){
  $("#payModal").modal("show");
  choosePay=function(item){
    $("[name='guaranteeCorporationAccountName']").val(item.accountName);
    $("[name='guaranteeCorporationAccountNo']").val(item.cardNumber);
    $("[name='guaranteeCorporationBank']").val(item.subBankName);
  }
});

//车商选择收款人-差额
$("#accountSelect1").click(function(){
  $("#payModal").modal("show");
  choosePay=function(item){
    $("[name='dealerAccountName']").val(item.accountName);
    $("[name='dealerAccountNo']").val(item.cardNumber);
    $("[name='dealerBank']").val(item.subBankName);
  };
});

//流程意见保存和流程提交
$("#btn-opinion-save").click(function () {
  var payType,payTitle;
  if(judge==1){
    payType=$('#payType').find('option:selected').val();
    payTitle=$("#payType").find("option:checked").html();
    $("#paymentGetForm1").validate();
    if($("#paymentGetForm1").valid() == true) {
      comn.ajax({
        url: interUrl.loanChange.saveLoanRefundBalance,
        data: $.extend($("#paymentGetForm1").values(),loanApplyId),
        success: function(res) {
          flowOpinion(payType,payTitle);
        }
      });
    }
  }else if(judge==2){
    payType=$('#payType2').find('option:selected').val();
    payTitle=$("#payType2").find("option:checked").html();
    $("#paymentGetForm2").validate();
    if($("#paymentGetForm2").valid() == true) {
      comn.ajax({
        url: interUrl.myTask.paymentSave,
        data: $.extend($("#paymentGetForm2").values(),loanApplyId),
        success: function(res) {
          flowOpinion(payType,payTitle);
        }
      });
    }
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
        data: $.extend($("#opinionForm").values(), argsBopInfoId, {conclusion: 0}),
        success: function (res) {
          $("#sureModal").modal("hide");
          flowBack2Pre();
        }
      });
    })
  }
});

//获取cbs付款信息
function getCbsPayment(){
  comn.ajax({
    url: interUrl.myTask.getCarDealerPayment,
    data: loanApplyId,
    success: function (res) {
      $("#payForm").values(res.data);

      if(res.data.payeeMethod == 1 && res.data.paymentDirection && res.data.paymentDirection == 1){
        $(".paymentDirection1").removeClass('hide').attr('disabled',false);
        $('.paymentDirection2').addClass('hide').attr('disabled',true);
      }
      $('.mon').val(comn.toThousands($('.mon').val()));
      if(res.data.cash){
        $(".overage").html("<p>账户余额:"+comn.toThousands(res.data.cash)+"</p><p>更新时间:"+res.data.cashUpdateTime+"</p>");
      }
    }
  });
}
//发起付款
function startPayment(isSplit){
  comn.ajax({
    url:interUrl.myTask.startPayment,
    data:{
      token:$("input[name=token]").val(),
      isSplit:isSplit,
      applyId:args['loanApplyId'],
      priorityFlag:$("input[name=priorityFlag]:checked").val(),
      purpose:$("input[name=purpose]").val(),
      payType:'RP'
    },
    success:function(res){
      $("#takeApart").modal('hide');
      comn.ajax({
        url: interUrl.loanModify.preSubmit,
        data: loanApplyId,
        success: function (res1) {
          var nextNodeUserName = res1.data.userTasks[0].userName;
          var nextNodeUserId = res1.data.userTasks[0].userId;
          var nodeCode = {nodeCode: res1.data.nextFlowNodeCode};
          var p3 = {nextNodeUserName: nextNodeUserName, nextNodeUserId: nextNodeUserId};
          comn.ajax({
            url: interUrl.loanModify.submit2next,
            data: $.extend(loanApplyId, p3),
            success: function (res2) {
              tip({content: res2.message});
              comn.closeTab();
            }
          })
        }
      });
    }
  })
}
function flowOpinion(payType,payTitle){
  $("#opinionForm").validate();
  if($("#opinionForm").valid() == true) {
    oppSureModal("是否确认提交");
    $("#sureOption").unbind("click").click(function () {
      //保存流程意见
      comn.ajax({
        url: interUrl.common.opinion,
        data: $.extend($("#opinionForm").values(), argsBopInfoId, {conclusion: 1}),
        success: function (res) {
          $("#sureModal").modal("hide");
          if(payType && payType != 0){
            $("#payMode").modal('show');
            //获取系统时间
            $(".time").getPayDate();
            $("input[name=purpose]").val($("input[name=customerName]").val()+"  (车款)");
            $("#payTitle").html(payTitle+' | 付款信息');
            //付款信息
            getCbsPayment();
            //生成token,校验重复点击
            $("input[name=token]").getPaymentToken();
            $("#payment").unbind("click").on("click",function(){
              $("#payForm").validate();
              if($("#payForm").valid()==true){
                comn.ajax({
                  url:interUrl.myTask.preStartPayment,//校验时间
                  data: $.extend(loanApplyId, {payType:'RP'}),
                  success:function(res){
                    if(res.code===25000){
                      $("#takeApart").modal('show');
                      $("#payMode").modal('hide');
                      $("#agree").unbind('click').click(function(){
                        startPayment(1)
                      });
                      $("#disAgree").unbind('click').click(function(){
                        startPayment(0)
                      });
                      $("#back").click(function(){
                        $("#payMode").modal('show');
                        getCbsPayment();
                      })
                    }else{
                      startPayment(0)
                    }
                  }
                })
              }
            })
          }else{
            comn.ajax({
              url: interUrl.loanModify.preSubmit,
              data: loanApplyId,
              success: function (res1) {
                var nextNodeUserName = res1.data.userTasks[0].userName;
                var nextNodeUserId = res1.data.userTasks[0].userId;
                var nodeCode = {nodeCode: res1.data.nextFlowNodeCode};
                var p3 = {nextNodeUserName: nextNodeUserName, nextNodeUserId: nextNodeUserId};
                comn.ajax({
                  url: interUrl.loanModify.submit2next,
                  data: $.extend(loanApplyId, p3),
                  success: function (res2) {
                    tip({content: res2.message});
                    comn.closeTab();
                  }
                })
              }
            });
          }

        }
      });
    })
  }
}

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
