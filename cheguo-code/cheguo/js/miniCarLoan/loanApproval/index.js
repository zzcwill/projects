//获取所需参数
var args = comn.getArgs();
var argsBopInfoId = {
  bopInfoId: args['bopInfoId']
};
var loanApplyId = {
  loanApplyId: args['loanApplyId']
};

var newDealerId, discountCaseId;


//放款信息
function getPaymentInfo() {
  comn.ajax({
    url: interUrl.miniCarLoan.webankGetPaymentCashInfo,
    data: {
      projectId: args["projectId"],
    },
    success: function (res) {

      $("#paymentGetForm").values(res.data);

      //贷款贷结果和附加贷结果有处理中,显示更新按钮
      if(res.data.bankPayStatus === 1 && res.data.bankPayStatus) {
        $('#btn-opinion-update').removeClass('hide');
      }
      if(res.data.bankPayStatusSecond === 1 && res.data.bankPayStatusSecond) {
        $('#btn-opinion-update').removeClass('hide');
      }      

      //附加贷金额为0,隐藏附加贷结果和日期
      if(res.data.bankPaymentAmountSecond === 0) {
        //$('#bankPaymentAmountSecond').parent().parent().addClass('hide');
        $('#bankPayStatusSecond').parent().parent().addClass('hide');
        $('#bankPaymentDateSecond').parent().parent().addClass('hide');        
      }
    }
  });
}

//获取意见流程-意见说明
function getOpinionText() {
  $("#opinionText").getOpinion_s(argsBopInfoId);
}


//改变页面主标题
function changeFlowTitle() {
  $("#flowTitle").text(args['currentNodeName']);
}

//校验风险预警,有风险提示预警
function showisShowWarning() {
  comn.ajax({
    url: interUrl.common.getRiskRule,
    data: {
      loanApplyId: args["loanApplyId"],
      currentNodeKey: args["currentNodeKey"]
    },
    success: function (res) {
      if (res.data) {
        $.each(res.data, function (i, v) {
          if (v.risklevel === "红色预警") {
            $("#isShowWarning").removeClass("hide");
          } else if (v.risklevel === "黄色预警") {
            $("#isShowWarning").css("background-position", "0 -30px").removeClass("hide");
          }
        })
      }
    }
  })
}

//获取审批信息接口
function getApprovalInfo() {
  comn.ajax({
    url: interUrl.myTask.approvalInfo,
    data: loanApplyId,
    success: function (res) {
      var financial = [];
      var template = function (name, label) {
        return '<div class="input-tip">' +
          '<label class="control-label col-md-3 col-xs-3 col-sm-3">' + label + '</label>' +
          '<div class="col-md-5 col-xs-5 col-sm-5">' +
          '<input type="text" name="' + name + '" class="form-control">' +
          '</div>' +
          '</div>';
      };
      if (res.data.loanType == 7) {
        if (res.data.isPurchaseTaxFee == 1) {
          financial.push(template('fusePurchaseTaxFee', '车辆购置税（融贷):'));
        }
        if (res.data.isInsuranceFee == 1) {
          financial.push(template('fuseInsuranceFee', '保费 (融贷)'));
        }
        if (res.data.isGpsFee == 1) {
          financial.push(template('fuseGpsFee', '服务费'));
        }
        $('#financialLoan').html(financial.join(''));
      }

      if (res.data.carType == 2) {
        $("#sc-isAdvance").show();
      }
      discountCaseId = res.data.discountCaseId ? res.data.discountCaseId : '';

      if (res.data.maritalStatus != 1) {
        $("#isMaritalStatus").removeClass("hide");
      }
      if (res.data.freeDoor == '1') {
        $("#isFreeDoor").removeClass("hide");
      }

      newDealerId = res.data.dealerId;
      $("#approvalInfoForm").values(res.data);

      //获取渠道商ID和遍历      
      if (res.data.channelDealerId) {
        $("input[name='channelDealerId']").val(res.data.channelDealerId);
        $("input[name='channelDealerName']").val(res.data.channelDealerName);
        $('#channelDealerId').channelDealer(res.data.orgId, res.data.channelDealerId);
      } else {
        $('#channelDealerId').channelDealer(res.data.orgId);
      }
      $('#channelDealerId').bind('change', function () {
        $("input[name='channelDealerId']").val($(this).val());
        $("input[name='channelDealerName']").val($("#channelDealerId option:selected").text());
      });

      if (args['currentNodeKey'] !== 'LOAN_FINANCE_EXECUTIVE') {
        $('#channelDealerId').attr("disabled", true)
      }

      var dataArr = [
        ["#econtractStatus", "EcontractStatus", res.data.econtractStatus],
        ["#customerSource", "CustomerSource", res.data.customerSource],
        ["#loanTerm", "LoanTerm", res.data.loanTerm]
      ];
      $.getCommonMethodPort(dataArr);
      //在放款结果至少有一个为处理中时，改为无法提交
     if($('#bankPayStatus').val() === '1' || $('#bankPayStatusSecond').val() === '1'){
        $('#btn-opinion-save').attr('disabled',true)
     }
    }
  });
}

