//获取所需参数
var args = comn.getArgs();
var argsBopInfoId = {
  bopInfoId: args['bopInfoId']
};
var loanApplyId = {
  loanApplyId: args['loanApplyId']
};


var newDealerId, discountCaseId;


//收款人信息
function getPaymentInfo() {
  comn.ajax({
    url: interUrl.myTask.paymentGetGuarantee,
    data: loanApplyId,
    success: function (res) {
      $("#paymentGetForm").values(res.data);

    }
  });
}

//合作机构反馈列表
function loanTrustMessageList() {
  comn.ajax({
      url: interUrl.carCreditLoan.loanTrustMessageList,
      data: {
        businessObjectId : args['loanApplyId'],
        channelType: 1
      },
      success: function (res) {
          var html = "";
          var item = res.data;
          var len = item.length;
          for (i = 0; i < len; i++) {
              html = html + [
                "<tr>",
                  "<td>" + item[i].operateTypeName + "</td>",
                  "<td>" + item[i].statusStr + "</td>",
                  "<td>" + item[i].result + "</td>",
                  "<td>" + item[i].sendTime + "</td>",
                  "<td>" + item[i].modifyTime + "</td>",
                "</tr>"
              ].join("");
          }        

          $("#table_institutions tbody").append(html);
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
    }
  });
}

$(function () {
  //流程意见-同意不同意单选按钮点击事件
  $("input[name='conclusion']").on('click', function () {
    var checkedV = $("input[name='conclusion']:checked").val();
    if (checkedV == 1) {
      $("#btn-opinion-save").removeClass('hide');
      $("#btn-loanReview-back").addClass('hide');
    } else {
      $("#btn-opinion-save").addClass('hide');
      $("#btn-loanReview-back").removeClass('hide');
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
            flowSubmit(interUrl.carCreditLoan.preSubmit, interUrl.carCreditLoan.submit2next, './Modal/task/myTask/index.html', loanApplyId);
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
            flowBack3Pre();
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

  //首次加载执行方法
  changeFlowTitle();
  showisShowWarning();
  getOpinionText();
  getApprovalInfo();
  getPaymentInfo();
  loanTrustMessageList();
})