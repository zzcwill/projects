var timeCount = 61, loanTerm, args, _isCheckCode, data, codeFlag = 0;
/*
    * app传递参数：projectId,customerName,mobilePhone,identityNo,signLongitude,signLatitude
**/
var base = '/view';
args = common.getArgs();
args["projectId"] = args["projectId"] || args["creditId"];
var dataObj = {
    econtractProjectNo: '',
    identityNo: args["cardNo"],
    // customerName: '',
    mobile: args["mobilePhone"],
    projectNo: ''
}
loanTerm = function (value, row, index) {
    return [null, "12期", "18期", "24期", "36期", "48期", '60期'][value] || null;
};
if (args["type"] === "see") { //查看的情况下隐藏相应按钮
    $(".layer_identifyConter, .contractCheckBox").addClass("hide");
}
$(function () {
    getEContractInfo(); //获取合同详情
    //是否阅读相关合同
    $("#contractCheckBox").click(function () {
        $(".contractCheckBox").toggleClass("activeCheckbox");
        if ($(".contractCheckBox").hasClass("activeCheckbox")) {
            if ($(".fillIdentifyingCode").val() && _isCheckCode !== undefined) { //输入框存在验证码并且点击获取验证码
                $(".btn_toSubmit").removeClass("submitNoActive")
            }
            if (_isCheckCode === 0) { //0：安心签已验证通过，但是还未签合同
                $(".btn_toSubmit").removeClass("submitNoActive")
            }
            if (timeCount === 61) { //已点击验证码但判断是否依然处于倒计时状态， 61表示已倒计时结束
                $(".btn_getIdentifyingCode").addClass("activeTime");
            }
        } else {
            $(".btn_getIdentifyingCode").removeClass("activeTime");
            $(".btn_toSubmit").addClass("submitNoActive");
        }
    });
    // 提交
    $(".btn_toSubmit").click(function () {
        if ($(this).hasClass("submitNoActive")) {
            return false;
        }
        $(".layer_black_loading").removeClass("hide");
        submitBtn(_isCheckCode === 0 ? '1' : '');//为1时 直接调提交接口
    });
    //获取验证码
    $("#getTime").click(function () {
        if (_isCheckCode === 0) {
            $("#layer_tip").html("手机验证已通过，无需重复获取验证码，可直接提交").show();
            setTimeout(function () {
                $("#layer_tip").hide(1000);
            }, 3000);
            return false;
        }
        if ($(this).hasClass("activeTime")) {
            getCode(send);
        } else {
            return false;
        }
    });
    //输入验证码
    $(".fillIdentifyingCode").keyup(function () {
        if ($(this).val() && $(".contractCheckBox").hasClass("activeCheckbox") && codeFlag === 1) {
            $(".btn_toSubmit").removeClass("submitNoActive");
        } else {
            $(".btn_toSubmit").addClass("submitNoActive");
        }
    });
    //
    $(".btn_colseLoan").click(function () {
        $(".layer_black_loading").removeClass("hide");
        closeLoan();
    })
});

//关闭贷款
function closeLoan() {
    newCommon.Ajax({
        url: 'mytasks/close', //列表详情
        data: args,
        success: function (res) {
            $(".layer_black_loading").addClass("hide");
            if (res.code === 10000) {
                appNative.backToHome();
            }
            $("#layer_tip").html(res.code === 10000 ? "关闭贷款成功！" : res.message).show();
            setTimeout(function () {
                $("#layer_tip").hide(1000);
            }, 3000);

        }
    });
}

function borrowerRelationship(v) {
    if (v === 1) {
        $(".creditTitle").append("--主贷人")
    } else if (v === 2) {
        $(".creditTitle").append("--配偶");
    } else {
        $(".creditTitle").append("--担保人")
    }
}

