var customerId,businessTypeCode;

businessTypeCode = {businessType: args['businessTypeCode']};
customerId = {customerId: args['customerId']};

//基本信息-借款人信息和配偶信息
comn.ajax({
    url: interUrl.myTask.approvalBaseInfo,
    data: loanApplyId,
        success: function (res) {
        args['customerId'] = res.data.customerId;
        $('#loadCredit').getLoad();
        if(res.data.carType==2){
            $("#sc-isAdvance").show();
        }
        if(res.data.maritalStatus==1){
            $("#spousePanel").show();
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

        $("#approvalBaseInfoForm").values(res.data);
        $("#getPos").data("pos", res.data.visitAddressLongitude + "," + res.data.visitAddressLatitude);
        $("#filePath").html(res.data.filePath ? "<img src='"+ res.data.filePath +"' height=85 />" : "");
        $("#faceUrl").html(res.data.faceUrl ? "<img src='"+ res.data.faceUrl +"' height=85 />" : "");
    }
});


//基本信息-紧急联系人
getContacter();

//反担保信息-抵/质押信息
getApprovalAsserts();

//预算单信息
comn.ajax({
    url: interUrl.myTask.approvalBudgetInfo,
    data: loanApplyId,
    success: function (res) {
        if(res.data && res.data.isGpsFee == 1){
            $('.fuseGpsFee').removeClass('hide');
            $('input[name=fuseGpsFee]').attr('disabled',false);
        }
        if(res.data && res.data.isInsuranceFee == 1){
            $('.fuseInsuranceFee').removeClass('hide');
            $('input[name=fuseInsuranceFee]').attr('disabled',false);
        }
        if(res.data && res.data.isPurchaseTaxFee == 1){
            $('.fusePurchaseTaxFee').removeClass('hide');
            $('input[name=fusePurchaseTaxFee]').attr('disabled',false);
        }
        if ((res.data.cannelStatus === 3) || (res.data.cannelStatus === 2 && res.data.isDealerGroup === 1)) $("#isDealerGroup").removeClass("hide");
        if(res.data.carType=="1" && res.data.businessTypeId=="1"){//是否贴息
            $("#isDiscount_se").show();
            if(res.data.isDiscount===1){
                $("#discountAmount_se,#isAdvanceDiscount_se").show();
            }
        }
        if(res.data.isDiscount===1){ //是贴息业务
            $(".discount_se").show();
        }
        $("#approvalBudgetInfoForm").values(res.data);
        if(res.data.carType==2){
            //如果是二手车
            $("#isSecondCar").show();
            //$("#agencyFee1TypeRadio,#agencyFee2TypeRadio,#otherFeeTypeRadio").hide();
            //$("#valuationFeeTip").removeClass('hide');
            $("#valuationFeeTip").removeClass('hide');
        }
        if(res.data.viceSignerName=="" || res.data.viceSignerName==null){
            $("#viceSignerNameC").hide(); //若无副签单员则隐藏
        }
        //$("#carDealer").getCarDealer(res.data.dealerId);
        $("#insurance").getInsurance(res.data.insuranceCompanyId);
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
        $("#paymentMethod").change(function(){
            var _this=$(this);
            if(_this.val()==1){
                $("#collectedAmount").val()
            }
        });
        var dataArr =[[".loanTerm", "LoanTerm", res.data.loanTerm]];
        $.getCommonMethodPort(dataArr);
    }
});


//反担保信息-保证人信息 table
//approvalGuarantor
var table_guarantor;
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

//流程部分Begin
//流程意见保存和流程提交
$("#btn-opinion-save").click(function () {
    $("#opinionForm").validate();
    if($("#opinionForm").valid() == true){
        oppSureModal("是否确认提交");
        $("#sureOption").unbind("click").click(function () {
            //保存流程意见
            comn.ajax({
                url: interUrl.common.opinion,
                data: $.extend($("#opinionForm").values(), argsBopInfoId, {conclusion: 1}),
                success: function (res) {
                    $("#sureModal").modal("hide");
                    if (args['flow'] == 'modify-task') {
                        flowSubmit(interUrl.loanModify.preSubmit, interUrl.loanModify.submit2next, './Modal/task/myTask/index.html', loanApplyId);
                    } else if (args['flow'] == 'modify') {
                        flowSubmit(interUrl.loanModify.preSubmit, interUrl.loanModify.submit2next, './Modal/loanManage/loanModify/index.html', loanApplyId);
                    }
                }
            });
        })
    }
});

//撤销
$("#btn-cancel").click(function () {
    oppSureModal("是否确认撤销");
    $("#sureOption").unbind("click").click(function () {
        flowCancel();
    })
});
