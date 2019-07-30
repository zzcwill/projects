var dataLoad, tableEvent_1, handle, handle_1;

//获取开放银行列表
$("#headBankCode").getOpenBanklist();
$("#headBankCode2").getOpenBanklist();


$("#province_1").getProvince();
//省市相关change事件
$("#province_1").unbind('change').on('change',function() {
    var v = $(this).val();
    if (v) {
      $("#addrProvinceName_1").val($(this).find('option:selected').text());
      $("#city_1").getCity(v);
    }
});
$("#city_1").unbind('change').on('change',function() {
    $("#addrCityName_1").val($(this).find('option:selected').text());
});


//表格获取数据
dataLoad = function (params) {
    tableData(params, $("#searchForm").values(), interUrl.branchData.cooperationSelectBranchBankByCondition)
}

//表格-支行状态过滤器
handle = function (value, row, index) {
    return ["停用", "启用"][value] || null;
};

handle_1 = function (value, row, index) {
    var _status = "";
    if (row.isInuse === 0) {
        var _status = "<li><a class='open'>启用</a></li><li><a class='modify'>修改</a></li>";
    } else {
        var _status = "<li><a class='stop'>停用</a></li>"
    }
    return ["<div class='btn-group btn-group-xs'>",
        "<button type='button' class='btn btn-primary dropdown-toggle' data-toggle='dropdown'>操作",
        "<span class='caret'></span>", "<span class='sr-only'>下拉切换</span>",
        "</button>", "<ul class='dropdown-menu' role='menu'>",
        _status, "</ul>", "</div>"
    ].join("");
};
tableEvent_1 = {
    "click .modify": function (e, a, item, index) {
        $("#whichTitle").html("支行修改");
        $("#Dialog_add_role").modal("show");

        console.log(item)
        $("#addTempletForm").values(item);
    },
    "click .stop": function (e, a, item, index) {
        $("#tipText").text("是否停用?");
        var content = "停用成功";
        getGroup(item, 0, content);
    },
    "click .open": function (e, a, item, index) {
        $("#tipText").text("确定启用?");
        var content = "启用成功！";
        getGroup(item, 1, content);
    }
};

//新增支行
$("#add").click(function () {
    $("#Dialog_add_role input, #Dialog_add_role select").val("");
    $("#whichTitle").html("支行新增");
    
    $("#Dialog_add_role").modal("show");
});

//表格操作-启用停用支行方法
function getGroup(o, statusVal, contents) {
    $("#sureModal").modal("show");
    $("#sureBtn").unbind("click").click(function () {
        comn.ajax({
            url: interUrl.branchData.cooperationUpdateAndSaveBranchBank,
            data: {
                id: o['id'],
                isInuse: statusVal
            },
            success: function (res) {
                tip({
                    content: contents
                });
                $("#sureModal").modal("hide");
                $("#table").bootstrapTable("refresh");
            }
        });
    })
}


//新增支行弹窗-保存
$("#save").click(function () {
    $("#addTempletForm").validate();
    if ($("#addTempletForm").valid() == true) {
        var _a = $("#addTempletForm").values();
        comn.ajax({
            url: interUrl.branchData.cooperationUpdateAndSaveBranchBank,
            data:_a,
            success: function (res) {
                $("#Dialog_add_role").modal("hide");
                $("#table").bootstrapTable("refresh");
            }
        });
    }
});