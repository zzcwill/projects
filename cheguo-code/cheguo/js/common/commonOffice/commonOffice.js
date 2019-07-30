/**
 * Created by hyb on 16/2/19.
 */
var customerId,businessTypeCode,paymentMethod, loanAmount_value;

businessTypeCode = {businessType: args['businessTypeCode']};
customerId = {customerId: args['customerId']};

//配偶云镜大数据查询情况
var spouseSearchStatus = {
    maritalStatus : '',
    spouseDecisionStatus : ''  
}


//选择车行
$("#carDealer").change(function(){
    $("[name='dealerName']").val($(this).find('option:selected').text());
});
//选择保险公司
$("#insurance").change(function(){
    $("[name='insuranceCompany']").val($(this).find('option:selected').text());
});

// 加载关系人
$("select[name='relationship']").getExpressCompanyCode("RelationShipType");

//计算所用值
//为所需输入框添加监听事件
function inputListen(inputArr,_callbackArr){
    for(var i=0;i<inputArr.length;i++){
        $("#"+inputArr[i]).keyup(function(){
            for(var j=0;j<_callbackArr.length;j++){
                window[_callbackArr[j]]();
            }
        });
    }
}

//计算首付款
function countDownPayment(){
    if(!isNaN($("#billingPrice").val())&&!isNaN($("#loanAmount").val())){
        var v = comn.accSub(parseFloat($("#billingPrice").val() || "0"), parseFloat($("#loanAmount").val() || "0"));
        $("#downPaymentAmount").val(v);
    }
    countPreCollectedAmount();
    countpayableAmount();
}
//计算贷款比例
function countLoanRatio(){
    if(!isNaN($("#loanAmount").val())&&!isNaN($("#billingPrice").val())&&parseFloat($("#billingPrice").val() || "0")>0){
        var v = (comn.accDiv(parseFloat($("#loanAmount").val() || "0"), parseFloat($("#billingPrice").val())) * 100).toFixed(2);
        $("#loanRatio").val(v);
    }
}
//计算预收金额
function countPreCollectedAmount(){
    if(!isNaN($("#downPaymentAmount").val())&&!isNaN($("#totalFee").val())&&!isNaN($("#collectedAmount").val())){
        var fee = parseFloat($("#downPaymentAmount").val() || "0") + parseFloat($("#totalFee").val() || "0") - parseFloat($("#collectedAmount").val() || "0");
        $("#preCollectedAmount").val(fee.toFixed(2));
    }
}

$("#downPaymentAmount, #totalFee, #collectedAmount").change(function(){ 
	countPreCollectedAmount(); 
});

var feeArr=["insuranceAmount","accountDeposit","renewalDeposit","pbDeposit","costAmount","purchaseTax","guarantyRiskAmount","serviceFee","gpsInstallationFee","liabilityAmount","agencyFee1","agencyFee2","otherFee","bankIrsFee","licenseFee","doorSurveyFee","agencyFee","outsourceSurveyFee", "valuationFee","xzzDiscountAmount"];
//计算费用合计
function countTotalFee(){
    var feeArr3=["insuranceAmount","accountDeposit","renewalDeposit","pbDeposit","costAmount","purchaseTax","guarantyRiskAmount","serviceFee","gpsInstallationFee","liabilityAmount","bankIrsFee","licenseFee","doorSurveyFee","agencyFee","outsourceSurveyFee", "valuationFee"];
    var totalFee = 0;
    var checkedV1 = $("input[name='agencyFee1IsAdd']:checked").val();
    var checkedV2 = $("input[name='agencyFee2IsAdd']:checked").val();
    var checkedV3 = $("input[name='otherFeeIsAdd']:checked").val();
    if(checkedV1==1){
        feeArr3.push("agencyFee1");
    }
    if(checkedV2==1){
        feeArr3.push("agencyFee2");
    }
    if(checkedV3==1){
        feeArr3.push("otherFee");
    }
    for(var i= 0;i<feeArr3.length;i++){
        if(!isNaN($("#"+feeArr3[i]).val())){
            totalFee+=parseFloat($("#"+feeArr3[i]).val() || "0");
        }
    }
    //当打款方式为全额打款，已收金额等于合计
    if (paymentMethod==1) {
        $("#totalFee,#receivableAmount").val(totalFee.toFixed(2));
    }else{
        $("#totalFee,#receivableAmount").val(totalFee.toFixed(2));
    }
    // $("#totalFee,#receivableAmount").val(totalFee.toFixed(2));
    countPreCollectedAmount();
    countpayableAmount();
}

