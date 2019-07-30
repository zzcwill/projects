var dataLoad_1, handle, tableEvent;
dataLoad_1 = function(params) {
    var o = $("#addOrgForm").values();
    o.content = o.title;
    tableData(params, o, interUrl.problem.list)
};
tableEvent = {
    "click .modify": function(e, a, item, index) {
        return comn.addTab({
            title: "常见问题修改",
            href:"./Modal/problemManage/problem/addProblem.html?type=modify&id=" + item.id
        });
    },
    "click .isStop": function(e, a, item, index) {
        comn.ajax({
            url: interUrl.problem.status,
            data: {
                id: item.id,
                status: item.status === 1 ? 0 : 1
            },
            success: function(res) {
                tip({
                    content : (item["status"] == 1 ? "停用" : "启用") + "成功!"
                });
                return $("#btn-search").trigger("click");
            }
        })
    },
    "click .del": function(e, a, item, index) {
        $("#sure").modal("show");
        return $("#OK").unbind("click").on("click", function() {
            comn.ajax({
                url: interUrl.problem.del,
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
    var liString = "";
    if (row.status === 0) {
        liString = "<li><a class='modify'>修改</a></li><li><a class='isStop'>启用</a></li><li><a class='del'>删除</a></li>"
    } else if (row.status === 1) {
        liString = "<li><a class='isStop'>停用</a></li>"
    }
    return ["<div class='btn-group btn-group-xs'>", "<button type='button' class='btn btn-primary dropdown-toggle' data-toggle='dropdown'>操作", "<span class='caret'></span>", "<span class='sr-only'>下拉切换</span>", "</button>", "<ul class='dropdown-menu' role='menu'>",liString, "</ul>", "</div>"].join("");

};
$(document).on("click", "#addProblemBtn", function(){
    return comn.addTab({
        title: "新增常见问题",
        href:"./Modal/problemManage/problem/addProblem.html?type=add"
    });
});
$(document).on("click", "#addCategoryBtn", function(){
    $("#addType").modal("show");
});
$(document).on("click", "#addTypeBtn", function() {
    $("#typeForm").validate();
    if ($("#typeForm").valid() == true) {
        comn.ajax({
            url: interUrl.problem.addType,
            data: $("#typeForm").values(),
            success: function(res) {
                $("#addType").modal("hide");
                $(".typeList").getProblemList();
                tip({content: "添加成功！"})
            }
        })
    }
});

$(document).on("click", "#updata", function(){
    console.log(UE.getEditor('editor').getContent())
});

problemStatus = function(value, row, index) {
    return ["停用", "启用"][value] || null;
};
$(function(){
    $(".typeList").getProblemList();
})