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
    //意见结论-是否同意点击事件
    $("input[name='conclusion']").on('click', function () {
        var btnSave = $("#btn-opinion-save");
        var btnBack = $("#btn-loanReview-back");
        var checkedV = $("input[name='conclusion']:checked").val();
        if (checkedV == 1) {
            btnSave.show();
            btnBack.hide();
        } else if (checkedV == 0) {
            btnSave.hide();
            btnBack.show();
        } else if (checkedV == 2) {
            btnSave.hide();
            btnBack.show();
        }
    });

    //提交点击事件
    $("#btn-opinion-save").click(function () {
        $("#opinionForm").validate();
        if ($("#opinionForm").valid() == true) {
            oppSureModal("是否确认提交");
            $("#sureOption").unbind("click").click(function () {
                //保存流程意见
                comn.ajax({
                    url: interUrl.common.approveOpinion,
                    data: $.extend($("#opinionForm").values(), argsBopInfoId, loanApplyId),
                    success: function (res) {
                        $("#sureModal").modal("hide");
                        flowSubmit(interUrl.miniCarLoan.preSubmit, interUrl.miniCarLoan.submit2next, './Modal/task/myTask/index.html', loanApplyId);
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
                        flowBack4Pre();
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