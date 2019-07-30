var setButtonStatus, g_isModify = false, returnStatus, tableEvent_1, tableEvent_2, handle_1, handle_2;
//修改表格统一配置参数
var tableConfig = {};
$.map(comn.table, function (v, k) {
    tableConfig[k] = v;
});
tableConfig['height'] = "300";
tableConfig['pagination'] = false;

var tableConfig1 = {};
$.map(comn.table, function (v, k) {
    tableConfig1[k] = v;
});
//tableConfig1['height'] = "400";
//tableConfig1['pagination'] = false;
var _dataSupp = {
    entryTimeStart : $("#entryTimeStart").val(),
    entryTimeEnd: $("#entryTimeEnd").val()
};
dataLoad_1 = function(params) {
    return tableData(params, $.extend($("#searchForm").values(),{stockStatusCompany: 1}), interUrl.purchase.list); //未确认
};
dataLoad_2 = function(params) {
    return tableData(params, $.extend($("#searchForm").values(),{stockStatusCompany: 2}), interUrl.purchase.list); //已确认
};
//返修单号
dataLoad_5 = function(params) {
    tableData(params, {
        orgId: $('#orgIdNum').val(),
        orgName: $("#orgNameNum").val(),
        groupId: $("#groupId").val(),
        imei: $('#imeiNum').val(),
        entryTimeStart: $("#entryTimeStartNum").val(),
        entryTimeEnd: $("#entryTimeEndNum").val()

    }, interUrl.purchase.repairNum);
};

//$("#table1, #table2").bootstrapTable('refresh');
tableEvent_1 = {
    "click .del": function(e, a, item, index) {
        oppSureModal("是否确认提交");
        $("#sureOption").unbind("click").click(function () {
            //提交时先保存流程意见
            comn.ajax({
                url: interUrl.purchase.del,
                data: {
                    orgId: item.orgId,
                    supplierId: item.supplierId,
                    stockNo: item.stockNo,
                    stockStatusCompany: 2
                },
                success: function(res) {
                    $("#sureModal").modal("hide");
                    tip({ content: "删除成功"});
                    $("#table1").bootstrapTable('refresh');
                }
            })
        })
    },
    "click .showBtn":  function (e, a, item, index) {
        $("#divTable1").modal("show");
        dataLoad_4 = function(params) {
            tableData(params, $.extend(_dataSupp,{stockStatusCompany: item.stockStatusCompany, stockNo: item.stockNo}), interUrl.purchase.confirmStockDetail);
        };
        $("#table4").bootstrapTable("destroy").bootstrapTable(comn.table);
        if ($(this).html() === "确认入库") {
            $("#stockNoVal").val(item.stockNo);
            $("#isShowBtn").removeClass("hide");
        } else {
            $("#stockNoVal").val("");
            $("#isShowBtn").addClass("hide");
        }
    }
};

handle_1 = function(value, row, index) {
    return '<div class="inlineBtn"><button class="btn btn-primary btn-xs showBtn">确认入库</button><button class="btn btn-primary btn-xs showBtn">查看详情</button><button class="btn btn-primary btn-xs del">删除</button></div>'
};

handle_2 = function(value, row, index) {
    return ["<button type='button' class='btn btn-xs btn-primary showBtn'>查看详情</button>"].join("");
};

handle_3 = function(value, row, index) {
    return ["<button type='button' class='btn btn-xs btn-primary editSupp'>编辑</button>"].join("");
};
tableEvent_3 = {
    "click .editSupp": function(e, a, item, index) {
        $("#index").val(index);
        $("#addPurForm").values(item);
        g_isModify = true;
        setButtonStatus();
        $("#productSpec").getProductSpec(item.supplierId,'',item.productSpec)
    }
};

tableEvent_5 = {
    "click .choose": function (e, a, item, index) {
        $("#repairNum").modal("hide");
        $('#addList').attr('disabled','disabled');
        $("#productSpec").getProductSpec(item.supplierId,'',item.productSpec);
        $('#addPurForm').values(item);
        $('#suppId').val('');
    }
};

