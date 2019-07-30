//当前页变量
var args = comn.getArgs();
var argsBopInfoId = {
    bopInfoId: args['bopInfoId']
};
var loanApplyId = {
    loanApplyId: args['loanApplyId']
};
var id = {
    id: args['loanApplyId']
};

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

//获取意见流程-意见说明
function getOpinionText() {
    $("#opinionText").getOpinion_s(argsBopInfoId);
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
            if (res.data.businessTypeId == 2) {
                $("input[name='receivableAmount']").closest(".input-tip").removeClass("hide");
                $("input[name='collectedAmount']").closest(".input-tip").removeClass("hide");
                $("input[name='requiredAmount']").closest(".input-tip").addClass("hide");
            }
            if (res.data.maritalStatus != 1) {
                $("#singleImg").show();
                $("#isMaritalStatus").removeClass("hide");
            }
            if (res.data.freeDoor == '1') {
                $("#needDoorImg").show();
                $("#isFreeDoor").removeClass("hide");
            }

            $("#approvalInfoForm").values(res.data);

            if (res.data.carId) {
                carId = res.data.carId;
                $("#table_carOption").bootstrapTable(comn.table);
            } else {
                $("#table_carOption").hide();
            }
            var dataArr = [
                ["#econtractStatus", "EcontractStatus", res.data.econtractStatus],
                ["#customerSource", "CustomerSource", res.data.customerSource],
                [".loanTerm", "LoanTerm", res.data.loanTerm]
            ];
            $.getCommonMethodPort(dataArr);
        }
    });
}

//获取流程意见接口
function getApprovalOtherInfo() {
    comn.ajax({
        url: interUrl.myTask.getApprovalOtherInfo,
        data: loanApplyId,
        success: function (res) {
            if (res.data) {
                $("#opinionForm").values(res.data);
            }
        }
    });
}

//车国c端注册列表接口
function carCReg() {
    comn.ajax({
        url: interUrl.myTask.isReg,
        data: {
            loanApplyId: args['loanApplyId']
        },
        success: function (res) {
            var html = "";
            var item = res.data;
            var len = item.length;
            for (i = 0; i < len; i++) {
                var color = item[i].hasError ? "b3b3b3" : (item[i].cheguoRegisterStatus ? "3bc995" : "ff5d5d");
                var icon = (item[i].hasError && "glyphicon-question-sign") || (item[i].cheguoRegisterStatus && "glyphicon-ok-sign") || "glyphicon-remove-sign";
                html += [
                    "<tr>",
                    "<td>" + item[i].name + "</td>",
                    "<td>" + item[i].phone + "</td>",
                    "<td>" + item[i].relationship + "</td>",
                    "<td id='isUser'>" + '<span class="glyphicon ' + icon + '" aria-hidden="true" style="color:#' + color + '; font-size:20px;"></span>' + "</td>",
                    "</tr>"
                ].join("");
            }
            $("#table_isReg tbody").append(html);
        }
    });
}

//车国b端注册列表接口
function carBReg() {
    comn.ajax({
        url: interUrl.myTask.isRegB,
        data: {
            loanApplyId: args['loanApplyId']
        },
        success: function (res) {
            var html = "";
            var o = res.data;
            html = [
                "<tr>",
                "<td>" + o.dealerName + "</td>",
                "<td>" + o.contactPhone + "</td>",
                "<td>" + carDealerType(o.carDealerType) + "</td>",
                "<td>" + (o.carDealerSttMsg || '未注册') + "</td>",
                "</tr>"
            ].join("");
            $("#table_isRegB tbody").append(html);
        }
    });
}

