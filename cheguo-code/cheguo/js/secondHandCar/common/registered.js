var load, evaluationNum, commonLoad, submitForm, handle_1, dataLoad_3, loading, procedures, flow, userList;
if (args["currentNodeKey"] == "FIRST_ESTIMATE" || args["currentNodeKey"] == "SECOND_ESTIMATE" || args["currentSecondCar"] == "currentSecondCar") {
    $("#secondCarBankName").removeClass("hide");
    $("#bankId").addClass("hide").prop("disabled", "disabled");
}
dataLoad_3 = function (params) {
    if (!params.data.businessObjectId || !params.data.businessGroupId)return;
    $("#businessObjectId").val(params.data.businessObjectId);
    comn.ajax({
        async: false,
        url: interUrl.gr.flowUser,
        data: {
            boId: params.data.businessObjectId,
            businessGroupId: params.data.businessGroupId,
            businessType: params.data.nextFlowType,
            nodeCode: params.data.nextFlowNodeCode
        },
        success: function (res) {
            $("#task").modal("show");
            $("#nextFlowNodeName").html(res.data.nextFlowNodeName);
            if (res.data.userTasks) {
				params.success({
					'total': res.data.userTasks.length,
					rows: res.data.userTasks
				});
                $("#table_3").bootstrapTable('load', res.data.userTasks);
            }
            params.complete();
            $("#task input[type='radio']").eq(0).attr('checked', true);
        }
    });
}

handle_3 = function (value, row, index) {
    return ["<input type='radio' name='userId' class='role' userId='" + row.userId + "' userName='" + row.userName + "'/>"].join("");
};

load = function (type, id) {  //初始化加载模块
    commonLoad(type, id); //调取公共加载模块
};

flow = function (id) {   //获取流程意见
    if (args["type"] == 4) {   //初评
        var datas = {
            boId: id,
            businessType: 'SECOND_HAND_CAR_ESTIMATE_FLOW',
            nodeKey: 'FIRST_ESTIMATE'
        }
    } else if (args["type"] == 6) {   //过户审批
        var datas = {
            boId: id,
            businessType: 'SECOND_HAND_CAR_TRANSFER_FLOW',
            nodeKey: 'TRANSFER_APPROVAL'
        }
    } else if (args["type"] == 7) {    //评估报告录入
        var datas = {
            boId: id,
            businessType: 'SECOND_HAND_CAR_TRANSFER_FLOW',
            nodeKey: 'TRANSFER_ESTIMATE_REPORT'
        }
	};
    comn.ajax({
        url: interUrl.second.opinionLast,
        data: datas,
        success: function (res) {
            $("#registeredForm").values(res.data);
        }
    });
}

userList = function (a) {    //获取复评师
    var secondEstimateUserName = a.secondEstimateUserName;
    var secondEstimateUserId = a.secondEstimateUserId;
    comn.ajax({
        url: interUrl.second.secondEstimateUserList,
        data: {
            orgId: a.launchOrganizationId,
        },
        success: function (res) {
            var htmlss = '';
            htmlss += '<option value="0">--请选择--</option>';
            var a = res.data;
            var length = a.length;
            for (var i = 0; i < length; i++) {
                htmlss += '<option value="' + a[i].uid + '">' + a[i].realname + '</option>';
            }
            $("#loanLaunchDate, .loanLaunchDate").html(htmlss);
            $("input[name=secondEstimateUserName]").val(secondEstimateUserName); //赋值复评师
            $(".loanLaunchDate").val(secondEstimateUserId); //赋值复评师
            $("#loanLaunchDate option[value=" + secondEstimateUserId + "]").attr("selected", true); //赋值复评师
        }
    });
}

