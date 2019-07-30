var args;
args = comn.getArgs();
$("#flowTitle").text(args['currentNodeName']);
if (args['currentNodeKey'] === "LOWFEE_FINANCE_MANAGER") {
    $("#btn-loanReview-back span").html("退回至特批发起");
    $("#feePanel").removeClass("hide");
    comn.ajax({
        url: interUrl.lowFee.getLowFeeApproveInfo,
        data:{id:args['businessId']},
        success: function(res) {
            $("#generalHandingFee").val(res.data.generalHandingFee);
        }
    });
}
if (!args["readonly"]) {
    $("#isReadOnly").removeClass("hide");
} else {
    $("#feePanel").removeClass("hide");
    $("#financeHandingFeeDiv").removeClass("hide");
    comn.ajax({
        url: interUrl.lowFee.getLowFeeApproveInfo,
        data:{id:args['businessId']},
        success: function(res) {
            $("#generalHandingFee").val(res.data.generalHandingFee);
            $("#financeHandingFee").val(res.data.financeHandingFee);
        }
    });
}
var controlPre=true;
//审批信息
comn.ajax({
    url: interUrl.myTask.approvalInfo,
    data:loanApplyId,
    success: function(res) {
        $("#approvalInfoForm").values(res.data);
        $("#loanHandingFee").val(res.data.handingFee);
    }
});

comn.ajax({
    url: interUrl.lowFee.getLowestFee,
    data:loanApplyId,
    success: function(res) {
        $("#approveFee").val(res.data.lowestFee);
    }
});

//判断显示提交还是退回
$("input[name='conclusion']").on('click',function(){
    var checkedV=$("input[name='conclusion']:checked").val();
    if(checkedV==1){
        $("#btn-opinion-save").show();
        $("#btn-loanReview-back").hide();
    }else{
        $("#btn-opinion-save").hide();
        $("#btn-loanReview-back").show();
    }
});

//流程意见保存和流程提交
$("#btn-opinion-save").click(function () {
    $("#opinionForm").validate();
    if($("#opinionForm").valid() == true){
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
                    lowFeeFlowBack2Pre();
                }
            });
        })
    }
});

//流程退回
function lowFeeFlowBack2Pre(){
    //退回上一步
    comn.ajax({
        url: args['currentNodeKey'] === "LOWFEE_FINANCE_MANAGER" ? interUrl.lowFee.back2launch : interUrl.lowFee.back2pre,
        data: {lowfeeId: args['businessId']},
        success: function (res1) {
            tip({content: res1.message});
            comn.closeTab();
        }
    });
}

function saveOpinion(){
    $("#opinionForm").validate();
    if($("#opinionForm").valid() == true) {
        oppSureModal("是否确认提交");
        $("#sureOption").unbind("click").click(function () {
            //保存流程意见
            comn.ajax({
                url: interUrl.common.opinion,
                data: $.extend($("#opinionForm").values(), argsBopInfoId),
                success: function (res) {
                    $("#sureModal").modal("hide");
                    flowSubmit(interUrl.lowFee.preSubmit, interUrl.lowFee.submit2next, './Modal/task/myTask/index.html', {lowfeeId: args['businessId']});
                }
            });
        })
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