$(function () {
    //点击云镜报告-获取云镜报告内容
    $(".cloudMirrorReport").on('click', function () {
        var apiNum = 0;
        var creditId = '';
        var token = '';
        var yunServerUrl = '';
      
        //获取云镜报告征信id
        comn.ajax({
          url: interUrl.credit.loanCreditInfo,
          data: {
            flowType: args['releventFlow'] || "",
            projectId: args["projectId"],
            loanApplyId: args["loanApplyId"]
          },
          success: function (res) {
            creditId = res.data.relavants[0].creditId;
            apiNum++
            showYunReport();
          }
        });
      
        //获取云镜报告token
        comn.ajax({
          url: interUrl.cloudMirrorReport.decisionTokenGet,
          data: {},
          success: function (res) {
            token = res.data;
            apiNum++
            showYunReport();
          }
        });
      
        //获取云镜报告相应环境地址
        comn.ajax({
          url: interUrl.common.getSystemName,
          type: "GET",
          success: function (res) {
            yunServerUrl = res.data.yunServerUrl;
            apiNum++
            showYunReport();
          }
        });
      
      
        //得到全部所需要的值再去展示云镜报告
        function showYunReport() {
          if (apiNum === 3) {
            var url = yunServerUrl + '/?token=' + token + '&bizType=1&orderNo=' + creditId + '&isMenu=2';
      
            //获取云镜报告高度
            var orders = [
              {
                "bizType": 1,
                "orderNo": creditId,
              },          
            ];
            orders = JSON.stringify(orders);
            comn.ajax({
              url: interUrl.cloudMirrorReport.decisionengineQueryInfo,
              data: {
                orders: orders,
              },
              success: function (res2) {
                if (res2.data === '0') {
                  setTimeout(function () {
                    comn.ajax({
                      url: interUrl.cloudMirrorReport.decisionengineQueryInfo,
                      data: {
                        orders: orders
                      },
                      success: function (res3) {
                        if (res3.data !== '0') {
                          $('#contentIframe').css('height', res3.data + 'px');
                        }
                      }
                    });
                  }, 8000);
                } else {
                  $('#contentIframe').css('height', res2.data + 'px');
                }
  
                $('#contentIframe').attr('src', url);
              }
            });
          }
        }
      
    });

    //意见结论-是否同意点击事件
    $("input[name='conclusion']").on('click', function () {
        var btnSave = $("#btn-opinion-save");
        var btnBack = $("#btn-loanReview-back");
        var agreeShow = $("#agreeShow");
        var noAgreeShow = $("#noAgreeShow");
        var refShow = $("#refShow");
        var checkedV = $("input[name='conclusion']:checked").val();
        if (checkedV == 1) {
            btnSave.show();
            btnBack.hide();
            agreeShow.show();
            noAgreeShow.hide();
            refShow.hide();
        } else if (checkedV == 0) {
            btnSave.hide();
            btnBack.show();
            agreeShow.hide();
            noAgreeShow.show();
            refShow.hide();
        } else if (checkedV == 2) {
            btnSave.hide();
            btnBack.show();
            agreeShow.hide();
            noAgreeShow.hide();
            refShow.show();
        }
    });

    //提交点击事件
    $("#btn-opinion-save").click(function () {
        $("#opinionForm").validate();
        if ($("#opinionForm").valid() == true) {
            oppSureModal("是否确认提交");
            var flag = $("input[name='singleSignType']")[0].checked ? 1 : 0
            $("#sureOption").unbind("click").click(function () {
                //保存流程意见
                comn.ajax({
                    url: interUrl.common.approveOpinion,
                    data: $.extend($("#opinionForm").values(), argsBopInfoId, loanApplyId, {
                        isSingleSign: flag
                    }),
                    success: function (res) {
                        $("#sureModal").modal("hide");
                        flowSubmit(interUrl.carCreditLoan.preSubmit, interUrl.carCreditLoan.submit2next, './Modal/task/myTask/index.html', loanApplyId);
                    }
                });
            })
        }
    });

    //退回上一步点击事件
    $("#btn-loanReview-back").click(function () {
        $("#opinionForm").validate();
        if ($("#opinionForm").valid() == true) {
            oppSureModal("是否确认退回");
            $("#sureOption").unbind("click").click(function () {
                //保存流程意见
                comn.ajax({
                    url: interUrl.common.approveOpinion,
                    data: $.extend($("#opinionForm").values(), argsBopInfoId, loanApplyId),
                    success: function (res) {
                        $("#sureModal").modal("hide");
                        flowBack3Pre();
                    }
                });
            })
        }

    });


    //流程意见-保存点击事件
    $("#saveBtn").click(function () {
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

    //首次加载执行方法
    changeFlowTitle();
    showisShowWarning();
    getOpinionText();
    getApprovalInfo();
    getApprovalOtherInfo();
    carCReg();
    carBReg();
});


// 判断签约要求是否单签
function isSingleSign() {
    var singleSignType = $("input[name='singleSignType']")
    var singleSignType1 = $("input[name='singleSignType'][value='1']")
    var singleSignType2 = $("input[name='singleSignType'][value='0']")
    comn.ajax({
        url: interUrl.myTask.isSingleSign,
        data: {
            loanApplyId: args['loanApplyId']
        },
        success: function (res) {
            var flag = res.data.singleSignType
            switch (flag) {
                case 1:
                    singleSignType.attr('disabled', true)
                    singleSignType1.attr('checked', true)
                    break
                case 2:
                    singleSignType.attr('disabled', true)
                    singleSignType2.attr('checked', true)
                    break
                case 3:
                    singleSignType1.attr('checked', true)
                    break
            }
        }
    });
}
isSingleSign()