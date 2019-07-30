var table_pay,tableEvent_pay,handle_pay,table_pay2,tableEvent_pay2,handle_pay2,table_pay3,tableEvent_pay3,handle_pay3,table_pay4,tableEvent_pay4,handle_pay4;
//$.extend($.validator.defaults,{ignore:""});  //隐藏表单也验证
var newDealerId,discountCaseId, _statusFlag = false;
//分公司财务主管:type=1 guaranteeAccount 分公司账户  dealerAccount 车商账户  pollAccount 资金部账户
//资金管理部主任:type=2
//资金管理部出纳:type=3
if (args["currentNodeKey"] === "LOAN_CASHIER_CHECK") {
    $("#guaranteeAccount, #dealerAccount").prop("disabled", "disabled");
    $("#btn-payment-save").addClass("hide");
}
if (args["currentNodeKey"] === "LOAN_FINANCE_EXECUTIVE") { //付款申请节点
    comn.ajax({
        url: interUrl.myTask.getPaymentSwitch,
        success: function (res) {
            if (res.data === true) {
                $("#groupAdvanceFlow").removeAttr("disabled");
                $("#groupAdvanceAccount").removeAttr("disabled");
            }
        }
    });

    //根据机构判断是否显示代收服务费
    comn.ajax({
        url: interUrl.myTask.getOrgAuth,
        data: {
            orgId: comn.user.companyId
        },
        success: function (res) {
            if (res.data.status === 1) {
                _statusFlag = true;
                $("#carDealerCollectionFee").removeClass("hide");
            }
        }
    });

    //针对付款申请环节点击预算单重新加载页面，以便代收服务费是最新
    $("a[href=#budget]").click(function(){
        $("#budget>div").removeClass("loaded").getLoad();
    });
} else {
    $("input[name=isGroupAdvance]").prop("disabled", "disabled");
}
$("#flowTitle").text(args['currentNodeName']);
if(type==1){
    $("#loanPool").hide(); //隐藏资金部账户
    getPaymentInfo();
}else if(type==2){
    $("#guaranteeAccount,#dealerAccount").attr("disabled",true);
    //收款信息
    getPaymentInfo();
}else if(type==3){
    $("#guaranteeAccount,#dealerAccount,#pollAccount").attr("disabled",true);
    $("#type3").show();
    $("#f_type3").hide();
    $("#btn-loanReview-back").show();
}
if (type == 2 || type == 3) {
    getCapatilPoolAccountList();
}
tableEvent_pay3 = {
    "click .pay": function (e, a, item, index) {
        $("[name='capitalPoolAccountName']").val(item.accountName);
        $("[name='capitalPoolAccountNo']").val(item.cardNumber);
        $("[name='capitalPoolBank']").val(item.subBankName);
        $("#payModal3").modal("hide");
    }
};
handle_pay3 = function (value, row, index) {
    return ["<a class='pay' href='javascript:;'>选择</a>"].join("");
};
var controlPre=true;

