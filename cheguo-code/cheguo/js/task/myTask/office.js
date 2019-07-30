var vm = null;
//配偶云镜大数据查询是否在倒计时
var isTimeOut = false;

//判断显示提交还是退回
$("input[name='conclusion']").on('click', function () {
    var checkedV = $("input[name='conclusion']:checked").val();
    if (checkedV == 1) {
        $("#btn-opinion-save").show();
        $("#btn-loanReview-back").hide();
        $("#btn-loan-back").hide();
    } else {
        $("#btn-opinion-save").hide();
        $("#btn-loanReview-back").show();
        $("#btn-loan-back").show();
    }
});
//opinionForm单独保存
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
//页面加载获取opinion内容
$("#opinionText").getOpinion_s(argsBopInfoId);
//流程部分Begin
//流程意见保存和流程提交
$("#btn-opinion-save").click(function () {
    if(isTimeOut === true) {
        tip({content: "配偶在查询云镜大数据中，不准提交"});
        return                                     
    }    
    //配偶云镜大数据查询结果，导致不能提交相关逻辑start
    if(spouseSearchStatus.maritalStatus === 1 && spouseSearchStatus.spouseDecisionStatus === 0) {
        tip({content: "配偶未查询云镜大数据，请查询后再提交"});
        return 
    }
    if(spouseSearchStatus.maritalStatus === 1 && spouseSearchStatus.spouseDecisionStatus === 1) {
        tip({content: "配偶未查询云镜大数据查询中，查询结束后在提交"});
        return 
    }   
    if(spouseSearchStatus.maritalStatus === 1 && spouseSearchStatus.spouseDecisionStatus === 3) {
        tip({content: "配偶命中大数据黑名单，无法继续流程"});
        return 
    }
    if(spouseSearchStatus.maritalStatus === 1 && spouseSearchStatus.spouseDecisionStatus === 4) {
        tip({content: "配偶命中大数据黑名单，无法继续流程"});
        return 
    }  
    if(spouseSearchStatus.maritalStatus === 1 && spouseSearchStatus.spouseDecisionStatus === 200) {
        tip({content: "配偶未查询云镜大数据，请查询后再提交"});
        return 
    }   
    //配偶云镜大数据查询结果，导致不能提交相关逻辑end 


    if ($("#isChange").val() == "change") {
        return tip({ content: "请先保存预算单" });
    }
    $("#approvalBaseInfoForm").validate();
    if ($("#approvalBaseInfoForm").valid() == true) {
        comn.ajax({
            url: interUrl.myTask.editLoanerInfo,
            data: $.extend($("#approvalBaseInfoForm").values(), loanApplyId),
            success: function (res) {
                comn.ajax({
                    url: interUrl.myTask.approvalAsserts,
                    data: loanApplyId,
                    success: function (res) {
                        $("#approvalGuarantorForm").values(res.data);

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
                                        flowSubmit(interUrl.myTask.preSubmit, interUrl.myTask.submit2next, './Modal/task/myTask/index.html', loanApplyId);
                                    }
                                });
                            })
                        }
                    }
                });
                //$("#approvalBudgetInfoForm").validate();
                /*if($("#approvalBudgetInfoForm").valid() == true) {
                }else{
                    $(".nav-tabs li").removeClass('active');
                    $(".tab-content .tab-pane").removeClass('active');
                    $("#budget-li,#budget").addClass('active');
                }*/
            }
        });

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
                    flowBack2Pre();
                }
            });
        })
    }
});

//退回贷款发起
$("#btn-loan-back").click(function () {
    $("#opinionForm").validate();
    if ($("#opinionForm").valid() == true) {
        oppSureModal("是否确认退回贷款发起");
        $("#sureOption").unbind("click").click(function () {
            //保存流程意见
            comn.ajax({
                url: interUrl.common.opinion,
                data: $.extend($("#opinionForm").values(), argsBopInfoId),
                success: function (res) {
                    $("#sureModal").modal("hide");
                    back2LoanLaunch();
                }
            });
        })
    }
});