//判断代收费用
function pdFee(a,b){
    return $("#"+a).change(function(){
        var _this=$(this);
        if(_this.val()==1){
            $("#"+b).attr("readonly",true).val(0);
        }else{
            $("#"+b).removeAttr("readonly");
        }
        countTotalFee();
    });
}
pdFee("agencyFee1Type","agencyFee1");
pdFee("agencyFee2Type","agencyFee2");
pdFee("otherFeeType","otherFee");
//计算应付费用
function countpayableAmount(){  //应付金额=贷款金额+已收金额-费用合计-车商贴息政策  业务品种=4时,应付金额=贷款金额-费用合计+已收金额-新总总贴息金额
    var fee;
    var businessTypeId=$("#businessTypeId").val();  //业务品种
    var xzzDiscountAmount=$("#xzzDiscountAmount").val() || 0; //新总总贴息金额
    var discountCarPolicy=$("#discountCarPolicy").val() || 0; //车商贴息政策
    var loanAmount=$("#loanAmount").val() || 0; //贷款金额
    var collectedAmount=$("#collectedAmount").val() || 0; //已收金额
    var totalFee=$("#totalFee").val() || 0; //费用合计
    if(!isNaN(discountCarPolicy) && !isNaN(loanAmount) && !isNaN(collectedAmount) && !isNaN(totalFee)){
        if(businessTypeId==4){
            fee = (parseFloat(loanAmount)+parseFloat(collectedAmount)-parseFloat(totalFee)-parseFloat(xzzDiscountAmount)).toFixed(2);
        }else{
            fee = (parseFloat(loanAmount)+parseFloat(collectedAmount)-parseFloat(totalFee)-parseFloat(discountCarPolicy)).toFixed(2);
        }
        $("#payableAmount").val(fee);
    }else{
        tip({content:"请输入金额"})
    }

}

//计算应付费用-老公式
//function countpayableAmount(){
//    var discountAmount=$("[name='discountAmount']").val() || 0; //贴息金额
//    if(!isNaN($("#downPaymentAmount").val())&&!isNaN($("#collectedAmount").val())&&!isNaN($("#totalFee").val())){
//        var fee = parseFloat($("#loanAmount").val() || "0")+parseFloat($("#collectedAmount").val() || '0')-parseFloat($("#totalFee").val() || '0')-parseFloat(discountAmount);
//        $("#payableAmount").val(fee.toFixed(2));
//    }
//}

//计算贴息金额
function countDiscountAmount(){
    var loanAmount=parseFloat($("#loanAmount").val()); //贷款金额
    var discountAmount=$("#discountAmount");
    var isPerCent=formulaForDiscountAmount.isPerCent; //是否是百分比
    var discountRate=formulaForDiscountAmount.discountRate; //贴息金额或者比例
    var discountLimit=formulaForDiscountAmount.discountLimit; //贴息上限
    if(isPerCent){ //如果是百分比
        var a=(loanAmount*(discountRate/100)).toFixed(2),b;
        if(discountLimit){
            b=a>=discountLimit?discountLimit:a;
        }
        discountAmount.val(b);
    }else{
        discountAmount.val(discountRate);
    }
    countDiscountCarPolicy(); //计算贴息政策
}

//输入贴息差额计算贴息政策
$(document).on("keyup", "#discountMargin", function (){
    var val=parseFloat($(this).val());
    if(val<0 || val>parseFloat($("#discountAmount").val())){
        tip({content:"贴息差额必须大于等于0,小于贴息金额"});
        $("#discountCarPolicy").val("");
        return false;
    }else{
        countDiscountCarPolicy(); //计算贴息政策
        counttestedRepaymentAmount(); //计算试算月还款额
    }
});


//车商贴息政策=贴息金额-贴息差额；
function countDiscountCarPolicy(){
    var discountAmount=parseFloat($("#discountAmount").val()|| 0); //贴息金额
    var discountMargin=parseFloat($("#discountMargin").val() || 0); //贴息差额
    $("#discountCarPolicy").val((discountAmount-discountMargin).toFixed(2));
    countpayableAmount();//计算应付金额
}

//算期数
$("#loanTerm").change(function(){
    counttestedRepaymentAmount();

});
function countQs(){
    var qs=parseInt($("#loanTerm").val());
    switch (qs){
        case 1:
            qs=12;
            break;
        case 2:
            qs=18;
            break;
        case 3:
            qs=24;
            break;
        case 4:
            qs=36;
            break;
    }
    return qs;
}
//计算试算月还款额
function counttestedRepaymentAmount(){  //试算月还款额=【贷款金额*(1+手续费率)-车商贴息政策】/贷款期限(月)    业务品种=4时,试算月还款额=贷款金额*(1+公司手续费率)/期限(月)
    var fee,qs=countQs();
    var businessTypeId=$("#businessTypeId").val(); //业务品种
    var discountAmount=$("[name='discountAmount']").val() || 0;
    var discountCarPolicy=$("[name='discountCarPolicy']").val() || 0;
    if(!isNaN($("#loanAmount").val())&&!isNaN($("[name='handingFee']").val())){
        if(businessTypeId==4){
            fee=comn.accDiv((parseFloat($("#loanAmount").val()|| "0")*(1+(parseFloat($("[name='handingFee']").val()|| "0")/100))),qs).toFixed(2);
        }else{
            fee=comn.accDiv((parseFloat($("#loanAmount").val()|| "0")*(1+(parseFloat($("[name='handingFee']").val()|| "0")/100))-parseFloat(discountCarPolicy)),qs).toFixed(2);
        }
        $("#testedRepaymentAmount").val(fee);
    }
}

//新总总贴息金额
$("#xzzDiscountAmount").blur(function () {
    var val=$(this).val();
    var loanAmount=$("#loanAmount").val();
    if(loanAmount!='' && !isNaN(loanAmount)){
        if(parseFloat(val)>parseFloat(loanAmount)){
            tip({content:'新总总贴息金额<=贷款金额'})
        }else if(parseFloat(val)<0){
            tip({content:'新总总贴息金额>=0'})
        }
    }
});