handle_5 = function (value, row, index) {
    return ["<a class='choose' href='javascript:;'>选择</a>"].join("");
};
//$("#table3").bootstrapTable(tableConfig);
//$("#table_5").bootstrapTable(tableConfig1);

$(function(){
    $(".orgIdSelect").getBranchOrg(); //所属机构
    $(".changeOrgId").change(function(){
        $(this).parents("form").find("input[name=orgName]").val($(this).find("option:selected").html())
    });
    $(".supplier").getSupplier();
    $("#importData").on("click", function(){
        resetErrorStype();
        $("#importPurchaseStock").modal("show");
        $(".clearVal").val("");
        $("#setLoanSure").prop("disabled", false);
    })
    $("#repairNum").on("shown.bs.modal", function(){
        $('#table_3').bootstrapTable(comn.table);
    });
    $("#modify").click(function(){
        g_isModify = g_isModify ? false : true;
        setButtonStatus();
    });
    $("#saveSupply").click(function(){
        if($("#addPurForm").valid() == false) return;
        saveSupply($("#addPurForm"));
    });
    //新增入库
    $("#addPur").on("shown.bs.modal", function(){
        $("#table3").bootstrapTable("destroy").bootstrapTable(tableConfig);
    });
    $("#addPurch").on("click", function(){
        resetErrorStype();
        $("#addPur").modal("show");
        $('#addList').removeAttr('disabled');
        $("#addPurForm input").val("");
        $("#isReturn").addClass("hide");
    });
    $(document).on("click", "#repairNumTable", function(){
        $("#repairNum").modal("show");
        $("#repairNumForm input, #repairNumForm select").val("");
        $("#table_5").bootstrapTable(tableConfig1);
        //$("#table_5").bootstrapTable('refresh',{url:'...'});
    })
    $(document).on("click", "#btnSearchRepairNum", function(){
        $("#table_5").bootstrapTable('refresh');
    });
    $(document).on("change", "#orgIdNo", function(){
        $("#orgNameNum").val($(this).find("option:selected").html());
        //$("#groupId").getGroupList($(this).val());
    });
    //确认入库
    $("#yesPurch").click(function(){
        comn.ajax({
            url: interUrl.purchase.confirmStock,
            data: {
                stockNo: $("#stockNoVal").val(),
                stockStatusCompany: 1
            },
            success: function(res) {
                $("#table1").bootstrapTable('refresh');
                $("#table2").bootstrapTable('refresh');
                $("#divTable1").modal("hide");
            }
        })
    });
    $(".nav-tabs li a").click(function(){
        var id = $(this).attr("href");
        if(id === "#alloted") $("#yesPurch").addClass("hide");
        else $("#yesPurch").removeClass("hide");
        //$("#table4").bootstrapTable("destroy");
    });
    $(document).on("click", "#frameSearch", function(){
        $("#repairNum").modal("show");
    });
    $(document).on("change", "#stockType", function(){
        $("#refundNo").val('');
        $('#addList').removeAttr('disabled');
        if ($(this).val() == "2"){
            $("#isReturn").removeClass("hide");
            $("#refundNo").prop("disabled", false);
        } else {
            $("#isReturn").addClass("hide");
            $("#refundNo").prop("disabled", "disabled")
        }
    });
    //供应商更改
    $(document).on("change", "#supplierId", function(){
        var _supplierId = $(this).val();
        $("#supplierName").val($(this).find("option:selected").html());
        $("#productSpec").getProductSpec(_supplierId)
    });
    //导入--供应商更改
    $(document).on("change", "#supplierImportId", function(){
        $("#supplierImportName").val($(this).find("option:selected").html());
    });
    //$(document).on("change", "#orgId1", function(){
    //    if($(this).val()){
    //        $("#groupId").getGroupList($(this).val());
    //    }
    //});
    $(document).on("change", "#productSpec", function(){
        $("#productTypeName").val(gpsType($(this).find("option:selected").attr("data-type")));
        $("#productType, #productTypeId").val($(this).find("option:selected").attr("data-type"));
    });
    $(document).on("click", "#btn_closed", function(){
        $("#table1").bootstrapTable('refresh');
    });
    //导入框值更改则放开确定上传按钮
    $("#importForm select, #importForm input").change(function(){
        $("#setLoanSure").prop("disabled", false);
    });
    return $("#btn-search").click(function() {
        var activeTab;
        activeTab = $(".tab-content").find(".tab-pane.active").attr("id");
        return $("#" + activeTab).find("table").bootstrapTable("refresh", {url: "..."});
    });
});

