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
        $("#bankId").eContractBank();      
    }else{
        orgType = 2;
        $('#bankIdName').html('合作机构：');
        $("#bankId").getTrustIdList();          
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

//新增模版跳转
$('#add').bind('click',function(){
    location.href="addTemplet.html?orgType=" +orgType;
})

$("#bankId").eContractBank();

//银行表格方法
dataLoad = function(params) {
    tableData(params, $.extend($("#searchForm").values(),{
        orgType: 1
    }), interUrl.eContract.list)
}
handle = function(value, row, index){
    return ["停用", "启用"][value] || null;
}
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
        location.href="addTemplet.html?id="+item.id+"&type=modify"+"&orgType=" +orgType;
    },
    "click .stop" : function(e, a, item, index) {
        $("#tipText").text("是否停用?");
        var content = "停用成功！";
        getGroup(item, '0', interUrl.eContract.modifyStatus, content);
    },
    "click .open" : function(e, a, item, index) {
        $("#tipText").text("确定启用?");
        var content = "启用成功！";
        getGroup(item, '1', interUrl.eContract.modifyStatus, content);
    },
    "click .del" : function(e, a, item, index) {
        $("#tipText").text("确定要删除吗?");
        var content = "删除成功！";
        getGroup(item, '2', interUrl.eContract.modifyStatus, content);
    }
};
//银行表格方法

//合作机构表格方法
dataLoad2 = function(params) {
    tableData(params, $.extend($("#searchForm").values(),{
        orgType: 2
    }), interUrl.eContract.list)
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
        location.href="addTemplet.html?id="+item.id+"&type=modify"+"&orgType=" +orgType;
    },
    "click .stop" : function(e, a, item, index) {
        $("#tipText").text("是否停用?");
        var content = "停用成功！";
        getGroup(item, '0', interUrl.eContract.modifyStatus, content);
    },
    "click .open" : function(e, a, item, index) {
        $("#tipText").text("确定启用?");
        var content = "启用成功！";
        getGroup(item, '1', interUrl.eContract.modifyStatus, content);
    },
    "click .del" : function(e, a, item, index) {
        $("#tipText").text("确定要删除吗?");
        var content = "删除成功！";
        getGroup(item, '2', interUrl.eContract.modifyStatus, content);
    }
};
//合作机构表格方法


$(document).on("change", "#bankId", function(){
    $("input[name=bankName]").val($(this).find("option:selected").html())
})

function  getGroup(o, statusVal, url, contents){
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
                return $("#btn-search2").trigger("click");
            }
        });
    })
}