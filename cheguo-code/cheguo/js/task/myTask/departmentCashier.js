var table_pay,tableEvent_pay,handle_pay,payType,isGroupAdvance,approvalData;
//分公司出纳:type=1
//7*24账户垫款:type=2
//7*24分公司还款:type=3
//$.extend($.validator.defaults,{ignore:""});   //隐藏表单也验证
//审批信息
getApprovalInfo();
//修改表格统一配置参数
var tableConfig = {};
$.map(comn.table, function (v, k) {
    tableConfig[k] = v;
});
tableConfig['height'] = "300";
tableConfig['pagination'] = false;
if (type == 2) {
    payType = "GP";
    $("#groupAdvanceChoose").removeClass("hide");
} else if (type == 3) {
    payType = "GR";
    $("textarea[name=dealerPaymentRemark]").attr("name", "groupAdvancePaymentRemark");
    $("#groupAdvancePaymentDate").removeClass("hide");
    $("#dealerPaymentDate").addClass("hide");
} else {
    payType = "AP";
}
table_pay1 = function(params) {
    var p=params.data;
    p['dealerId']=approvalData.dealerId;
    return comn.ajax({
        url: interUrl.myTask.getAccountList,
        data: $.extend(p, {discountCaseId : approvalData.discountCaseId}),
        success: function(res) {
            params.success({
                'total':res.totalItem,
                rows: res.data
            });
            return params.complete();
        }
    });
};
tableEvent_pay1 = function(e, a, item, index) {
    $("[name='dealerAccountName']").val(item.accountName);
    $("[name='dealerAccountNo']").val(item.cardNumber);
    $("[name='dealerBank']").val(item.subBankName);
    $("#payModal").modal("hide");
}
table_pay2 = function (params) {
    var p = params.data;
    p['orgId'] = 1;
    p['accountPurpose'] = 4;
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
tableEvent_pay2 = function (e, a, item, index) {
    $("[name='groupAdvanceAccountName']").val(item.accountName);
    $("[name='groupAdvanceAccountNo']").val(item.cardNumber);
    $("[name='groupAdvanceBank']").val(item.subBankName);
    $("#payModal").modal("hide");
}

$("#flowTitle").text(args['currentNodeName']);
var controlPre=true;
comn.ajax({
    url: interUrl.myTask.approvalInfo,
    data: loanApplyId,
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
        approvalData=res.data;
        if(res.data.carType=='2'){
            $("#sc-isAdvance").show();
        }
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
            if (type == 3) {
                table_pay = table_pay2;
                tableEvent_pay = {"click .pay": tableEvent_pay2};
            } else {
                table_pay = table_pay1;
                tableEvent_pay = {"click .pay": tableEvent_pay1};
            }
            handle_pay = function(value, row, index) {
                return ["<a class='pay' href='javascript:;'>选择</a>"].join("");
            };
            $("#table_pay").bootstrapTable("refresh");
            getCarDealerPayment();
        }
        var dataArr =[["#econtractStatus", "EcontractStatus", res.data.econtractStatus],["#customerSource", "CustomerSource", res.data.customerSource],["#loanTerm", "LoanTerm", res.data.loanTerm]];
        $.getCommonMethodPort(dataArr);
    }
});

//普通流程-获取付款信息
function getCarDealerPayment(){
    comn.ajax({
        url: interUrl.myTask.getCarDealerPayment,
        data: $.extend({type: type}, loanApplyId),
        success: function (res) {
            $("#paymentGetForm").values(res.data);
            $("#paymentGetForm").find($("input[name=groupAdvancePaymentAmount]")).val(res.data.dealerPaymentAmount);
            //获取付款方式
            $("#payType").payTypeMent(args['loanApplyId'],res.data.payType, args["businessTypeCode"], args["currentNodeKey"]);
            if (payType == "GR") {
                $("input[name='groupAdvancePaymentDate']").getToday();
            } else {
                $("input[name='dealerPaymentDate']").getToday();
            }
        }
    });
}



//选择收款人
$(".accountSelect").click(function(){
    $("#payModal").modal("show");
});

function diffDate(date){
    var newDate=date.replace(/-/g,'/');
    if(new Date()>Date.parse(newDate)){
        return true;
    }else{
        return false;
    }
}