//逻辑判断,是否->toggle
function pdlj(a,b,c){
    if(c==1){
        return $("#"+a).change(function(){
            var _this=$(this);
            if(_this.val()==1){
                $("#"+b).attr("readonly",true).val(0);
            }else{
                $("#"+b).removeAttr("readonly");
            }
            countTotalFee();
        });
    }else if(c==2){
        return $("#"+a).change(function(){
            var _this=$(this);
            if(_this.val()==2){
                $("#"+b).attr("readonly",true).val(0);
            }else{
                $("#"+b).removeAttr("readonly");
            }
            countTotalFee();
        });
    }
}
//是否公牌
$("#isPublicLicense").change(function(){
    var _this = $(this);
    if(_this.val()==1){
        $("#licenseCompany").removeAttr("readonly").attr("required",true);
    }else{
        $("#licenseCompany").attr("readonly",true).removeAttr("required").val("");
    }
});

//第一年保费
$("#premiumType").change(function () {
    var _this = $(this);
    if (_this.val() == 1) {
        $("#insuranceAmount").removeAttr("readonly");
        $("#insuranceBox").show();
        countTotalFee();
    } else {
        $("#insuranceAmount").attr("readonly", true).val(0);
        $("#insuranceBox").hide();
        $("#insurance,#insuranceName").val("");
        countTotalFee();
    }
});

//判断打款方式
$("#paymentMethod").change(function() {
    var _this = $(this);
    if (_this.val() == 1) {
        paymentMethod = 1;
        //$("#collectedAmount").attr('readonly', true);
        //$("#collectedAmount").val(parseFloat($("#totalFee").val() || "0"));
    } else {
        paymentMethod = 0;
        //$("#collectedAmount").removeAttr("readonly").val();
    }
	$("#collectedAmount").val("");
    countTotalFee();
});


//是否续保
$("#isRenewal").change(function(){
    var _this=$(this);
    if(_this.val()==1){
        $("#renewalDeposit").removeAttr("readonly");
    }else{
        $("#renewalDeposit").attr("readonly",true).val(0);
    }
    countTotalFee();
});


function ljpd1(a,b){
    return $("#"+a).change(function(){
        var _this=$(this);
        if(_this.val()==1){
            $("#"+b).removeAttr("readonly");
        }else{
            $("#"+b).attr("readonly",true).val(0);
        }
        countTotalFee();
    });
}
//工本费
ljpd1("costType","costAmount");
//预置车辆购置税
ljpd1("predictedPurchasetax","purchaseTax");

//GPS
$("#gpsNumber").change(function(){
    var _this=$(this);
    var g=$("#gpsInstallationFee");
    var l=$("#liabilityAmount");
    var gpsType=$("#gpsType");
    var gpsProducer = $("#gpsProducer");
    if(_this.val()==0){
        gpsType.attr("disabled", true).val(0);
		$("#noGPS").removeAttr("disabled").val(0);
        g.attr("readonly", true).removeAttr("required").val(0);
        l.attr("readonly", true).removeAttr("required").val(0);
        gpsProducer.attr("readonly", true).removeAttr("required").val("");
    }else{
        gpsType.removeAttr("disabled");
		$("#noGPS").attr("disabled", true);
        g.removeAttr("readonly").attr('required', 'required');
        l.removeAttr("readonly").attr('required', 'required');
        gpsProducer.removeAttr("readonly").attr('required', 'required');
    }
    countTotalFee();
});

//根据住房状况控制月还款,月租,说明
$("#housingStatus").change(function(){
    var _this=$(this);
    var c=$("#mortgageRepayment");
    var a="<span class='text-danger'>*</span>";
    //if(_this.val()==1 || _this.val()==""){
    //    c.hide();
    //}else if(_this.val()==2){
    //    c.show().find("label").html(a+"月还款:");
    //}else if(_this.val()==3){
    //    c.show().find("label").html(a+"月租:");
    //}else if(_this.val()==4){
    //    c.show().find("label").html(a+"说明:");
    //}
    if (_this.val() == 5) {
        c.show().find("label").html(a + "租金:");
    } else if (_this.val() == 6) {
        c.show().find("label").html(a + "说明:");
    } else {
        c.hide();
    }
});
//是否贴息
//$("input[name='isDiscount']").change(function(){
//    var value=$("input[name='isDiscount']:checked").val();
//    if(value==="1"){
//        $("#discountAmount_se").show();
//        $("#isAdvanceDiscount_se").show();
//        counttestedRepaymentAmount();
//        countpayableAmount();
//    }else{
//        $("#discountAmount_se").hide();
//        $("#discountAmount").val("");
//        $("#isAdvanceDiscount_se").hide();
//        $("#isAdvanceDiscount2").attr("checked","checked");
//        counttestedRepaymentAmount();
//        countpayableAmount();
//    }
//});

