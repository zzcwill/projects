var args, data, flowType, table_sign, handle_sign, tableEvent_sign, reBack, index, projectId, projectNo, bopInfoId, loanApplyId, policyNumber, currentNodeKey, businessTypeCode, argsBopInfoId, option;
args = comn.getArgs();
index = args["index"];
reBack = args["reBack"];
currentNodeKey = args["currentNodeKey"];
businessTypeCode = args["businessTypeCode"];
flowType = {flowType: "LOAN_CANCEL_FLOW"};

switch (args["releventFlowNode"]) {
    case "INSURANCE_DISPATCHN_LAUNCH":
        $("#flowTitle").html("保险分发");
        break;
    case "INSURANCE_DISPATCHN_PRIMARY":
        $("#flowTitle").html("保险分发中审");
        break;
    case "INSURANCE_DISPATCHN_REVIEW" :
        $("#flowTitle").html("保险分发复审");
        break;
}

if (args["bopInfoId"]) {
    argsBopInfoId = {bopInfoId: args["bopInfoId"]};
} else {
    argsBopInfoId = {bopInfoId: 0};
}
comn.ajax({
    url: interUrl.distributionInsuranceCo.getInsure,
    data: {
        projectId: args["projectId"]
    },
    success: function (res) {
        //if(!args['loanApplyId']){
        args['loanApplyId'] = res.data.relativeApplyId1;
        //}
        //option = [res.data];
        $("#carDealerForm, #cusInfoForm").values(res.data)
    }
})
//长安保险过程意见
var dataLoad_CNopinion = function (params) {
    if (args["reBack"] == 1) {//退回状态只显示退回意见
        var p;
        p = params.data;
        comn.ajax({
            url: interUrl.distributionInsuranceCo.getInsure,
            data: $.extend({projectId: args["projectId"]}, p),
            success: function (res) {
                params.success({
                    'total':1,
                     'rows': [res.data]
                });
                params.complete();
            }
        });
    } else {
        tableData(params, {
            'boId': args['projectId'],
            'businessType': "INSURANCE_DISPATCHN_FLOW"
        }, interUrl.gr.flow);
    }
};
$(document).on("click", "#cancel", function () {
    comn.closeTab();
})

//判断显示提交还是退回
$("input[name='conclusion']").on('click', function () {
    var checkedV = $("input[name='conclusion']:checked").val();
    if (checkedV == 1) {
        $("#btn-opinion-save").show();
        $("#btn-loanReview-back").hide();
    } else {
        $("#btn-opinion-save").hide();
        $("#btn-loanReview-back").show();
    }
});

//opinionForm单独保存
$("#saveBtn").click(function () {
    if ($("#opinionText").val().length > 0) {
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
    } else {
        $("#opinionText").css("border", "1px solid red");
        tip({
            content: "请输入意见说明!"
        });
    }
});
//流程意见保存和流程提交
$("#btn-opinion-save").click(function () {
    if (index == 0) {
        comn.ajax({
            url: interUrl.distributionInsuranceCo.saveAll,
            data: {
                projectId: args["projectId"],
                projectNo: args["projectNo"]
            },
            success: function (res) {
                oppSureModal("是否确认提交");
                $("#sureOption").unbind("click").click(function () {
                    $("#sureModal").modal("hide");
                    flowSubmit(interUrl.distributionInsuranceCo.preSubmit, interUrl.distributionInsuranceCo.submit2next, './Modal/task/myTask/index.html', {projectId: args["projectId"]});
                })
            }
        })
    } else {
        $("#opinionForm").validate();
        if ($("#opinionText").val().length > 0) {
            oppSureModal("是否确认提交");
            console.log($("#opinionForm").values());
            $("#sureOption").unbind("click").click(function () {
                //保存流程意见
                comn.ajax({
                    url: interUrl.common.opinion,
                    data: $.extend($("#opinionForm").values(), argsBopInfoId),
                    success: function (res) {
                        $("#sureModal").modal("hide");
                        flowSubmit(
                            interUrl.distributionInsuranceCo.preSubmit,
                            interUrl.distributionInsuranceCo.submit2next,
                            './Modal/task/myTask/index.html',
                            {projectId: args["projectId"]}
                        );
                    }
                });
            })
        } else {
            $("#opinionText").css("border", "1px solid red");
            tip({
                content: "请输入意见说明!"
            });
        }
    }
});
//所有数据保存
$("#saveAll").click(function () {
    $("#cusInfoForm").validate();
    $("#opinionForm").validate();
    oppSureModal("是否确认保存");
    $("#sureOption").unbind("click").click(function () {
        $("#sureModal").modal("hide");
        comn.ajax({
            url: interUrl.distributionInsuranceCo.saveAll,
            data: {
                projectId: args["projectId"],
                projectNo: args["projectNo"]
            },
            success: function (res) {
                tip({
                    content: "保存成功！"
                });

            }
        })
    })
})

