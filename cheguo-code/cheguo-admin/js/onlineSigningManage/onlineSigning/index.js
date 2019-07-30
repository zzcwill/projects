var dataLoad, tableEvent_1, handle, handle_1;
var dataLoad2, tableEvent_2, handle_2;

//区分银行和机构字段 1银行，2合作机构
var orgType = 1;
//银行选项卡事件
$('#orgTypeTab li a').bind('click',function(){  
    var index = $('#orgTypeTab li a').index($(this));
    if(index === 0){
        orgType = 1;
        $('#bankIdName').html('合作银行：');
        $('#bankIdName2').html('<span class="text-danger">*</span>合作银行：'); 
        $(".bankId").eContractBank();      
    }else{
        orgType = 2;
        $('#bankIdName').html('合作机构：');
        $('#bankIdName2').html('<span class="text-danger">*</span>合作机构：');
        $(".bankId").getTrustIdList();          
    }
})
//查询点击事件
$("#btn-search2").unbind('click').click(function() {
    if(orgType === 1){
        $("#table").bootstrapTable('refresh', {url: '...'});
    }else{
        $("#table2").bootstrapTable('refresh', {url: '...'});
    }
});

$(".bankId").eContractBank();
$(".companyBranch").getOpenEcontractbranchCompany();
var dataArr =[["#econtractBusType", "EcontractBusType"]];
$.getCommonMethodPort(dataArr);

//银行表格相关方法start
dataLoad = function(params) {
    tableData(params, $.extend($("#searchForm").values(),{
        orgType: 1
    }), interUrl.onlineSigning.list)
}
handle = function(value, row, index){
    return ["停用", "启用"][value] || null;
};
EcontractBusType = function(value, row, index) { return ['', '车价贷', '征信', '泰融', '车主贷', '易融贷','车信贷'][value]; }
handle_1 = function(value, row, index) {
    var _status = "";
    if (row.status === 0) {
        var _status = "<li><a class='open'>启用</a></li><li><a class='modify'>修改</a></li><li><a class='del'>删除</a></li>";
    } else {
        var _status = "<li><a class='stop'>停用</a></li>"
    }
    return ["<div class='btn-group btn-group-xs'>",
        "<button type='button' class='btn btn-primary dropdown-toggle' data-toggle='dropdown'>操作",
        "<span class='caret'></span>", "<span class='sr-only'>下拉切换</span>",
        "</button>", "<ul class='dropdown-menu' role='menu'>",
        _status, "</ul>", "</div>"].join("");
};
tableEvent_1 = {
    "click .modify" : function(e, a, item, index) {
        $("#whichTitle").html("模板修改");
        $("#Dialog_add_role").modal("show");
        $(".input-tip").removeClass("has-error");
        return comn.ajax({
            url: interUrl.onlineSigning.modify,
            data: {
                id: item.id
            },
            success: function(res) {
                $("#addTempletForm").values(res.data);
                $("#status1").val(res.data.status);
                setTimeout(function(){
                    $("#templateId").getTemplate(res.data.bankId, res.data.templateId);
                    $('#sealId').getSealname(res.data.orgId, res.data.companySealId);
                },300)

            }
        })
    },
    "click .stop" : function(e, a, item, index) {
        $("#tipText").text("是否停用?");
        var content = "停用成功！";
        getGroup(item, '0', interUrl.onlineSigning.modifyStatus, content);
    },
    "click .open" : function(e, a, item, index) {
        $("#tipText").text("确定启用?");
        var content = "启用成功！";
        getGroup(item, '1', interUrl.onlineSigning.modifyStatus, content);
    },
    "click .del" : function(e, a, item, index) {
        $("#tipText").text("确定要删除吗?");
        var content = "删除成功！";
        getGroup(item, '2', interUrl.onlineSigning.modifyStatus, content);
    }
};
//银行表格相关方法end


