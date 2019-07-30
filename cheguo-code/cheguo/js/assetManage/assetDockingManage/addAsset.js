var handle_1, dataLoad_1, tableEvent_1, handle_2, dataLoad_2, tableEvent_2, _projectId, _loanApplyId, itemArr = {}, _id;
args = comn.getArgs();
var timestamp=new Date().getTime(); //获取时间戳 - 获取到年月日时分秒
var getDate = new Date().toLocaleDateString(); //获取当前日期:年月日
var nowdate = (new Date(getDate))/1000; //把当前日期变成时间戳 - 年月日
$("#timeNum").val(timestamp); //资产方编号以时间戳来取值
$("#dealerPaymentDateMax").getToday();
function getTwoDaysAgo(nS) {
    var date = new Date(parseInt(nS) * 1000);
    y = date.getFullYear();
    m = date.getMonth() < 9 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
    d = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    return y + "-" + m + "-" + d;
}
$("#dealerPaymentDateMin").val(getTwoDaysAgo(nowdate - 24 * 30 * 60 *60));
dataLoad_1 = function(params) {
    tableData(params,$.extend($("#searchForm").values(), {coCompanyId: args["coCompanyId"]}), interUrl.mockList || interUrl.asset.addZSAssetsList);
}
handle_1 = function(value, row, index) {
    return ["<div class='btn-group btn-group-xs'>",
        "<button type='button' class='btn btn-primary dropdown-toggle' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>操作",
        "<span class='caret'></span>",
        "<span class='sr-only'>下拉切换</span>",
        "</button>",
        "<ul class='dropdown-menu' role='menu'>",
        "<li><a class='addAsset'>添加</a></li>",
        "<li><a class='info'>查看详情</a></li>",
        "</ul>", "</div>"].join("");
};
tableEvent_1 = {
    "click .info": function(e, a, item, index) {
        return comn.addTab({
            title:"查看详情",
            href: "./Modal/assetManage/assetPackageManage/assetDetail.html?loanApplyId="+item.projectId+"&coCompanyId="+ args['coCompanyId']+"&coCompanyName="+args['coCompanyName']+"&projectId="+item.projectId +"&assetsPackageId="+ args["assetsPackageId"] + "&space=ASSET_MANAGE_PACKAGE&releventFlow=LOAN_ASSETS_PACKAGE&releventFlowNode=LOAN_ASSETS_PACKAGE_VIEW_DETAILS&type=assetView"
        });
    },
    "click .addAsset": function(e, a, item, index) {
        $("#getForm").validate();
        if($("#getForm").valid() == true) {
            _projectId = item.projectId;
            _loanApplyId = item.projectId;
            _id = "";
            arrItem = dataObj(item);
            $("#btnForDocuments").addClass("hide");
            $("#sure").modal("show");
            $("#addAssetBox").children().remove();
            $("#addAssetBox").load("../../../Modal/assetManage/assetDockingManage/assetDetail.html?type=assetAdd");
            applyAsset();
        }
    }
};
dataLoad_2 = function(params) {
    tableData(params, {
        sendProxyStatus: '0',
        userId: comn.user.uid,
        batchNo: timestamp
    }, interUrl.mockList || interUrl.asset.queryAssetApplyList);
};
handle_2 = function(value, row, index) {
    return ["<div class='btn-group btn-group-xs'>",
        "<button type='button' class='btn btn-primary dropdown-toggle' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>操作",
        "<span class='caret'></span>",
        "<span class='sr-only'>下拉切换</span>",
        "</button>",
        "<ul class='dropdown-menu' role='menu'>",
        "<li><a class='delAsset'>删除</a></li>",
        "<li><a class='modifyAsset'>修改</a></li>",
        "</ul>", "</div>"].join("");
};
tableEvent_2 = {
    "click .delAsset": function(e, a, item, index) {
        comn.ajax({
            url: interUrl.asset.deleteAssetApply,
            data: {
                id: item.id,
            },
            success: function (res) {
                tip({content: '删除成功！'});
                $("#table2").bootstrapTable('refresh');
                setTimeout(function(){
                    var d = $("#table2").bootstrapTable('getData');
                    if (d.length === 0) {
                        return $("#totalAmount").val('0');
                    } else {
                        comn.ajax({
                            url: interUrl.asset.totalAmount,
                            data: {
                                batchNo: timestamp
                            },
                            success: function (res) {
                                $("#getForm").values(res)
                            }
                        });
                    }
                }, 1000)

            }
        })
    },
    "click .modifyAsset": function(e, a, item, index) {
        _projectId = item.projectId;
        _loanApplyId = item.projectId;
        _id = item.id;
        arrItem = dataObj(item);
        $("#sure").modal("show");
        $("#addAssetBox").children().remove();
        $("#addAssetBox").load("../../../Modal/assetManage/assetDockingManage/assetDetail.html?type=assetAdd");
        applyAsset();
    }
};
$(function(){
    $("#coBankId").getBankAll();
    $("#orgId").getOrg(); //机构
    $("#companyName").val(args["coCompanyName"]); //合作单位
    //资产期限
    var dataArr =[["#assetLimit", "AssetLimit"]];
    $.getCommonMethodPort(dataArr);
    $(document).on("click", ".nav-tabs li a", function(){
        $(this).attr("href") === "#document" ? $("#btnForDocuments").removeClass("hide") : $("#btnForDocuments").addClass("hide");
    });
    $(document).on("click", "#addAssetTable", function(){
        //var _d = $("#table2").bootstrapTable('getData');
        comn.ajax({
            url: interUrl.asset.sendAseetApply,
            data:{
                batchNo: timestamp
            },
            success: function(res) {
                tip({content: "确认成功！"});
                comn.closeTab();
            }
        })
    });
});
function dataObj(item){
    var data = {
        id: _id,
        projectId: item.projectId,
        projectNo: item.projectNo,
        batchNo: timestamp,
        coCompanyId: args["coCompanyId"],
        coCompanyName: args["coCompanyName"],
        customerName: item.customerName,
        cardType: item.cardType,
        cardNo: item.cardNo,
        userId: comn.user.uid,
        userName: comn.user.username,
        assetLimit: $("#assetLimit").val() //资产期限
    }
    return data;
}
function applyAsset(){
    $("#OK").unbind("click").on("click", function() {
        $("#selectedAsset").removeClass("hide");
        comn.ajax({
            url: interUrl.gr.usePicGeneratePdf,
            data: arrItem,
            success: function (res) {
                tip({content: res.message});
                $("#table2").bootstrapTable('refresh');
                $("#table").bootstrapTable('refresh');
                comn.ajax({
                    url: interUrl.asset.totalAmount,
                    data: {
                        batchNo: timestamp
                    },
                    success: function (res) {
                        $("#getForm").values(res)
                    }
                });
                $("#sure").modal("hide");
            }
        })

    });
}

$(document).on("click", "#refreshAssetTable", function () {
    $("#table2").bootstrapTable('refresh');
});
$(document).on("change", "#assetLimit", function () {
    var d = $("#table2").bootstrapTable('getData');
    if (d.length !== 0) {
        comn.ajax({
            url: interUrl.asset.updateAssetLimit,
            data: {
                batchNo: timestamp,
                assetLimit: $("#assetLimit").val()
            },
            success: function (res) {
                $("#table2").bootstrapTable('refresh');
            }
        })
    }
});