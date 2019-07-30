var dataLoad_1, handle_1, handle_2, handle_3, tableEvent;
$("#bankId").getBanks();
dataLoad_1 = function(params) {
    tableData(params, $("#user-form").values(),  interUrl.loanModal.getModalList);
};
handle_1 = function(value, row, index){
	return [null, "合同套打", "贷后打印"][value] || null;
}
handle_2 = function (value, row, index) {
	return [null, "启用", "停用"][value] || null;
}
handle_3 = function(value, row, index) {
    if(row.status == 1){
        var modifyMenu = "";
        return ["<div class='btn-group btn-group-xs'>", 
                "<button type='button' class='btn btn-primary dropdown-toggle' data-toggle='dropdown'>操作", 
                "<span class='caret'></span>", "<span class='sr-only'>下拉切换</span>", 
                "</button>", "<ul class='dropdown-menu' role='menu'>", 
                "<li><a class='disable'>停用</a></li>",
                "<li><a class='copy'>复制</a></li>",
            modifyMenu, "</ul>", "</div>"].join("");
    }else if (row.status == 2){
        var modifyMenu = '';
        return ["<div class='btn-group btn-group-xs'>", 
                "<button type='button' class='btn btn-primary dropdown-toggle' data-toggle='dropdown'>操作", 
                "<span class='caret'></span>", "<span class='sr-only'>下拉切换</span>", 
                "</button>", "<ul class='dropdown-menu' role='menu'>", 
                "<li><a class='enable'>启用</a></li>",
                "<li><a class='copy'>复制</a></li>",
                "<li><a class='modify'>修改</a></li>",
                "<li><a class='del'>删除</a></li>", 
                modifyMenu, "</ul>", "</div>"].join("");
    }
}; 
tableEvent = {
    "click .modify": function(e, a, item, index) {
        return comn.addTab({
            title: "模板修改",
            href:"./Modal/printTemplateManage/printModalSetting/addModal.html?type=modify&id=" + item.id,
        });
    },
    "click .disable": function(e, a, item, index) {
        $("#tipText").text("是否停用?");
        var content = "停用成功！";
        getGroup(item, interUrl.loanModal.stopModal, content);
    },
    "click .enable":function(e,a,item,index){
        $("#tipText").text("确定启用?");
        var content = "启用成功！";
        getGroup(item, interUrl.loanModal.startModal, content);
    },
    "click .del": function(e, a, item, index) {
        $("#tipText").text("确定要删除吗?");
        var content = "删除成功！";
        getGroup(item, interUrl.loanModal.delModal, content);
    },
    "click .copy": function(e, a, item, index) {
        $("#tipText").text("确定要拷贝吗?");
        var content = "拷贝成功！";
        getGroup(item, interUrl.loanModal.copyModal, content);
    }
};
	$("#sureBtn").click(function(){
       if(typeof fn == "function"){
        fn();
       } 
    });
    $("#add").click(function(){
    	return comn.addTab({
            title: "模板新增",
            href:"./Modal/printTemplateManage/printModalSetting/addModal.html?type=add"
        });
    });
var fn = null;
function  getGroup(o, url, contents){
            $("#sureModal").modal("show");      
            fn = function(){
             comn.ajax({
                    url: url,
                    data: {
                        templateId: o['id']
                    },
                    success: function(res) {
                        fn = null;
                        tip({
                            content: contents
                          });
                        $("#sureModal").modal("hide");
                        
                        return $("#btn-search").trigger("click");
                    }
                });
        }
}
$(function () {
	$(".orgId").getOrg();
	$(".orgId").change(function(){
		$(this).parents("form").find("select.bankId").getLoanBank($(this).val())
	});
})