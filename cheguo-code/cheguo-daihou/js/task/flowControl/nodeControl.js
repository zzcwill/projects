var handle, dataLoad_1, tableEvent, title = "节点配置操作";

dataLoad_1 = function(params) {
    tableData(params, $("#searchForm").values(), interUrl.flowControl.searchFlow);
};
handle = function(value, row, index) {
	return ["<div class='btn-group btn-group-xs'>", 
			"<button type='button' class='btn btn-primary dropdown-toggle' data-toggle='dropdown'>操作", 
			"<span class='caret'></span>", "<span class='sr-only'>下拉切换</span>", 
			"</button>",
				"<ul class='dropdown-menu' role='menu'>", 
					row.status == 0 ? "<li><a class='enable'>启用</a></li>" : "<li><a class='disable'>停用</a></li>", 
					row.status == 0 ? "<li><a class='modify'>修改</a></li>" : "", 
					"<li><a class='del'>删除</a></li>", 
					"<li><a class='see'>查看详情</a></li>",
				"</ul>",
			"</div>"].join("");
}; 
tableEvent = {
    "click .modify": function(e, a, item, index) {
        return comn.addTab({
            title:title,
            href:"./Modal/task/flowControl/nodeControlChange.html?type=modify&id="+item.id
        });
    },
    "click .see": function(e, a, item, index) {
        return comn.addTab({
            title:title,
            href:"./Modal/task/flowControl/nodeControlChange.html?type=show&id=" + item.id
        });
    },
    "click .disable": function(e, a, item, index) {
        $("#tipText").text("是否停用?");
        var content = "停用成功！";
        getGroup(item, interUrl.flowControl.flowDisable, content);
    },
    "click .enable":function(e,a,item,index){
        $("#tipText").text("确定启用?");
        var content = "启用成功！";
        getGroup(item, interUrl.flowControl.flowEnable, content);
    },
    "click .del": function(e, a, item, index) {
        $("#tipText").text("确定要删除吗?");
        var content = "删除成功！";
        getGroup(item, interUrl.flowControl.flowDel, content);
    }
};

$(function(){
	$("#flowList").flowGet();
    $(document).on("change", "#flowList", function() {
        var flowValue = $(this).find("option:selected").attr('value');
        $("#nodeList").getFlowNode(flowValue);
        return;
    });
    $("#add").click(function(){
        return comn.addTab({
            title:title,
            href:"./Modal/task/flowControl/nodeControlChange.html?type=add"
        });
    });
   $("#sureBtn").click(function(){
       if(typeof fn == "function"){
        fn();
       } 
    });
});

var fn = null;
function  getGroup(o, url, contents){
            $("#sureModal").modal("show");      
            fn = function(){
             comn.ajax({
                    url: url,
                    data: {
                        ruleId: o['id']
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