commonLoad = function (type, id) {   //公共加载模块
    loading(type, id);  //数据填充接口
    if (id == -1) {
        $("#getBrand").getBrandC( $("#getBrand").is(":disabled"));
    }
};
$('#newPrice').on('change', function () {
    reference($('#newPrice').val(),$('input[name=licenseDate]').val(),$('#createTime').val())
});
$('input[name=licenseDate]').on('change', function () {
    reference($('#newPrice').val(),$('input[name=licenseDate]').val(),$('#createTime').val())
});
function reference (newPrice,licenseDate,createTime) {
    var createDateTime,month,referencePrice;
    if( newPrice && licenseDate || newPrice===0 && licenseDate){
        var date = new Date();
        var y = date.getFullYear();
        var m = date.getMonth() < 9 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
        var d = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
        var today = y + "-" + m + "-" + d;
        createDateTime = createTime || today;
        month = getMonth(createDateTime) - getMonth(licenseDate) + 1;
        referencePrice = Math.round(newPrice*(1 - month*0.006));
    }else{
        referencePrice = ''
    }
    function getMonth(date){
        var dateArr = date.split('-');
        var year = dateArr[0];
        var month = dateArr[1];
        return year*12 + Number(month)
    }
    $('#reference').val(referencePrice);
}
loading = function (type, id) {   //页面数据填充加载
    comn.ajax({
        url: interUrl.second.get,
        async: false,
        data: {
            secondHandCarInfoId: id,
            estimateNum: args['estimateNum'] || ''
        },
        success: function (res) {
            if(res.data){
                reference(res.data.newCarPrice,res.data.licenseDate,res.data.createDatetime)
            }
            if( res.data && res.data.loanType && res.data.loanType==5){
                $(".assessmentResult,.essential").removeClass('hide');
                $(".results,.preliminary").addClass('hide');
                $(".results input,.results select,.results textarea").attr('disabled',true);
                $(".preliminary input,.preliminary select,.preliminary textarea").attr('disabled',true);
                $(".customer").addClass('hide');
                $(".customer input,.customer select").attr('disabled',true);
            }else{
                $(".assessmentResult input[name=customerName],.assessmentResult input[name=secondEstimatePrice],.assessmentResult select,.assessmentResult textarea").attr('disabled',true);
            }
            if(res.data){
                $("#bankId").getBank(res.data.secondCarBankId);
                if (type === "1") {
                    //针对发起评估调业务接口
                    $("#launchBusinessGroupId").getBusinessGroup((res.data && res.data.launchBusinessGroupId) || '', function (res) {
                        if (res && res.isManager && res.isManager === 1) {
                            $("#launchBusinessGroupId").val(res.data[0].id).prop("disabled", true);
                            $("#launchBusinessGroupId1").val(res.data[0].id);
                            $("#launchBusinessGroupName").val(res.data[0].name);
                        }
                    });
                } else {
                    //针对非发起评估环节,业务组显示输入框
                    $("#launchBusinessGroupId").remove();
                    $("#launchBusinessGroupName").removeClass("hide");
                }
                //购车地址
                $("#carProvince").getProvinceC({
                    code: res.data.provinceCode,
                    value: res.data.provinceName
                }, $("#carProvince").is(":disabled"));
                $("#carCity").getCityC(res.data.provinceCode, {
                    code: res.data.cityCode,
                    value: res.data.cityName
                }, $("#carCity").is(":disabled"));
                $("#provinceCodePlate").getProvinceC({
                    code: res.data.provinceCodePlate,
                    value: res.data.provinceNamePlate
                }, $("#provinceCodePlate").is(":disabled"));
                $("#cityCodePlate").getCityC(res.data.provinceCodePlate, {
                    code: res.data.cityCodePlate,
                    value: res.data.cityNamePlate
                }, $("#cityCodePlate").is(":disabled"));
            } else{
                $("#carProvince").getProvince(330000);
                $("input[name=provinceName]").val("浙江省");
                $("#carCity").getCity(330000);
                $("#provinceCodePlate").getProvince();
                $("input[name=provinceNamePlate]").val("--请选择--");
                $("input[name=cityNamePlate]").val("--请选择--");
                var citynameplate = '<option value="">--请选择--</option>';
                $("#cityCodePlate").append(citynameplate)
            }

            //第三方数据填充
            function replace (target,values) {
                Object.keys(values).map(function (key) {
                    if($(target +' [name='+ key +']')) {
                        $(target +' [name='+ key +']').val(values[key])
                    }
                })
            }
            //宁波工行二手车初评复评显示第三方评估信息
            if((type == 4 || type == 5) && res.data.canThirdEstimate) {
                $.getCommonMethodPort([['#estimateOrgCode','EstimateOrgCode']]);//获取评估机构列表
                $('#thirdPart').removeClass('hide');
                //获取第三方评估数据
                var thirdResponse = {};
                comn.ajax({
                    url: interUrl.second.thirdResult,
                    data: {
                        estimateId: res.data.id,
                        coCompanyId: res.data.secondCarBankId,
                        estimateOrgCode: 'JIE_GAO'
                    },
                    success: function (response) {
                        replace('#thirdPart',response.data);
                        initSecondPrice(true,response.data);
                        thirdResponse = response.data;
                    }
                });
            }
    
            //初评、复评、确认评估表、贷款详情、初评复评已办中显示维保记录报告
            var currentNodeKey = ["FIRST_ESTIMATE", "SECOND_ESTIMATE"]; //获取节点名称
            if (currentNodeKey.indexOf(args["currentNodeKey"]) > -1 || args["confirmFromBtn"] === "true" || (currentNodeKey.indexOf(args["releventFlowNode"]) > -1 && args["status"] === "done")) {
                $("#maintenanceRecordReport").removeClass("hide");
                comn.ajax({
                    url: interUrl.second.getMaintenanceRecordReport,
                    data: {
                        id: args['id'],
                        secondCarBankId: res.data.secondCarBankId
                    },
                    success: function (res) {
                        if (res && res.data) {
                            replace('#maintenanceRecordReport',res.data);
                            if (res.data.reportCode !== undefined && res.data.reportCode == '1') {
                                $("#btn_maintenanceRecord").removeClass("hide")
                            }
                        }
                    }
                })
            }
            //查看维保记录报告
            $("#btn_maintenanceRecord").click(function () {
                comn.ajax({
                    url: interUrl.second.getMaintenanceReportDetails,
                    data: {
                        id: args['id']
                    },
                    success: function (res) {
                        comn.addTab({
                            href: res.data.data.pcUrl +"&deleteT=yes",
                            title: '维保记录报告'
                        });
                    }
                });
            })
            if(type == 4) {
                var keys = ['provinceCode','cityCode','carIdentifyNum','factoryTime','engineNo','carColour','memo','commercialInsuranceExpiredDate','trafficCompulsoryInsuranceExpiredDate'];
                function disabeldValue (keys) {
                    keys.forEach(function (item) {
                        $('[name='+ item +']').attr('disabled','disabled');
                    })
                }
                disabeldValue(keys);
            }
            if(type == 5) {
                $('#essential').attr('disabled','disabled');
            }
            //二手车确认评估表
            if (args["confirmFromBtn"] === "true") {
                $("#essential").attr("disabled", false);
            }
            if (type == '3' || type == '5' || type == '6' || type == '7') userList(res.data);    //获取复评师
            //查看评估报告
            $('#viewReport').click(function () {
                if(!thirdResponse.reportUrl) {
                    return tip({
                        content: '评估报告生成中，请稍后!'
                    });
                }
                comn.addTab({
                    href: thirdResponse.reportUrl,
                    title: '第三方评估报告'
                });
            });
            //重新获取第三方评估信息
            $('#reacquire').click(function () {
                comn.ajax({
                    url: interUrl.second.thirdResultReload,
                    data: {
                        id: thirdResponse.id || '',
                        reportId: thirdResponse.reportId || '',
                        estimateId: res.data.id,
                        estimateNum: res.data.estimateNum,
                        coCompanyId: res.data.secondCarBankId,
                        coCompanyName: res.data.secondCarBankName,
                        vin: res.data.carIdentifyNum

                    },
                    success: function (response) {
                        replace('#thirdPart',response.data);
                        //initSecondPrice(response.data);
                        thirdResponse.reportUrl = response.data.reportUrl;
                        thirdResponse.id = response.data.id;
                        thirdResponse.reportId = response.data.reportId;
                    }
                })
            });
            //复评价格默认值设置  item: 第三方数据 canThirdEstimate: 是否调用过第三方
            function initSecondPrice (canThirdEstimate,item) {
                if(type == 5) {
                    var secondEstimatePrice = res.data.secondEstimatePrice;
                    if(secondEstimatePrice) {
                        return;
                    }
                    if(canThirdEstimate) {
                        secondEstimatePrice = item.price || '';
                    } else {
                        secondEstimatePrice = res.data.firstEstimatePrice || '';
                    }
                }
                $('input[name=secondEstimatePrice]').val(secondEstimatePrice);
                //复评价不为空的时候，计算最高评估价
                if(secondEstimatePrice !== ''){
                    var _valResult = comn.accMul(secondEstimatePrice, 1.2).toFixed(2);
                    $("input[name='invoicePrice']").val(_valResult);
                }
            }
            $("#registeredForm").values(res.data);
            if(type == 5) {
                initSecondPrice(false);
            }
            if (type == '3' || type == '6' || type == '7') $("input[name=date]").val(res.data.transferDate);
            if (type == '1' && !args["id"]) {    //发起评估
                evaluationNum();   //获取二手车评估单号
            }
            if (type == '1' && args["id"]) {    //我的任务进发起评估
                $(".revoke").removeClass('hide');    //显示撤销按钮
            }
            if (type == '4') flow(args["id"]);    //获取流程意见
            if (type == '6') flow(args["id"]);    //获取流程意见
            if (type == '7') flow(args["id"]);    //获取流程意见
            //if(type == '5' && !args["hi"]) userList(res.data);    //获取复评师
            if (type == '4') {
                $("input[name=firstEstimateUserName]").val(comn.user.realname); //赋值初评师
                $("input[name=firstEstimateUserId]").val(comn.user.uid); //赋值初评师id
            }
            //加载车辆数据信息
			if (!res.data) {
				return;
			}
            $("#getBrand").getBrandC( $("#getBrand").is(":disabled"));
            $("#getCarList").getCarListC(res.data.carBrandKey, {
                code: res.data.carSeriesKey,
                value: res.data.carSeriesName
			},
			$("#getCarList").is(":disabled"));
            $("#getCarModel").getCarModelC(res.data.carSeriesKey, {
                code: res.data.carModelKey,
                value: res.data.carModeName
			},
			$("#getCarModel").is(":disabled"));
        }
    });
}