//审批信息
comn.ajax({
  url: interUrl.myTask.approvalInfo,
  data:loanApplyId,
  success: function(res) {
    var financial = [];
    var template = function (name,label){
      return '<div class="input-tip">'+
        '<label class="control-label col-md-3 col-xs-3 col-sm-3">' + label + '</label>'+
        '<div class="col-md-5 col-xs-5 col-sm-5">'+
        '<input type="text" name="' + name +'" class="form-control">'+
        '</div>'+
        '</div>';
    };
      //显示资金通道
      $("#capitalChannel").getCapitalChannel(res.data.orgId,args['loanApplyId'],res.data.capitalChannel); //做赋值处理
      //付款审批环节资金通道可修改
      if (args["currentNodeKey"] === "LOAN_FUND_DIRECTOR") {
          $("#capitalChannel").removeAttr("disabled");
      }
    if(res.data.loanType == 7){
      if(res.data.isPurchaseTaxFee == 1){
        financial.push(template('fusePurchaseTaxFee','车辆购置税（融贷):'));
      }
      if(res.data.isInsuranceFee == 1){
        financial.push(template('fuseInsuranceFee','保费 (融贷)'));
      }
      if(res.data.isGpsFee == 1){
        financial.push(template('fuseGpsFee','服务费'));
      }
      $('#financialLoan').html(financial.join(''));
    }
    switch (res.data.loanType){
      case 5: $('#ownerLoan').removeClass('hide');
        break;
      case 6: $('#carLoan').removeClass('hide');
        break;
      case 7: $('#fullLoan').removeClass('hide');
        break;
    }
    if(res.data.carType==2){
      $("#sc-isAdvance").show();
    }
    discountCaseId=res.data.discountCaseId?res.data.discountCaseId:'';
    /*
    if(res.data.maritalStatus!=1){
      $("#singleImg").show();
    }
	if(res.data.freeDoor=='1'){
		$("#needDoorImg").show();
	}*/
    if(res.data.maritalStatus!= 1){
      //$("#singleImg").show();
      $("#isMaritalStatus").removeClass("hide");
    }
    if(res.data.freeDoor == '1'){
      //$("#needDoorImg").show();
      $("#isFreeDoor").removeClass("hide");
    }
    if(res.data.isDiscount == '1'){
      //$("#needDoorImg").show();
      $("#isDiscount").removeClass("hide");
    }
    //银行直销逻辑判断  businessTypeId
    if(res.data.businessTypeId==2){
      $("#yhzx").show();
      $("#ptlc").remove();
      $("#paymentGetForm").hide();
      controlPre = false;
    }else{
      if(type==3){
        $("[name='guaranteeCorporationPaymentAmount']").val(res.data.requiredAmount);
        getPaymentInfo();
      }
    }
    newDealerId = res.data.dealerId;
      $("#approvalInfoForm").values(res.data);

      //获取渠道商ID和遍历      
      if(res.data.channelDealerId) {
        $("input[name='channelDealerId']").val(res.data.channelDealerId);
        $("input[name='channelDealerName']").val(res.data.channelDealerName);      
        $('#channelDealerId').channelDealer(res.data.orgId,res.data.channelDealerId);
      }else{
        $('#channelDealerId').channelDealer(res.data.orgId);
      }
      
      $('#channelDealerId').bind('change',function(){
        $("input[name='channelDealerId']").val($(this).val());
        $("input[name='channelDealerName']").val($("#channelDealerId option:selected").text());
    
          /*针对付款申请环节修改渠道商时
           ** 无：老新渠道商 ---- 代收服务费可任意修改；
           ** 非无：新渠道商 ---- 代收服务费置0 并不可修改；
          */
          if (_statusFlag) {
              if ($("#channelDealerId option:selected").text() === "无") {
                  $("#collectionFee").prop("readOnly", false);
              } else {
                  $("#collectionFee").val("0").prop("readOnly", true);
              };
          }
      });

      if(args['currentNodeKey'] !== 'LOAN_FINANCE_EXECUTIVE'){
        $('#channelDealerId').attr("disabled",true)
      }

      var dataArr =[["#econtractStatus", "EcontractStatus", res.data.econtractStatus],["#customerSource", "CustomerSource", res.data.customerSource],["#loanTerm", "LoanTerm", res.data.loanTerm]];
      $.getCommonMethodPort(dataArr);
  }
});

//关闭贷款: 只对贷款申请开放
function closeLoan() {
    oppSureModal("是否确认关闭贷款");
    $("#sureOption").unbind("click").click(function () {
        comn.ajax({
            url: interUrl.myTask.closeLoanApply,
            data: {
                loanApplyId: args["loanApplyId"]
            },
            success: function (res) {
                $("#sureModal").modal("hide");
                tip({content: "关闭贷款成功！"});
                comn.closeTab();
            }
        });
    })
}

$("#btn-closeLoan").click(function(){
    closeLoan();
});

