var date = new Date();
var y = date.getFullYear();
$("#year").val(y);
var ajaxBranchList = function(){
    comn.ajax({
        url : interUrl.report.statisLoanCompanyBusiness,
        data : {
            year : $("#year").val() ? $("#year").val() : y
        },
        success : function(res) {
            var len, lef;
            lef =  res.data;
            len = lef.length;
            var thFHtml = (function(){
                var html = "";
                for (i = 0; i < 12; i++) {
                    html += "<th colspan='6'>"+ (i + 1) +"月</th>"
                }
                return ["<th rowspan='4' data-valign='middle'>一级名称</th>",
                    "<th rowspan='4' data-valign='middle'>二级名称</th>",
                    "<th rowspan='4' data-valign='middle'>三级名称</th>",
                    html,
                    "<th colspan='9'>合计</th>"].join("");
            })();
            var thSHtml = (function(){
                var html = "";
                for (i = 0; i < 13; i++) {
                    html += "<th rowspan='2' colspan='2' data-valign='middle'>签单合计</th><th colspan='4' data-valign='middle'>放款</th>"
                }
                return html +"<th rowspan='2' colspan=3' data-valign='middle'>指标完成</th>";
            })();
            var thTHtml = (function(){
                var html = "";
                for (i = 0; i < 13; i++) {
                    html += "<th colspan='2'>新车</th><th colspan='2'>二手车</th>"
                }
                return html;
            })();
            var thFourHtml = (function(){
                var html = "";
                for (i = 0; i < 13; i++) {
                    html += "<th>数量</th><th>金额</th><th>数量</th><th>金额</th><th>数量</th><th>金额</th>"
                }
                return html +"<th>全年指标(万)</th><th>累计完成率</th><th>排名</th>";
            })();
            var bodyHtml = "";
            for (i = 0; i< len; i++) {
                var o = lef[i].monthStatisList;
                var bodyInHtml = ""; //数量 和金额
                for (j = 0; j < o.length; j++) {
                    bodyInHtml += ["<td>"+ (o[j].signDataStatis.totalLoanNum ? o[j].signDataStatis.totalLoanNum : '--') +"</td><td>"+ (o[j].signDataStatis.totalLoanAmount ? o[j].signDataStatis.totalLoanAmount : '--')+"</td>",
                                    "<td>"+ (o[j].bankPayNewCarDataStatis.totalLoanNum ? o[j].bankPayNewCarDataStatis.totalLoanNum : '--') +"</td><td>"+ (o[j].bankPayNewCarDataStatis.totalLoanAmount ? o[j].bankPayNewCarDataStatis.totalLoanAmount : '--')+"</td>",
                                    "<td>"+ (o[j].bankPaySecondCarDataStatis.totalLoanNum ? o[j].bankPaySecondCarDataStatis.totalLoanNum : '--') +"</td><td>"+ (o[j].bankPaySecondCarDataStatis.totalLoanAmount ? o[j].bankPaySecondCarDataStatis.totalLoanAmount : '--')+"</td>"
                    ].join("");
                }
                //指标完成情况
                var bodyTotal = ["<td>"+ (lef[i].totalSignDataStatis.totalLoanNum ? lef[i].totalSignDataStatis.totalLoanNum : '--') +"</td><td>"+ (lef[i].totalSignDataStatis.totalLoanAmount ? lef[i].totalSignDataStatis.totalLoanAmount : '--')+"</td>",
                    "<td>"+ (lef[i].totalBankPayNewCarDataStatis.totalLoanNum ? lef[i].totalBankPayNewCarDataStatis.totalLoanNum : '--') +"</td><td>"+ (lef[i].totalBankPayNewCarDataStatis.totalLoanAmount ? lef[i].totalBankPayNewCarDataStatis.totalLoanAmount : '--')+"</td>",
                    "<td>"+ (lef[i].totalBankPaySecondCarDataStatis.totalLoanNum ? lef[i].totalBankPaySecondCarDataStatis.totalLoanNum : '--') +"</td><td>"+ (lef[i].totalBankPaySecondCarDataStatis.totalLoanAmount ? lef[i].totalBankPaySecondCarDataStatis.totalLoanAmount : '--')+"</td>",
                    "<td>"+ (lef[i].checkTarget ? lef[i].checkTarget : '--') +"</td><td>"+ (lef[i].targetFinishRate ? lef[i].targetFinishRate : '--')+"</td><td>"+ (lef[i].rank ? lef[i].rank : '--')+"</td>"].join("");
                //一级二级三级名称
                var bodyFirst = ["<td>"+ (lef[i].firstName ? lef[i].firstName : '--')+"</td>",
                                "<td>"+ (lef[i].secondName ? lef[i].secondName : '--') +"</td>",
                                "<td>"+ (lef[i].thirdName ? lef[i].thirdName : '--') +"</td>"].join("");
                bodyHtml += "<tr>"+ bodyFirst + bodyInHtml + bodyTotal+"</tr>"
            }
            var html = "<thead><tr>"+ thFHtml +"</th></tr><tr>"+ thSHtml +"</tr><tr>"+thTHtml+"</tr><tr>"+thFourHtml+"</tr></thead><tbody>"+ bodyHtml  +"</tbody>";
            $("#table").append(html)
        }
    })
}

$(function(){
    ajaxBranchList();
    //查询
    $("#btn-search").click(function(){
        $("#table").html("");
        ajaxBranchList();
    });
    $("#reset").click(function(){
        $("#year").val(y);
    });
    $('#exportBtn').click(function(){
        var search=$("#searchForm").serialize();
        var downLink = interUrl.basic + interUrl.report.statisLoanCompanyBusinessExport + "?" + search;
        console.log(downLink);
        window.open(downLink, "_blank");
    });
})
$('.year').datetimepicker({
    startView: 'decade',
    minView: 'decade',
    language: 'zh-CN',
    format:'yyyy',
    autoclose: true
});