evaluationNum = function () {     //发起评估流程，获取二手车评估单号
    comn.ajax({
        url: interUrl.second.serial,
        success: function (res) {
            $("input[name=estimateNum]").val(res.data);
        }
    });
}

var keetBler = false;

keep = function (val, fors) {   //保存接口
    var types = args["type"];
    if (types == "1" && keetBler == false) urls = interUrl.second.add;       //当没有这条记录的时候   且没有保存
    if (types == "1" && keetBler == true) urls = interUrl.second.update;     //当没有这条记录 且保存了
    if (types == "1" && keetBler == false && args["id"]) urls = interUrl.second.update;   //当有这条记录且没保存
    if (types == "3") urls = interUrl.second.saves;
    if (types == "4") urls = interUrl.second.save1th;
    if (types == "5") {
		urls = interUrl.second.save2th;
		procedures(fors);    //流程意见提交处理
	}
    if (types == "6" || types == "7") {
        procedures(fors);    //流程意见提交处理
        if (fors == '0') {
            oppSureModal("是否确认提交");
            $("#sureOption").unbind("click").click(function () {
                submitForm(args["id"]);
                $("#sureModal").modal("hide");
            });
        };
        return
    }
    comn.ajax({
        url: urls,
        data: val,
        async: false,
        success: function (res) {
            keetBler = true;
            $("#secondHandCarId").val(res.data);
            if (args["type"] == '1') {
                args["id"] = res.data
			};
			if (fors != '0') tip({
				content: '保存成功'
			});
            $(".revoke").removeClass("hide");
            if (fors == '0') {
                oppSureModal("是否确认提交");
                $("#sureOption").unbind("click").click(function () {
                    submitForm(res.data || args["id"]);
                    $("#sureModal").modal("hide");
                });
			};
            $("#tab2").attr("href", "#done").removeClass("tsbtn").unbind("click");
        }
    });
}

