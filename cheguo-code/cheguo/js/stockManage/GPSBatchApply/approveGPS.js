var args = comn.getArgs();
var argsBopInfoId={bopInfoId:args['bopInfoId']};
var loanApplyId = {gpsApplyId: args['loanApplyId']};
//已办任务查看详情时
if(args['readonly']=='true'){
    $(" #opinionForm, #saveBtn, #btn_all").remove(); //去掉流程操作按钮和流程意见
    $("#searchForm fieldset, #opinionForm fieldset").prop("disabled", "disabled");
}
comn.ajax({
    url: interUrl.purchase.applyGet,
    data: {
        gpsApplyId: args['gpsApplyId']
    },
    success: function(res) {
        //$("#approveAmount").val(res.data.approveAmount || res.data.applyAmount);
        $("#searchForm").values(res.data);
        comn.ajax({
            url: interUrl.purchase.gpsCount,
            data: {
                groupId: res.data.groupId
            },
            success: function(res) {
                $("#stockCount").val(res.data.stockCount);
                // $("#installCount").val(res.data.installCount);
                // if ($('#installCount').val() === "0") {
                //     $("#applyRatio, #approveAmountCount").val(0);
                // } else {
                //     $("#applyRatio").val(comn.accDiv(comn.accAdd($("#applyAmount").val(), $("#stockCount").val()), $('#installCount').val()).toFixed(2));
                //     $("#approveAmountCount").val(comn.accDiv(comn.accAdd($("#approveAmount").val(), $("#stockCount").val()), $('#installCount').val()).toFixed(2));
                // }
            }
        })
    }
})
$(function(){
    // $(document).on("keyup", "#approveAmount", function () {
    //     if ($('#installCount').val() === "0") {
    //         $("#approveAmountCount").val(0);
    //     } else {
    //         $("#approveAmountCount").val(comn.accDiv(comn.accAdd($(this).val(), $("#stockCount").val()), $('#installCount').val()).toFixed(2));
    //     }
    //
    // });
    //判断显示提交还是退回
    // $("input[name='conclusion']").on('click',function(){
    //     var checkedV=$("input[name='conclusion']:checked").val();
    //     console.log(checkedV)
    //     if(checkedV==1){
    //         $("#btn-opinion-save").show();
    //         $("#btn-loanReview-back").hide();
    //     }else{
    //         $("#btn-opinion-save").hide();
    //         $("#btn-loanReview-back").show();
    //     }
    // });
    //保存
    // $("#btn-save").click(function(){
    //     comn.ajax({
    //         url: interUrl.purchase.applySave,
    //         data: {
    //             id: $("#id").val()
    //         },
    //         success: function (res) {
    //             $("#sureModal").modal("hide");
    //             tip({
    //                 content: "保存成功！"
    //             });
    //         }
    //     });
    // })
    //流程意见保存和流程提交
    $("#btn-opinion-save").click(function () {
        oppSureModal("是否确认提交");
        $("#sureOption").unbind("click").click(function () {
            comn.ajax({
                url: interUrl.purchase.applySave,
                data:$("#searchForm").values(),
                success: function (res) {
                    $("#sureModal").modal("hide");
                    flowSubmit(interUrl.purchase.preSubmit, interUrl.purchase.submit2next, './Modal/task/myTask/index.html', loanApplyId);
                    //保存流程意见
                    // comn.ajax({
                    //     url: interUrl.common.opinion,
                    //     data: $.extend($("#opinionForm").values(), argsBopInfoId , {conclusion: 1}),
                    //     success: function (res) {
                    //         flowSubmit(interUrl.purchase.preSubmit, interUrl.purchase.submit2next, './Modal/task/myTask/index.html', loanApplyId);
                    //     }
                    // });
                }
            });
        })

    });

//退回上一步
//     $("#btn-loanReview-back").click(function () {
//         $("#opinionForm").validate();
//         if($("#opinionForm").valid() == true) {
//             oppSureModal("是否确认退回");
//             $("#sureOption").unbind("click").click(function () {
//                 //保存流程意见
//                 comn.ajax({
//                     url: interUrl.common.opinion,
//                     data: $.extend($("#opinionForm").values(), argsBopInfoId, {conclusion: 0}),
//                     success: function (res) {
//                         $("#sureModal").modal("hide");
//                         comn.ajax({
//                             url: interUrl.purchase.back2pre,
//                             data: loanApplyId,
//                             success: function (res1) {
//                                 tip({content: res1.message});
//                                 comn.closeTab();
//                             }
//                         });
//                     }
//                 });
//             })
//         }
//     });
    //不通过
    $("#btn-closeLoan").click(function () {
        comn.ajax({
            url: interUrl.purchase.gpsReject,
            data:$("#searchForm").values(),
            success: function (res) {
                comn.closeTab();
            }
        })
    });
    //取消
    $("#cancle").click(function () {
        comn.closeTab();
    });
    //opinionForm单独保存
    // $("#saveBtn").click(function(){
    //     oppSureModal("是否确认保存");
    //     $("#sureOption").unbind("click").click(function () {
    //         //保存流程意见
    //         comn.ajax({
    //             url: interUrl.common.opinionOnly,
    //             data: $.extend($("#opinionForm").values(), argsBopInfoId),
    //             success: function (res) {
    //                 $("#sureModal").modal("hide");
    //                 tip({
    //                     content: "保存成功！"
    //                 });
    //             }
    //         });
    //     });
    // });
})