//基本信息-借款人信息和配偶信息
function getBaseInfo(){
    comn.ajax({
        url: interUrl.myTask.approvalBaseInfo,
        data: loanApplyId,
        success: function (res) {
			if(!res.data.cardNoValid){ $("input[name='cardNoValidTime']").addClass("required"); }
            $("#professionCode").getOccupationList(res.data.professionCode);
            $("#post").getJobList(res.data.post);
            $("#workNatureCode").getUnitList(res.data.workNatureCode);
            if(res.data.freeDoor=='1'){
                $("#needDoorImg").show();
            }
            if(res.data.modifyFlag==1){
                $("#loanAmount, #handingFee, #billingPrice").attr("readonly",true);
            }
            if(res.data.maritalStatus == 1){
                $("#setLoanUser").removeClass("hide").click(function(){
                    oppSureModal("当前操作将会互换借款人和配偶信息，有一定的风险，您确定要转换吗？");
                    $("#sureOption").unbind("click").click(function () {
                        comn.ajax({
                            url: interUrl.myTask.reverseSpouseInfo,
                            data: {loanApplyId: args['loanApplyId']},
                            success: function (res) {
                                $("#sureModal").modal("hide");
                                tip({content: "反转成功！"});
                                
                                //配偶主贷人互换查询云镜报告
                                function searchReport() {
                                    comn.ajax({
                                        url: interUrl.cloudMirrorReport.decisionengineLoanQueryDecision,
                                        data: {
                                            loanApplyId: args['loanApplyId'],
                                            type:3,
                                        },
                                        success: function (res) {

                                        }
                                    })                                     
                                }
                                searchReport();
                                location.reload();
                            }
                        })
                    });
                });
            }
            $("#getPos").data("callback",function(BMap, map){
                var myIcon = new BMap.Icon("./../../../images/picture_icon.png", new BMap.Size(30,30));
                function addMarker(point){
                    var marker = new BMap.Marker(point,{icon:myIcon});
                    map.addOverlay(marker);
                }
                $.each(res.data.realVisitAddressItudeList, function(i, o){
                    var pointArr = o.split(",");
                    addMarker(new BMap.Point(pointArr[0], pointArr[1]));
                });
            });
            if(res.data.maritalStatus==1){
                $("#spousePanel").show();
                window['_spouseMobilePhone_baseInfo']=res.data.spouseMobilePhone;
                if(res.data.spouseCompanyAddressPid!="" || res.data.spouseCompanyAddressPid!=null){
                    $("#province_3").getProvinceC({
                        code: res.data.spouseCompanyAddressPid,
                        value: res.data.spouseCompanyAddressPname
                    }, $("#province_3").is(":disabled"));
                    $("#city_3").getCityC(res.data.spouseCompanyAddressPid, {
                        code: res.data.spouseCompanyAddressCid,
                        value: res.data.spouseCompanyAddressCname
                    }, $("#city_3").is(":disabled"));
                    $("#area_3").getAreaC(res.data.spouseCompanyAddressCid, {
                        code: res.data.spouseCompanyAddressRid,
                        value: res.data.spouseCompanyAddressRname
                    }, $("#area_3").is(":disabled"));
                    //before 2016-06-01
                    // $("#province_3").getProvince(res.data.spouseCompanyAddressPid);
                    // $("#city_3").getCity(res.data.spouseCompanyAddressPid,res.data.spouseCompanyAddressCid);
                    // $("#area_3").getArea(res.data.spouseCompanyAddressCid,res.data.spouseCompanyAddressRid);
                }
                //$("#province_3").getProvince(res.data.spouseCompanyAddressPid) before 2016-06-01
                $("#province_3").change(function() {
                    if (this.value) {
                        $("#province_3_name").val($(this).find('option:selected').text());
                        $("#area_3").val("");
                        return $("#city_3").getCity(this.value).unbind("change").change(function() {
                            if (this.value) {
                                $("#city_3_name").val($(this).find('option:selected').text());
                                return $("#area_3").getArea(this.value);
                            }
                        });
                    }
                });
                $("#city_3").change(function() {
                    if (this.value) {
                        $("#city_3_name").val($(this).find('option:selected').text());
                        return $("#area_3").getArea(this.value);
                    }
                });
                $("#area_3").change(function(){
                    $("#area_3_name").val($(this).find('option:selected').text());
                });
            }
            if(res.data.homeAddressPid!="" || res.data.homeAddressPid!=null){
                $("#province_1").getProvinceC({
                    code: res.data.homeAddressPid,
                    value: res.data.homeAddressPname
                }, $("#province_1").is(":disabled"));
                $("#city_1").getCityC(res.data.homeAddressPid, {
                    code: res.data.homeAddressCid,
                    value: res.data.homeAddressCname
                }, $("#city_1").is(":disabled"));
                $("#area_1").getAreaC(res.data.homeAddressCid, {
                    code: res.data.homeAddressRid,
                    value: res.data.homeAddressRname
                }, $("#area_1").is(":disabled"));
                //before 2016-06-01
                // $("#province_1").getProvince(res.data.homeAddressPid);
                // $("#city_1").getCity(res.data.homeAddressPid,res.data.homeAddressCid);
                // $("#area_1").getArea(res.data.homeAddressCid,res.data.homeAddressRid);
            }
            if(res.data.companyAddressPid!="" || res.data.companyAddressPid!=null){
                $("#province_2").getProvinceC({
                    code: res.data.companyAddressPid,
                    value: res.data.companyAddressPname
                }, $("#province_2").is(":disabled"));
                $("#city_2").getCityC(res.data.companyAddressPid, {
                    code: res.data.companyAddressCid,
                    value: res.data.companyAddressCname
                }, $("#city_2").is(":disabled"));
                $("#area_2").getAreaC(res.data.companyAddressCid, {
                    code: res.data.companyAddressRid,
                    value: res.data.companyAddressRname
                }, $("#area_2").is(":disabled"));
                //before 2016-06-01
                // $("#province_2").getProvince(res.data.companyAddressPid);
                // $("#city_2").getCity(res.data.companyAddressPid,res.data.companyAddressCid);
                // $("#area_2").getArea(res.data.companyAddressCid,res.data.companyAddressRid);
            }

            var housingStatus=res.data.housingStatus;
            var c=$("#mortgageRepayment");
            var a="<span class='text-danger'>*</span>";
            if(housingStatus!="" || housingStatus!=null){
                //if(housingStatus==2){
                //    c.show().find("label").html(a+"月还款:");
                //}else if(housingStatus==3){
                //    c.show().find("label").html(a+"月租:");
                //}else if(housingStatus==4){
                //    c.show().find("label").html(a+"说明:");
                //}else if(housingStatus==1){
                //    c.hide();
                //}
                if (housingStatus == 5) {
                    c.show().find("label").html(a + "租金:");
                } else if (housingStatus == 6) {
                    c.show().find("label").html(a + "说明:");
                } else {
                    c.hide();
                }
            }
            //$("#province_1").getProvince(res.data.homeAddressPid)  before2016-06-01
            $("#province_1").change(function() {
                if (this.value) {
                    $("#province_1_name").val($(this).find('option:selected').text());
                    $("#area_1").val("");
                    return $("#city_1").getCity(this.value).unbind("change").change(function() {
                        if (this.value) {
                            $("#city_1_name").val($(this).find('option:selected').text());
                            return $("#area_1").getArea(this.value);
                        }
                    });
                }
            });
            $("#city_1").change(function() {
                if (this.value) {
                    $("#city_1_name").val($(this).find('option:selected').text());
                    return $("#area_1").getArea(this.value);
                }
            });
            $("#area_1").change(function(){
                $("#area_1_name").val($(this).find('option:selected').text());
            });
            //$("#province_2").getProvince(res.data.companyAddressPid) before 2016-06-01
            $("#province_2").change(function() {
                if (this.value) {
                    $("#province_2_name").val($(this).find('option:selected').text());
                    $("#area_2").val("");
                    return $("#city_2").getCity(this.value).unbind("change").change(function() {
                        if (this.value) {
                            $("#city_2_name").val($(this).find('option:selected').text());
                            return $("#area_2").getArea(this.value);
                        }
                    });
                }
            });
            $("#city_2").change(function() {
                if (this.value) {
                    $("#city_2_name").val($(this).find('option:selected').text());
                    return $("#area_2").getArea(this.value);
                }
            });
            $("#area_2").change(function(){
                $("#area_2_name").val($(this).find('option:selected').text());
            });
            window['_mobilePhone_baseInfo']=res.data.mobilePhone;
            $("#approvalBaseInfoForm").values(res.data);
            $("#getPos").data("pos", res.data.visitAddressLongitude + "," + res.data.visitAddressLatitude);
            if($("#realCarOwner").val()==null||$("#realCarOwner").val()==""){
                $("#realCarOwner").val($("#customerName").val());
            }
            $("input[name='cardNoValidTime']").addClass(['required', ''][res.data.cardNoValid]);
            $("#filePath").html(res.data.filePath ? "<img src='"+ res.data.filePath +"' data-src='"+ res.data.filePath +"' height=85 />" : "");
            $("#faceUrl").html(res.data.faceUrl ? "<img src='"+ res.data.faceUrl +"' data-src='"+ res.data.faceUrl +"' height=85 />" : "");

            //配偶云镜大数据按钮相关判断start
            function spouseReportJudge (data) {
                //获得配偶相关信息
                spouseSearchStatus.maritalStatus = data.maritalStatus;
                spouseSearchStatus.spouseDecisionStatus = data.spouseDecisionStatus;              


                if(data.maritalStatus === 1) {
                    $('#spouseSearchInfo input').eq(0).attr('value',data.spouseName);
                    $('#spouseSearchInfo input').eq(1).attr('value',data.spouseCardNo);
                    $('#spouseSearchInfo input').eq(2).attr('value',data.spouseMobilePhone);
                    if(data.spouseDecisionStatus !== undefined) {
                        if(data.spouseDecisionStatus === 1) {
                            $('#spouseSearchTip').removeClass('hide');
                            $('#spouseSearchTip').text('请稍后再刷新查看');
                            return;
                        }

                        if(data.spouseDecisionStatus === 2) {
                            $('#spouseSearchTip').removeClass('hide');
                            $('#spouseSearchTip').text('配偶云镜大数据通过');
                            return;
                        }

                        if(data.spouseDecisionStatus === 3 || data.spouseDecisionStatus === 4) {
                            $('#spouseSearchTip').removeClass('hide');
                            $('#spouseSearchTip').text('配偶命中大数据黑名单');
                            return;
                        }

                        if(data.spouseDecisionStatus === 200) {
                            $('#spouseSearch').removeClass('hide');
                            $('#spouseSearchTip').addClass('hide');
                            $('#spouseSearchTip').text('');
                            return;
                        }                        
                    } 

                    $('#spouseSearch').removeClass('hide');
                    
                }
            }
            spouseReportJudge(res.data);
            //配偶云镜大数据按钮相关判断start            
        }
    });
}