function resetErrorStype() {
    $(".error").remove();
    $(".has-error").removeClass("has-error");
}
//保存/更新新增采购
saveSupply = function(_form, _callback){
    var _data = _form.values();
    var _url = _data.id ? interUrl.purchase.update : interUrl.purchase.add;
    return comn.ajax({
        url: _url,
        data: _data,
        success: function(res) {
            if(res.code == 10000){
                if(_callback) _callback();
                if (_data.id){
                    $("#table3").bootstrapTable('updateRow', {index: $("#index").val(), row: res.data})
                } else {
                    $("#table3").bootstrapTable('append', res.data);
                }
                g_isModify = false;
                setButtonStatus();
                $("#addPurForm input, #addPurForm select, #addPurForm textarea").val("");
            }else{
                tip({content: res.message});
            }
        }
    });
}
setButtonStatus = function(){
    var span = $('#modify').find("span:last");
    if(g_isModify==true){
        span.html("&nbsp;取消&nbsp;");
        $("#addPurForm").find(":input");
        //$("#addPurForm").find("#parentOrg");
        $("#addPurForm").find("#saveSupply").show();
    }else{
        span.html("&nbsp;新增&nbsp;");
        $("#addPurForm").find(":input").not(":button");
        $("#addPurForm").find("#saveSupply").hide();
    }
}
var tableConfig2 = {};
$.map(comn.table, function (v, k) {
    tableConfig2[k] = v;
});
tableConfig2['height'] = "500";
tableConfig2['pagination'] = false;
$("#table6").bootstrapTable(tableConfig2);
//上传导入 和导出
// 上传方法
function upload(){
    return $.ajaxFileUpload({
        url: interUrl.basic + interUrl.purchase.uploadExcel,
        secureuri: false,
        fileElementId: 'upFileInput',
        dataType: "json",
        data:  $("#importForm").values(),
        success: function(data, status) {
            if(data.code == 10000) {
                if(data.message) {
                    $("#importPurchaseStock").modal("hide");
                    return tip({content: data.message});
                };
                if(data.data) {
                    $("#unSuccess").modal("show");
                    $("#table6").bootstrapTable("append", data.data);
                    setTimeout(function(){$("#table6").bootstrapTable('resetView');}, 300);
                }
            }
            if(data.code == 20000) {
                return tip({content: data.message});
            }
            if (data.code == 30000) {
                return tip({content: data.message});
            }
        },
        complete: function() {},
        error: function(data, status, e) {
            return tip({content: "执行失败！"});
        }
    });


}

// 上传按钮改变时触发upload方法
$('#upFileInput').on('change', function() {
    if ($('input[type="file"]').val() != "") {
        var extend = $('input[type="file"]').val().substr($('input[type="file"]').val().lastIndexOf(".") + 1);
        var _this = $(this);
        var fileArr;
        fileArr = this.files;
        if ("xls|xlsx".indexOf(extend) == -1) {
            flagPic = false;
            layer.msg("选择的文件必须是EXCEL文件,请确认！");
        } else {
            return $("#fileName").val(fileArr[0].name);
        }
    } else {
        layer.msg("请选EXCEL文件");
    }
});
$("#setLoanSure").click(function(){
    if($("#fileName").val() == "") {
        return tip({content: "请选择导入文件！"});
    }
    if($("#importForm").valid() == false){
        return;
    }
    $("#setLoanSure").prop("disabled", "disabled");
    upload();
    $("#upFileInput").replaceWith($("#upFileInput").clone(true));
})
// 数据导入
$("#importFile").click(function() {
    $("#upFileInput").trigger("click");
});

$("#downloadTem").click(function(){
    var downLink = interUrl.basic + interUrl.purchase.downloadExcel;
    window.open(downLink, "_blank");
})