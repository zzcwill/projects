var dataLoad_1, dataLoad_2, tableEvent_1, handle_1, tableEvent_2, handle_2;
var args = comn.getArgs();
dataLoad_1 = function(params) {
    return tableData(params, $("#searchForm").values(), interUrl.purchase.applyStockLIst);
};
dataLoad_2 = function(params) {
    var o = $("#searchForm").values();
    o.status = 0;
    return tableData(params, o, interUrl.purchase.applyStockLIst);
};
handle_1 = function(value, row, index) {
    var btnString = "";
    if (row.status === 5) {
        //btnString = "<li><a class='edit'>修改</a></li><li><a class='del'>删除</a></li>";
        btnString = '<button class="btn btn-primary btn-xs edit">修改</button><button class="btn btn-primary btn-xs del">删除</button>';
    } else if(row.status === 1 || row.status === 2) {
        //btnString = "<li><a class='cancle'>撤销</a></li>";
        btnString = '<button class="btn btn-primary btn-xs cancle">撤销</button>';
    } else if (row.status === 4) {
        //btnString = "<li><a class='receipt'>确认签收</a></li>";
        btnString = '<button class="btn btn-primary btn-xs receipt">确认签收</button>';
    } else {
        return "--";
    }
    return '<div class="inlineBtn">'+ btnString +'</div>';
};
tableEvent_1 = {
    "click .edit": function(e, a, item, index) {
        return comn.addTab({
            title: "GPS申请",
            href: "./Modal/stockManage/GPSBatchApply/applyGps.html?gpsApplyId="+item.id +"&node=first"
        });
    },
    "click .del": function (e, a, item, index) {
        comn.ajax({
            url: interUrl.purchase.applyGpsDel,
            data: {
                gpsApplyId: item.id
            },
            success: function (res) {
                tip({content: "删除成功！"});
                $("#table1").bootstrapTable("refresh", {url: "..."});
            }
        })
    },
    "click .cancle": function (e, a, item, index) {
        comn.ajax({
            url: interUrl.purchase.gpsClose,
            data: {
                gpsApplyId: item.id
            },
            success: function (res) {
                tip({content: "撤销成功！"});
                $("#table1").bootstrapTable("refresh", {url: "..."});
            }
        })
    },
    "click .receipt": function (e, a, item, index) {
        $("#arrived").modal("show");
        $("#btn_repairNum").attr('disabled',false);
        $("#arrivedForm").values(item);
        dataLoad_3 = function(params) {
            return tableData(params, {applyNo: item.applyNo}, interUrl.purchase.receivedGpsDetail);
        }
        comn.ajax({
            url: interUrl.purchase.receivedGpsDetailNum,
            data: {
                applyNo: item.applyNo
            },
            success: function(res){
                $("#approveAmount").val(res.data);
                $("#table1").bootstrapTable("refresh", {url: "..."});
            }
        })
        $("#table3").bootstrapTable('refresh', {url: "..."});
        $("#table3").bootstrapTable({
            "height": "300"
        });
    }
};
handle_2 = function(value, row, index) {
    return ["<button type='button' class='btn btn-xs btn-primary show'>查看详情</button>"].join("");
};
var _applyNo = "";
tableEvent_2 = {
    "click .show": function(e, a, item, index) {
        $("#divTable1").modal("show");
        _applyNo = item.applyNo;
        $("#table4").bootstrapTable("refresh", {url: "..."});
    }
};
//查看详情
dataLoad_4 = function (params) {
    if (_applyNo) {
        tableData(params,{applyNo: _applyNo}, interUrl.purchase.detail);
    }
}
$("#table4").bootstrapTable(comn.table);
$(function(){
    // $(".orgId").getSingleBranchComp().change(function(){
    //     $("#groupId").getGroupList();
    // }); //所属机构
    $("#orgId").getSingleBranchComp();
    $("#groupId").getGroupList1();
    $(".supplier").getSupplier();
    $("#isShowBtn").click(function(){
        return comn.addTab({
            title: "GPS申请",
            href: "./Modal/stockManage/GPSBatchApply/applyGps.html"
        });
    });
    //确认到货
    $("#btn_repairNum").click(function(){
        var _data = $("#table3").bootstrapTable('getData');
        comn.ajax({
            url: interUrl.purchase.receivedGps,
            data:{
                applyNo: $('#applyNo').val()
            },
            success: function(res){
                if(res.code == 40000){
                    $("#btn_repairNum").attr('disabled','disabled')
                }else{
                    $("#arrived").modal("hide");
                    tip({content: "确认到货！"})
                    $("#table2, #table1").bootstrapTable('refresh',{url:'...'});
                }

            }
        })
    });
    $(document).on("click", "", function(){
        $("#repairNum").modal("show");
    });
    $(document).on("change", "#supplierId", function(){
        var _supplierId = $(this).val();
        $("#supplierName").val($(this).find("option:selected").html());
    })
    $("#btn_confirm").click(function(){
        $("#batchApplyForm").validate();
        if ($("#batchApplyForm").valid() == true) {
            comn.ajax({
                url: interUrl.purchase.applyAdd,
                data: $("#batchApplyForm").values(),
                success: function(res) {
                    $("#batchApply").modal("hide");
                    //tip({content: "批量申请保存成功！"})
                }
            })
        }
    });
    $("#btn_approve_confirm").click(function(){
        oppSureModal("是否确认提交");
        $("#sureOption").unbind("click").click(function () {
            comn.ajax({
                url: interUrl.purchase.applyAdd,
                data: $("#batchApplyForm").values(),
                success: function (res) {
                    $("#sureModal").modal("hide");
                    //保存流程意见
                    flowSubmit(interUrl.purchase.preSubmit, interUrl.purchase.submit2next, './Modal/task/myTask/index.html', {gpsApplyId: res.data});
                }
            });
        })
    })
    $(".nav-tabs li a").click(function(){
        var id = $(this).attr("href");
        if(id === "#stockDetail") $("#isStatus").addClass("hide");
        else $("#isStatus").removeClass("hide");
    });
    return $("#btn-search").click(function() {
        var activeTab;
        activeTab = $(".tab-content").find(".tab-pane.active").attr("id");
        return $("#" + activeTab).find("table").bootstrapTable("refresh", {url: "..."});
    });
})
