/**
 * Created by hyb on 15/12/31.
 */
var args,table, tableEvent,handle;
args = comn.getArgs(); //getArgs
if(args['documentDeliveryType']==2){
    $("#editInsurance").hide();
}
//待登记
table = function(params) {
    var p = params.data;
    return comn.ajax({
        url: interUrl.insurance.loanInsuranceInfoList,
        data:{projectId:args['projectId']} ,
        success: function(res) {
            params.success({
                'total': res.totalItem,
                rows: res.data
            });
            return params.complete();
        }
    });
};

handle = function(value, row, index) {
    return ["<div class='btn-group btn-group-xs'>", "<button type='button' class='btn btn-primary dropdown-toggle' data-toggle='dropdown'>操作", "<span class='caret'></span>", "<span class='sr-only'>下拉切换</span>", "</button>", "<ul class='dropdown-menu' role='menu'>","<li><a class='edit'>修改</a></li>" , "<li><a class='del'>删除</a></li>", "</ul>", "</div>"].join("");
};


tableEvent = {
    "click .edit": function(e, a, item, index) {
        return window.parent.toUrl({
            url:"./Modal/insuranceManage/firstInsurance/editInsurance.html?id="+a+"&insuranceCompanyId="+item['insuranceCompanyId']+"&insuranceTypeKey="+item['insuranceTypeKey']+"&projectId="+item['projectId']
        })
    },
    "click .del": function(e, a, item, index) {
        var r=confirm("确定要删除吗?");
        if(r==true){
            return comn.ajax({
                url: interUrl.insurance.loanInsuranceInfoDel,
                data:{id:a,projectId:args['projectId']},
                success: function(res) {
                    $("#table").bootstrapTable("refresh");
                }
            });
        }
    }
};

//保单录入
$("#editInsurance").click(function(){
    return comn.addTab({
        title:"保单录入",
        href:"./Modal/insuranceManage/firstInsurance/editInsurance.html?projectId="+args['projectId']+"&predictedPurchasetax="+args['predictedPurchasetax']
    });
});





