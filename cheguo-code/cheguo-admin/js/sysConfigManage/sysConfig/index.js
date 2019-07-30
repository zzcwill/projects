var args = comn.getArgs();
var dataLoad_1, handle, tableEvent;
dataLoad_1 = function(params) {
    var o = $("#getPageData").values();
    tableData(params, o, interUrl.sysConfig.list)
};
tableEvent = {
    "click .modify": function(e, a, item, index) {
        return comn.addTab({
            title: "系统配置修改",
            href:"./Modal/sysConfigManage/sysConfig/addSysConfig.html?type=modify&id="+item.id
        });
    },
    "click .delete": function(e, a, item, index) {
        $("#sure").modal("show");
        return $("#OK").unbind("click").on("click", function() {
            comn.ajax({
                url: interUrl.sysConfig.delete,
                data: {
                    id: item.id
                },
                success: function(res) {
                    tip({content: "删除成功！"})
                    $("#sure").modal("hide");
                    $('#table').bootstrapTable('refresh',{url:'...'});
                }
            })
        })
    }
};
handle = function(value, row, index) {
    return '<button type="button" class="btn btn-primary btn-xs modify" modal="enter"><span>&nbsp;修改&nbsp;</span></button>'+
        '&nbsp;&nbsp;<button type="button" class="btn btn-primary btn-xs delete" modal="enter"><span>&nbsp;删除&nbsp;</span></button>';
};
$(document).on("click", "#addsysConfigBtn", function(){
    return comn.addTab({
        title: "新增系统配置",
        href:"./Modal/sysConfigManage/sysConfig/addSysConfig.html?type=add"
    });
});

$(document).on("click", "#cacheClearsysConfigBtn", function(){
    return comn.ajax({
        url: interUrl.sysConfig.cacheClear,
        success: function(res) {
            tip({content: "缓存清除成功！"})
        }
    });
});