//合作机构表格相关方法start
dataLoad2 = function(params) {
    tableData(params, $.extend($("#searchForm").values(),{
        orgType: 2
    }), interUrl.onlineSigning.list)
}
handle_2 = function(value, row, index) {
    var _status = "";
    if (row.status === 0) {
        var _status = "<li><a class='open'>启用</a></li><li><a class='modify'>修改</a></li><li><a class='del'>删除</a></li>";
    } else {
        var _status = "<li><a class='stop'>停用</a></li>"
    }
    return ["<div class='btn-group btn-group-xs'>",
        "<button type='button' class='btn btn-primary dropdown-toggle' data-toggle='dropdown'>操作",
        "<span class='caret'></span>", "<span class='sr-only'>下拉切换</span>",
        "</button>", "<ul class='dropdown-menu' role='menu'>",
        _status, "</ul>", "</div>"].join("");
};
tableEvent_2 = {
    "click .modify" : function(e, a, item, index) {
        $("#whichTitle").html("模板修改");
        $("#Dialog_add_role").modal("show");
        $(".input-tip").removeClass("has-error");
        return comn.ajax({
            url: interUrl.onlineSigning.modify,
            data: {
                id: item.id
            },
            success: function(res) {
                $("#addTempletForm").values(res.data);
                $("#status1").val(res.data.status);
                setTimeout(function(){
                    $("#templateId").getTemplate(res.data.bankId, res.data.templateId);
                    $('#sealId').getSealname(res.data.orgId, res.data.companySealId);
                },300)

            }
        })
    },
    "click .stop" : function(e, a, item, index) {
        $("#tipText").text("是否停用?");
        var content = "停用成功！";
        getGroup(item, '0', interUrl.onlineSigning.modifyStatus, content);
    },
    "click .open" : function(e, a, item, index) {
        $("#tipText").text("确定启用?");
        var content = "启用成功！";
        getGroup(item, '1', interUrl.onlineSigning.modifyStatus, content);
    },
    "click .del" : function(e, a, item, index) {
        $("#tipText").text("确定要删除吗?");
        var content = "删除成功！";
        getGroup(item, '2', interUrl.onlineSigning.modifyStatus, content);
    }
};
//合作机构表格相关方法end


$("#add").click(function(){
    $("#Dialog_add_role input, #Dialog_add_role select, #Dialog_add_role textarea").val("");
    $("#Dialog_add_role textarea").html("");
    $("#whichTitle").html("模板新增");
    $(".input-tip").removeClass("has-error");
    $("#templateId").html("<option value=''>--请选择--</option>");
    return $("#Dialog_add_role").modal("show");
});
$("#bankId").unbind("change").on("change", function(){
    $("#bankName").val($(this).find("option:selected").html());
    if ($(this).val()) {
        $("#templateId").getTemplate($(this).val())
    }
});
$(document).on("change", "#orgId", function() {
    $("#orgName").val($(this).find("option:selected").html());
    var orgId = $(this).val();
    if(orgId){
        $('#sealId').getSealname(orgId);
    }
});

$(document).on("change", "#templateId", function() {
    $("#templateName").val($(this).find("option:selected").html());
})
$(document).on("change", '#sealId', function () {
    if ($(this).find("option:selected").html() === "--请选择--")  {
        return $("#sealName").val("");
    }
    $("#sealName").val($(this).find("option:selected").html());
})
function  getGroup(o, statusVal, url, contents){
    //console.log(statusVal);
    $("#sureModal").modal("show");
    $("#sureBtn").unbind("click").click(function () {
        comn.ajax({
            url: url,
            data: {
                id: o['id'],
                status: statusVal
            },
            success: function(res) {
                tip({
                    content: contents
                });
                $("#sureModal").modal("hide");

                if(orgType === 1){
                    $('#table').bootstrapTable('refresh',{url:'...'});
                }else{
                    $('#table2').bootstrapTable('refresh',{url:'...'});
                }
            }
        });
    })
}
$("#save").click(function(){
    $("#addTempletForm").validate();
    if($("#addTempletForm").valid() == true) {
        var _a = $("#addTempletForm").values();
        //传入银行还是金融类型
        _a.orgType = orgType

        var _url = $("#id").val() ? interUrl.onlineSigning.update : interUrl.onlineSigning.add;
        comn.ajax({
            url: _url,
            data: _a,
            success: function(res) {
                $("#Dialog_add_role").modal("hide");
                if(orgType === 1){
                    $('#table').bootstrapTable('refresh',{url:'...'});
                }else{
                    $('#table2').bootstrapTable('refresh',{url:'...'});
                }
            }
        })
    }
});