//退回上一步,流程撤销
function flowCancel() {
    if ($("#opinionText").val().length > 0) {
        $("#sureModal").modal("hide");
        comn.ajax({
            url: interUrl.distributionInsuranceCo.cancel,
            data: {
                projectId: args["projectId"],
                remark: $("#opinionText").val()
            },
            success: function (res) {
                tip({content: res.message || "取消成功"});
                comn.closeTab();
            }
        })
    } else {
        $("#opinionText").css("border", "1px solid red");
        tip({
            content: "请输入意见说明!"
        });
    }

}

//流程退回
function flowBack2Pre() {
    //退回上一步
    if ($("#opinionText").val().length > 0) {
        comn.ajax({
            url: interUrl.common.opinion,
            data: $.extend($("#opinionForm").values(), argsBopInfoId),
            success: function (res) {
                //$("#sureModal").modal("hide");
                comn.ajax({
                    url: interUrl.distributionInsuranceCo.back2pre,
                    data: {
                        projectId: args["projectId"]
                    },
                    success: function (res1) {
                        tip({content: res1.message});
                        comn.closeTab();
                    }
                });
            }
        });

    } else {
        $("#opinionText").css("border", "1px solid red");
        tip({
            content: "请输入意见说明!"
        });
    }

}
$("#btn-loanReview-back").click(function () {
    oppSureModal("是否确认退回");
    $("#sureOption").unbind("click").click(function () {
        //根据节点判断是退回上一步还是撤销
        if (currentNodeKey && currentNodeKey != "INSURANCE_DISPATCHN_LAUNCH") {
            flowBack2Pre();
        } else {
            flowCancel();
        }

    })
});
//返回
$("#policyCancle").click(function () {
    comn.closeTab();
})

//审批流程提交
$("#approvalSub").click(function () {
    comn.ajax({
        url: interUrl.distributionInsuranceCo.saveAll,
        data: {
            projectId: args["projectId"],
            projectNo: args["projectNo"]
        },
        success: function (res) {
            oppSureModal("是否确认提交");
            $("#sureOption").unbind("click").click(function () {
                $("#sureModal").modal("hide");
                flowSubmit(interUrl.distributionInsuranceCo.preSubmit, interUrl.distributionInsuranceCo.submit2next, './Modal/task/myTask/index.html', {projectId: args["projectId"]});
            })
        }
    })
});

//审批流程退回
$("#approvalBack").click(function () {
    flowCancel();
})


//判断内容能否进行修改
if (index == 2) {
    $("input").attr("disabled", true);
    $("input[name='policyNumber']").attr("disabled", false);
} else {
    $("input").attr("disabled", true);
    $("input[type='radio']").attr("disabled", false);
    $("input[name='policyNumber']").attr("disabled", true);
}

//保单登记 index=1:查看详情，index=2:保单登记，index=0：进入审批
if (index == 2) {
    $("#policyNumber").show();
    $("#policyCancle").hide();
    $("#flowTitle").html("保单登记");
    //$("#btn-opinion-save").hide();
    $("#saveAll").unbind("click").click(function (e, a, item, index) {
        comn.ajax({
            url: interUrl.distributionInsuranceCo.isSue,
            data: $.extend({policyNumber: $(".policyNumber").val()}, {
                projectId: args["projectId"],
                policyNumber: args["policyNumber"]
            }),
            success: function (res) {
                tip({content: '保单登记成功'});
                $("#table2, #table1").bootstrapTable('refresh', {url: "..."});
                comn.closeTab();
            }
        })
    })
} else if (index == 1) {
    //$("#btn-opinion-save").hide();
    $("#policyNumber").show();
    $("#policyCancle").show();
    $("#saveAll").hide();
} else if (index == 0) {
    $("#flowTitle").html("保单审批");
    $("#policyNumber").hide();
    $("#saveAll").show();
    $("#policyCancle").hide();
    //$("#btn-loanReview-back").show();
} else {
    $("#policyNumber").hide();
    $("#policyCancle").hide();
}

//判断是否进入流程
if (currentNodeKey) {
    $("#processView").show();
    $("#btn-opinion-save").show();
    $("#saveAll").hide();
} else {
    $("#processView").hide();
    $("#btn-opinion-save").hide();
    //$("#saveAll").show();
}
if (index == 0) {
    $("#processView").show();
    $("#btn-opinion-save").show();
    //$("#approvalSub").show();
    //$("#approvalBack").show();
    $("#saveAll").hide();
}
//else{
//    $("#approvalSub").hide();
//    $("#approvalBack").hide();
//}
if (args["view"] == "detail") {
    $("#saveAll").hide();
    $("#flowTitle").html("查看客户详情");
}