//获取合同详情
function getEContractInfo() {
    common.Ajax({
        url: args["origin"] === "creditAuthorization" ? 'h5econtract/getRelationInfo' : 'h5econtract/getEContractInfo', //列表详情
        data: args,
        success: function (data) {
            if (!data) {
                return;
            }
            //borrowerRelationShip:: 1:主贷人  2:配偶   3:担保人
            borrowerRelationship(data.borrowerRelationship);
            if (data.isSingleSign != undefined && data.isSingleSign === 0) { //singleSign 0非单签 1 单签
                var relativeHtml = "";
                if (data.relavants) {
                    var _o = data.relavants;
                    for (var i = 0; i < _o.length; i++) {
                        relativeHtml += ["<div class='am-list-item'>" +
                        "<div class='am-list-title'>"+ (_o[i].borrowerRelationship === 2 ? '配偶姓名' : '担保人姓名') +"</div>" +
                        "<div class='am-list-extra'>" + _o[i].fullName + "</div>" +
                        "</div>" +
                        "<div class='am-list-item'>" +
                        "<div class='am-list-title'>身份证号</div>" +
                        "<div class='am-list-extra'>" + _o[i].cardId + "</div>" +
                        "</div>" +
                        "<div class='am-list-item'>" +
                        "<div class='am-list-title'>手机号码</div>" +
                        "<div class='am-list-extra'>" + _o[i].mobile + "</div>" +
                        "</div>"].join("");
                    }
                    $("#relative").html(relativeHtml);
                }
            }
            if (args["origin"] === "creditAuthorization" && data.borrowerRelationship !== 1) { //征信授权书签约关系人相应显示
                $("#yourNameTitle").html(data.borrowerRelationship === 2 ? "配偶姓名" : "担保人姓名");
            }

            /*
            * 短信验证所需参数
            * */
            dataObj.econtractProjectNo = data.projectNo;
            // dataObj.customerName = args["customerName"] || data.customerName;
            // dataObj.identityNo = args["cardNo"] || data.cardNo;
            // dataObj.mobile = args["mobilePhone"] || data.mobilePhone;
            dataObj.projectNo = data.projectNo;
            dataObj.nextNodeUserId = data.launchUserId;
            dataObj.nextNodeUserName = data.launchUserName;
            dataObj.conclusion = data.conclusion;
            dataObj.businessType = data.busType;
            if (data.econtractStatus === 2 || data.econtractStatus === 5) { //合同已签订：2-已签订 5-已重签
                $("#getIdentifyingCode, .contractCheckBox, .submitNoActive").addClass("hide");
                $(".layer_black_loading").addClass("hide");
                //$(".submitNextNode").removeClass("hide");
                $("#isSigning").html("已签约");
            } else {
                $("#isSigning").html("未签约")
            }
            /*
            * 电子合同
            * */
            var html = "";
            var o = data.fileInfoList;
            if (o) {
                for (var i = 0; i < o.length; i++) {
                    html += (data.econtractStatus === 2 || data.econtractStatus === 5) ? "<a href='" + base + "/pdf/pdf.html?title=" + o[i].fileName + "&fileUrl=" + o[i].url + "'>《" + o[i].fileName + "》</a>" : "<a href='" + base + "/pdf/pdfNotSignContract.html?title=" + o[i].fileName + "&contractNo=" + o[i].contractNo + "&operName=" + data.userName + "'>《" + o[i].fileName + "》</a>";
                }
            }
            $("#contractList").html(html);
            return $("#page").nameValues(data);
        }
    });
}

//获取验证码
function getCode(fn) {
    newCommon.Ajax({
        url: 'h5econtract/getCheckCode',
        data: $.extend({checkCode: $("#checkCode").val()}, dataObj, args),
        success: function (res) {
            if (res.code === 20000) {
                $(".errorTip").html(res.message);
            } else if (res.code === 10000) {
                codeFlag = 1; //表示是否点过获取验证码；
                _isCheckCode = res.data.isCheckCode;
                $(".layer_black_loading").addClass("hide");
                if (res.data.isCheckCode == '0') { //无需验证码直接提交
                    clearTimeout(T);
                    $(".btn_toSubmit").removeClass("submitNoActive");
                    //$("#getIdentifyingCode").addClass("hide");
                    //submitBtn("1"); //为1时 直接调提交接口
                    $("#layer_tip").html("手机验证已通过，无需重复获取验证码，可直接提交").show();
                    setTimeout(function () {
                        $("#layer_tip").hide(1000);
                    }, 3000);
                } else {
                    fn(); //时间倒计时60s
                }

            }
        }
    });

}

//提交验证码
function submitBtn(v) {
    if (v != "1" && $("#checkCode").val() == "") {
        $(".layer_black_loading").addClass("hide");
        return $(".errorTip").html("验证码不能为空");
    } else {
        $(".errorTip").html("");
    }
    newCommon.Ajax({
        url: args["origin"] === "creditAuthorization" ? "h5econtract/ynTrust/creditSendSignEcontract" : "h5econtract/ynTrust/sendSignContractInfo",
        data: $.extend({
            isCheckCode: _isCheckCode,
            checkCode: $("#checkCode").val()
        }, args, dataObj),
        success: function (res) {
            $(".layer_black_loading").addClass("hide");
            if (res.code === 10000) {
                $("#submit, #getIdentifyingCode, .btn_toSubmit, .contractCheckBox").addClass("hide");
                appNative.back(); //调用app方法跳转回上一页；
                $("#isSigning").html("已签约");
            }
            if (res.message) {
                $("#layer_tip").html(res.message).show();
                setTimeout(function () {
                    $("#layer_tip").hide(1000);
                }, 3000);
            }
            
            //clearTimeout(T)
        }
    })
}

//倒计时
var T;

function send() {
    $("#getTime").removeClass("activeTime").prop("disabled", true);
    timeCount--;
    if (timeCount == 0) {
        $("#getTime").addClass("activeTime").prop("disabled", false).html("点击获取");
        timeCount = 61;
        clearTimeout(T);
        return null;
    }
    console.log(timeCount)
    $("#getTime").html('重新获取 ' + timeCount + "s");
    T = setTimeout("send();", 1000);
}