getBaseInfo();

//基本信息-紧急联系人
getContacter();

//反担保信息-抵/质押信息
getApprovalAsserts();

//金融产品选择
$(document).on("change","#productId",function(){
    var productName = $("#productId option:selected").html();
    $("#productName").val(productName);
});

//预算单信息
comn.ajax({
    url: interUrl.myTask.approvalBudgetInfo,
    data: loanApplyId,
    success: function (res) {
        loanAmount_value = res.data.loanAmount;
        //贷款修改流程,审批流程业务录入环节可修改金融产品
        $("#productId").getFinancialProduct(res.data.loanTerm,res.data.coBankId,res.data.businessTypeId,res.data.productId);
        if(res.data.carType=="2"){
            //如果是二手车
            $("#isSecondCar").show();
            $("#isSecondCarInfo fieldset").attr("disabled", "disabled");
            $("#valuationFeeTip").removeClass('hide');
            $("#valuationFee").prop("disabled", false);
        }else if(res.data.carType == "1"){
            res.data.valuationFee = 0;
        }
        if(res.data.isDiscount===1){ //是贴息业务
            isDiscount=true;
            $(".discount_se").show();
            if(res.data.schemeInfo){
                schemeInfo=true;
                formulaForDiscountAmount=res.data.schemeInfo.disPolicySchemeNpers[0]; //计算贴息金额需要用到的数据
            }else{
                schemeInfo=false;
            }
        }

        $("#approvalBudgetInfoForm").values(res.data);

        //add 2016-05-25
        // $("#getBrand").getBrandC({
        //     code: res.data.carBrand,
        //     value: res.data.carBrandName
        // }, $("#getBrand").is(":disabled"));
        $("#getBrand").getBrandC( $("#getBrand").is(":disabled"));
        $("#getCarList").getCarListC(res.data.carBrand, {
            code: res.data.carMake,
            value: res.data.carMakeName
        }, $("#getCarList").is(":disabled"));
        $("#getCarModel").getCarModelC(res.data.carMake, {
            code: res.data.carModel,
            value: res.data.carModelName
        }, $("#getCarModel").is(":disabled"));
        if(res.data.viceSignerName=="" || res.data.viceSignerName==null){
            $("#viceSignerNameC").hide(); //若无副签单员则隐藏
        }
        $("#insurance").getInsurance(res.data.insuranceCompanyId);
        countDownPayment();//首付款
        countLoanRatio();//贷款比例
        counttestedRepaymentAmount();
        //银行直销逻辑判断  businessTypeId
        if(res.data.businessTypeId==2){
            $("#yhzx-c1").hide();
            $("#collectedAmount").attr("disabled","disabled");
            $("#yhzx-c").text("应收金额");
            $("#receivableAmount").show();
            $("#payableAmount").hide();
            $("#paymentMethodBox").hide();
        }
        if(res.data.businessTypeId==4){
            $("#xzzDiscountAmount_se").removeClass('hide');
        }

        if(res.data.premiumType!=1){
            $("#insuranceAmount").attr("readonly",true).val(0);
            $("#insuranceBox").hide();
        }
        if(res.data.isRenewal!=1){
            $("#renewalDeposit").attr("readonly",true).val(0);
        }
        if(res.data.costType!=1){
            $("#costAmount").attr("readonly",true).val(0);
        }
        if(res.data.predictedPurchasetax!=1){
            $("#purchaseTax").attr("readonly",true).val(0);
        }
        if(res.data.gpsNumber==0){
            $("#gpsType").attr("disabled", true);
            $("#gpsInstallationFee").attr("readonly",true);
            $("#liabilityAmount").attr("readonly",true);
            $("#gpsProducer").attr("readonly",true);
        }
        if(res.data.agencyFee1Type==1 || res.data.agencyFee1Type==""){
            $("#agencyFee1").attr("readonly",true);
        }
        if(res.data.agencyFee2Type==1 || res.data.agencyFee2Type==""){
            $("#agencyFee2").attr("readonly",true);
        }
        if(res.data.otherFeeType==1 || res.data.agencyFee1Type==""){
            $("#otherFee").attr("readonly",true);
        }
        if(res.data.isPublicLicense==2){
            $("#licenseCompany").attr("readonly",true);
        }
        /*if(res.data.paymentMethod==1){
            $("#collectedAmount").attr("readonly",true);
            $("#paymentMethod").trigger('change');
        }*/
        /*$("#paymentMethod").change(function(){
            var _this=$(this);
            if(_this.val()==1){
                paymentMethod = 1;
                $("#collectedAmount").val(parseFloat($("#totalFee").val() || "0"));
            }
        });*/

        // comn.linkage({
        // 	type: "car",
        // 	level: [{
        // 		el: $("#car_Brand"),
        // 		key: res.data.carBrand,
        // 		target: $("#carBrandName")
        // 	},{
        // 		el: $("#car_Make"),
        // 		key: res.data.carMake,
        // 		target: $("#carMakeName")
        // 	},{
        // 		el: $("#car_Model"),
        // 		key: res.data.carModel,
        // 		target: $("#carModelName")
        // 	}]
        // });
        countTotalFee();
    }
});

