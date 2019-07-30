var args = comn.getArgs();
var dataLoad_1, handle, tableEvent;
$("#getPageData [name='codeType']").attr("value",args["codeType"]);
dataLoad_1 = function(params) {
    var o = $("#getPageData").values();
    tableData(params, o, interUrl.codeLibrary.list)
};
tableEvent = {
    "click .modify": function(e, a, item, index) {
        return comn.addTab({
            title: "数据字典修改",
            href:"./Modal/codeLibraryManage/codeLibrary/addCodeLibrary.html?type=modify&id="+item.id+"&codeType=" + args["codeType"]+"&describe="+args["describe"]
        });
    },
    "click .delete": function(e, a, item, index) {
        $("#sure").modal("show");
        return $("#OK").unbind("click").on("click", function() {
            comn.ajax({
                url: interUrl.codeLibrary.delete,
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
codeLibraryIsInuse = function(value, row, index) {
    return value?"启用":"停用";
};
$(document).on("click", "#addCodeLibraryBtn", function(){
    return comn.addTab({
        title: "新增数据字典",
        href:"./Modal/codeLibraryManage/codeLibrary/addCodeLibrary.html?type=add&codeType=" + args["codeType"]+"&describe="+args["describe"]
    });
});