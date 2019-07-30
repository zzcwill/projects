/**
 * Created by hyb on 15/12/31.
 */
var args;
args = comn.getArgs(); //getArgs
var projectId=args['projectId'];
var insuranceCompanyId = args['insuranceCompanyId'];
var insuranceTypeKey = args['insuranceTypeKey'];

//if(args['id']){
//    //获取险种信息
//    getInsuranceInfo();
//    saveUrl=interUrl.insurance.loanInsuranceInfoUpdate;
//}else{
//    $("#insuranceCompanyId").getInsurance();
//    saveUrl=interUrl.insurance.loanInsuranceInfoAdd;
//    getUser();//获取当前用户
//    $("#insuranceStatus").val(args['predictedPurchasetax']);
//}

//获取已选择险种列表
//function getInsuranceInfoTable(id,key) {
//    var htmlTemp = "";
//    $('#insuranceInfoTable tbody').html("");
//    var self = this;
//    if(id && key){
//        comn.ajax({
//            url: interUrl.insurance.getLoanInsuranceInfoTypeList,
//            data: {
//                insuranceCompanyId: id,
//                insuranceTypeKey: key
//            },
//            success: function (res) {
//                for (var i = 0; i < res.data.length; i++) {
//                    var item = res.data[i];
//                    htmlTemp += "<tr><td data-name='index'>" + (i + 1) + " <input type='hidden' name='itemId' value='" + item.id + "'/></td><td>" + item.insuranceName + " </td></tr>";
//                }
//                $('#insuranceInfoTable tbody').append(htmlTemp);
//            }
//        });
//    }
//}
function getInsuranceInfoTable(data) {
    var htmlTemp = "";
    
    for (var i = 0; i < data.length; i++) {
        var item = data[i];
        htmlTemp += "<tr><td data-name='index'>" + (i + 1) + " <input type='hidden' name='itemId' value='" + item.id + "'/></td><td>" + item.insuranceTypeName + " </td></tr>";
    }
    $('#insuranceInfoTable tbody').append(htmlTemp);
           
}

getInsuranceInfo();

//获取险种信息
function getInsuranceInfo() {
    comn.ajax({
        url: interUrl.insurance.getLoanInsuranceInfo,
        data: {id: projectId},
        success: function (res) {
            $("#loanInsuranceForm").values(res.data);
            getInsuranceInfoTable(res.data.insuranceInfoDetailList);
        }
    })
}

function getUser(){
    comn.ajax({
        url: interUrl.user.getUser,
        success: function (res) {
            $("#creator").val(res.data.realname);
        }
    })
}


