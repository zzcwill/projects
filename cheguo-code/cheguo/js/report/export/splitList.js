var dataLoad_1;
dataLoad_1 = function(params) {
    tableData(params, $("#searchForm").values(), interUrl.export.getSplitBudgetList);
};

$(function(){
    $("#table").bootstrapTable({
        "undefinedText": "--",
        "classes": "table-striped table-hover table",
        "pagination": true,
        "sidePagination": "server",
        "queryParams": "queryParams",
        "paginationFirstText": "第一页",
        "paginationPreText": "上一页",
        "paginationNextText": "下一页",
        "paginationLastText": "最后一页",
        "clickToSelect": true,
        "pageNumber":  1,
        "pageSize": 1000,
        "pageList": [10,25,50,100,500,1000],
        "height": "500"
    });
    $("#launchOrgId").getOrg();

    $("#exportBtn").unbind('click').on("click", function(){
        var exportData = {
            ids: []
        };
        $.map($("#table").bootstrapTable('getSelections'), function (row) {
            exportData.ids.push(row.id);
        });
        var _ids = exportData.ids.toString();
        var search=$("#searchForm").serialize();
        var downLink = interUrl.basic + interUrl.export.splitExport + "?" +search +(exportData.ids.length === 0 ? '' : ("&ids=" + _ids));
        window.open(downLink, "_blank");
    });
});
