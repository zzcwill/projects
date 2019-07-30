var args = comn.getArgs();
comn.ajax({
    url : interUrl.common.report,
    data : {
        applyId : args["loanApplyId"],
        custId : args["customerId"]
    },
    success : function (res) {
        if (res.data.auth.state == 1) {
            $("#results").addClass("input-group");
            $("#isloseEfficacy").removeClass("hide");
        }
        $("#reportDataForm").values(res.data.auth);
        var reportDataTable1, reportDataTable2, html1, html2;
        reportDataTable1 = [];
        reportDataTable1 = res.data.contacters; //常用联系人
        reportDataTable2 = res.data.result.collectionRule; //风险
        len1 = reportDataTable1.length;
        //遍历常用联系人
        for (i = 0; i < len1; i++) {
            html1 += [
                "<tr>",
                "<td>"+ reportDataTable1[i].name +"</td>",
                "<td>"+ reportDataTable1[i].mobile +"</td>",
                "<td>"+ relationshipWithLoaner(reportDataTable1[i].relative) +"</td>",
                "</tr>"
            ].join("");
        }
        len1 > 0 ? $("#reportDataTable1 tbody").append(html1) : $("#isTipTable1").html("暂无常用联系人").addClass("text-center");
        //遍历风险
        for (j in reportDataTable2) {
            if (reportDataTable2[j]["ruleValue"]) {
                if (reportDataTable2[j]["ruleValue"] > -1) {
                    continue;
                }
                var remark = reportDataTable2[j].remark ? reportDataTable2[j].remark : "";
                html2 += [
                    "<tr>",
                    "<td>"+ reportDataTable2[j].ruleName +"</td>",
                    "<td>"+ remark +"</td>",
                    "</tr>"
                ].join("");
            }
        }
        reportDataTable2 == null ? $("#isTipTable2").html("暂无风险规则").addClass("text-center") : $("#reportDataTable2 tbody").append(html2);
        //如果常用联系人，风险都为空时显示提示信息
        if (!len1 && !reportDataTable2) {
            tip({ content : res.message})
        }
    }
})