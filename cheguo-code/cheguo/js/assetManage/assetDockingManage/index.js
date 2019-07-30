var handle_1, dataLoad_1, tableEvent,  _projectId, _loanApplyId, args = comn.getArgs(), _argsType = '', _coCompanyId, _assetsPackageId;
dataLoad_1 = function(params) {
    tableData(params,$("#searchForm").values(), interUrl.asset.queryAssetApplyList);
}
handle_1 = function(value, row, index) {
    var submitString = "";
    if (row.assetApplyStatus === 0 || row.assetApplyStatus === 1 || (row.sendProxyStatus === 0 && row.assetApplyStatus === 2)) {
        submitString = "<li><a class='reSubmit'>重新提交</a></li><li><a class='del'>删除</a></li>";
    } else {
        submitString = "<li><a class='updataStatus'>更新状态</a></li>";
    }
    return ["<div class='btn-group btn-group-xs'>",
        "<button type='button' class='btn btn-primary dropdown-toggle' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>操作",
        "<span class='caret'></span>",
        "<span class='sr-only'>下拉切换</span>",
        "</button>",
        "<ul class='dropdown-menu' role='menu'>",
        "<li><a class='info'>查看详情</a></li>",
        submitString,
        "</ul>", "</div>"].join("");
};

tableEvent = {
    "click .info": function(e, a, item, index) {
        _argsType = '';
        return comn.addTab({
            title:"查看详情",
            href: "./Modal/assetManage/assetPackageManage/assetDetail.html?loanApplyId="+item.projectId+"&projectId="+item.projectId +"&assetsPackageId="+ item.id + "&space=ASSET_MANAGE_PACKAGE&releventFlow=LOAN_ASSETS_PACKAGE&releventFlowNode=LOAN_ASSETS_PACKAGE_VIEW_DETAILS&type=assetView&coCompanyId="+ item.coCompanyId +"&coCompanyName="+ item.coCompanyName
        });
    },
    "click .reSubmit": function(e, a, item, index) {
        _projectId = item.projectId;
        _loanApplyId = item.projectId;
        _argsType = 'assetAdd';
        _coCompanyId = item.coCompanyId;
        _assetsPackageId = item.assetsPackageId;
        $("#sureLayer").modal("show");
        $("#addAssetBox").children().remove();
        $("#addAssetBox").load("../../../Modal/assetManage/assetDockingManage/assetDetail.html?type=assetAdd");
        $("#y_btn").unbind("click").on("click", function() {
            comn.ajax({
                url: interUrl.gr.usePicGeneratePdf,
                data: {
                    id: item.id,
                    projectId: item.projectId,
                    projectNo: item.projectNo,
                    batchNo: item.batchNo,
                    coCompanyId: item.coCompanyId,
                    coCompanyName: item.coCompanyName,
                    customerName: item.customerName,
                    cardType: item.cardType,
                    cardNo: item.cardNo,
                    userId: comn.user.uid,
                    userName: comn.user.username,
                    assetLimit: item.assetLimit
                },
                success: function (res) {
                    return comn.ajax({
                        url: interUrl.asset.resendAseetApplySingle,
                        data: {
                            projectId: item.projectId,
                            coCompanyId: item.coCompanyId
                        },
                        success: function(res) {
                            tip({
                                content: "重新提交成功!!"
                            });
                            $("#table").bootstrapTable('refresh');
                            $("#sureLayer").modal("hide");
                        }
                    });
                }
            })
        })
    },
    "click .del": function(e, a, item, index) {
        _argsType = '';
        $("#tipText h3").html("确定删除？");
        $("#sure").modal("show");
        $("#OK").unbind("click").on("click", function() {
            comn.ajax({
                url: interUrl.asset.deleteAssetApply,
                data: {
                    id : item.id
                },
                success: function (res) {
                    tip({content: "删除成功！"});
                    $("#sure").modal("hide");
                    $("#table").bootstrapTable('refresh');
                    $("#tipText h3").html("");
                }
            })
        });
    },
    "click .updataStatus": function (e, a, item, index) {
        _argsType = '';
        comn.ajax({
            url: interUrl.asset.updataAssetApply,
            data: {
                projectId : item.projectId,
                coCompanyId: item.coCompanyId
            },
            success: function (res) {
                $("#table").bootstrapTable('updateRow', {index: index, row: res.data});
            }
        })
    }
};

$(function(){
    $("#coBankId").getBankAll(); //合作银行
    $("#orgId").getOrg(); //机构
    $("#coCompanyId").getCooperationUnit(); //合作单位
    $(document).on("click", ".nav-tabs li a", function(){
        $(this).attr("href") === "#document" ? $("#btnForDocuments").removeClass("hide") : $("#btnForDocuments").addClass("hide");
    });
    $("#add").click(function(){
        return comn.addTab({
            title:"添加资产",
            href: "./Modal/assetManage/assetDockingManage/addAsset.html?type=assetAdd&assetsPackageId="+$("#coCompanyId").val()+"&coCompanyId="+$("#coCompanyId").val()+"&coCompanyName="+$("#coCompanyId").find('option:selected').text() //assetsPackageId为资产方Id
        });
    });
    $(document).on("change", "#coCompanyId", function(){
        ($(this).val() === "9" || $(this).val() === "6") ? $("#add").removeClass("hide") : $("#add").addClass("hide");
    })
});