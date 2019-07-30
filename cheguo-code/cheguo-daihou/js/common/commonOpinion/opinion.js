/**
 * Created by hyb on 16/1/6.
 */
////通用流程意见获取
var dataLoad_opinion;
dataLoad_opinion = function (params) {
    var p;
    p = params.data;
    if(args['businessTypeCode'] == 'DOCUMENT_TRANSMIT_FLOW'){
    	p['boId'] = args['businessId'];
    }else {
	    p['boId'] = args['loanApplyId'];
    }
    p['businessType'] = args['businessTypeCode'];
    return comn.ajax({
        url: interUrl.mockList || interUrl.gr.flow,
        data: p,
        success: function (res) {
            params.success({
                'total': res.totalItem,
                rows: res.data
            });
            return params.complete();
        }
    });
};

$("#table").bootstrapTable(comn.table);
