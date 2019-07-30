var dataLoad_1, handle_1, tableEvent_1, dataLoad_2, handle_2, tableEvent_2, _arr,indexN;
dataLoad_1 = function(params) {
    var p;
    p = params.data;
    comn.ajax({
        url: interUrl.distributionInsuranceCo.insureCheck,
        data: $.extend($("#searchForm").values(), p, {
            insuranceState : 1
        }),
        success: function(res) {
            console.log(res);
            params.success({
                'total': res.totalItem,
                'rows': res.data.list
            });
            $("#noSendTotalFee").val(res.data.fee);
            params.complete();
        }
    });
};
handle_1 = function(value, row, index) {
    return ["<div class='btn btn-primary btn-xs info'>进入审批</div>"].join("");
};
tableEvent_1 = {
    "click .info": function (e, a, item, index) {
        indexN=0;
        comn.addTab({
            title: '进入审批',
            href: './Modal/distributionInsuranceCo/distributionInsuranceCoList/distributionInsuranceInfo.html?projectId='+item.projectId +"&projectNo="+item.projectNo+"&loanApplyId="+item.relativeApplyId1 + "&businessTypeCode=LOAN_APPLY_FLOW&space=INSURANCE_DISTRIBUTION&releventFlowNode=INSURANCE_DISPATCHN_LAUNCH&releventFlow=INSURANCE_DISPATCHN_FLOW&index="+indexN
        });
    }
}

dataLoad_2 = function(params) {
    var p;
    p = params.data;
    comn.ajax({
        url: interUrl.distributionInsuranceCo.insureSubmit,
        data: $.extend($("#searchForm").values(), p),
        success: function(res) {
            params.success({
                'total': res.totalItem,
                'rows': res.data.list
            });
            $("#totalfee").val(res.data.fee);
            params.complete();
        }
    });
};
handle_2 = function(value, row, index) {
    if(row.insuranceState==15){
        return ["<div class='btn btn-primary btn-xs cancleInsurance'>保单登记</div>"].join("");
    }else if(row.insuranceState==2){
        return ["<div class='btn btn-primary btn-xs cancleInsurance'>保单修改</div>"].join("");
    }
    else{
        return ["<div class='btn btn-primary btn-xs info'>查看详情</div>"].join("");
    }

};
insuranceCoverageState = function (value, row, index) {
    switch (value){
        case 0:
            return "待分发";
            break;
        case 1:
            return  "待审核";
            break;
        case 2:
            return  "已登记";
            break;
        case 3:
            return  "无效";
            break;
        case 4:
            return  "退回";
            break;
        case 12:
            return "初审";
            break;
        case 13:
            return "中审";
            break;
        case 14:
            return "复审";
            break;
        case 15:
            return "审核通过";
            break;
    }
    //return ["待审核", "审核通过", "已登记","","","","","","","","","","初审","中审","复审","审核通过"][value] || null;
}
tableEvent_2 = {
    "click .info": function (e, a, item, index) {
        indexN=1;
        var releventFlowNode;
        switch(item.insuranceState){
            case 2: releventFlowNode = "INSURANCE_DISPATCHN_REVIEW";
                break;
            case 12: releventFlowNode = "INSURANCE_DISPATCHN_LAUNCH";
                break;
            case 13: releventFlowNode = "INSURANCE_DISPATCHN_PRIMARY";
                break;
            case 14: releventFlowNode = "INSURANCE_DISPATCHN_REVIEW";
                break;
        }
        comn.addTab({
            title: '查看详情',
            href: './Modal/distributionInsuranceCo/distributionInsuranceCoList/distributionInsuranceInfo.html?projectId='+item.projectId +"&loanApplyId="+item.relativeApplyId1 + "&businessTypeCode=LOAN_APPLY_FLOW&space=INSURANCE_DISTRIBUTION&releventFlowNode="+releventFlowNode+"&releventFlow=INSURANCE_DISPATCHN_FLOW&index="+indexN
        });
    },
    "click .cancleInsurance": function (e, a, item, index) {
        indexN=2;
        comn.addTab({
            title: '保单登记',
            href: './Modal/distributionInsuranceCo/distributionInsuranceCoList/distributionInsuranceInfo.html?projectId='+item.projectId +"&loanApplyId="+item.relativeApplyId1 + "&businessTypeCode=LOAN_APPLY_FLOW&space=INSURANCE_DISTRIBUTION&releventFlowNode=INSURANCE_DISPATCHN_REVIEW&releventFlow=INSURANCE_DISPATCHN_FLOW&index="+indexN
        });
    }

}
$(function() {
    $(".defaultData").getToday();
    //$(".loanDate").val(monthAgo());
    //所属机构
    $("#orgId").getOrg();
    //投保
    $("#btn_ok").click(function () {
        comn.ajax({
            url : interUrl.distributionInsuranceCo.isSue,
            data : {
                projectIds : _arr,
                state : 2
            },
            success : function(res) {
                tip({content : '投保成功'});
                $("#table2, #table1").bootstrapTable('refresh', {url: "..."});
            }
        })
    });
    //已提交导出
    $('#exportBtn').click(function(){
        var search=$("#searchForm").serialize();
        var downLink;
        //if (_arr == "") {
            downLink = interUrl.basic + interUrl.distributionInsuranceCo.export + "?" + search ;
        //} else {
        //    downLink = interUrl.basic + interUrl.distributionInsuranceCo.export2 + "?projectIds=" + _arr +"&" + search ;
        //}
        window.open(downLink, "_blank");
    });
    //待审核导出
    $("#noSendExportBtn").click(function(){
        var search=$("#searchForm").serialize();
        var downLink;
        downLink = interUrl.basic + interUrl.distributionInsuranceCo.exportCheck + "?" + search ;
        //if (_arr == "") {
        //    downLink = interUrl.basic + interUrl.distributionInsuranceCo.export + "?" + search ;
        //} else {
        //    downLink = interUrl.basic + interUrl.distributionInsuranceCo.export2 + "?projectIds=" + _arr +"&" + search ;
        //}
        console.log(downLink);
        window.open(downLink, "_blank");
    })
    //初始化默认显示待审批
    $(".noSend").show();
    $(".send").hide();
    //选择待审批或或者已提交
    $("#noSendTab").click(function(){
        $(".noSend").show();
        $(".send").hide();
    })
    $("#sendTab").click(function(){
        $(".send").show();
        $(".noSend").hide();
    })

    //待分发 与分发时，搜索条件的甄别
    return $("#btn-search").click(function() {
        var activeTab;
        activeTab = $(".tab-content").find(".tab-pane.active").attr("id");
        return $("#" + activeTab).find("table").bootstrapTable("refresh", {url: "..."});
    });

});
//设置放款日期默认为一个月前
function monthAgo() {
    var date, y, m, d, oneMonthAgo;
    date = new Date();
    y = date.getFullYear();
    m = date.getMonth() < 10 ? "0" + date.getMonth()  : date.getMonth();
    d = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    if(m==0){
        y=y-1;
        m=12;
    }
    oneMonthAgo = y + "-" + m + "-" + d;
    return oneMonthAgo;
}
