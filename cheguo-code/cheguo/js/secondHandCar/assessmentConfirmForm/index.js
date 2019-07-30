var tableEvent_2, handle_2, dataLoad_2;
dataLoad_2 = function(params) {
    tableData(params,$("#searchForm").values(), interUrl.second.confirmEstimateSearch);
};
tableEvent_2 = {
    "click .loanStart_1": function(e, a, item, index) {
        var code = item.estimateStatusCode;
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
        comn.addTab(
            {
                title: '评估详情',
                href: "./Modal/secondHandCar/common/index.html?type="+codeId+"&hi=2&id="+item['secondHandCarInfoId'] +"&space=SECONDHAND_CAR"+sr+"&loanApplyId=" + item.secondHandCarInfoId + "&businessTypeCode=SECOND_HAND_CAR_ESTIMATE_FLOW&status=done&confirmFromBtn=true"
            }
        );
    }
};
handle_2 = function(value, row, index) {
    return ["<button type='button' class='btn btn-primary btn-xs loanStart_1'>查看评估详情</button>"].join("");
};