//保存付款信息
$("#btn-save-pay").click(function(){
    $("#paymentGetForm").validate();
    if($("#paymentGetForm").valid() == true){
        if(diffDate($("input[name=dealerPaymentDate]").val())){
            comn.ajax({
                url: interUrl.myTask.paymentSave,
                data: $.extend($("#paymentGetForm").values(),loanApplyId,{type: payType}),
                success: function (res) {
                    tip({content:res.message || "保存成功!"});
                }
            });
        }else{
            tip({
                content:'付款日期不能大于当前日期'
            })
        }

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
                $("#payForm").values(res.data);
                if(!res.data.collectedDate){
                    $("#collectedDate").getToday();
                }
            }
        }
    });
}
//获取cbs付款信息
function getCbsPayment(){
    comn.ajax({
        url: interUrl.myTask.getCarDealerPayment,
        data: $.extend({type: type}, loanApplyId),
        success: function (res) {
            if (type == 2 || type == 3) {
                $("#tableGroupAdvance").bootstrapTable("refresh", {url: "..."});
                if (type == 2) {
                    $("#groupAdvanceChoose").removeClass("hide");
                }
            }
            $("#payForm").values(res.data);
            $('.mon').val(comn.toThousands(res.data.dealerPaymentAmount));
            if(res.data.cash){
                $(".overage").html("<p>账户余额:"+comn.toThousands(res.data.cash)+"</p><p>更新时间:"+res.data.cashUpdateTime+"</p>");
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

//发起付款
function startPayment(isSplit, message){
    comn.ajax({
        url:interUrl.myTask.startPayment,
        data:{
            token:$("input[name=token]").val(),
            isSplit:isSplit,
            applyId:args["loanApplyId"],
            priorityFlag:$("input[name=priorityFlag]:checked").val(),
            purpose:$("input[name=purpose]").val(),
            payType:payType
        },
        success:function(res){
            $("#takeApart").modal('hide');
            tip({content: message});
            comn.closeTab();
        }
    })
}
//7*24 付款 提交人确定
var nextFlowType;
if (type == 2) {
    tableGroupAdvance = function(params) {
        var p = params.data;
        return comn.ajax({
            url: interUrl.myTask.preSubmit,
            data: loanApplyId,
            success: function (res) {
                params.success({
                    'total': res.totalItem,
                    rows: res.data.userTasks
                });

                params.complete();
                nextFlowType = res.data.nextFlowType;
                $("#tableGroupAdvance input[type='radio']").eq(0).attr('checked', true);
                $("#nextNodeName").html(res.data.nextFlowNodeName);
            }
        });
    }
    $("#tableGroupAdvance").bootstrapTable(tableConfig);
}

handle_radio = function (value, row, index) {
    return ["<input type='radio' name='userId' class='role' userId='" + row.userId + "' userName='" + row.userName + "'/>"].join("");
};

//普通流程保存收付款信息
function savePayment1(){
    oppSureModal("是否确认提交");
    $("#sureOption").unbind("click").click(function () {

        comn.ajax({
            url: interUrl.myTask.paymentSave,
            data: $.extend($("#paymentGetForm").values(), loanApplyId,{type: payType}),
            success: function (res) {
                $("#sureModal").modal("hide");
                //保存流程意见
                comn.ajax({
                    url: interUrl.common.opinion,
                    data: $.extend($("#opinionForm").values(), argsBopInfoId, {conclusion: 1}),
                    success: function (res) {
                        //招行CBS
                        if($("#payType").val() != 0){ // 非人工打款
                            $("#payMode").modal("show");
                            //获取系统时间
                            $(".time").getPayDate();
                            //付款信息
                            getCbsPayment();
                            //生成token,校验重复点击
                            $("input[name=token]").getPaymentToken();
                            // if (payType === "AP") {
                            //     $("[name='dealerAccountName1']").val($("[name='dealerAccountName']").val());
                            //     $("[name='dealerAccountNo1']").val($("[name='dealerAccountNo']").val());
                            //     $("[name='dealerBank1']").val($("[name='dealerBank']").val());
                            // }
                            $("input[name=purpose]").val($("input[name=customerName]").val()+"  (车款)");
                            $(".payTitle").html($("#payType").find("option:checked").html()+' | 付款信息');
                            $(".payment").unbind("click").on("click",function(){

                                if (type == 1 || type == 3) {
                                	//非人工打款-用途必填
                                    $("#payForm").validate();
                                    if($("#payForm").valid()==true){
                                        preSubmit();
                                    }
                                } else if (type == 2) {
                                    var nextNodeUserName = $("#tableGroupAdvance input[type='radio']:checked").attr('userName');
                                    var nextNodeUserId = $("#tableGroupAdvance input[type='radio']:checked").attr('userId');
                                    // var nodeCode = {nodeCode: nextFlowType};
                                    var p3 = {nextNodeUserName: nextNodeUserName, nextNodeUserId: nextNodeUserId};
                                    var _data = $.extend(p3, loanApplyId);
                                    preSubmit(_data);
                                }

                            });
                        }else{
                            submitNextNode();
                        }

                    }
                });
            }
        });
    })
}

function preSubmit(_data) {
    if (type != 2) {
        comn.ajax({
            url: interUrl.myTask.preSubmit,
            data: loanApplyId,
            success: function (res0) {
                var nextNodeUserName = res0.data.userTasks[0].userName;
                var nextNodeUserId = res0.data.userTasks[0].userId;
                var p3 = {nextNodeUserName: nextNodeUserName, nextNodeUserId: nextNodeUserId};
                var _dataJson = $.extend(p3, loanApplyId);
                preStartPayment (_dataJson);
            }
        })
    } else {
        preStartPayment (_data);
    }

}
function preStartPayment (_data) {
    comn.ajax({
        url:interUrl.myTask.preStartPayment,//校验时间
        data: $.extend({payType:payType}, loanApplyId),
        success:function(res){
            payment(_data, res.code);
        }
    })
}
function payment(_data, resCode){
    if(resCode===25000){ //是否拆笔
        $("#takeApart").modal('show');

        $("#agree").unbind('click').click(function(){
            submit2nextForType2(_data, 1)

        });
        $("#disAgree").unbind('click').click(function(){
            submit2nextForType2(_data, 0)
        });

    }else{
        submit2nextForType2(_data, 0)
    }
}
//下一节点
    function submit2nextForType2(_data, status) {
        comn.ajax({
            url: interUrl.myTask.submit2next,
            data: _data,
            success: function (res2) {
                startPayment(status, res2.message);
            }
        });

}
function submitNextNode() {
    comn.ajax({
        url: interUrl.myTask.preSubmit,
        data: loanApplyId,
        success: function (res0) {
            var nextNodeUserName = res0.data.userTasks[0].userName;
            var nextNodeUserId = res0.data.userTasks[0].userId;
            var p3 = {nextNodeUserName: nextNodeUserName, nextNodeUserId: nextNodeUserId};
            if (type != 2) {
                comn.ajax({
                    url: interUrl.myTask.manualPayment, //人工付款
                    data: {
                        projectId: $("input[name=projectId]").val() || args["projectId"],
                        oldDetailId: '',
                        payType: payType
                    },
                    success: function() {
                        comn.ajax({
                            url: interUrl.myTask.submit2next,
                            data: $.extend(p3, loanApplyId),
                            success: function (res2) {
                                tip({content: res2.message});
                                comn.closeTab();
                            }
                        });
                    }
                })
            } else {
                if(res0.data.userTasks.length>1){
                    table_sign = function (params) {
                        var p=params.data;
                        params.success({'total':res0.data.userTasks.length, rows: res0.data.userTasks});
                        params.complete();
                    };
                    tableEvent_sign = {
                        "click .role": function (e, a, item, index) {
                            p2 = {nextNodeUserName: item.userName, nextNodeUserId: a}
                        }
                    };

                    handle_sign = function (value, row, index) {
                        return ["<input type='radio' name='userId' class='role' value='" + value + "'/>"].join("");
                    };
                    $("#nextNode").html(res0.data.nextFlowNodeName);
                    $("#table_sign").bootstrapTable();
                    $("#table_sign").bootstrapTable('load', res0.data.userTasks);
                    $("#signModal").modal("show");
                    setTimeout("$('#table_sign').find('tr').eq(1).find('[name=\"userId\"]').prop('checked','checked')",500);
                    p2=p3;
                    $("#select-sign-btn").unbind("click").click(function(){
                        comn.ajax({
                            url: interUrl.myTask.manualPayment,
                            data: {
                                projectId: $("input[name=projectId]").val() || args["projectId"],
                                oldDetailId: '',
                                payType: payType
                            },
                            success: function() {
                                comn.ajax({
                                    url: interUrl.myTask.submit2next,
                                    data: $.extend(p2, loanApplyId),
                                    success: function (res2) {
                                        $("#signModal").modal("hide");
                                        tip({content:res2.message});
                                        comn.closeTab();
                                    }
                                })
                            }
                        })
                    })
                }else{
                    comn.ajax({
                        url: interUrl.myTask.manualPayment,
                        data: {
                            projectId: $("input[name=projectId]").val() || args["projectId"],
                            oldDetailId: '',
                            payType: payType
                        },
                        success: function () {
                            comn.ajax({
                                url: interUrl.myTask.submit2next,
                                data: $.extend(p3, loanApplyId),
                                success: function (res4) {
                                    tip({content: res4.message});
                                    comn.closeTab();
                                }
                            });
                        }
                    });
                }
            }

        }
    });

    //flowSubmit(interUrl.myTask.preSubmit, interUrl.myTask.submit2next, './Modal/task/myTask/index.html', loanApplyId);
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
                        submitNextNode();
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
            if(diffDate($("input[name=dealerPaymentDate]").val())){
                savePayment1();
            }else{
                tip({
                    content:'付款日期不能大于当前日期'
                })
            }
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