inputListen(['billingPrice','loanAmount'],['countDownPayment','countLoanRatio','counttestedRepaymentAmount','countPreCollectedAmount','countpayableAmount']);//监听首付款,监听贷款比例
inputListen(['downPaymentAmount','collectedAmount','billingPrice'],['countPreCollectedAmount','countpayableAmount']);//监听预收金额
inputListen(feeArr,['countTotalFee','countpayableAmount']);//监听费用合计,监听应付金额
inputListen(['handingFee','discountAmount'],['counttestedRepaymentAmount','countpayableAmount']);//监听试算月还款额

//加入预收功能
$("[name='agencyFee1IsAdd'],[name='agencyFee2IsAdd'],[name='otherFeeIsAdd']").click(function(){
    countTotalFee();
});



//反担保信息-保证人信息 table
//approvalGuarantor
var table_guarantor,handle_guarantor,tableEvent_guarantor;
table_guarantor = function (params) {
    var p=params.data;
    return comn.ajax({
        url: interUrl.myTask.approvalGuarantor,
        data: $.extend(loanApplyId,p),
        success: function (res) {
            params.success({
                'total': res.totalItem,
                rows: res.data
            });
            return params.complete();
        }
    });
};

handle_guarantor= function (value, row, index) {
    return ["<a href='javascript:;' class='delete'>删除</a>"].join("");
};

