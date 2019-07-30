var handle_1, tableEvent_1, dataLoad_1;
dataLoad_1 = function(params) {
    tableData(params,$("#searchForm").values(), interUrl.report.secondHandCarInfoReportList);
};
tableEvent_1 = {
    "click .loanStart_1": function(e, a, item, index) {
        var code = item.estimateStatus;
        var codeId = '',sr = '';
        if(code == '0'){
            codeId = '1';
            sr = '&releventFlow=SECOND_HAND_CAR_ESTIMATE_FLOW&releventFlowNode=ESTIMATE_LAUNCH&fileNamespace=SECONDHAND_CAR'
        }else if(code == '1' || code == '2'){
            codeId = '4';
            sr = '&releventFlow=SECOND_HAND_CAR_ESTIMATE_FLOW&releventFlowNode=FIRST_ESTIMATE&fileNamespace=SECONDHAND_CAR'
        }else if(code == '3' || code == '4'){
            codeId = '5';
            sr = '&releventFlow=SECOND_HAND_CAR_ESTIMATE_FLOW&releventFlowNode=SECOND_ESTIMATE&fileNamespace=SECONDHAND_CAR'
        }
        //查看二手车评估
        //comn.addTab({title: '评估详情',  href: "./Modal/secondHandCar/common/index.html?type="+codeId+"&estimateNum="+ item.estimateNum +"&hi=2&id="+item.id +"&space=SECONDHAND_CAR"+sr+"&loanApplyId=" + item.id + "&businessTypeCode=SECOND_HAND_CAR_ESTIMATE_FLOW"});
        //二手车id换新值
        comn.addTab({title: '评估详情',  href: "./Modal/secondHandCar/common/index.html?type="+codeId+"&estimateNum="+ item.estimateNum +"&hi=2&id="+item.secondHandCarId+"&space=SECONDHAND_CAR"+sr+"&loanApplyId=" + item.secondHandCarId + "&businessTypeCode=SECOND_HAND_CAR_ESTIMATE_FLOW"});
    }
};

handle_1 = function(value, row, index) {
    return ["<button type='button' class='btn btn-primary btn-xs loanStart_1'>查看评估详情</button>"].join("");
};

$(function(){
    $("#launchOrganizationId").getOrg();
    $("#launchOrganizationId").on("change", function() {
        var code = $(this).find("option:selected").attr('value');
        $("#launchBusinessGroupId").getGroup(code);
    });
    $("#export").click(function(){
        var search=$("#searchForm").serialize();
        var downLink = interUrl.basic + interUrl.report.secondHandCarInfoReport + "?" + search;
        // var downLink = "/secondHandCarInfoReport/secondHandCarExport" + "?" + search;
        window.open(downLink, "_blank");
    });
});