function getCapatilPoolAccountList() {
    table_pay3 = function (params) {
        var p = params.data;
        return comn.ajax({
            url: interUrl.myTask.getCapatilPoolAccountList,
            data: p,
            success: function (res) {
                params.success({
                    'total': res.totalItem,
                    rows: res.data
                });
                console.log(res.data.length)
                if (res.data.length == 1) {
                    var item = res.data[0];
                    $("[name='capitalPoolAccountName']").val(item.accountName);
                    $("[name='capitalPoolAccountNo']").val(item.cardNumber);
                    $("[name='capitalPoolBank']").val(item.subBankName);
                    //$("#loanPool").values(res.data[0]);
                }
                return params.complete();
            }
        });
    };
}
//收款人信息
function getPaymentInfo(){
    comn.ajax({
        url: interUrl.myTask.paymentGetGuarantee,
        data:loanApplyId,
        success: function(res) {
            $("#paymentGetForm").values(res.data);
            if (!res.data.capitalPoolAccountName) {
                if (type ==2 || type == 3) {
                    getCapatilPoolAccountList();
                }
            }
            if (res.data.isGroupAdvance === 1) {
                $("#groupAdvanceAccount").removeClass("hide");
                $("#groupAdvanceFlow").attr("checked", true);
            } else {
                $("#nomalFlow").attr("checked", true);
            }

            //代收服务费
            if (res.data.carDealerCollectionFee) {
                $("#collectionFee").val(res.data.carDealerCollectionFee).prop("readOnly", (res.data.channelDealerName == "无" ? false : true));
            }

            $("#payModal").on("shown.bs.modal", function() {
                //分公司账户
                table_pay = function (params) {
                    var p = params.data;
                    p['orgId'] = res.data.orgId;
                    return comn.ajax({
                        url: interUrl.myTask.guaranteeList,
                        data: p,
                        success: function (res) {
                            params.success({
                                'total': res.totalItem,
                                rows: res.data
                            });
                            return params.complete();
                        }
                    });
                };
                tableEvent_pay = {
                    "click .pay": function (e, a, item, index) {
                        $("[name='guaranteeCorporationAccountName']").val(item.accountName);
                        $("[name='guaranteeCorporationAccountNo']").val(item.cardNumber);
                        $("[name='guaranteeCorporationBank']").val(item.subBankName);
                        $("#payModal").modal("hide");
                    }
                };
                handle_pay = function (value, row, index) {
                    return ["<a class='pay' href='javascript:;'>选择</a>"].join("");
                };
                $("#table_pay").bootstrapTable("refresh");

            });

            $("#payModal2").on("shown.bs.modal", function() {

                //车商账户
                table_pay2 = function (params) {
                    var p = params.data;
                    p['dealerId'] = newDealerId || res.data.dealerId;
                    return comn.ajax({
                        url: interUrl.myTask.getAccountList,
                        //data: p,
                        data: $.extend($("#userInfo").values(), p,{discountCaseId:discountCaseId, projectId: args["projectId"]}),
                        success: function (res) {
                            params.success({
                                'total': res.totalItem,
                                rows: res.data
                            });
                            return params.complete();
                        }
                    });
                };

                tableEvent_pay2 = {
                    "click .pay": function (e, a, item, index) {
                        $("[name='dealerAccountName']").val(item.accountName);
                        $("[name='dealerAccountNo']").val(item.cardNumber);
                        $("[name='dealerBank']").val(item.subBankName);
                        $("[name='dealerAccountType']").val(item.accountType);
                        $("#carDealerId").val(item.dealerId);
                        //保存经销商账户ID
                        $("[name='dealerAccountId']").val(item.id);

                        $("#payModal2").modal("hide");
                    }
                };
                handle_pay2 = function (value, row, index) {
                    return ["<a class='pay' href='javascript:;'>选择</a>"].join("");
                };
                $("#table_pay2").bootstrapTable("refresh");

            })

            // if(type=='2' || type=='3'){
            //   $("#payModal3").on("shown.bs.modal", function() {
            //     //资金部账户
            //
            //     //$("#table_pay3").bootstrapTable("refresh");
            //   })
            // }

            $("#payModal4").on("shown.bs.modal", function() {
                //分公司账户
                getPay24();
                tableEvent_pay4 = {
                    "click .pay": function (e, a, item, index) {
                        $("[name='groupAdvanceAccountName']").val(item.accountName);
                        $("[name='groupAdvanceAccountNo']").val(item.cardNumber);
                        $("[name='groupAdvanceBank']").val(item.subBankName);
                        $("#payModal4").modal("hide");
                    }
                };
                handle_pay4 = function (value, row, index) {
                    return ["<a class='pay' href='javascript:;'>选择</a>"].join("");
                };
                $("#table_pay4").bootstrapTable("refresh");

            });

        }
    });
}