$('#loadCredit').getLoad();

//暂存
$("#tempSave").click(function () {
    var value_mobile = $("input[name=mobilePhone]").val();
    var value_homePhone = $("input[name=homePhone]").val();
    var value_workPhone = $("input[name=companyPhone]").val();
    var value_spouseMobilePhone = $("input[name=spouseMobilePhone]").val();
    var value_spouseCompanyPhone = $("input[name=spouseCompanyPhone]").val()
    if (value_mobile) {
        if (!$("input[name=mobilePhone]").valid()) {
            return false;
        };
    }
    if (value_homePhone) {
        if (!$("input[name=homePhone]").valid()) {
            return false;
        };
    }

    if (value_workPhone) {
        if (!$("input[name=companyPhone]").valid()) {
            return false;
        };
    }
    if (value_spouseMobilePhone) {
        if (!$("input[name=spouseMobilePhone]").valid()) {
            return false;
        };
    }

    if (value_spouseCompanyPhone) {
        if (!$("input[name=spouseCompanyPhone]").valid()) {
            return false;
        };
    }
    if (args["releventFlowNode"] == "LOAN_OFFICE_STAFF_BUDGET") {
        var sex = { sex: $("[name='sex']").val() };
        var maritalStatus = { maritalStatus: $("[name='maritalStatus']").val() };
        comn.ajax({
            url: interUrl.myTask.editLoanerInfo,
            data: $.extend($("#approvalBaseInfoForm").values(), sex, maritalStatus, loanApplyId, {
                isTempStorage: true
            }),
            success: function (res) {
                tip({ content: res.message || "客户信息暂存成功!" });
            }
        });
    }
});


//云镜大数据相关start
//配偶云镜大数据查询点击显示弹窗
$("#spouseSearch").click(function () {
    $("#spouseSearchInfo").modal("show");
});
//查询云镜大数据弹窗-提交按钮事件
$("#spouseSearch2").click(function () {
    comn.ajax({
        url: interUrl.cloudMirrorReport.decisionengineLoanQueryDecision,
        data: {
            loanApplyId: args['loanApplyId'],
            type: 1,
        },
        success: function (res) {
            isTimeOut = true;
            $("#spouseSearchInfo").modal("hide");

            $('#spouseSearch').addClass('hide');
            $('#spouseSearchTip').removeClass('hide');
            $('#spouseSearchTip').text('查询中(9秒)');

            function setTime(n) {
                var times = n;
                var t = setInterval(function () {
                    times--;
                    var timesStr = '查询中(' + times + '秒)';
                    $('#spouseSearchTip').html(timesStr);
                    if (times === 0) {
                        clearInterval(t);
                        function getInfo() {
                            comn.ajax({
                                url: interUrl.myTask.approvalBaseInfo,
                                data: { loanApplyId: args['loanApplyId'] },
                                success: function (res) {
                                    var data = res.data;

                                    //获得配偶相关信息
                                    spouseSearchStatus.maritalStatus = data.maritalStatus;
                                    spouseSearchStatus.spouseDecisionStatus = data.spouseDecisionStatus;

                                    if (data.spouseDecisionStatus === 1) {
                                        $('#spouseSearchTip').text('请稍后再刷新查看');
                                        return;
                                    }

                                    if (data.spouseDecisionStatus === 2) {
                                        $('#spouseSearchTip').text('配偶云镜大数据通过');
                                        return;
                                    }

                                    if (data.spouseDecisionStatus === 3 || data.spouseDecisionStatus === 4) {
                                        $('#spouseSearchTip').text('配偶命中大数据黑名单');
                                        return;
                                    }

                                    if(data.spouseDecisionStatus === 200) {
                                        $('#spouseSearch').removeClass('hide');
                                        $('#spouseSearchTip').addClass('hide');
                                        $('#spouseSearchTip').text('');
                                        return;
                                    }                                    
                                },
                            })
                        }
                        getInfo();
                        isTimeOut = false;
                    }
                }, 1000)
            }
            setTime(9);
        }
    })
});
 //云镜大数据相关end
