var args;
args = common.getArgs();
function getCredit(){
    common.Ajax({
        url: 'customer/credit/get',
        data: args,
        success: function(data) {
            var o;
            $("#info").nameValues(data);
            if (data.pBOCRequeryFlag == 1) {//人行征信重新获取接口 0不允许 1允许
                $("#reGetresult").removeClass("hide");
            }
            if (data.relavants){
                for(i = 0; i < data.relavants.length; i++) {
                    if (data.relavants[i].borrowerRelationship === '1') {
                        $("#ABS").nameValues(data.relavants[i]);
                        $("#inquryBank").html(data.inquryBank);
                        break;
                    }
                };
                $("#relavantsYNZX").append(((function(){
                    var i, len, ref, results;
                    ref = data.relavants;
                    results = [];
                    for (i = 0, len = ref.length; i < len; i++) {
                        o = ref[i];
                        if (o.borrowerRelationship == 1) {
                            results.push([
                                "<div class='am-list-box'>",
                                "<div class='am-list-item'>",
                                "<div class='am-list-label'>" + (o.borrowerRelationship == 1 && '借款人') + "</div>",
                                "<div class='am-list-content'>",
                                "<div class='am-flexbox am-ft-right'>",
                                "<div class='am-flexbox-item'>" + (o.fullName || "") + "</div>",
                                "<div class='am-flexbox-item'>" + checkResult(o.absResult) + "</div>",
                                "</div>",
                                "</div>",
                                "</div>",
                                "</div>"
                            ].join(""));
                            break;
                        }
                    }
                    return results;
                })()).join(""));
                return $("#relavants").append(((function() {
                    var i, len, ref, results;
                    ref = data.relavants;
                    results = [];
                    for (i = 0, len = ref.length; i < len; i++) {
                        o = ref[i];
                        results.push([
                            "<div class='am-list-box'>",
                            "<div class='am-list-item infoSwitch'>",
                            "<div class='am-list-label'>" + ((o.borrowerRelationship == 1 && '借款人') || (o.borrowerRelationship == 2 && '共同还款人') || (o.guaranteeRelationship == 1 && '担保人') || (o.guaranteeRelationship == 2 && '反担保人')) + "</div>",
                            "<div class='am-list-content'>",
                            "<div class='am-flexbox am-ft-right'>",
                            "<div class='am-flexbox-item'>" + (o.fullName || "") + "</div>",
                            "<div class='am-flexbox-item'>" + ((o.creditResult && o.creditResult === 4) ? '无效' : checkResult(o.checkResult)) + "</div>",
                            "</div>",
                            "</div>",
                            "<div class='am-list-arrow'><div class='am-icon' am-mode='arrow-vertical'></div></div>",
                            "</div>",
                            "<div class='info fn-hide'>",
                            "<div class='am-list-item'>",
                            "<div class='am-list-title'>手机号码</div>",
                            "<div data-name='staffName' class='am-list-extra'>"+ (o.mobile || "") +"</div>",
                            "</div>",
                            "<div class='am-list-item' style='flex-direction: column'>",
                            "<div class='am-title'>征信内容描述</div>",
                            "<div class='am-artical'>"+ (o.creditRemark || "") +"</div>",
                            "</div>",
                            "<div class='am-ft-sm-creit'>",
                            "<div class='am-list-item'>",
                            "<div class='am-list-title'>有无信贷</div>",
                            "<div class='am-list-extra'>"+ loanRepayment(o.loanRepayment)+"</div>",
                            "</div></div>",
                            "</div>",
                            "</div>"
                        ].join(""));
                    }
                    return results;
                })()).join(""));
            }
            
        }
    });
}
$(function() {
    getCredit();
    $("#page").on("click", ".infoSwitch", function() {
        var _attr;
        _attr = $(this).find(".am-icon").attr("am-mode");
        $(".am-icon").attr("am-mode", "arrow-vertical");
        if (_attr === "arrow-vertical") {
            $(this).find(".am-icon").attr("am-mode", "arrow-vertical up");
        } else {
            $(this).find(".am-icon").attr("am-mode", "arrow-vertical");
        }
        return $(this).find(".am-icon").parents(".am-list-item").next(".info").toggleClass("fn-hide").siblings(".info").addClass("fn-hide");
    });
    $("#tab li").click(function(){
        $(this).addClass("active").siblings().removeClass("active");
        if ($(this).children("a").attr("class") === "ABS") {
            $("#ABS").removeClass("hide");
            $("#peopleBankCredit").addClass("hide");
        } else {
            $("#ABS").addClass("hide");
            $("#peopleBankCredit").removeClass("hide");
        }
    });
    $("#reGetresult").click(function(){
        $(".layer_black_loading").removeClass("hide");
        newCommon.Ajax({
            url: "yntrustCredit/doPBOCCreditRequery",
            data: {
                creditId: args["id"]
            },
            success: function (res) {
                $(".layer_black_loading").addClass("hide");
                if (res.code === 10000) {
                    $("#reGetresult").addClass("hide");
                    $(".am-alert").html(res.data || "人行征信查询申请已重发，请稍等！").show();
                } else {
                    $(".am-alert").html(res.message || "请求错误！").show();
                }
                setTimeout(function () {
                    $(".am-alert").hide();
                }, 3000);
            }
        })
    })
});
function loanRepayment(value){
    if (value == "1") {
        return "有"
    } else if (value == "0") {
        return "无"
    } else {
        return ""
    }
};
function checkResult(value) {
    return ["", "通过", "不通过"][value] || "";
}
function maritalStatus(value) {
    return ["未婚", "已婚", "不明确", "离婚"][value] || "";
}