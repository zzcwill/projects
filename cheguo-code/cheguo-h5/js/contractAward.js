var timeCount = 61, loanTerm, args, _isCheckCode, _data;
/*
    * app传递参数：projectId,signLongitude,signLatitude
**/
var base = '/view';
args = common.getArgs();
var dataObj = {
    econtractProjectNo : '',
    identityNo : '',
    customerName : '',
    mobile : ''
}
loanTerm = function(value, row, index) {
    return [null, "12期", "18期", "24期", "36期", "48期", '60期'][value] || null;
};

$(function() {
    newCommon.Ajax({
        url: "h5econtract/verify",
        data: args,
        success: function (res) {
            _data = res.data;
            if (res.code === 20000) {
                return $("#layer_tip").html(res.code === 20000 ? res.message : "系统异常！").show();
            }
            common.Ajax({
                url: 'h5econtract/getEContractInfo',
                data: _data,
                success: function(data) {
                    console.log((data.econtractStatus))
                    if(!data){
                        return;
                    }
                    if (data.econtractStatus === 0 || data.econtractStatus === 3) { //合同状态在 0-未签订 或 3-待重审
                        $("#submit, .contractCont").addClass("hide");
                        $("#layer_tip").html("您的合同资料正在审核中，请稍后再试或联系客户经理催办审批。").show();
                        setTimeout(function(){
                            $("#layer_tip").hide(1000);
                        }, 3000);
                    } else if (data.econtractStatus === 2 || data.econtractStatus === 5) { //合同已签订：2-已签订 5-已重签
                        $("#submit, .contractCheckBox").addClass("hide");
                    }
                    //合同状态1、3 可提交验证码
                    var html = "";
                    var o = data.fileInfoList;
                    for(var i = 0; i < o.length; i++) {
                        html += (data.econtractStatus === 2 || data.econtractStatus === 5) ? "<a href='"+ base +"/pdf/pdf.html?title="+ o[i].fileName +"&fileUrl="+ o[i].url +"'>"+ o[i].fileName +"</a>" : "<a href='"+ base +"/pdf/pdfNotSignContract.html?title="+ o[i].fileName +"&contractNo="+ o[i].contractNo +"&operName="+ data.userName +"'>"+ o[i].fileName +"</a>";
                    }
                    $("#contractList").html(html);
                    /*
                    * 短信验证所需参数
                    * */
                    dataObj.econtractProjectNo = data.econtractProjectNo;
                    dataObj.customerName = data.customerName;
                    dataObj.identityNo = data.cardNo;
                    dataObj.mobile = data.mobilePhone;
                    $("#tel").attr("href", "tel:"+data.userMobile)
                    return $("#page").nameValues(data);
                }
            });
        }
    });
    $("#contractCheckBox").click(function(){
        $(".contractCheckBox").toggleClass("activeCheckbox");
        if ($(".contractCheckBox").hasClass("activeCheckbox")) {
            $(".btn_submit").addClass("activeBtn");
        } else {
            $(".btn_submit").removeClass("activeBtn");
        }
    })
    $("#btn_submit").click(function() {
        if ($(this).hasClass("activeBtn")){
            $("#checkCode").val("");
            $(".layer_black_loading").removeClass("hide");
            $("#getTime").addClass("activeTime");
            clearTimeout(T);
            getCode();
            timeCount = 60;
            $("#getTime").html(timeCount+"秒后重发");
        } else {
            return false;
        }

    });
    $(".closeIndentify").click(function() {
        $("#getIdentifyingCode").addClass("hide");
    });
    $(".btn_toSubmit").click(function() {
        $(".layer_black_loading").removeClass("hide");
        submitBtn();
    });
    $("#getTime").click(function() {
        if ($(this).hasClass("activeTime")) {
            return false
        } else {
            $("#getTime").addClass("activeTime");
            getCode();
        }
    });
});
function getCode (){
    newCommon.Ajax({
        url: 'h5econtract/getCheckCode',
        data: $.extend({checkCode: $("#checkCode").val()}, dataObj,_data),
        success: function (res) {
            if (res.code === 20000) {
                $(".errorTip").html(res.message);
            } else if (res.code === 10000) {
                _isCheckCode = res.data.isCheckCode;
                $(".layer_black_loading").addClass("hide");
                if (res.data.isCheckCode == '0') { //无需验证码直接提交
                    clearTimeout(T);
                    $("#getIdentifyingCode").addClass("hide");
                    submitBtn("1"); //为1时 直接调提交接口
                } else {
                    $("#getIdentifyingCode").removeClass("hide");
                    send(); //时间倒计时60s
                }
            }
        }
    });

}
function submitBtn(v){
    if (v != "1" && $("#checkCode").val() == "") {
        $(".layer_black_loading").addClass("hide");
        return $(".errorTip").html("验证码不能为空");
    } else {
        $(".errorTip").html("");
    }
    newCommon.Ajax({
        url: "h5econtract/sendSignContractInfo",
        data: $.extend({
            isCheckCode: _isCheckCode,
            checkCode: $("#checkCode").val()
        }, _data, dataObj),
        success: function (res) {
            $(".layer_black_loading").addClass("hide");
            if (res.code === 10000) {
                $("#submit, #getIdentifyingCode, .contractCheckBox").addClass("hide");
                if (window.cgwapp) {
                    window.cgwapp.signContractSuccess();
                }
            }
            $("#layer_tip").html(res.code === 20000 ? res.message : "您的合同已签订完成！").show();
            setTimeout(function(){
                $("#layer_tip").hide(1000);
            }, 3000);
            //clearTimeout(T)
        }
    })
}
var T;
function send(){
    timeCount--;
    if(timeCount==0) {
        $("#getTime").removeClass("activeTime").prop("disabled", false).html("获取验证码");
        timeCount = 61;
        clearTimeout(T);
        return null;
    }
    console.log(timeCount)
    $("#getTime").html(timeCount+"秒后重发");
    T = setTimeout("send();",1000);
}