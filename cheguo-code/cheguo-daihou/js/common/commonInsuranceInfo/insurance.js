/**
 * Created by hyb on 16/1/25.
 */
//保单信息 api=getLoanInsuranceInfoList
var table_insurance,handle_insurance1,handle_insurance,tableEvent_insurance;
table_insurance = function (params) {
    var p;
    p = params.data;
    p['projectId'] = args['projectId'];
    return comn.ajax({
        url: interUrl.loanDetail.getLoanInsuranceInfoList,
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

handle_insurance1=function(value,row,index){
    return "首保";
};

handle_insurance=function(value,row,index){
    return "<a href='javascript:;' class='info'>首保查看</a>"
};

tableEvent_insurance={
    "click .info":function(e,a,index,item){
        return comn.addTab({
            title:"首保查看",
            href:'./Modal/insuranceManage/firstInsurance/seeInsurance.html?projectId='+a
        });
    }
};

$("#table_insurance").bootstrapTable(comn.table);