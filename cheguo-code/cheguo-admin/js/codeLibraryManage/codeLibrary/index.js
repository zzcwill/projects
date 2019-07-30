var dataLoad_1, handle, tableEvent;
dataLoad_1 = function(params) {
    var o = $("#getCodeTypePageData").values();
    tableData(params, o, interUrl.codeLibrary.codeTypeList)
};
tableEvent = {
    "click .codeLibraryDetail": function(e, a, item, index) {
        return comn.addTab({
            title: "数据字典明细",
            href:"./Modal/codeLibraryManage/codeLibrary/codeLibraryDetail.html?codeType=" + item.codeType+"&describe="+item.describe
        });
    }
};
handle = function(value, row, index) {
    return '<button type="button" class="btn btn-primary btn-xs codeLibraryDetail" modal="enter"><span>&nbsp;查看明细&nbsp;</span></button>';
};
$(document).on("click", "#addCodeLibraryBtn", function(){
    return comn.addTab({
        title: "新增数据字典",
        href:"./Modal/codeLibraryManage/codeLibrary/addCodeLibrary.html?type=add"
    });
});
$(document).on("click", "#cacheClearCodeLibraryBtn", function(){
    return comn.ajax({
        url: interUrl.codeLibrary.cacheClear,
        success: function(res) {
            tip({content: "缓存清除成功！"})
        }
    });
});