tableEvent_guarantor={
    "click .delete":function(e,a,item,index){
        //删除保证人
        comn.ajax({
            url: interUrl.myTask.deleteLoanGuarantorInfo,
            data: {guarantorId:a},
            success: function (res) {
                tip({content: res.message || "删除成功!"});
                $("#table_guarantor").bootstrapTable('refresh');
            }
        });
    }
};

//保存业务录入-基本信息
function saveBaseInfo(callback) {
    if($("#approvalBaseInfoForm").valid() == true) {
        var sex={sex:$("[name='sex']").val()};
        var maritalStatus={maritalStatus:$("[name='maritalStatus']").val()};
        comn.ajax({
            url: interUrl.myTask.editLoanerInfo,
            data: $.extend($("#approvalBaseInfoForm").values(),sex,maritalStatus,loanApplyId),
            success: function (res) {
                //tip({content: res.message || "基本信息保存成功!"});
				if(typeof(callback) == "function"){
					callback();
				}
            }
        });
    }
}


$("#btn-baseInfo-save").click(function () {
    $("#approvalBaseInfoForm").validate();
    if (($("#approvalBaseInfoForm input[name=driverLicence]").val() == "") || ($("#approvalBaseInfoForm input[name=education]").val() == "") || ($("#approvalBaseInfoForm input[name=professionCode]").val() == "")|| ($("#approvalBaseInfoForm input[name=industry]").val() == "")|| ($("#approvalBaseInfoForm input[name=housingStatus]").val() == "")|| ($("#approvalBaseInfoForm input[name=reservedFundsYear]").val() == "") || ($("#approvalBaseInfoForm input[name=socialYear]").val() == "")) {
        tip ({content : "请先保存客户评分卡"});
        return;
    }
    //if( $("#spousePanel").attr("style") == "" && ($("#approvalBaseInfoForm input[name=spouseDriverLicence]").val() == "")) {
    //    tip ({content : "请先保存客户评分卡"});
    //    return;
    //}
	saveBaseInfo();
});

//保存预算单
function saveBudgetInfo(callback) {
	var budgetInfoVal = $("#approvalBudgetInfoForm").values();
	//console.log(budgetInfoVal);
	if(budgetInfoVal.gpsNumber != '0' && budgetInfoVal.gpsType == "0" ){ return tip({content: "请选择GPS类型!"}) }
    if($("#approvalBudgetInfoForm").valid() == true) {
        if(schemeInfo){
            comn.ajax({
                url: interUrl.myTask.saveBudgetInfo,
                data: $.extend(budgetInfoVal, loanApplyId),
                success: function (res) {
                    tip({content: res.message || "保存成功!"});
                    comn.ajax({
                        url: interUrl.myTask.approvalAsserts,
                        data: loanApplyId,
                        success: function (res) {
                            $("#approvalGuarantorForm").values(res.data);
							if(typeof(callback) == "function"){
								callback(); 
							}
                        }
                    });
                }
            });
        }else{
            tip({content:"贴息方案已停用,请返回上一节点重新选择贴息方案"})
        } 
    } 
}


//保存业务录入-预算单信息
//saveBudgetInfo
$("#btn-budgetInfo-save").click(function () {
    $("#approvalBudgetInfoForm").validate();
	saveBudgetInfo();
});

//查询关联保证人
var table_rGuarantor,handle_rGuarantor,tableEvent_rGuarantor;
table_rGuarantor = function (params) {
    var p=params.data;
    return comn.ajax({
        url: interUrl.myTask.relateLoanGuarantor,
        data: $.extend($("#searchGuarantor").values(),loanApplyId,p),
        success: function (res) {
            params.success({
                'total': res.totalItem,
                rows: res.data
            });
            return params.complete();
        }
    });
};

$("#guarantorModal").on("shown.bs.modal",function(){
    $("#table_rGuarantor").bootstrapTable(comn.table);
    $("#table_rGuarantor").bootstrapTable("refresh");
});
$("#btn-guarantor-relate").click(function () {
    $("#guarantorModal").modal("show");
});


tableEvent_rGuarantor = {
    "click .xz": function (e, a, item, index) {
        var p={id:item.id,customerId:item.customerId,customerName:item.customerName,cardType:item.cardType,cardNo:item.cardNo,mobilePhone:item.mobilePhone,id:item.id};
        comn.ajax({
            url: interUrl.myTask.addLoanGuarantorInfo,
            data: $.extend(p,loanApplyId),
            success: function (res) {
                tip({content: res.message || "保存成功!"});
                $("#guarantorModal").modal("hide");
                $("#table_guarantor").bootstrapTable('refresh');
            }
        });
    }
};

handle_rGuarantor = function (value, row, index) {
    //return ["<input type='radio' name='customerId' class='xz' value='" + value + "'/>"].join("");
    return ["<a href='javascript:;' class='xz'>选择</a>"].join("");
};