//保存收款信息
$("#btn-payment-save").click(function () {
    $("#approvalInfoForm").validate();
    $("#paymentGetForm").validate();
    if($("#paymentGetForm").valid() == true && $("#approvalInfoForm").valid() == true){
        console.log($("#paymentGetForm").values())
        comn.ajax({
            url: interUrl.myTask.saveToGuarantee,
            data: $.extend($("#paymentGetForm").values(),loanApplyId,{
                isGroupAdvance: $("input[type='radio'][name='isGroupAdvance']:checked").val(),
                channelDealerId: $("input[name='channelDealerId']").val(),
                channelDealerName: $("input[name='channelDealerName']").val(),
                carDealerCollectionFee: $("input[name=carDealerCollectionFee]").val()
            }),
            success: function(res) {
                tip({content:res.message || '保存成功!'})
            }
        });
    }
});

//选择分公司收款人
$("#accountSelect").click(function(){
    $("#payModal").modal("show");
});

//选择车商收款人
$("#accountSelect2").click(function(){
    $("#payModal2").modal("show");
});

//选择资金部收款人
$("#accountSelect3").click(function(){
    $("#payModal3").modal("show");
});

//选择7*24账户
$("#accountSelect4").click(function(){
    $("#payModal4").modal("show");
});


//判断显示提交还是退回
$("input[name='conclusion']").on('click',function(){
    var checkedV=$("input[name='conclusion']:checked").val();
    if(checkedV==1){
        $("#btn-opinion-save").show();
        $("#btn-loanReview-back").hide();
        $("#btn-closeLoan").addClass("hide");
    }else{
        $("#btn-opinion-save").hide();
        $("#btn-loanReview-back").show();
        if (args["currentNodeKey"] === "LOAN_FINANCE_EXECUTIVE"){
            $("#btn-closeLoan").removeClass("hide");
        };
    }
});

//流程意见保存和流程提交
$("#btn-opinion-save").click(function () {
    if($('#isChange').val() != 'saved'){
        return tip({
            content: '请先保存预算单'
        })
    }
    if(controlPre){
        $("#approvalInfoForm").validate();
        $("#paymentGetForm").validate();
        $("#opinionForm").validate();
        if($("#paymentGetForm").valid() == true && $("#opinionForm").valid() == true && $("#approvalInfoForm").valid() == true){
            comn.ajax({
                url: interUrl.myTask.saveToGuarantee,
                data: $.extend($("#paymentGetForm").values(),loanApplyId,{
                    isGroupAdvance: $("input[type='radio'][name='isGroupAdvance']:checked").val(),
                    channelDealerId: $("input[name='channelDealerId']").val(),
                    channelDealerName: $("input[name='channelDealerName']").val(),
                    carDealerCollectionFee: $("input[name=carDealerCollectionFee]").val()
                }),
                success: function(res5) {
                    saveOpinion();
                }
            });
        }
    }else if(!controlPre){
        saveOpinion();
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
                data: $.extend($("#opinionForm").values(), argsBopInfoId),
                success: function (res) {
                    $("#sureModal").modal("hide");
                    flowBack2Pre();
                }
            });
        })
    }
});