submitForm = function (id) {   //提交接口，数据为二手车申请主键
    var types = args["type"];
    //流程意见提交处理
    if (types == '4') procedures(0);  //预提交时，调取提交流程意见的接口
    var urls = interUrl.second.preSubmit;
    if (args["type"] == '3' || args["type"] == '6' || args["type"] == '7') var urls = interUrl.second.transferPreSubmit;
    comn.ajax({
        url: urls,
        data: {
            secondHandCarId: id
        },
        success: function (res) {
            if (res.data.userTasks.length > 1) {
                $("#sureModal").modal("hide");
				$("#table_3").bootstrapTable('refresh', {
					query: res.data
				});
            } else {
                var a, b, c, //直接提交
                    a = res.data.businessObjectId,
                    b = res.data.userTasks[0].userId,
                    c = res.data.userTasks[0].userName;
                var urlss = interUrl.second.submit2next;
                if (args["type"] == '3' || args["type"] == '6' || args["type"] == '7') var urlss = interUrl.second.transferSubmit2next;
                comn.ajax({
                    url: urlss,
                    data: {
                        secondHandCarId: a,
                        nextNodeUserId: b,
                        nextNodeUserName: c
                    },
                    success: function (res1) {
                        tip({
                            content: res1.message
                        });
                        comn.closeTab();
                    }
                });
            }
        }
    });
}