//搜索担保人信息
$("#btn-guarantor-search").click(function(){
    $("#table_rGuarantor").bootstrapTable('selectPage', 1);
});

var handle_2, tableEvent_2, handle_save = null;
handle_2 = function (value, row, index) {
    return ["<div class='btn-group btn-group-xs'>", "<button type='button' class='btn btn-primary'>操作</button>", "<button type='button' class='btn btn-primary dropdown-toggle' data-toggle='dropdown'>", "<span class='caret'></span>", "<span class='sr-only'>下拉切换</span>", "</button>", "<ul class='dropdown-menu' role='menu'>", "<li><a class='delete'>删除</a></li>", "<li><a class='edit'>修改</a></li>", "</ul>", "</div>"].join("");
};

tableEvent_2 = {
    "click .delete": function (e, a, item, index) {
        comn.ajax({
            url: interUrl.myTask.deleteLoanCustomerContacter,
            data: {contacterId: a},
            success: function (res) {
                //if(ll=="1"){
                //    $("#realCarOwner").val($("#customerName").val());
                //}

                $("#table_contacter").bootstrapTable('refresh');
                getBaseInfo();
            }
        });
    },
    "click .edit": function (e, a, item, index) {
        $("#contacter_modal .modal-title").text("修改紧急联系人");
        $("#contacter_modal").modal("show");
        $("#contacterForm").values(item);
        handle_save = function () {
            $("#contacterForm").validate();
            if($("#contacterForm").valid() == true){
                comn.ajax({
                    url: interUrl.myTask.modifyLoanCustomerContacter,
                    data: $.extend($("#contacterForm").values(),loanApplyId, {contacterId:a}),
                    success: function (res) {
                        $("#table_contacter").bootstrapTable('refresh');
                        $("#contacter_modal").modal("hide");
                        fnCall();
                        //getBaseInfo();
                        //if(res.data.isCarUser=="1"){
                        //    $("#realCarOwner").val(res.data.emergencyContact);
                        //    $("[name='isAgency']").val(2); //是否代购设为否
                        //}else if(res.data.emergencyContact==$("#realCarOwner").val()){
                        //    $("#realCarOwner").val($("#customerName").val());
                        //}
                    }
                });
            }

        }

    }
};

function fnCall() {
    comn.ajax({
        url: interUrl.myTask.approvalBaseInfo,
        data: loanApplyId,
        success: function (res) {
            var o = {
                "realCarOwner": res.data.realCarOwner,
                "isAgency":res.data.isAgency
            };
            window['_mobilePhone_baseInfo']=res.data.mobilePhone;
            $("#approvalBaseInfoForm").values(o);
        }
    })
}

$("#btn-contacter-add").click(function () {
    $("#contacter_modal .modal-title").text("新增紧急联系人");
    $("#contacter_modal").modal("show");
    handle_save = function () {
        $("#contacterForm").validate();
        if($("#contacterForm").valid() == true) {
            comn.ajax({
                url: interUrl.myTask.saveLoanCustomerContacter,
                data: $.extend($("#contacterForm").values(), loanApplyId),
                success: function (res) {
                    $("#table_contacter").bootstrapTable('refresh');
                    $("#contacter_modal").modal("hide");
                    //if(res.data.isCarUser=="1"){
                    //    $("#realCarOwner").val(res.data.emergencyContact);
                    //    $("[name='isAgency']").val(2); //是否代购设为否
                    //}
                    //getBaseInfo();
                    fnCall();
                }
            });
        }
    }
});

$("#btn-contacter-save").click(function () {
    handle_save();
});

$(function () {
    //证件是否长期有效
    $("input[name='cardNoValid']").change(function(){
        if(this.value == 0){
            $("input[name='cardNoValidTime']").addClass("required");
        }else{
            $("input[name='cardNoValidTime']").removeClass("required");
        }

    });
});

//add 2016-05-25
// $("#getBrand").change(function(){
//     $("input[name='carBrandName']").val($(this).find("option:selected").text());
//     $("#getCarList").getCarList(this.value);
//     $("#getCarModel, input[name=carMakeName], input[name=carModelName]").val("");
// });
//
$(document).on("blur", "#loanAmount", function(){
    if ($(this).val() != loanAmount_value) {
        tip ({content: "贷款金额已变化，请再次确认相关费用信息是否正确！"});
    }
    if(isDiscount){ //如果是贴息业务
        countDiscountAmount();//重新计算贴息金额
    }
    countpayableAmount(); //重新计算应付金额
    counttestedRepaymentAmount(); //重新计算试算月还款额
});


$(document).on("change", "#getBrand", function (){
    var code = $(this).attr("data-code");
    $(this).prev().val(code);
    $("#getCarList, #getCarModel").val("--请选择--").next().remove();
    $("#getCarList").getCarList(code);
});
$("#getCarList").change(function(){
    var code = $(this).attr("data-code");
    $(this).prev().val(code);
    $("#getCarModel").val("--请选择--").next().remove();
    $("#getCarModel").getCarList(code);

});
$("#getCarModel").change(function(){
    var code = $(this).attr("data-code");
    $(this).prev().val(code);
});
$(document).on("change", "#professionCode", function () {
    $("#profession").val($(this).find("option:selected").text());
});
$(document).on("change", "#post", function () {
    $("#postName").val($(this).find("option:selected").text());
});
$(document).on("change", "#workNatureCode", function () {
    $("#workNature").val($(this).find("option:selected").text());
});
