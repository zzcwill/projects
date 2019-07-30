var args = comn.getArgs();
var argsBopInfoId={bopInfoId:args['bopInfoId']};
var supplierName = comn.user.realname;
$("#applier").val(supplierName);
if (args["node"] === "first") {
    $("#navTab, #opinion").removeClass("hide");
    comn.ajax({
        url: interUrl.purchase.applyGet,
        data: {
            gpsApplyId: args['gpsApplyId']
        },
        success: function(res) {
            $("#batchApplyForm").values(res.data);
            $(".supplier").getSupplier(res.data.supplierId);
            //$("#productSpec").getProductSpec(res.data.supplierId, res.data.productSpec);
            $("#orgId").getSingleBranchComp();
            // $("#groupId").getGroupList(res.data.applyOrgId, res.data.groupId);
            $("#groupId").getGroupList1(res.data.groupId);
        }
    })
} else {
    $(".supplier").getSupplier();
    $("#groupId").getGroupList1()
    $("#orgId").getSingleBranchComp();
}
$(function(){
    $("#applyDate").getToday();
    // $("#orgId").getSingleBranchComp().change(function(){
    //     $("#groupId").getGroupList($(this).val())
    // });
    $(document).on("change", "#groupId", function(){
        $("#groupName").val($(this).find("option:selected").html())
    })
    //供应商更改
    $(document).on("change", "#supplierId", function(){
        var _supplierId = $(this).val();
        $("#supplierName").val($(this).find("option:selected").html());
        //$("#productSpec").getProductSpec(_supplierId)
    });
    // $(document).on("change", "#productSpec", function(){
    //     $("#productType, #productTypeId").val($(this).find("option:selected").attr("data-type"));
    // });
    //取消
    $("#cancle").click(function () {
        comn.closeTab();
    });
})
//保存
$("#btn_confirm").click(function(){
    $("#batchApplyForm").validate();
    if ($("#batchApplyForm").valid() == true) {
        comn.ajax({
            url: interUrl.purchase.gpsPreAdd,
            data: $("#batchApplyForm").values(),
            success: function(res) {
                $("#id").val(res.data);
                tip({content: "保存成功！"})
            }
        })
    }
});
//流程意见保存和流程提交
$("#btn-opinion-save").click(function () {
    $("#batchApplyForm").validate();
    if ($("#batchApplyForm").valid() == true) {
        oppSureModal("是否确认提交");
        $("#sureOption").unbind("click").click(function () {
            comn.ajax({
                url: $("#id").val() ? interUrl.purchase.gpsUpdate : interUrl.purchase.applyAdd,
                data: $("#batchApplyForm").values(),
                success: function (res) {
                    $("#id").val(res.data);
                    $("#sureModal").modal("hide");
                    //保存流程意见
                    flowSubmit(interUrl.purchase.preSubmit, interUrl.purchase.submit2next, './Modal/task/myTask/index.html', {gpsApplyId: $("#id").val() || res.data || args['loanApplyId']});
                }
            });
        })
    }
});