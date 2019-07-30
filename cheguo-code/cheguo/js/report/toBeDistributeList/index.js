var dataLoad_1;
dataLoad_1 = function (params) {
    var p=params.data;
    return comn.ajax({
        url: interUrl.finance.getPuttedLoanList,
        data: $.extend($("#searchForm").values(),p),
        success: function (res) {
            params.success({
                'total': res.data.totalItem,
                rows: res.data.data.data
            });
            $("#getForm").values(res.data);
            return params.complete();
        }
    });
};
$(function(){
    $("#launchOrgId").getOrg();
})
$('#exportBtn').click(function(){
    var search=$("#searchForm").serialize();
    var downLink = interUrl.basic + interUrl.finance.exportPuttedLoanList + "?" + search;
    //downLink = interUrl.basic + interUrl.distributionInsuranceCo.export2 + "?projectIds=" + _arr +"&" + search ;
    console.log(downLink);
    window.open(downLink, "_blank");
});
