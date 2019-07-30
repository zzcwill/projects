/**
 * Created by hyb on 15/12/31.
 */
$(function() {  
//        $("#insuranceStartTime").getMonthDay1();
        $("#insuranceStartTime").getToday();
        $("#insuranceEndTime").getYear1Day1();
        
}); 

var args,saveUrl;
args = comn.getArgs(); //getArgs
var projectId = args['projectId'];
var insuranceCompanyId = args['insuranceCompanyId'];
var insuranceTypeKey = args['insuranceTypeKey'];

if(args['id']){
	document.getElementById('insuranceTitleDiv').innerHTML='<h1 >保单修改</h1>';
    //获取险种信息
    getInsuranceInfo();
    saveUrl=interUrl.insurance.loanInsuranceInfoUpdate;
}else{
    $("#insuranceCompanyId").getInsurance();
    saveUrl=interUrl.insurance.loanInsuranceInfoAdd;
    getUser();//获取当前用户
    $("#insuranceStatus").val(args['predictedPurchasetax']);
}

//获取待添加险种列表
function getInsuranceInfoTable(id,key) {
    var htmlTemp = "";
    $('#insuranceInfoTable tbody').html("");
    var insuranceCompanyId = $('#insuranceCompanyId').val();
    var insuranceTypeKey = $('#insuranceTypeKey').val();
    var insuranceId = $('#id').val();
    var self = this;
    if((insuranceCompanyId && insuranceTypeKey) || (id && key)){
        comn.ajax({
            url: interUrl.insurance.loanInsuranceTypeList,
            data: {
                insuranceCompanyId: id || insuranceCompanyId,
                insuranceTypeKey: key || insuranceTypeKey,
                id : insuranceId
            },
            success: function (res) {
                for (var i = 0; i < res.data.length; i++) {
                    var item = res.data[i];
                    htmlTemp += "<tr><td data-name='index'>" + (i + 1) + " <input type='hidden' name='itemId' value='" + item.id + "'/></td><td>" + item.insuranceName + " </td><td><a href='javascript:;' data-id='" + item.id + "' class='addLoanInsuranceType'>添加</a></td></tr>";
                }
                $('#insuranceInfoTable tbody').append(htmlTemp);
            }
        });
    }
}
$('.insuranceInfoTable-control').on('change', function () {
    getInsuranceInfoTable();
});

//获取已添加险种列表
function getInsuranceInfoTable1(data) {
	var i,newTr="";
    for(i=0;i<data.length;i++){
    	var o=data[i];
    	newTr += "<tr><td data-name='index'>" + (i+1) + " </td><td>" + o.insuranceTypeName + "</td><td><a data-id='" + o.id + "' class='removeLoanInsuranceType'>删除</a><input type='hidden' class='insuranceTypeId' name='insuranceInfoDetailList[" + i + "].insuranceTypeId' value='" + o.insuranceTypeId+ "'> <input type='hidden' class='insuranceTypeName' name='insuranceInfoDetailList[" + i + "].insuranceTypeName' value='" + o.insuranceTypeName + "'></td></tr>";
    }
    $('#insuranceInfoTable1 tbody').append(newTr);
}

//待添加事件-添加
$(document).on("click", '.addLoanInsuranceType', function () {
    var id, oldTr, newTr, index;
    var _this = $(this);
    var oldTr = _this.parents("tr");
    var td = _this.parent("td").prev().html();
    var idTemp = _this.attr("data-id");
    var _index = $("#insuranceInfoTable1 tbody").find("tr").length;
    var newTr = "<tr><td data-name='index'>" + (_index + 1) + " </td><td>" + td + "</td><td><a data-id='" + idTemp + "' class='removeLoanInsuranceType'>删除</a><input type='hidden' class='insuranceTypeId' name='insuranceInfoDetailList[" + (_index) + "].insuranceTypeId' value='" + idTemp + "'> <input type='hidden' class='insuranceTypeName' name='insuranceInfoDetailList[" + (_index) + "].insuranceTypeName' value='" + td + "'></td></tr>";
    oldTr.remove();
    $('#insuranceInfoTable1 tbody').append(newTr);
});