procedures = function (fors) {    //流程意见提交处理
    var data = {
        bopInfoId: args["id1"],
        conclusion: $("input[name=conclusion]:checked").val(),
        opinion: $("#opinion").val()
    }
    comn.ajax({
        url: interUrl.second.save,
        data: data,
        success: function (res) {   //fors 保存为1  提交为0
            if (fors != 0) comn.closeTab();
        }
    });
}
$("#bankId").getBank();
$(function () {
    $("#table_3").bootstrapTable();
    URLType(function (data) {  //对URL进行处理   模块加载显示
        var type = data["type"];
        if (type == 'ownersStaging'){
            $(".essential,.assessmentResult").removeClass('hide');
            $(".secondCarAssessment input,.secondCarAssessment select,.secondCarAssessment textarea").attr("disabled", true);
            $(".assessmentResult input,.assessmentResult select,.assessmentResult textarea").attr("disabled", true);
            load(type, data["id"] || args['projectId']);
        }
        if (type == '1') {    //发起评估
            $(".essential").removeClass('hide');
            $(".frameImg").addClass("hide");
            //$("#cooBank").show();

            if (data["id"]) {
                load(type, data["id"]);
            } else {
                load(type, '-1');
            }
        } else if (type == '4') {     //初评
            getDocumentList();//获取车架号照片
            $("#frameVin, .isForDisabled").attr("disabled",'disabled');
            $("#frameVin2").attr("disabled",'disabled');
            $(".essential,.preliminary,.processView").removeClass('hide');
            load(type, data["id"]);
        } else if (type == '5') {    //复评
            $("#frameVin2").attr("disabled",'disabled');
            getDocumentList();//获取车架号照片

            $("#frameSearch").addClass("hide");
            $(".essential,.preliminary,.results,.processView").removeClass('hide');
            $(".essential input,.essential select,.essential textarea").attr("disabled", true);
            $(".preliminary input,.preliminary select,.preliminary textarea").attr("disabled", true);
            load(type, data["id"]);
        } else if (type == '3') {
            $(".essential,.preliminary,.results,.customer,.transferBox").removeClass('hide');
            $(".essential input,.essential select,.essential textarea").attr("disabled", true);
            $(".preliminary input,.preliminary select,.preliminary textarea").attr("disabled", true);
            $(".results input,.results select,.results textarea").attr("disabled", true);
            $(".customer input,.customer select,.customer textarea").attr("disabled", true);
            load(type, data["id"]);
        } else if (type == '6') {    //过户审批
            $(".essential,.preliminary,.results,.customer,.transferBox,.processView").removeClass('hide');
            $(".essential input,.essential select,.essential textarea").attr("disabled", true);
            $(".preliminary input,.preliminary select,.preliminary textarea").attr("disabled", true);
            $(".results input,.results select,.results textarea").attr("disabled", true);
            $(".customer input,.customer select,.customer textarea").attr("disabled", true);
            $(".transferBox input,.transferBox select,.transferBox textarea").attr("disabled", true);
            load(type, data["id"]);
            $(".btn_box[fors='3']").removeClass("hide");
        } else if (type == '7') {    //评估报告
            $(".essential,.preliminary,.results,.customer,.transferBox,.processView").removeClass('hide');
            $(".essential input,.essential select,.essential textarea").attr("disabled", true);
            $(".preliminary input,.preliminary select,.preliminary textarea").attr("disabled", true);
            $(".results input,.results select,.results textarea").attr("disabled", true);
            $(".customer input,.customer select,.customer textarea").attr("disabled", true);
            $(".transferBox input,.transferBox select,.transferBox textarea").attr("disabled", true);
            load(type, data["id"]);
            $(".btn_box[fors='11']").removeClass("hide");
        };
        $(".btn_box[fors='" + type + "']").removeClass("hide");
        if (args['hi'] == '2') {
            $("#registeredForm input,#registeredForm select,#registeredForm textarea").attr("disabled", true);
            $(".btn_box").addClass("hide");
            $(".btn_box[fors=10]").removeClass("hide");
        };
        //二手车确认评估表
        if (args["confirmFromBtn"] === "true") {
            $(".btn_box").addClass("hide");
            $(".btn_box[fors=confirmFromBtn]").removeClass("hide");
            $("#frameVin2, #frameVin2 input, #frameVin2 select, #essential").attr("disabled", false);
            $(".isForConfirmAssess").prop("readonly", false);
            $(".isForConfirmAssess").prop("disabled", false);
        }
    });
    if(args['status']=='done'){ //查看详情时去掉流程意见,重新获取按钮
        $('#reacquire').addClass('hide');
        $('.processView').addClass('hide');
    }else if(args['status']=='view'){
        //$("#cooBank").hide();
        //$("#bankId").getBank()
    }

    $(".cancel").click(function () {    //点击取消按钮
        comn.closeTab();
    });
    //取消复评操作
    //$(".reEvaluation").click(function(){
    //
    //})
    //车辆三级级联菜单
    //$("#getBrand").getBrand();  before 2016-06-02
    $(document).on("change", "#getBrand", function (){
        //var code = $(this).data("code");
        //$(this).prev().val(code);
        //$("#getCarList").getCarList(code);
        //$("#getCarModel").html("<option>--请选择--</option>");
        var code = $(this).attr("data-code");
        $(this).prev().val(code);
        $("#getCarList, #getCarModel").val("--请选择--").next().remove();
        $("#getCarList").getCarList(code);
    });

    $(document).on("change", ".carSelect", function () { //给车辆赋值
        var code = $(this).attr("data-code");
        $(this).prev().val(code);
		if (this.id == "getCarList") {
            $("#getCarModel").val("--请选择--").next().remove();
            ;$("#getCarModel").getCarModel(code)
			//$("#getCarModel").getCarModel(this.value)
		};
    });
    $(document).on("change", "#getCarModel", function(){
        $("input[name=msrp]").val($(this).attr("data-msrp"));
    })

    $(".preservation,.submit").click(function () {   //点击保存,点击提交
        var fors = $(this).attr("fors");

        if ($("#registeredForm").valid() == true) {
            $("input[name=id]").val(args["id"]);
            if (args["type"] == '5' || args["type"] == '3') {
                $("input[name=secondHandCarInfoId]").val(args["id"]);
			};
            var names = ['provinceCode','cityCode','carIdentifyNum','carBrand','carBrandKey','carSeriesName','carSeriesKey','carModeName','carModelKey','newCarPrice','factoryTime','engineNo','carColour','sellPrice','memo','commercialInsuranceExpiredDate','trafficCompulsoryInsuranceExpiredDate'];
            function getVal (names) {
                var o = {};
                names.forEach(function (key) {
                    o[key] = $('input[name='+ key +']').val();
                });
                return o;
            }
            data =$.extend($("#registeredForm").values(),getVal(names));

            if (fors == '1') {
                oppSureModal("是否确认保存");
                $("#sureOption").unbind("click").click(function () {
                    keep(data, fors);    //调用保存接口
                    $("#sureModal").modal("hide");
                });
            } else if (fors == '0') {
                var formVal = $('#registeredForm').values();
                if(args['type'] == 5 && formVal.canThirdEstimate) {
                    //复评完成评估判断
                    if(formVal.estimateStatus != 2) {
                        return tip({
                            content: '第三方评估中，不能完成复评'
                        })
                    }
                    if(formVal.secondEstimatePrice > formVal.price) {
                        return tip({
                            content: '复评价不能大于第三方评估价，请修改!'
                        })
                    }
                }
                keep(data, fors);    //调用保存接口
            }
        }
    });

    //二手车评估撤销
    $(".revoke").click(function () {     //点击撤销按钮
        $("#registeredForm").validate();
        if ($("#registeredForm").valid() == true) {
            comn.ajax({
                url: interUrl.second.cancel,
                data: {
                    secondHandCarId: args['id']
                },
                success: function (res1) {
                    tip({
                        content: res1.message
                    });
                    comn.closeTab();
                }
            });
        }
    })

    //二手车过户撤销
    $("#carTransferCancel").click(function () {     //点击撤销按钮
        comn.ajax({
            url: interUrl.second.processCancel,
            data: {
                secondHandCarId: args['id']
            },
            success: function (res1) {
                tip({
                    content: res1.message
                });
                comn.closeTab();
            }
        });

    });

    $(document).on("click", ".loanStart3", function () {   //选择后续流程人员
		var a, b, c, a = $("#secondHandCarId").val() || args["id"],
            b = $("#task input[type='radio']:checked").attr('userId');
        c = $("#task input[type='radio']:checked").attr('userName');
        var urlss = interUrl.second.submit2next;
        if (args["type"] == '3' || args["type"] == '6' || args["type"] == '7') var urlss = interUrl.second.transferSubmit2next;
        comn.ajax({
            url: urlss,
            data: {
                secondHandCarId: a,
                nextNodeUserId: b,
                nextNodeUserName: c
            },
            success: function (res1) {
                tip({
                    content: res1.message
                });
                comn.closeTab();
            }
        });
    });
    $(document).on("change", "#bankId", function(){
        var name = $(this).find("option:selected").html();
        $("#secondCarBankName").val(name);
    });
    $(document).on("change", "#launchBusinessGroupId", function(){
        var name = $(this).find("option:selected").html();
        $("#launchBusinessGroupName").val(name);
        $("#launchBusinessGroupId1").val($(this).val());
    });
    $(".back2pre").click(function () {    //退回上一步
        var urls = interUrl.second.back2pre;
        if (args["type"] == '6' || args["type"] == '7') urls = interUrl.second.transferBack2pre;
        if (['3', '4', '5', '6', '7'].indexOf(args["type"]) != -1) { //有流程意见的填写
            $("#opinionForm33").validate();
            if ($("#opinionForm33").valid() == true) {
                oppSureModal("是否退回上一步");
                $("#sureOption").unbind("click").click(function () {
                    //保存流程意见
                    comn.ajax({
                        url: interUrl.common.opinion,
						data: $.extend($("#opinionForm33").values(), {
							bopInfoId: args['id1']
						},
						{
							id: args['loanApplyId']
						}),
                        success: function (res) {
                            $("#sureModal").modal("hide");
                            comn.ajax({
                                url: urls,
                                data: {
                                    secondHandCarId: args["id"]
                                },
                                success: function (res1) {
                                    tip({
                                        content: res1.message
                                    });
                                    comn.closeTab();
                                }
                            });
                        }
                    });

                });
            }
        } else {
            oppSureModal("是否退回上一步");
            $("#sureOption").unbind("click").click(function () {
                $("#sureModal").modal("hide");
                comn.ajax({
                    url: urls,
                    data: {
                        secondHandCarId: args["id"]
                    },
                    success: function (res1) {
                        tip({
                            content: res1.message
                        });
                        comn.closeTab();
                    }
                });

            });
        }

    });
    $("#btn_closedAss").click(function(){
        oppSureModal("是否确定关闭评估？");
        $("#sureOption").unbind("click").click(function () {
            $("#sureModal").modal("hide");
            comn.ajax({
                url: interUrl.second.closed,
                data: {
                    secondHandCarId: args["id"]
                },
                success: function (res) {
                    tip({
                        content: res.message
                    });
                    comn.closeTab();
                }
            });

        });
    })
    $("#loanLaunchDate, .loanLaunchDate").change(function () {    //复评师选择
        var name = $(this).find("option:selected").html();
        $("input[name=secondEstimateUserName]").val(name);
    });

    var forsNum = '';

    $("input[name=conclusion]").click(function () {
        var val = $(this).val();
        forsNum = $(".btn_box:visible").attr("fors") || forsNum;
        $(".btn_box").removeClass('btn_box');
        if (val == '0') {     //不同意
            $("div[fors='" + forsNum + "']").addClass("hide");
            $("div[fors='9']").removeClass("hide");
            if (args["currentNodeKey"] === "FIRST_ESTIMATE") $("#btn_closedAss").removeClass("hide");
        } else if (val == '1') {       //同意
            $("div[fors='" + forsNum + "']").removeClass("hide");
            $("div[fors='9']").addClass("hide");
        }
    });

    $(".tsbtn").click(function () {   //文档详情点击
        layer.confirm('是否保存数据？', {
            btn: ['是', '否'] //按钮
		},
		function() {
            $("#registeredForm").validate();
            if ($("#registeredForm").valid() == true) {
                var data = $("#registeredForm").values();
                oppSureModal("是否确认保存");
                $("#sureOption").unbind("click").click(function () {
                    $("#sureModal").modal("hide");
                    keep(data, 1);    //调用保存接口
                });
            };
			layer.msg({
				time: 10
			});
		},
		function() {
            return
        });
    });

	$("input[name=invoicePrice]").change(function () {   //最高评估书价格和开票价价格处理
		var val = $(this).val();
		$("input[name=invoicePrice]").val(val);
	});

    function isNum(s) {     //判断是否为小数
        //var regu = "^([0-9]*)$";
        var regu = "^([0-9]*[.0-9])$"; // 小数测试
        var re = new RegExp(regu);
		if (s.search(re) != - 1) return true;
		else return false;
    }

    $("#kilometres").keyup(function () {    //控制里程数不可以为小数字
        var val = $(this).val();
		if (isNum(val)) {} else {
            $(this).val('');
		};
        if (val < 0) {
            $(this).val('');
        }
    })

    $("#firstEstimateSourceKey").change(function () {    //初评评估来源选择
        var code = $(this).find("option:selected").attr("value");
        var name = $(this).find("option:selected").html();
        if (code == '1') {    //公司自营
//			$(".thirdParty input").val('');
//			$(".thirdParty").addClass("hide");
            $("#firstEstimateSourceName").val(name);
        } else if (code == '2') {    //第三方评估机构
//			$(".thirdParty").removeClass("hide");
            $("#firstEstimateSourceName").val(name);
        } else {
            $("#firstEstimateSourceName").val('');
        }
    })

    $(document).on("keyup", "input[name=secondEstimatePrice]", function () {
        var _this = $(this);
        var _val = _this.val();
		var _valResult = _val ? comn.accMul(_val, 1.2).toFixed(2) : 0;
        $("input[name='invoicePrice']").val(_valResult);
    })
})