$(function () {
  //流程意见-同意不同意单选按钮点击事件
  $("input[name='conclusion']").on('click', function () {
    var checkedV = $("input[name='conclusion']:checked").val();
    if (checkedV == 1) {
      $("#btn-opinion-save").show();
      $("#btn-loanReview-back").hide();
    } else {
      $("#btn-opinion-save").hide();

      //贷款结果和附加贷结果有处理中或者成功状态 不准退回
      var isCanBack = $('#bankPayStatus').val() === '1' || $('#bankPayStatusSecond').val() === '1' || $('#bankPayStatus').val() === '2' || $('#bankPayStatusSecond').val() === '2';  
      if(isCanBack){
        $("#btn-loanReview-back").hide();
      }else{
        $("#btn-loanReview-back").show();
      }
    }
  });

  //流程意见-提交
  $("#btn-opinion-save").click(function () {
    if ($('#isChange').val() != 'saved') {
      return tip({
        content: '请先保存预算单'
      })
    }

    $("#opinionForm").validate();
    if ($("#opinionForm").valid() == true) {
      oppSureModal("是否确认提交");
      $("#sureOption").unbind("click").click(function () {
        //保存流程意见
        comn.ajax({
          url: interUrl.common.opinion,
          data: $.extend($("#opinionForm").values(), argsBopInfoId),
          success: function (res) {
            $("#sureModal").modal("hide");

            //参数说明:_url2=准提交接口 _url3=提交结束跳转页面路径  _data=请求参数
            function miniCarLoanflowSubmit(_url2,_url3,_data){
                $.ajax({
                    type: "POST",
                    dataType: "json",
                    url: interUrl.basic + interUrl.miniCarLoan.submit2next2,
                    data: $.extend(_data,{
                        nextNodeUserName : comn.user.realname,
                        nextNodeUserId : comn.user.uid,
                    }),
                    success: function (res4) {
                        if(res4.code === 20000) {
                            tip({content:res4.message});
                            getPaymentInfo();
                            return
                        }

                        tip({content:res4.message});
                        comn.closeTab();
                    }
                })
            }
            
            miniCarLoanflowSubmit(interUrl.miniCarLoan.submit2next2, './Modal/task/myTask/index.html', loanApplyId);
          }
        });
      })
    }

  });

  //退回上一步
  $("#btn-loanReview-back").click(function () {
    $("#opinionForm").validate();
    if ($("#opinionForm").valid() == true) {
      oppSureModal("是否确认退回");
      $("#sureOption").unbind("click").click(function () {
        //保存流程意见
        comn.ajax({
          url: interUrl.common.opinion,
          data: $.extend($("#opinionForm").values(), argsBopInfoId),
          success: function (res) {
            $("#sureModal").modal("hide");
            flowBack4Pre();
          }
        });
      })
    }
  });

  //流程意见保存按钮
  $("#saveBtn").click(function () {
    oppSureModal("是否确认保存");
    $("#sureOption").unbind("click").click(function () {
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

  //放款信息-更新放款结果点击事件
  $('#btn-opinion-update').bind('click', function () {
    comn.ajax({
      url: interUrl.miniCarLoan.webankRefreshPayResult,
      data: {
        projectId: args["projectId"],
      },
      success: function (res) {
        if (res.data) {
          $('#bankPayStatus').val(res.data.bankPayStatus);
          $('#bankPaymentDate').val(res.data.bankPaymentDate);
          $('#bankPayStatusSecond').val(res.data.bankPayStatusSecond);
          $('#bankPaymentDateSecond').val(res.data.bankPaymentDateSecond);

          //贷款贷结果和附加贷结果有处理中,显示更新按钮,无处理中去掉按钮
          if(res.data.bankPayStatus !== 1 && res.data.bankPayStatus) {
            $('#btn-opinion-update').addClass('hide');
          }
          if(res.data.bankPayStatusSecond !== 1 && res.data.bankPayStatusSecond) {
            $('#btn-opinion-update').addClass('hide');
          }           
        }
      }
    });
  });

  //首次加载执行方法
  changeFlowTitle();
  showisShowWarning();
  getOpinionText();
  getApprovalInfo();
  getPaymentInfo();
})