//已添加事件-删除
$(document).on("click", ".removeLoanInsuranceType", function () {
    var _this = $(this);
    var oldTr = _this.parents("tr");
    var td = _this.parent("td").prev().html();
    var idTemp = _this.attr("data-id");
    var _index = $("#insuranceInfoTable tbody").find('tr').length;
    var newTr = "<tr><td data-name='index'>" + _index + "</td><td>" + td + "</td><td><a href='javascript:;' class='addLoanInsuranceType' data-id='" + idTemp + "'>添加</a></td></tr>";
    oldTr.remove();
    var len1 = $("#insuranceInfoTable1 tbody").find('tr').length;
    $("#insuranceInfoTable1 tbody").find("tr").each(function (index) {
        $(this).find("td[data-name='index']").html(index + 1);
        $(this).find("input.insuranceTypeId").attr("name", "insuranceInfoDetailList[" + index + "].insuranceTypeId");
        $(this).find("input.insuranceTypeName").attr("name", "insuranceInfoDetailList[" + index + "].insuranceTypeName");
    });
    $("#insuranceInfoTable tbody").append(newTr);
    if (len1 > 0) {
        $("#insuranceInfoTable tbody").find("tr>td[data-name='index']").each(function () {
            this.innerHTML = $(this).parents("tr").index() + 1;
        });
    }
});

$("#addAll").click(function () {
    var newTrs = "";
    var tr = $("#insuranceInfoTable tbody").find("tr");
    var trLen = $("#insuranceInfoTable tbody").find("tr").length;
    if (trLen > 0) {
        for (var i = 0; i < trLen; i++) {
            var _index = $("#insuranceInfoTable1 tbody").find('tr').length;
            var td = tr.eq(i).find('td').eq(1).html();
            var idTemp = tr.eq(i).find('a').attr('data-id');
            newTrs = "<tr><td data-name='index'>" + (_index + 1) + "</td><td>" + td + "</td><td><a data-id='" + idTemp + "' href='javascript:;' class='removeLoanInsuranceType'>删除</a><input type='hidden' class='insuranceTypeId' name='insuranceInfoDetailList[" + (_index) + "].insuranceTypeId' value='" + idTemp + "'> <input type='hidden' class='insuranceTypeName' name='insuranceInfoDetailList[" + (_index) + "].insuranceTypeName' value='" + td + "'></td></tr>";
            $("#insuranceInfoTable1 tbody").append(newTrs);
        }
        tr.remove();
    }
});

//获取险种信息
function getInsuranceInfo() {
    comn.ajax({
        url: interUrl.insurance.loanInsuranceInfoToUpdate,
        data: {id: args['id']},
        success: function (res) {
            $("#loanInsuranceForm").values(res.data);
            //获取保险公司
            $("#insuranceCompanyId").getInsurance(res.data['insuranceCompanyId']);
            //初始化待添加险种列表
            getInsuranceInfoTable(res.data.insuranceCompanyId,res.data.insuranceTypeKey);
            if(res.data.insuranceInfoDetailList){
            	  getInsuranceInfoTable1(res.data.insuranceInfoDetailList);
            }
        }
    })
}
//保险公司
$("#insuranceCompanyId").change(function(){
    $("#insuranceCompanyName").val($(this).find("option:selected").text());
});

//保险类型
$("#insuranceTypeKey").change(function(){
    $("#insuranceTypeName").val($(this).find("option:selected").text());
});

//保存
$("#btn-save").click(function () {

	var insuranceNo=$('#insuranceNo').val();
	var g =  /^[\da-zA-Z]*$/g;

	if(!g.test(insuranceNo)){
		alert('保单号输入错误，请输入数字或字母!');
		return;
	}
	if($('#insuranceNo').val().length > 30) {
		alert('保险单号请保留30位');
		return;
	}
	var insuranceStatus=$("#insuranceStatus").val();
	
    $("#loanInsuranceForm").validate();
    if($("#loanInsuranceForm").valid()==true){
        comn.ajax({
            url: saveUrl,
            data: $.extend($("#loanInsuranceForm").values(),{projectId:projectId,insuranceStatus:insuranceStatus}),
            success: function (res) {
                tip({content: res.message || '保存成功!'});
                comn.closeTab();
            }
        })
    }
});



function getUser(){
    comn.ajax({
        url: interUrl.user.getUser,
        success: function (res) {
            $("#creator").val(res.data.realname);
        }
    })
}