//车架号查询
var token='';//token值校验重复查询

var frameNumber=/(?!^[a-zA-Z]+$)(?!^[0-9]+$)[a-zA-Z0-9]{17}/;
//购车地址
$("#carProvince").on("change",function(){
    var _this=$(this).find("option:selected").html();
    $("input[name=provinceName]").val(_this);
    if (this.value) {
        return $("#carCity").getCity(this.value);
    }
});
$("#carCity").on("change",function(){
    var _this=$(this).find("option:selected").html();
    $("input[name=cityName]").val(_this);
    token='';
});
//初次地址
$("#provinceCodePlate").on("change",function(){
    var _this_=$(this).find("option:selected").html();
    $("input[name=provinceNamePlate]").val(_this_);
    if (this.value) {
        return $("#cityCodePlate").getCity(this.value);
    }
});
$("#cityCodePlate").on("change",function(){
    var _this_=$(this).find("option:selected").html();
    $("input[name=cityNamePlate]").val(_this_);
});

//车架号查出不同车型显示
function getVinCar(value){
    var ref=value;
    var result=["<option vlaue=''>--请选择--</option>"];
    for(var i=0;i<ref.length;i++){
        var o=ref[i];
        result.push("<option value="+o.carId+">"+o.carName+"</option>");
    };
    return result.join("");
}
$(document).on("change","#vinCarType",function(){
    var carId=$(this).val();
    var idCar=[];
    for(var i=0;i<vinCarInfoList.length;i++){
        idCar.push(vinCarInfoList[i].carId);
    };
    var num=idCar.indexOf(parseFloat(carId));
    detail(vinCarInfoList[num]);
})
$("#frameSearch").on("click",function(){
    var carIdentifyNum=$("input[name=carIdentifyNum]").val();
    if(frameNumber.test(carIdentifyNum)){
        if(token!=carIdentifyNum){
            token=carIdentifyNum;
            $("#frameVin").prop("disabled",false);
            $(".isForDisabled").prop("readonly",false);
            $("#getBrand").getBrandC( $("#getBrand").is(":disabled"));
            $("input[name=carBrand]").val("");
            $("input[name=carSeriesName]").val("");
            $("input[name=carModeName]").val("");
            comn.ajax({
                url:interUrl.loanDetail.getVinInfo,
                data:{
                    vin: carIdentifyNum,
                    applyId: args["loanApplyId"],
                    provinceCode:$("#carProvince").val(),
                    provinceName:$("input[name=provinceName]").val(),
                    cityCode:$("#carCity").val(),
                    cityName:$("input[name=cityName]").val()
                },
                success:function(res){
                    //$("#frameVin").attr("disabled", "disabeld");
                    //$(".isForDisabled").prop("readonly", true);
                    //品牌
                    $("input[name=carBrand]").val(res.data.brandName);
                    $("input[name=carBrandKey]").val(res.data.brandId);
                    //车系
                    $("input[name=carSeriesName]").val(res.data.modelName);
                    $("input[name=carSeriesKey]").val(res.data.modelCode);
                    var mapResponseTo = {
                        brandName: 'carBrand',
                        brandId: 'carBrandKey',
                        modelName: 'carSeriesName',
                        modelCode: 'carSeriesKey'
                    };
                    disabledControl(mapResponseTo,res.data);
                    if(res.data.vinCarInfoList.length>1){
                        $(".trimName").removeClass("hide");
                        $("input[name=carModeName]").val("");
                        $("#vinCarType").html(getVinCar(res.data.vinCarInfoList));
                        vinCarInfoList=res.data.vinCarInfoList;
                    }else{
                        $(".trimName").addClass("hide");
                        //数据填充
                        detail(res.data.vinCarInfoList[0]);
                    }
                    if (args["confirmFromBtn"] === "true") {
                        $(".isForConfirmAssess ").prop("disabled", false);
                        $(".isForConfirmAssess ").prop("readonly", false);
                    }
                }
            })
        }
    }else{
        tip({
            content:"车架号不能为空或者车架号不是17位数字和字母"
        })
    }

});
//获取车架号照片
var pictures = document.querySelector('#frameImg');
var options = {
    url: 'data-src',
    title: true,
    transition: false,
    build: function (e) {
    },
    built: function (e) {
    },
    show: function (e) {
        window.parent.toggleTopNav();
    },
    hide: function (e) {
        window.parent.toggleTopNav();
    }
};
// viewer = new Viewer(pictures, options);
//获取图片
function getDocumentList() {
    var result = "";
    var _data = {
        secondHandCarInfoId:args['id']
    };
    args['estimateNum'] ? _data.estimateNum = args['estimateNum'] : ''; //只针对报表:二手车评估中获取图片用；
    comn.ajax({
        url: interUrl.gr.getVinImage,
        data : _data,
        success: function (res) {
            var html = '<li>' +
              '<img src="'+ res.data.filePath +'" alt="" data-src="'+ res.data.filePath +'" style="width:100px;height:100px">' +
              '<p>'+ res.data.fileName +'</p>'+
              '</li>';
            $("#frameImg").html(html);
            viewer = new Viewer(pictures, options);
        }
    });
}
//数据回显
function detail(value){
    $("input[name=carModeName]").val(value.carName);
    $("input[name=carModelKey]").val(value.carId);
    //$("input[name=newCarPrice]").val(value.newPrice);//新车优惠价
    $("input[name=newCarPrice]").val(value.guidePrice);//新车优惠价
    $("input[name=factoryTime]").val(value.factoryTime);//出厂日期
    $("input[name=engineNo]").val(value.engineNo);//发动机号
    $("input[name=carColour]").val(value.color);//车身颜色
    $("input[name=secondHandCarRefPrice]").val(value.sellPrice);//二手车参考价
    if(value.newPrice){
        reference($('#newPrice').val(),$('input[name=licenseDate]').val(),$('#createTime').val())
    }
    //返回数据字段与实际字段间的映射 key:返回值字段名 value: 本地字段名
    var mapResponseTo = {
        carName: 'carModeName',
        carId: 'carModelKey',
        newPrice: 'newCarPrice',
        factoryTime: 'factoryTime',
        engineNo: 'engineNo',
        color: 'carColour',
        //sellPrice: 'secondHandCarRefPrice'
    };
    disabledControl(mapResponseTo,value);
    $('input[name="secondHandCarRefPrice"]').prop("readonly", true);

    // $("input[name=secondHandCarPrice]").val(value.sellPrice);//二手车销售价
}
//控制字段是否可修改
function disabledControl (req,res) {
    Object.keys(req).forEach(function (item) {
        if(res[item] || res[item] === 0) {
            $('input[name='+ req[item] +']').attr('disabled','disabled');
        }else {
            $('input[name='+ req[item] +']').removeAttr('disabled');
        }
    })
}

//二手车评估确认保存按钮
$(document).on("click", ".saveConfirmBtn", function(){
    $("#registeredForm").validate();
    if ($("#registeredForm").valid() == true) {
        comn.ajax({
            url: interUrl.second.confirmSave,
            data: $.extend($("#registeredForm").values(), {id: args["id"]}),
            success: function(res) {
                tip({content: "保存成功!"});
            }
        })
    }
});
$(document).on("click", ".printConfirmBtn", function(){
    window.open("../../../Modal/secondHandCar/assessmentConfirmForm/printAssessmentConf.html?secondHandCarInfoId=" + args['id']);
});