function saveOpinion(){
    function oldProcess() {//原先老的流程
        oppSureModal("是否确认提交");
        $("#sureOption").unbind("click").click(function () {
            //保存流程意见
            comn.ajax({
                url: interUrl.common.opinion,
                data: $.extend($("#opinionForm").values(), argsBopInfoId),
                success: function (res) {
                    $("#sureModal").modal("hide");
                    if ($("#capitalChannel").val() === "2") {
                        flowSubmit(interUrl.myTask.preSubmit, interUrl.myTask.gjjfSubmit2next, './Modal/task/myTask/index.html', loanApplyId);
                    } else {
                        flowSubmit(interUrl.myTask.preSubmit, interUrl.myTask.submit2next, './Modal/task/myTask/index.html', loanApplyId,$("#capitalChannel").val());
                    }

                }
            });
        })
    }

    $("#opinionForm").validate();
    if($("#opinionForm").valid() == true) {
        if(args["releventFlowNode"] === "LOAN_FINANCE_EXECUTIVE") { //只针对付款申请节点验证是否超抵合同
            comn.ajax({
                url: interUrl.myTask.checkPledgeOverdue,
                data: {
                    applyId: args["loanApplyId"]
                },
                success: function(res) {
                    //是否启动超抵特批流程 0执行正常审贷流程；1所有流程等待；2启动超抵特批流程
                    if (res && res.data && res.data.launchPledgeApprove === 2) { //进入超抵合同流程
                        oppSureModal(res.data.launchPledgeApproveMsg);
                        $("#sureOption").unbind("click").click(function () {
                            $("#sureModal").modal("hide");// 隐藏提示框
                            //保存流程意见
                            comn.ajax({
                                url: interUrl.common.opinion,
                                data: $.extend($("#opinionForm").values(), argsBopInfoId),
                                success: function (res) {
                                    $("#sureModal").modal("hide");
                                    flowSubmit(interUrl.myTask.pledgeoverdueLaunch, interUrl.myTask.pledgeoverdueSubmit, './Modal/task/myTask/index.html', loanApplyId);
                                }
                            });
                        })

                    } else if (res && res.data && res.data.launchPledgeApprove === 1) {
                        return tip({content: res.data.launchPledgeApproveMsg});
                    } else {
                        oldProcess(); //进入原先的普通流程
                    }
                }
            })
        } else {
            oldProcess();
        }
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

$(function(){
    $("#userSearch").click(function() {
        return $("#table_pay2").bootstrapTable('selectPage', '1');
    });
})

$(document).on("click", ".isGroupAdvance", function(){
    var v = $(this).val();
    if (v === "1") {
        $("#groupAdvanceAccount").removeClass("hide");
        getPay24();
        $("#table_pay4").bootstrapTable("refresh");

    } else {
        $("#groupAdvanceAccount").addClass("hide");
        $("[name='groupAdvanceAccountName']").val(null);
        $("[name='groupAdvanceAccountNo']").val(null);
        $("[name='groupAdvanceBank']").val(null);
    }
});

function getPay24() {
    table_pay4 = function (params) {
        var p = params.data;
        p['orgId'] = 1;
        p['accountPurpose'] = 4;
        console.log(p)
        return comn.ajax({
            url: interUrl.myTask.guaranteeList,
            data: p,
            success: function (res) {
                params.success({
                    'total': res.totalItem,
                    rows: res.data
                });
                if (res.data.length == 1) {
                    var item = res.data[0];
                    $("[name='groupAdvanceAccountName']").val(item.accountName);
                    $("[name='groupAdvanceAccountNo']").val(item.cardNumber);
                    $("[name='groupAdvanceBank']").val(item.subBankName);
                }
                return params.complete();
            }
        });
    };
}

//付款申请先校验风险预警,判断是否显示不同等级的页签
if (args["currentNodeKey"] === "LOAN_FINANCE_EXECUTIVE") {
    $("#printInformBtn").removeClass("hide").unbind("click").on("click", function(){
        window.open("../../../Modal/task/myTask/printInform.html?loanApplyId=" + args['loanApplyId']);
    });
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
                        //console.log("red:"+ i);
                        $("#isShowWarning").removeClass("hide");
                        return false;
                    } else if (v.risklevel === "黄色预警") {
                        //console.log("yellow:"+ i);
                        $("#isShowWarning").css("background-position", "0 -30px").removeClass("hide");
                        return false;
                    }
                    //console.log("out:"+i);
                })
            }
        }
    })
}
