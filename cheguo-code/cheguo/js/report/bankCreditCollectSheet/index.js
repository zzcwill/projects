var ajaxBankList = function(){
    $("#searchForm").validate();
    if ($("#searchForm").valid() == true) {
        comn.ajax({
            url : interUrl.report.statisBankPayment,
            data : $("#searchForm").values(),
            success : function(res) {
                var len, lef;
                lef =  res.data;
                len = lef.length;
                var thFHtml = (function(){
                    var html = "";
                    for (i = 0; i < 31; i++) {
                        html += "<th colspan='2'>"+ (i + 1) +"日</th>"
                    }
                    return "<th rowspan='2' data-valign='middle'>银行名称</th>" + html +"<th colspan='2'>本月累计</th><th colspan='2'>本年累计</th>";
                })();
                var thSHtml = (function(){
                    var html = "";
                    for (i = 0; i < 33; i++) {
                        html += "<td>数量</td><td>金额</td>"
                    }
                    return html;
                })();
                var bodyHtml = "";
                for (i = 0; i< len; i++) {
                    var o = lef[i].loanInfoBankPaymentDayStatisList;
                    var bodyInHtml = "";
                    for (j = 0; j < o.length; j++) {
                        bodyInHtml += "<td>"+ (o[j].totalLoanNum ? o[j].totalLoanNum : '--') +"</td><td>"+ (o[j].totalLoanAmount ? o[j].totalLoanAmount : '--')+"</td>";
                    }
                    bodyHtml += "<tr><th>"+ (lef[i].loanInfoCooperationBank ? lef[i].loanInfoCooperationBank : '--') +"</th>"+ bodyInHtml +"</tr>"
                }
                var html = "<thead><tr>"+ thFHtml +"</th></tr><tr>"+ thSHtml +"</tr></thead><tbody>"+ bodyHtml +"</tbody>";
                var arrWidth = [];
                $("#table").append(html);
                //table Header set fixed
                /*
                 $("#table tr:first-child th").each(function(){
                 arrWidth.push($(this).outerWidth());
                 });
                 var htmlHeader = "<tr>"+ thFHtml +"</tr><tr>"+ thSHtml +"</tr>";
                 $("#fixHeader").append(htmlHeader);

                 for (i = 0; i < 31; i++) {
                 $("#fixHeader tr:first-child").children().eq(i).css("min-width", arrWidth[i]+"px");
                 }*/
            }
        })
    }
}
$(function(){
    $("#month").getMonthCur();
    ajaxBankList();
    $("#loanBranchCompanyId").getOrg();
    $("#loanInfoCooperationBankId").getBankAll();
    $("#loanBranchCompanyId").off('change').on("change", function() {
        var code = $(this).find("option:selected").attr('value');
        $("#loanBusinessGroupId").getGroup(code);
    });
    //查询
    $("#btn-search").click(function(){
        $("#table").html("");
        ajaxBankList();
    });
    //导出
    $('#exportBtn').click(function(){
        var search=$("#searchForm").serialize();
        var downLink = interUrl.basic + interUrl.report.statisBankPaymentExport + "?" + search;
        console.log(downLink);
        window.open(downLink, "_blank");
    });
    //reset
    $("#reset").click(function(){
        $("#month").getMonthCur();
    });
})
$('#month').datetimepicker({
    language: 'zh-CN',
    format:'yyyy-mm',
    setDate: new Date(),
    weekStart: 1,
    autoclose: 1,
    todayHighlight: 1,
    startView: 2,
    minView: 2,
    forceParse: 0
});