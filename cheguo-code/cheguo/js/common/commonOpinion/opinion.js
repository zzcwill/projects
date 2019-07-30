/**
 * Created by hyb on 16/1/6.
 */
////通用流程意见获取
var dataLoad_opinion,lowFeeDataLoad_opinion,lowFeeDataLoad_opinion2;
dataLoad_opinion = function (params) {
    var p;
    p = params.data;
    if(args['businessTypeCode'] == 'DOCUMENT_TRANSMIT_FLOW' || args['businessTypeCode'] == 'LOWFEE_APPROVE_FLOW'){
    	p['boId'] = args['businessId'];
    }else if(args['businessTypeCode']=="INSURANCE_DISPATCHN_FLOW"){
        p['boId'] = args['projectId']
    } else {
	    p['boId'] = args['loanApplyId'];
    }
    p['businessType'] = args['businessTypeCode'] || args['releventFlow'];
    args['estimateNum'] ? p.estimateNum = args['estimateNum'] : ""; //只针对报表二手车评估中给过程意见用；
	tableData(params, p, interUrl.mockList || interUrl.gr.flow);
};
lowFeeDataLoad_opinion = function (params) {
    tableData(
        params,
        {
	        projectId: args['projectId']
        },
        interUrl.lowFee.flow
    );
};
lowFeeDataLoad_opinion2 = function (params) {
	tableData(
		params,
		{
			boId: args['projectId']
		},
		interUrl.lowFee.flow2
	);
};

$("#table").bootstrapTable(comn.table);

if (args["releventFlow"] === "LOAN_APPLY_FLOW" || args["releventFlow"] === "LOAN_MODIFY_FLOW") {
    $("#isLowFeeTable").removeClass("hide");
    $("#isLowFeeTable2").removeClass("hide");
    $("#lowFeeTable").bootstrapTable(comn.table);
    $("#lowFeeTable2").bootstrapTable(comn.table);
}