var dataLoad_1, handle, tableEvent;

dataLoad_1 = function(params) {
    tableData(params, $("#searchForm").values(), interUrl.gr.patchSearch);
};


tableEvent = {
    "click .info": function(e, a, item, index) {
        return comn.addTab({
            title: "补件",
            href: "./Modal/loanManage/loanPatch/documentDetail.html?id=" + item.applyId + "&space=LOAN_PATCH&releventFlowNode=" + item.nodeKey + "&releventFlow=" + item.businessType +"&projectId="+ item.projectId
        })
    }
};

handle = function(value, row, index) {
    return ["<button type='button' class='btn btn-primary btn-xs info'>补件</button>"].join("");
};

$(function() {
	 	$("#getDoc").getLoad();
    //搜索列表
    $("#btn-search-query").click(function() {
        $("#table").bootstrapTable("refresh", {url: "..."});
    });
});
