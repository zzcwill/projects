var args, loanApplyId, argsBopInfoId;
args = comn.getArgs(); //getArgs
loanApplyId = {loanApplyId: args['loanApplyId']};
argsBopInfoId={bopInfoId:args['bopInfoId']};
//审批信息
function getApprovalInfo2(){
    comn.ajax({
        url: interUrl.myTask.approvalInfo,
        data: loanApplyId,
        success: function(res) {
            $("#approvalInfoForm").values(res.data);
            var dataArr =[["#econtractStatus", "EcontractStatus", res.data.econtractStatus]];
            $.getCommonMethodPort(dataArr);            
        }
    });
}
getApprovalInfo2();
//意见结论
$(function(){
    $("input[name='conclusion']").on('click', function () {
        var v = $("input[name='conclusion']:checked").val();
        if (v === "1") {
            $("#btn-opinion-save").removeClass("hide");
            $(".noConclusion").addClass("hide");
        } else {
            $("#btn-opinion-save").addClass("hide");
            $(".noConclusion").removeClass("hide");
        }
    });
    comn.ajax({
        url: interUrl.myTask.isReg,
        data: {
            loanApplyId: args['loanApplyId']
        },
        success: function(res) {
            if (res.data){
                var html = "";
                var item = res.data;
                var len = item.length;
                for (i = 0; i < len; i++) {
                    var color = item[i].hasError ? "b3b3b3" : (item[i].cheguoRegisterStatus ? "3bc995" : "ff5d5d");
                    var icon = (item[i].hasError && "glyphicon-question-sign") || (item[i].cheguoRegisterStatus && "glyphicon-ok-sign") || "glyphicon-remove-sign";
                    html += [
                        "<tr>",
                        "<td>"+ item[i].name +"</td>",
                        "<td>"+ item[i].phone +"</td>",
                        "<td>"+ item[i].relationship +"</td>",
                        "<td id='isUser'>"+ '<span class="glyphicon '+ icon +'" aria-hidden="true" style="color:#'+ color +'; font-size:20px;"></span>' +"</td>",
                        "</tr>"
                    ].join("");
                }
                $("#table_isReg tbody").append(html);
            }
        }
    });
})

//流程部分Begin
//流程意见保存和流程提交
$("#btn-opinion-save").click(function () {
    $("#opinionForm").validate();
    if($("#opinionForm").valid() == true){
        oppSureModal("是否确认提交");
        $("#sureOption").unbind("click").click(function () {
            //保存流程意见
            comn.ajax({
                url: interUrl.common.opinion,
                data: $.extend($("#opinionForm").values(), argsBopInfoId),
                success: function (res) {
                    $("#sureModal").modal("hide");
                    flowSubmit(interUrl.ownersStaging.preSubmit, interUrl.ownersStaging.submit2next, './Modal/task/myTask/index.html', loanApplyId);
                }
            });
        })
    }
});

//退回上一步
$("#btn-loanReview-back").click(function () {
    $("#opinionForm").validate();
    if($("#opinionForm").valid() == true) {
        oppSureModal("是否确认退回");
        $("#sureOption").unbind("click").click(function () {
            //保存流程意见
            comn.ajax({
                url: interUrl.common.opinion,
                data: $.extend($("#opinionForm").values(), argsBopInfoId),
                success: function (res) {
                    $("#sureModal").modal("hide");
                    //退回上一步
                    comn.ajax({
                        url: interUrl.ownersStaging.back2pre,
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

//关闭贷款
$("#btn-close-loan").click(function(){
    $("#opinionForm").validate();
    if($("#opinionForm").valid() == true) {
        oppSureModal("是否确认退回融通");
        $("#sureOption").unbind("click").click(function () {
            $("#sureModal").modal("hide");
            comn.ajax({
                url: interUrl.ownersStaging.closeLoanApply,
                data: loanApplyId,
                success: function (res) {
                    tip({content: res.message});
                    comn.closeTab();
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