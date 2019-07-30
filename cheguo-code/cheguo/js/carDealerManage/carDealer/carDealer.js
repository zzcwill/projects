/**
新增车商路程节点
发起新增车商                CAR_DEALER_LAUNCH
区域经理审核                CAR_DEALER_REGIONAL_MANAGER
分公司总经理审核            CAR_DEALER_GENERAL_MANAGER
汽车金融部                  CAR_DEALER_CAR_FINANCE
分公司财务                  CAR_DEALER_ACCOUNTING_ASSISTANT
分公司出纳                  CAR_DEALER_BRANCH_CASHIER
 */


var args, table_sign, tableEvent_sign, handle_sign, dealerId, dealerName, dataLoad_1, handle_1, tableEvent_1, dataLoad_fee, handle_fee, tableEvent_fee, dataLoad_user, handle_user, tableEvent_user, dataLoad_addUser, handle_addUser, tableEvent_addUser, memberListArr = [], isManager, gpsNumber;
//获取参数
args = comn.getArgs();
//新增车商流程-是否点击获取企业信息  0未点击，1点击
var pyChecked = 0;
//修改流程-需要用的车商编码
var dealerNo = '';

//车商id
dealerId = args["dealerId"];
isManager = eval('('+args['isManager']+')');
currentNode = args['releventFlowNode']; //当前流程节点
argsBopInfoId = {bopInfoId: args['bopInfoId']};

var pictures = document.querySelector('#carDealerForm');
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

//修改表格统一配置参数
var tableConfig = $.extend(JSON.parse(JSON.stringify(comn.table)), {
    'height': '300',
    'pagination': false
});

//初始化省区市联动选择
//$("#province_1").getProvince() before2016-06-01
$("#province_1").change(function () {
    if (this.value) {
        //$("#province_1_name").val($(this).find('option:selected').text());
        $("#area_1").val("");
        return $("#city_1").getCity(this.value).unbind("change").change(function () {
            if (this.value) {
                return $("#area_1").getArea(this.value);
            }
        });
    }
});
$("#city_1").getCity(this.value).unbind("change").change(function () {
    if (this.value) {
        return $("#area_1").getArea(this.value);
    }
});

//修改车商 type=1
//查看车商 type=2
//新增车商 type=3
var type = args['type'];
//加盟状态审核不通过时相应字段不可修改；
$("#flowTitle").text(args['currentNodeName']);
function currentNodeHandle() {
    $("#dealerName").attr("readonly", false);
}

function canRead(val, isManagerFlag) {
    var reloCode = false;
    $.each(val, function(i, v){
        if (v.roleCode === "R99" && isManagerFlag === "true") {
            reloCode = true;
            return false;
        }
        if (v.roleCode === "R99" || v.roleCode === "R98" || v.roleCode === "R08") {
            reloCode = true;
            return false;
        }
    });
    return reloCode;
}

//最低利率是否显示
function isShowMiniRate() {
    if (canRead(comn.user.roleList)) {
        $("#miniRate").removeClass("hide");
    }   
}
//最低利率有权限但是没有车商id的时候提示
$('#miniRate').bind('click',function(){                                                     
    if(dealerId === undefined){        
        tip({
           content: '请先保存车商信息'
        });
    }else{
        $('#miniRate a').attr('data-toggle','tab');
    }
})

isShowMiniRate();
//是否能修改车商等级
function isChangeCarLevel() {
    if(currentNode == "CAR_DEALER_LAUNCH"){
        beCloseSubmit()//车商审批流程可在发起节点关闭
        return
    }
    if(currentNode == "CAR_DEALER_REGIONAL_MANAGER"){
        return
    }    
    if (canRead(comn.user.roleList)) {
        $('#productLevel').prop("disabled", "");
    }    
}
isChangeCarLevel();


$(document).on("change", "#productLevel", function(){
    $("#productLevelName").val($(this).val())
});

$(document).on("change", "#productLevel", function(){
    $("#productLevelName").val($(this).val())
});

function isFinanceRole(val) {
    var reloCode = false;
    $.each(val, function(i, v){
        if (v.roleCode === "R99") {
            reloCode = true;
            return false;
        }
    });
    return reloCode;
}

$(function () {
    var search;
    $("#getOpeningBank").getOpeningBank();
    $(document).on("change", "#getOpeningBank", function () {
        clearTimeout(search);
        $(".cashBank,#getCashBank").addClass("hide");

        var $subBankName=$("input[name=subBankName]");
        var bankName=$(this).find("option:selected").text();
        var bankCode=$(this).find("option:selected").attr('data-code');

        $("input[name=openBankName]").val(bankName);
        $subBankName.on("focus",function(){
            $(".cashBank,#getCashBank").removeClass("hide");
            //初始化查询列表
            $(".cashBank").val("");
            $("#getCashBank").html("");
        });
        $(".cashBank").bind('input propertychange',function(){
            //条件查询(输入长度大于2开始查询)
            if($(this).val().trim().length>1){
                clearTimeout(search);
                $("#getCashBank").removeClass('hide');
                var _this=this;
                search=setTimeout(function(){
                    $("#getCashBank").getCashBank({bankType:bankCode,bankName:$(_this).val().trim()});
                },1000);
                $("#getCashBank").on('click','a',function(){
                    $(".cashBank,#getCashBank").addClass('hide');
                    $subBankName.val($(this).html());
                    $(".cashBank").val($(this).attr('data-code'));
                    $('#subBankNo').val($(this).attr('data-bankCode'));
                })
            }
        })
    });
    if (currentNode == "CAR_DEALER_REGIONAL_MANAGER") {
        if (args['itemFlow'] != "show") {
            $("#opinionForm").removeClass("hide");
        }
        $("a[href='#opinion']").removeClass('hide').addClass('show');
    } else {
        $("a[href='#opinion']").removeClass('show').addClass('hide');
    }
    if ([
			'CAR_DEALER_LAUNCH',
			'CAR_DEALER_REGIONAL_MANAGER',
			'CAR_DEALER_GENERAL_MANAGER',
			'CAR_DEALER_ACCOUNTING_ASSISTANT',
			'CAR_DEALER_CAR_FINANCE',
			'CAR_DEALER_BRANCH_CASHIER'
	].indexOf(currentNode) != -1) {
        $("a[href='#opinion']").removeClass('hide').addClass('show');
    } else {
        $("a[href='#opinion']").removeClass('show').addClass('hide');
    }
    
    //如何车商查看禁止修改
    if(type == 2){
        $('#carDealerForm fieldset').prop("disabled", "disabled");
    }
    
    if (type == 1 || type == 2) {
        $("a[href='#opinion']").removeClass('hide').addClass('show');
    }
    if (type == 1) {
        if (isFinanceRole(comn.user.roleList) && isManager == false) {
            $("#addCarDealer, #addFee-btn").addClass('hide');
            $("#info .seeFieldset, #feeManage .seeFieldset").attr("disabled", "disabled");
            $(".addImg").removeClass("addImg").addClass("noUpload"); //图片上传icon隐藏
        }
    } else if ((type == 2 || isManager == false) && currentNode != "CAR_DEALER_LAUNCH" && currentNode != "CAR_DEALER_REGIONAL_MANAGER") {
        $("#addFee-btn, #addCarDealer, #addUser-btn, #save-baseInfo").hide();
        $(".seeFieldset").attr("disabled", "disabled"); //查看时禁用所有编辑操作
        $(".addImg").removeClass("addImg").addClass("noUpload"); //图片上传icon隐藏
        $("select[name='scopeBusiness']").addClass("hide");
        // $("#channelSource").trigger("change");

    } else if (type == 3) {
        currentNodeHandle();
        $("#addInfoS").show();
    } else if (type == 4 && currentNode != "CAR_DEALER_LAUNCH" && currentNode != "CAR_DEALER_REGIONAL_MANAGER") {
        $("#approveAble").show();
        $(".seeFieldset").attr("disabled", "disabled"); //查看时禁用所有编辑操作
        $(".addImg").removeClass("addImg").addClass("noUpload"); //图片上传icon隐藏
    } else if(type == 2){
        $(".putImg").removeClass("imgItem");
    } else {
        if (args['itemFlow'] == "show") {
			$("#addFee-btn, #addCarDealer, #addUser-btn, #save-baseInfo").hide();
            $(".seeFieldset").attr("disabled", "disabled"); //查看时禁用所有编辑操作
            $(".addImg").removeClass("addImg").addClass("noUpload"); //图片上传icon隐藏
        }
    }
    if (currentNode == "CAR_DEALER_REGIONAL_MANAGER" || type == "2" || (type == "4" && currentNode != "CAR_DEALER_LAUNCH")) {
        $("#employDealerName").prop("type", "");
        $("#employDealerId").addClass("hide");
        $("#isCarDealerFlow fieldset").prop("disabled", "disabled")
    }

    //判断显示提交还是退回
    $("input[name='conclusion']").on('click', function () {
        var checkedV = $("input[name='conclusion']:checked").val();
        if (checkedV == 1) {
            $("#btn-opinion-save").show();
            $("#btn-loanReview-back").hide();
        } else {
            $("#btn-opinion-save").hide();
            $("#btn-loanReview-back").show();
        }
    });

    //提交下一步
    $("#btn-opinion-save").click(function () {
        $("#opinionForm").validate();
        if ($("#opinionForm").valid() == true) {
            oppSureModal("是否确认提交");
            $("#sureOption").unbind("click").click(function () {
                //提交时先保存流程意见
                comn.ajax({
                    url: interUrl.common.opinion,
                    data: $.extend($("#opinionForm").values(), argsBopInfoId),
                    success: function (res) {
                        $("#sureModal").modal("hide");
                        flowSubmit(interUrl.carDealer.preSubmit, interUrl.carDealer.submit2next, './Modal/task/myTask/index.html', {dealerId: dealerId})
                    }
                });
            })
        }
    });

    //返回上一步
    $("#btn-loanReview-back").click(function () {
        oppSureModal("是否确认退回");
        $("#sureOption").unbind("click").click(function () {
            // flowBack2PreCar();
            //提交时先保存流程意见
            comn.ajax({
                url: interUrl.common.opinion,
                data: $.extend($("#opinionForm").values(), argsBopInfoId),
                success: function (res) {
                    $("#sureModal").modal("hide");
                    flowBack2PreCar();
                }
            });
        })
    });

    $(document).on("change", "#province_1", function () {
        var provinceName = $(this).find("option:selected").html();
        $("input[name='provinceName']").val(provinceName);
    })
    $(document).on("change", "#city_1", function () {
        var cityName = $(this).find("option:selected").html();
        $("input[name='cityName']").val(cityName);
    });
    $(document).on("change", "#area_1", function () {
        var areaName = $(this).find("option:selected").html();
        $("input[name='areaName']").val(areaName);
    });
    $(document).on("change", "input[type=checkbox]", function () {
        $(this).is(":checked") ? $(this).val("1") : $(this).val("0");
    })
    //车商类型 -- 1：经销商 2：渠道商，当选择渠道商时，显示经销商名称；
    $(document).on("change", "#carDealerType", function () {
        $("#carDealerTypeCode").val($(this).val());
        if ($(this).val() == "2") {
            $("#isDealerName").removeClass("hide");
            $("#employDealerName, #employDealerId").prop("disabled", false);
        } else {
            $("#isDealerName").addClass("hide");
            $("#employDealerName, #employDealerId").prop("disabled", "disabled");
    
        }
    });
    //渠道来源: -- 1:银行推荐 选择银行推荐,显示推荐银行 2:内部直销
    $(document).on("change","#channelSource",function(){
        if($(this).val()==1){
            $("#isBank").removeClass("hide");
            $("select[name=cannelBankId]").prop("disabled", false);
            hideIsBranchMarketing();
            hideIsDealerGroup();
        }else if($(this).val()==2){
            hideIsBank();
            hideIsDealerGroup();
            $("#isBranchMarketing").removeClass("hide");
            $("input[name=isDealerGroup]").prop("disabled", false);
            $("input[name='isDealerGroup']:checked").trigger("click");
            $("#dealerGroupId, #dealerGroupName").val("");
        } else if ($(this).val()==3) {
            $("#isDealerGroup").removeClass("hide");
            $("select[name=dealerGroupId], input[name=dealerGroupName]").prop("disabled", false);
            hideIsBank();
            hideIsBranchMarketing();
            $("#dealerGroupId, #dealerGroupName").val("");
        }else {
            hideIsBank();
            hideIsBranchMarketing();
            hideIsDealerGroup();
        }
    });
    //隐藏推荐银行
    function hideIsBank(){
        $("#isBank").addClass("hide");
        $("select[name=cannelBankId]").prop("disabled", "disabled");
    }
    //隐藏有无经销商集团
    function hideIsBranchMarketing(){
        $("#isBranchMarketing").addClass("hide");
        $("input[name=isDealerGroup]").prop("disabled", "disabled");
    }
    //隐藏经销商集团
    function hideIsDealerGroup(){
        $("#isDealerGroup").addClass("hide");
        $("select[name=dealerGroupId], input[name=dealerGroupName]").prop("disabled", "disabled");
    }

    //车商级别
    $(document).on("change", "#dealerGrade", function(){
        $("#isDealerName").addClass("hide");
        $("#carDealerTypeCode, #carDealerType, #employDealerName, #employDealerId").val(""); //清空车商类型，经销商名称
    });
    $(document).on("change", ".stateJoin", function(){
        var _name = $(this).attr("name");
        $("input[name="+ _name +"]").val($(this).val());
    })
    //有无经销商集团
    $(document).on("click", "input[name=isDealerGroup]", function(){
        var _this = $(this);
        if ( _this.val() === "0"){
            $("#isDealerGroup").addClass("hide");
            $("select[name=dealerGroupId], input[name=dealerGroupName]").prop("disabled", "disabled");
        } else {
            $("#isDealerGroup").removeClass("hide");
            $("select[name=dealerGroupId], input[name=dealerGroupName]").prop("disabled", false);
        }
    });
    //经销商集团
    $(document).on("change", "#dealerGroupId", function(){
        var _this = $(this);
        $("#dealerGroupName").val(_this.find('option:selected').text());
    })
    $(document).on("change", "#employDealerId", function () {
        $("#employDealerName").val($(this).find("option:selected").html());
    })
});
$("select[name=cannelBankId]").getBank();
$("select[name=cannelBankId]").on("change",function(){
    var cannelBanmName=$(this).find("option:selected").html();
    $("input[name=cannelBankName]").val(cannelBanmName);
})
var _joinResult = "";
//如果是修改或者查看,则车商id已存在
if (dealerId || $("#dealerId").val()) {
    //获取车商基本信息
    comn.ajax({
        url: interUrl.carDealer.get,
        data: {
            dealerId: dealerId
        },
        success: function (res) {
            _joinResult = res.data.joinResult ? res.data.joinResult : '';
            if (res.data.joinResult && res.data.joinResult == "2") { //0:未加盟 1:加盟审批中 2:已加盟'
                $(".stateJoin, input[data-type=801], input[data-type=802]").prop("disabled", "disabled");
                $(".stateJoinInput").prop("readOnly", "readOnly");
                $(".addImg").removeClass("addImg").addClass("noUpload");
            }
            //加载经销商名称
            $("#employDealerId").getDealerName(res.data.employDealerId, dealerId);
            $("select[name=cannelBankId]").getBank(res.data.cannelBankId);
            $("#dealerGroupId").getDealerGroup(res.data.dealerGroupId);
            //如果车商类型是1 则把经销商名称disable， 否则显示经销商名称
            res.data.carDealerType === 1 ? $("#employDealerName, #employDealerId").prop("disabled", "disabled") : $("#isDealerName").removeClass("hide");
            res.data.isDealerGroup === 1  ? $("#isDealerGroup").removeClass("hide") : "";
            if (res.data.cannelStatus === 1) {
                $("#isBank").removeClass("hide")
            } else if (res.data.cannelStatus === 2) {
                $("#isBranchMarketing").removeClass("hide");
                $("select[name=cannelBankId],input[name=cannelBankName]").prop("disabled", "disabled");
            } else if (res.data.cannelStatus === 3) {
                $("#isDealerGroup").removeClass("hide");
                $("select[name=cannelBankId],input[name=cannelBankName]").prop("disabled", "disabled");
            } else {
                $("select[name=cannelBankId],input[name=cannelBankName]").prop("disabled", "disabled");
            }
            if (res.data && res.data.legalRepresentative) {
                var arr = res.data.legalRepresentative.split("&&&");
                if (arr.length > 1) {
                    $("#legalRepresentative").html(function () {
                        return optionHtml(arr, "legalRepresentative");
                    });
                } else {
                    $("input[name=legalRepresentative]").val(res.data.legalRepresentative);
                    $("#legalRepresentative .help-block").text("");
                }
            }

            if (res.data && res.data.registeredCapital) {
                var arr = res.data.registeredCapital.split("&&&");
                if (arr.length > 1) {
                    $("#registeredCapital").html(function () {
                        return optionHtml(arr, "registeredCapital");
                    });
                } else {
                    $("input[name=registeredCapital]").val(res.data.registeredCapital);
                    $("#registeredCapital .help-block").text("");
                }
            }

            if (res.data && res.data.registrationStatus) {
                var arr = res.data.registrationStatus.split("&&&");
                if (arr.length > 1) {
                    $("#registrationStatus").html(function () {
                        return optionHtml(arr, "registrationStatus");
                    });
                } else {
                    $("input[name=registrationStatus]").val(res.data.registrationStatus);
                    $("#registrationStatus .help-block").text("");
                }
            }
            if (res.data && res.data.scopeBusiness) {
                var arr = res.data.scopeBusiness.split("&&&");
                if (arr.length > 1) {
                    $("#scopeBusiness").html(function () {
                        return optionHtml(arr, "scopeBusiness");
                    });
                } else {
                    $("textarea[name=scopeBusiness]").val(res.data.scopeBusiness);
                    $("#scopeBusiness .help-block").text("");
                }
            }

            if (res.data.province != "" || res.data.province != null) {
                $("#province_1").getProvinceC({
                    code: res.data.province,
                    value: res.data.provinceName
                }, $("#province_1").is(":disabled"));
                $("#city_1").getCityC(res.data.province, {
                    code: res.data.city,
                    value: res.data.cityName
                }, $("#city_1").is(":disabled"));
                $("#area_1").getAreaC(res.data.city, {
                    code: res.data.area,
                    value: res.data.areaName
                }, $("#area_1").is(":disabled"));
            }
            $("#carDealerForm").values(res.data);
            if (res.data.registrationNum == "" || !res.data.registrationNum) {
                $("#addInfoS").show();
            } else {
                $("#addInfoS").show();
            }

            //获取车商编码
            dealerNo = res.data.dealerNo

            getDocumentList(dealerId, 801);
            getDocumentList(dealerId, 802);
            getDocumentList(dealerId, 803);
            getDocumentList(dealerId, 804);

            //车商评分部分
            $("#scoreTab").show();
            getCarDealerScore({dealerName: res.data.dealerName});
            getCarDealerScoreLatestSixMonth({dealerName: res.data.dealerName});
            dealerName = res.data.dealerName;
            var dataArr =[["#dealerGrade", "DealerGrade", res.data.dealerGrade]];
            $.getCommonMethodPort(dataArr);
        }
    });
    //给车商id隐藏域赋值
    $("#dealerId").val(dealerId);
} else {
    $("#province_1").getProvince();
    $("#dealerGroupId").getDealerGroup();
    var dataArr =[["#dealerGrade", "DealerGrade"]];
    $.getCommonMethodPort(dataArr);
}

//基本信息-账户信息
dataLoad_1 = function (params) {
    var p;
    p = params.data;
    p["dealerId"] = dealerId || $("#dealerId").val();
    if (p["dealerId"]) {
        tableData(params, $.extend($("#searchForm").values(), p), interUrl.carDealer.accountList);
    } else {
        return params.complete();
    }
};

tableEvent_1 = {
    "click .stop": function (e, a, item, index) {
        $("#sureModal").modal("show");
        $("#sureModal").find(".tipText").text("确定要" + (item['status'] == 0 ? "启用" : "停用") + "账户吗?");
        $("#sureOption").unbind("click").click(function () {
            comn.ajax({
                url : interUrl.carDealer.verifyAccountCanOper,
                data : {
                    dealerId : dealerId
                },
                success : function(res) {
                    if (res.data) {
                        $("#sureModal").modal("show");
                        $("#sureModal").find(".tipText").text(res.data);
                        $("#sureOption").unbind("click").click(function () {
                            accountStop(item);
                        })
                    } else {
                        accountStop(item);
                    }

                }
            })
        });
    },
    "click .delete": function (e, a, item, index) {
        $("#sureModal").modal("show");
        $("#sureModal").find(".tipText").text("确定要删除账户吗?");
        $("#sureOption").unbind("click").click(function () {
            return comn.ajax({
                url: interUrl.carDealer["accountDel"],
                data: {
                    accountId: item['id']
                },
                success: function (res) {
                    $("#sureModal").modal("hide");
                    tip({
                        content: "删除成功!"
                    });
                    $("#table_account").bootstrapTable('refresh', {url: "..."});
                }
            });
        })
    }
};

handle_1 = function (value, row, index) {
    var btnStatus = "<li><a class='stop'>" + (row["status"] == "1" ? "停用" : "启用") + "</a></li>";
    return ["<div class='btn-group btn-group-xs'>", "<button type='button' class='btn btn-primary dropdown-toggle' data-toggle='dropdown'>操作", "<span class='caret'></span>", "<span class='sr-only'>下拉切换</span>", "</button>", "<ul class='dropdown-menu' role='menu'>", btnStatus, "<li><a class='delete'>删除</a></li></ul>", "</div>"].join("");
};
//初始化账户表格
$("#table_account").bootstrapTable(tableConfig);


$(function () {
    if (type != 3 && type != 4) {
        $("#btn-flowSubmit").addClass("hide");
    }
    if (type == "3") $("#employDealerId").getDealerName();
    //初始化费用信息表格
    $("#userTable").bootstrapTable(tableConfig);
	$("#feeSearch").click(function(){
		$("#feeTable").bootstrapTable('refresh', {url: '...'}); 
	});
});

//费用信息
dataLoad_fee = function (params) {
    if (dealerId || $("#dealerId").val()) {
		tableData(params, $.extend($("#feeFormSearch").values(), {
			'dealerId': dealerId || $("#dealerId").val()
		}), interUrl.carDealer.fee);
    } else {
        return params.complete();
    } 
};

tableEvent_fee = {
    "click .copy": function (e, a, item, index) {
        return comn.ajax({
            url: interUrl.carDealer.carDealerFeeCopy,
            data: {
                carFeeId: item['id']
            },
            success: function (res) {
                tip({content: res.message || "复制成功!"});
                return $("#feeTable").bootstrapTable('refresh', {url: "..."});
            }
        });
    },
    "click .modify": function (e, a, item, index) {
        $("#feeBox").show();
        $("#feeBoxPanel").html("修改费用信息");
        window.location.href = "#feeBox";
        getFeeInfo(item['id']);
        //修改启用表单
        $("#feeFieldset").removeAttr("disabled");
    },
    "click .see": function (e, a, item, index) {
        $("#feeBox").show();
        $("#feeBoxPanel").html("查看费用信息");
        window.location.href = "#feeBox";
        getFeeInfo(item['id']);
        //查看禁用表单
        $("#feeFieldset").attr("disabled", "disabled");
    },
    "click .stop": function (e, a, item, index) {
        comn.ajax({
            url: interUrl.carDealer.feePromptMsg,
            data: {
                feeId: item['id']
            },
            success: function (res) {
                if(res.data){
                    oppSureModal(res.data);
                    $("#sureOption").unbind("click").click(function () {
                        oppSureModal("费用停用后,不可再次启用,必须重新添加,确认停用吗?");
                        $("#sureOption").unbind("click").click(function () {
                            return comn.ajax({
                                url: interUrl.carDealer.feeStop,
                                data: {
                                    feeId: item['id']
                                },
                                success: function (res) {
                                    $("#sureModal").modal("hide");
                                    tip({content: "停用成功!"});
                                    return $("#feeTable").bootstrapTable('refresh', {url: "..."});
                                }
                            });
                        })
                    })
                }else{
                    oppSureModal("费用停用后,不可再次启用,必须重新添加,确认停用吗?");
                    $("#sureOption").unbind("click").click(function () {
                        return comn.ajax({
                            url: interUrl.carDealer.feeStop,
                            data: {
                                feeId: item['id']
                            },
                            success: function (res) {
                                $("#sureModal").modal("hide");
                                tip({content: "停用成功!"});
                                return $("#feeTable").bootstrapTable('refresh', {url: "..."});
                            }
                        });
                    })
                }

            }
        });

    },
    "click .del": function (e, a, item, index) {
        $("#sureModal").modal("show");
        $("#sureModal").find(".tipText").text("确认删除吗?");
        $("#sureOption").unbind("click").click(function () {
            return comn.ajax({
                url: interUrl.carDealer.carDealerFeeDelete,
                data: {
                    carFeeId: item['id']
                },
                success: function (res) {
                    $("#sureModal").modal("hide");
                    tip({content: res.message || "删除成功!"});
                    return $("#feeTable").bootstrapTable('refresh', {url: "..."});
                }
            });
        })
    },
    "click .del": function (e, a, item, index) {
        $("#sureModal").modal("show");
        $("#sureModal").find(".tipText").text("确认删除吗?");
        $("#sureOption").unbind("click").click(function () {
            return comn.ajax({
                url: interUrl.carDealer.carDealerFeeDelete,
                data: {
                    carFeeId: item['id']
                },
                success: function (res) {
                    $("#sureModal").modal("hide");
                    tip({content: res.message || "删除成功!"});
                    return $("#feeTable").bootstrapTable('refresh', {url: "..."});
                }
            });
        })
    }
};
// approveStatus = 4 表示失效(停用后失效)
handle_fee = function (value, row, index) {
    var btnStatus = (row["status"] == "1" && type != "2") ? "<li><a class='stop'>停用</a></li>" : null;
    var modify = "", del = "", copy = "";
    if (currentNode && args['itemFlow'] != "show") {
        modify = (currentNode == "CAR_DEALER_REGIONAL_MANAGER" || currentNode == "CAR_DEALER_LAUNCH") ? "<li><a class='modify'>修改</a></li>" : null;
        del = (currentNode == "CAR_DEALER_REGIONAL_MANAGER" || currentNode == "CAR_DEALER_LAUNCH") ? "<li><a class='del'>删除</a></li>" : null;
        copy = (currentNode == "CAR_DEALER_REGIONAL_MANAGER" || currentNode == "CAR_DEALER_LAUNCH") ? "<li><a class='copy'>复制</a></li>" : null;
    } else {
        modify = (row["approveStatus"] == "0" && type != "2") ? "<li><a class='modify'>修改</a></li>" : null;
        del = ((row["approveStatus"] == "0" || row["approveStatus"] == "4") && type != "2") ? "<li><a class='del'>删除</a></li>" : null;
        copy = ((row["approveStatus"] == "0" || row["approveStatus"] == "4") && type != "2") ? "<li><a class='copy'>复制</a></li>" : null;
    }
    var see = "<li><a class='see'>查看</a></li>";
    return isManager ? ["<div class='btn-group btn-group-xs'>", "<button type='button' class='btn btn-primary dropdown-toggle' data-toggle='dropdown'>操作", "<span class='caret'></span>", "<span class='sr-only'>下拉切换</span>", "</button>", "<ul class='dropdown-menu' role='menu'>", copy, modify, btnStatus, del, see, "</ul>", "</div>"].join("") : null;
};

//是否启停
function accountStop(item) {
    comn.ajax({
        url: interUrl.carDealer.accountStop,
        data: {
            accountId: item['id'],
            status: (item['status'] == 0 ? 1 : 0),
            currentNode: currentNode
        },
        success: function (res) {
            $("#sureModal").modal("hide");
            tip({content: (item['status'] == 0 ? "启用" : "停用") + "成功!"});
            return $("#table_account").bootstrapTable('refresh', {url: "..."});
        }
    });
}

//保存新增账户
function accountAdd(data, dealerId) {
    comn.ajax({
        url: interUrl.carDealer.accountAdd,
        data: $.extend(data, {
            dealerId: dealerId,
            currentNode: currentNode
        }),
        success: function (res) {
            $("#addAccountModal").modal("hide");
            $("#sureModal").modal("hide");
            tip({content: res.message || "新增账户成功"});
            $("#table_account").bootstrapTable('refresh', {url: ""});
        }
    });
}
//获取车商费用信息
function getFeeInfo(feeId) {
    comn.ajax({
        url: interUrl.carDealer.feeGet,
        data: {
            feeId: feeId
        },
        success: function (res) {
            $("#feeForm").values(res.data);
            $("#rebateType").trigger("change");
            res.data.c1 == 0 ? $("input[name=c1]").prop("checked", false).val("0") : $("input[name=c1]").prop("checked", "checked").val("1");
            res.data.c2 == 0 ? $("input[name=c2]").prop("checked", false).val("0") : $("input[name=c2]").prop("checked", "checked").val("1");
            res.data.c3 == 0 ? $("input[name=c3]").prop("checked", false).val("0") : $("input[name=c3]").prop("checked", "checked").val("1");
            res.data.c4 == 0 ? $("input[name=c4]").prop("checked", false).val("0") : $("input[name=c4]").prop("checked", "checked").val("1");
            res.data.c5 == 0 ? $("input[name=c5]").prop("checked", false).val("0") : $("input[name=c5]").prop("checked", "checked").val("1");
            res.data.c6 == 0 ? $("input[name=c6]").prop("checked", false).val("0") : $("input[name=c6]").prop("checked", "checked").val("1");
            res.data.c7 == 0 ? $("input[name=c7]").prop("checked", false).val("0") : $("input[name=c7]").prop("checked", "checked").val("1");
            res.data.c8 == 0 ? $("input[name=c8]").prop("checked", false).val("0") : $("input[name=c8]").prop("checked", "checked").val("1");
            res.data.c9 == 0 ? $("input[name=c9]").prop("checked", false).val("0") : $("input[name=c9]").prop("checked", "checked").val("1");
            pdGps(res.data.gpsNumber);
			var gpsFactoryArr = res.data.gpsFactory.split(",");
			$("#gpsFactory").selectpicker('val', gpsFactoryArr);
            if (res.data.costType == "2" || res.data.costType == "3") $("#insuranceAmount, #accountDeposit").prop("readonly", "readonly");
            if (res.data.chargeForTrouble == "2" || res.data.chargeForTrouble == "3") $("#costAmount").prop("readonly", "readonly");
            if (res.data.vehiclePurchaseTax == "2" || res.data.vehiclePurchaseTax == "3") $("#vehiclePurchaseTaxFee").prop("readonly", "readonly");
        }
    });
}

function saveInfo(callback, falg) {
    $("#carDealerForm").validate();
    if ($("#carDealerForm").valid() == true) {
        var data = $("#carDealerForm").values();
        var _url, _message, isManagerC = false;
        if (dealerId || $("#dealerId").val()) {
            _url = interUrl.carDealer.update;
            _message = "保存成功!"
            //车商修改-新增车商编码字段
            data.dealerNo = dealerNo;
            //车商修改- 新增鹏源信息查询是否成功
            data.pyChecked = pyChecked;      
        } else {
            _url = interUrl.carDealer.add;
            _message = "新增成功";
            isManagerC = true;
            //车商新增- 新增鹏源信息查询是否成功
            data.pyChecked = pyChecked;
        }
        comn.ajax({
            url: _url,
            data: $.extend(data, {id: args['dealerId'] || $("#dealerId").val()}),
            success: function (res) {
                //新增车商-新增车商接口-如果车商已存在逻辑判断
                if(type == 3) {
                    if(res.data.facadeIsExist == 1){
                        tip({content: res.message});
                        $("#addInfo").trigger("click");
                    }
                }

                $("#dealerId").val(res.data.id);
                if (isManagerC) {
                    isManager = true;
                    dealerId = res.data.id;
                    $("#userTable").bootstrapTable("refresh", {url: "..."});
                }
                if (typeof(callback) == "function") {
                    callback(res.data);
                }
                if (!falg) {
                    tip({content: res.message || _message});
                }
            }
        });
    }
}

//保存车商基本资料
$("#save-baseInfo").on("click", function () {//点击提交
    saveInfo();
});

//新增账户按钮
$("#addCarDealer").click(function () {
    //判断是否已保存车商信息
    if (dealerId || $("#dealerId").val()) {
        $("#addAccountModal").modal("show");
    } else {
        tip({content: "请先保存车商信息"});
    }
});
//新增账户
$("#saveAccount").click(function () {
    var dealerId = args['dealerId'] || $("[name='id']").val();
    $("#addAccountForm").validate();
    if ($("#addAccountForm").valid() == true) {
        var data = $("#addAccountForm").values();
        comn.ajax({
            url : interUrl.carDealer.verifyAccountCanOper,
            data : {
                dealerId : dealerId,
                subBankId:$(".cashBank").val()
            },
            success : function (res) {
                if (res.data) {
                    $("#sureModal").modal("show");
                    $("#sureModal").find(".tipText").text(res.data);
                    $("#sureOption").unbind("click").click(function () {
                        accountAdd(data, dealerId);
                    })
                } else {
                    accountAdd(data, dealerId);
                }

            }
        })
    }
});

//添加费用
$("#addFee-btn").click(function () {
    if (dealerId || $("#dealerId").val()) {
        $("#feeId").val("");//hyn
        $("#feeBoxPanel").html("添加费用信息");
        $("#feeBox").show();
        window.location.href = "#feeBox";
		$("#gpsFactory").selectpicker('val', '');
        $("#resetFeeForm").trigger("click");
        if ($("#feeFieldset:disabled")) {
            $("#feeFieldset").removeAttr("disabled");
        }
    } else {
        tip({content: "请先保存车商信息"});
    }

});

//返利方式控制返利名称
$("#rebateType").change(function () {
    var val = $(this).val();
    var flfs = $("#flfs");
    if (val == "1") {
        flfs.html("<span class=\"text-danger\">*</span>营销费(%):");
    } else if (val == "2") {
        flfs.html("<span class=\"text-danger\">*</span>营销费上限(%):");
    }
});

//判断代收费用
function pdFee(a, b) {
    return $("[name='" + a + "']").change(function () {
        var _this = $(this);
        if (_this.val() == 1) {
            $("[name='" + b + "']").attr("readonly", true).val(0);
        } else {
            $("[name='" + b + "']").removeAttr("readonly");
        }
    });
}
pdFee("agencyFee1Type", "agencyFee1");
pdFee("agencyFee2Type", "agencyFee2");
pdFee("otherFeeType", "otherFee");

// 判断gps台数
function pdGps(gpsNumber) {
    var g = $("#gpsInstallationFee");
    var l = $("#liabilityAmount");
    var gpsType = $("#gpsType");
    var gpsFactory = $("#gpsFactory");
    if (gpsNumber == 0) {
        gpsType.attr({disabled: "disabled", "readonly": true}).removeAttr("required").val("0");
        g.attr("readonly", true).val(0).removeAttr('required');
        l.attr("readonly", true).val(0).removeAttr('required');
		$("#gpsFactoryIT").hide();
		gpsFactory.selectpicker('val', []);
    } else {
        gpsType.removeAttr("disabled readonly").attr('required', 'required');
        g.removeAttr("readonly").attr('required', 'required');
        l.removeAttr("readonly").attr('required', 'required');
		$("#gpsFactoryIT").show();
    }
}

//GPS
$("#gpsNumber").change(function () {
    var _this = $(this);
    if (_this.val() == 0) {
        gpsNumber == 0;
        pdGps(_this.val());
    } else {
        gpsNumber = _this.val();
        pdGps(_this.val());
    }

});

$("#bankId").change(function () {
    if (this.value) {
        $("#bankName").val($(this).find('option:selected').text());
    }
});

//新增、修改费用保存
$("#save-fee").click(function () {
    $("#feeForm").validate();
    if ($("#feeForm").valid() == true) {
        var feeId = $("#feeId").val();
        var _url, _message;
        if (!feeId) {
            _url = interUrl.carDealer.feeAdd; //新增
            _message = "添加成功!";
        } else {
            _url = interUrl.carDealer.feeUpdate;  //修改
            _message = "修改成功!";
        }
		var o = $("#feeForm").values();
		if(o['gpsNumber'] && o['gpsNumber'] != 0 && !o['gpsFactory']){
			return tip({content: '请选择gps厂家! '});
		}
		if(o['gpsFactory']){
			o['gpsFactory'] = o['gpsFactory'].join(",");
		}
        comn.ajax({
            url: _url,
            data: $.extend(o , {
                    carDealerId: dealerId || $("#dealerId").val()
                },
                {
                    currentNode: args['releventFlowNode'] || ""
                }),
            success: function (res) {
                tip({content: res.message || _message});
                $("#feeBox").hide();
                $("#feeTable").bootstrapTable("refresh", {url: "..."});
            }
        });
    }

});

//管理团队

//查询选择用户列表
$("#btn-search-user").click(function () {
    $("#addUserTable").bootstrapTable("refresh", {url: "..."});
});

//团队信息-人员列表
dataLoad_user = function (params) {
    if (dealerId || $("#dealerId").val()) {
		tableData(params, {
			'dealerId': dealerId || $("#dealerId").val()
		}, interUrl.carDealer.manager);
    } else {
        return params.complete();
    }
};

tableEvent_user = {
    "click .stop": function (e, a, item, index) {
        $("#sureModal").modal("show");
        $("#sureModal").find(".tipText").text("是否" + (item['status'] == 0 ? "启用" : "停用") + item['managerName'] + "的业务权?");
        $("#sureOption").unbind("click").click(function () {
            return comn.ajax({
                url: interUrl.carDealer.managerSetStatus,
                data: {
                    memberId: item['id'],
                    status: (item['status'] == 0 ? 1 : 0)
                },
                success: function (res) {
                    $("#sureModal").modal("hide");
                    tip({content: (item['status'] == 0 ? "启用" : "停用") + "成功!"});
                    return $("#userTable").bootstrapTable('refresh', {url: "..."});
                }
            });
        })
    },
    "click .delete": function (e, a, item, index) {
        $("#sureModal").modal("show");
        $("#sureModal").find(".tipText").text("是否删除" + item['managerName'] + "的业务权？");
        $("#sureOption").unbind("click").click(function () {
            return comn.ajax({
                url: interUrl.carDealer.managerDel,
                data: {
                    memberId: item['id']
                },
                success: function (res) {
                    $("#sureModal").modal("hide");
                    tip({
                        content: res.message || "删除成功!"
                    });
                    return $("#userTable").bootstrapTable('refresh', {url: "..."});
                }
            });
        })
    },
    "click .toManager": function (e, a, item, index) {
        $("#sureModal").modal("show");
        $("#sureModal").find(".tipText").text("将管护权移交给" + item['managerName']);
        $("#sureOption").unbind("click").click(function () {
            return comn.ajax({
                url: interUrl.carDealer.managerSet,
                data: {
                    memberId: item['id']
                },
                success: function (res) {
                    $("#sureModal").modal("hide");
                    tip({content: res.message || "操作成功!"});
                    isManager = false;
                    $("#userTable").bootstrapTable('refresh', {url: "..."});
                    $("#addUser-btn").attr("disabled", "disabled");
                }
            });
        })
    }
};

handle_user = function (value, row, index) {
    var btnStatus = "<li><a class='stop'>" + (row["status"] == "1" ? "停用" : "启用") + "</a></li>";
    var toManager = "<li><a class='toManager'>赋管户权</a></li>";
    if (isManager || canRead(comn.user.roleList, "true")) {
        if (value) {
            return null;
        } else {
            return ["<div class='btn-group btn-group-xs'>", "<button type='button' class='btn btn-primary dropdown-toggle' data-toggle='dropdown'>操作", "<span class='caret'></span>", "<span class='sr-only'>下拉切换</span>", "</button>", "<ul class='dropdown-menu' role='menu'>", btnStatus, "<li><a class='delete'>删除</a></li>", toManager, "</ul>", "</div>"].join("");
        }
    }
};

function setOption(isManager, btnStatus, toManager) {
    return isManager ? ["<div class='btn-group btn-group-xs'>", "<button type='button' class='btn btn-primary'>操作</button>", "<button type='button' class='btn btn-primary dropdown-toggle' data-toggle='dropdown'>", "<span class='caret'></span>", "<span class='sr-only'>下拉切换</span>", "</button>", "<ul class='dropdown-menu' role='menu'>", btnStatus, "<li><a class='delete'>删除</a></li>", toManager, "</ul>", "</div>"].join("") : null;
}


//点击添加业务权按钮
$("#addUser-btn").click(function () {
    if (dealerId || $("#dealerId").val()) {
        $("#addUserModal").modal("show");
    } else {
        tip({content: "请先保存车商信息"});
    }
});

//当模态框出现时加载表格
var loadFlag = true;
$("#addUserModal").on("shown.bs.modal", function () {
	if(loadFlag){ 
		//获取所在机构下拉,用户角色下拉
		$("#orgId").getOrg();
		//$("#roleId").getRuleList(55);

		//团队管理-添加业务权用户列表 
		dataLoad_addUser = function (params) {
			var dealerId = dealerId || $("#dealerId").val();
			if (dealerId) {
				tableData(params,
					$.extend($("#addUserForm").values(), {'dealerId': dealerId}),
					interUrl.carDealer.userList
				);
			}
		};

		//初始化表格
		$("#addUserTable").bootstrapTable(comn.table);
		$("#addUserTable").bootstrapTable("refresh", {url: "..."});
		loadFlag = false;
	}
});

$("#sureAddUser").click(function () {
    var $table = $("#addUserTable"), arr = $table.bootstrapTable('getAllSelections');
    if (arr.length == 0) {
        return $("#addUserModal").modal("hide");
    }
    $.each(arr, function (i) {
        arr[i]['carDealerId'] = dealerId;
    });
    comn.ajax({
        url: interUrl.carDealer.managerAdd,
        data: {jsonStr: JSON.stringify(arr)},
        success: function (res) {
            tip({content: res.message || "添加成功!"});
            $("#addUserModal").modal("hide");
            $("#userTable").bootstrapTable("refresh", {url: "..."});
        }
    });
});

//图片部分
base64 = function (file, index, callback) {
    var index = file.name.indexOf('.');
    var fileType = file.name.substr(index);
    var reg = /^\.jpg|png|.JPG|.PNG$/;
    if(reg.test(fileType)){
        return lrz(file).then(function (rst) {
            var imgRst;
            imgRst = rst.base64;
            return typeof callback === "function" ? callback(file, imgRst, index) : void 0;
        });
    } else {
        return tip({content: "请上传jpg或png格式的图片！"})
    }
};


function imgHtml(obj, _type, id) {
    for (var j = 0; j < obj.length; j++) {
        var o = obj[j];
        var _name= "", _icon = "";
        if (Number(o.fileKey)) {
            if (_type === 801) {
                _name = "营业执照";
                _icon = "busLicence"
            } else {
                switch (Number(o.fileKey)) {
                    case 1:
                        _name = "正面整体";
                        _icon = "busPlace_01";
                        break;
                    case 2:
                        _name = "左前侧面";
                        _icon = "busPlace_02";
                        break;
                    case 3:
                        _name = "右前侧面";
                        _icon = "busPlace_03";
                        break;
                    case 4:
                        _name = "内部正面";
                        _icon = "busPlace_04";
                        break;
                    case 5:
                        _name = "内部正面";
                        _icon = "busPlace_04";
                        break;
                    case 6:
                        _name = "内部正面";
                        _icon = "busPlace_04";
                        break;
                    default:
                        break;
                }
            }
        }
        if (o.filePath && o.fileKey) {
            var html = "";
            html = [
                "<div class='putImg "+ _icon +" loadImg' data-type='"+ _type +"' data-img='"+ _icon +"' data-remark='"+ o.fileKey +"'>",
                "<li data-id='"+ (o.id || '') +"'>",
                "<img src='" + o.filePath + "?x-oss-process=image/resize,h_57' height='57' data-src='" + o.filePath + "' />",
                "<p class='text-center'>",
                (type != "2" && _joinResult != "2") ? "<a javascript='javascript:void();' class='upCancle oneForOne'>删除</a>" : "",
                "</p>",
                "</li>",
                "</div>"
            ].join("");
            $("#fileType_" + _type +" [data-remark="+ o.fileKey+"]").replaceWith(html);
        } else {
            var _html = "";
            var del = (type != "2") ? "<a href='javascript:;' class='upCancle'>删除</a>" : "";
            var _html = "<li class='loaded' data-id='" + o.id + "'>" +
                "<img class='img showImg img-thumbnail' src='" + o.filePath + "?x-oss-process=image/resize,h_57' o.filePath='" + o.filePath + "' height='57' style='height:57px' data-src='" + o.filePath + "' data-toggle='tooltip' title='上传时间(" + o.createTime + ")' alt='上传时间(" + o.createTime + ")' />" +
                "<div class='text-center'>" + del + "</div>" +
                "</li>";
            $("#fileType_" + _type).append(_html);
        }
    }
}

//图片上传
var _remark = "";
$(document).on("click", ".upImage, .imgItem", function(){
    var _this = $(this);
    var _type = _this.attr("data-type");
    var isManagerC = false;
    //车商基本信息
    var data = $("#carDealerForm").values();
    $("#carDealerForm").validate();
    if ($("#carDealerForm").valid() == true) {
        //如果是修改
        var id = dealerId || $("#dealerId").val();
        if (id) {
            return triClick(_type, _this);
        } else {  //如果是新增
            comn.ajax({
                url: interUrl.carDealer.add,
                async: false,
                data: data,
                success: function (res) {
                    $("#dealerId").val(res.data.id);
                    if (isManagerC) {
                        isManager = true;
                    }
                    triClick(_type, _this)
                }
            });
        }
        function triClick(_type, _this){
            if(_type === '801' || _type === '802') {
                _remark = _this.attr("data-remark");
                $(".currentImg").removeClass("currentImg");
                _this.addClass("currentImg");
                //触发上传图片
                _this.parent().parent().parent().find("input[type='file']").trigger("click");
            } else {
                _this.parent("div").find(".upImageInput").trigger("click");
            }
        }
    }

});



$(".upImageInput").change(function () {
    var _this = $(this);
    var _type = _this.attr("data-type");
    var fileArr, i, j, k, len, results;
    fileArr = this.files;
    results = [];
    for (k = j = 0, len = fileArr.length; j < len; k = ++j) {
        i = fileArr[k];
        results.push(base64(i, k, function (f, o, index) {
            uploadImg(dealerId || $("#dealerId").val(), _type, o, f);
        }));
    }
    return results;
});

//图片新增or删除后需要重新审批
function isReSubmit() {
    comn.ajax({
        url: interUrl.carDealer.updateCarDealerApproveStatus,
        data: {
            carDealerId: dealerId || $("#dealerId").val()
        },
        success: function (res) {
        
        }
    })
}

//删除图片  delDocument
$(".files-ul").on("click", ".upCancle", function () {
    var _this, _type, ul, fileId;
    _this = $(this);
    _type = _this.parents("ul").data("type");
    ul = _this.parents("ul");
    fileId = _this.parents("li").data("id");
    comn.ajax({
        url: interUrl.gr.delDocument,
        data: {
            fileNamespace: "CAR_DEALER",
            documentIds: fileId,
            dirId: _type,
            releventFlow: "CAR_DEALER_ADD_FLOW",
            releventFlowNode: "CAR_DEALER_LAUNCH"
        },
        success: function (res) {
			tip({content: "删除成功! "});
			if ((_type == '801' && _this.hasClass("oneForOne")) || (_type == '802' && _this.hasClass("oneForOne"))) {
                $(_this).closest("li").parent().addClass("imgItem").removeClass("loadImg currentImg").html("").append("<span class='addImg'></span>");
            } else {
                _this.parents("li").remove();
                _this.parents("ul").prev("div").find(".upImageInput").val("");
            }
            isReSubmit()

        }
    });

});

//获取图片
function getDocumentList(id, _type) {
    var result = "";
    comn.ajax({
        url: interUrl.gr.documentList,
        data: {
            fileNamespace: "CAR_DEALER",
            loanApplyId: id,
            dirId: _type,
            releventFlow: "CAR_DEALER_ADD_FLOW",
            releventFlowNode: "CAR_DEALER_LAUNCH"
        },
        success: function (res) {
            var result = "";
            if (_type === 801 || _type === 802) {
                imgHtml(res.data, _type, id)
            } else {
                var del = (type != "2") ? "<a href='javascript:;' class='upCancle'>删除</a>" : "";
                var i, list = res.data;
                for (i = 0; i < list.length; i++) {
                    var o = list[i];
                    result += "<li class='loaded' data-id='" + o.id + "'>" +
                        "<img class='img showImg img-thumbnail' src='" + o.filePath + "?x-oss-process=image/resize,h_57' height='57' style='height:57px' data-src='" + o.filePath + "' data-toggle='tooltip' title='上传时间(" + o.createTime + ")' alt='上传时间(" + o.createTime + ")' />" +
                        "<div class='text-center'>" + del + "</div>" +
                        "</li>";
                }
                $("#fileType_" + _type).html(result);
            }
            $('[data-toggle="tooltip"]').tooltip();
            setTimeout(function () {
                viewer = new Viewer(pictures, options);
            }, 1000);
        }
    });
}

//上传图片
function uploadImg(id, _type, imgBase64, f) {
    var $tr, $trAll;
    $tr = $("#fileType_" + _type).find("li:not('.loaded')"); //把已经上传过的过滤掉 
    $trAll = $("#fileType_" + _type).find("li");
    comn.ajax({
        url: interUrl.gr.uploadImage,
        data: $.extend($tr.values(), {
            fileNamespace: "CAR_DEALER",
            loanApplyId: id,
            dirId: _type,
            releventFlow: "CAR_DEALER_ADD_FLOW",
            releventFlowNode: "CAR_DEALER_LAUNCH",
            'LoanDocuments[0].fileKey': (_type == "801" || _type == "802") ? _remark : '',
			'LoanDocuments[0].fileName': f.name,
            "LoanDocuments[0].filePath": imgBase64
        }),
        success: function (res) {
            if(_type === "801" || _type === "802") {
                $("#fileType_" + _type).find(".currentImg").removeClass("imgItem").html("").append(replaceImgHtml(imgBase64,'',res.data[0]));
            } else {
                var _index = $("#fileType_" + _type).find("li").length;
                html = ["<li data-id='"+ res.data[0] +"'>",
                    "<img class='img showImg' src='" + imgBase64 + "' data-src='" + imgBase64 + "' height='57' />",
                    "<div class='text-center'><a href='javascript:;' class='upCancle'>删除</a></div>",
                    "</li>"].join("");
                $("#fileType_" + _type).prepend(html);
            }
            isReSubmit()
        }
    });
}
function replaceImgHtml(base64Img, _index, id) {
    var html = "";
    html += ["<li data-id='"+ (id || '') +"'>",
        "<img src='" + base64Img + "' height='57' />",
        "<p class='text-center'>",
        "<a javascript='javascript:void();' class='upCancle oneForOne'>删除</a>",
        "</p>",
        "</li>"
    ].join("");
    $(".currentImg").addClass("loadImg");
    return html;
}

function optionHtml(arr, name) {
    var html = "<select type='text' name='" + name + "' placeholder='' class='form-control'>";
    for (i in arr) {
        html += "<option>" + arr[i] + "</option>";
    }
    if (arr.length < 2) {
        $(".help-block").text("");
    } else {

    }
    html += "</select><p class='help-block text-success'>此信息存在争议，请确认后选择！</p>"
    return html;
}

//获取企业信息,如果是新增车商-调接口获取车商id获取信息，再调鹏源接口;
function newCarUserGetCompanyInfo(dealerName) {
    //车商新增-点击获取企业信息，上面获取车商id后，获取鹏源信息
    function getPengYuanInfo() {
        //车商新增-点击获取企业信息，上面获取车商id后，获取鹏源信息start
        comn.ajax({
            url: interUrl.carDealer.carDealerPyGet,
            data: {dealerName: dealerName},
            success: function (res) {
                if (res.data && res.data.legalRepresentative) {
                    var arr = res.data.legalRepresentative.split("&&&");
                    if (arr.length > 1) {
                        $("#legalRepresentative").html(function () {
                            return optionHtml(arr, "legalRepresentative");
                        });
                    } else {
                        $("input[name=legalRepresentative]").val(res.data.legalRepresentative);
                        $("#legalRepresentative .help-block").text("");
                    }
                }
    
                if (res.data && res.data.registeredCapital) {
                    var arr = res.data.registeredCapital.split("&&&");
                    if (arr.length > 1) {
                        $("#registeredCapital").html(function () {
                            return optionHtml(arr, "registeredCapital");
                        });
                    } else {
                        $("input[name=registeredCapital]").val(res.data.registeredCapital);
                        $("#registeredCapital .help-block").text("");
                    }
                }
    
                if (res.data && res.data.registrationStatus) {
                    var arr = res.data.registrationStatus.split("&&&");
                    if (arr.length > 1) {
                        $("#registrationStatus").html(function () {
                            return optionHtml(arr, "registrationStatus");
                        });
                    } else {
                        $("input[name=registrationStatus]").val(res.data.registrationStatus);
                        $("#registrationStatus .help-block").text("");
                    }
                }
                if (res.data && res.data.scopeBusiness) {
                    var arr = res.data.scopeBusiness.split("&&&");
                    if (arr.length > 1) {
                        $("#scopeBusiness").html(function () {
                            return optionHtml(arr, "scopeBusiness");
                        });
                    } else {
                        $("textarea[name=scopeBusiness]").val(res.data.scopeBusiness);
                        $("#scopeBusiness .help-block").text("");
                    }
                }
                if (res.data){
                    res.data.scopeBusiness = "";
                    res.data.legalRepresentative = "";
                    res.data.registrationStatus = "";
                    res.data.registeredCapital = "";
                    $("#carDealerForm").values(res.data);
                }
                $("#addInfo").attr("disabled", "disabled");
                $("#dealerName").attr("readonly", true);
                $("#addInfoS").hide();
    
                //新增车商流程-点击企业信息查询
                pyChecked = 1;                       
            }
        });
        //车商新增-点击获取企业信息，上面获取车商id后，获取鹏源信息end         
    }

    //调接口获取车商id获取信息
    $.ajax({
        url: interUrl.basic + interUrl.carDealer.carDealerFacadeGet,
        data: { 
            dealerName: dealerName
        },
        success: function (res) {
            //查无此车商
            if(res.code === 20000) {
                getPengYuanInfo();
                $('#newCarUserInfo').attr("disabled",false);
                return         
            }

            if(res.code === 10000){
                //车贷系统该车商已存在
                if(res.data.localIsExist == 1){
                    tip({content: res.message});
                    return
                }

                dealerId = res.data.id;

                //车商新增-点击获取企业信息，上面获取车商id后，走有车商id的数据显示逻辑start
                comn.ajax({
                    url: interUrl.carDealer.get,
                    data: {
                        dealerId: res.data.id
                    },
                    success: function (res) {
                        _joinResult = res.data.joinResult ? res.data.joinResult : '';
                        if (res.data.joinResult && res.data.joinResult == "2") {
                            $(".stateJoin, input[data-type=801], input[data-type=802]").prop("disabled", "disabled");
                            $(".stateJoinInput").prop("readOnly", "readOnly");
                            $(".addImg").removeClass("addImg").addClass("noUpload");
                        }
                        //加载经销商名称
                        $("#employDealerId").getDealerName(res.data.employDealerId, dealerId);
                        $("select[name=cannelBankId]").getBank(res.data.cannelBankId);
                        $("#dealerGroupId").getDealerGroup(res.data.dealerGroupId);
                        //如果车商类型是1 则把经销商名称disable， 否则显示经销商名称
                        res.data.carDealerType === 1 ? $("#employDealerName, #employDealerId").prop("disabled", "disabled") : $("#isDealerName").removeClass("hide");
                        res.data.isDealerGroup === 1  ? $("#isDealerGroup").removeClass("hide") : "";
                        if (res.data.cannelStatus === 1) {
                            $("#isBank").removeClass("hide")
                        } else if (res.data.cannelStatus === 2) {
                            $("#isBranchMarketing").removeClass("hide");
                            $("select[name=cannelBankId],input[name=cannelBankName]").prop("disabled", "disabled");
                        } else if (res.data.cannelStatus === 3) {
                            $("#isDealerGroup").removeClass("hide");
                            $("select[name=cannelBankId],input[name=cannelBankName]").prop("disabled", "disabled");
                        } else {
                            $("select[name=cannelBankId],input[name=cannelBankName]").prop("disabled", "disabled");
                        }
                        if (res.data && res.data.legalRepresentative) {
                            var arr = res.data.legalRepresentative.split("&&&");
                            if (arr.length > 1) {
                                $("#legalRepresentative").html(function () {
                                    return optionHtml(arr, "legalRepresentative");
                                });
                            } else {
                                $("input[name=legalRepresentative]").val(res.data.legalRepresentative);
                                $("#legalRepresentative .help-block").text("");
                            }
                        }

                        if (res.data && res.data.registeredCapital) {
                            var arr = res.data.registeredCapital.split("&&&");
                            if (arr.length > 1) {
                                $("#registeredCapital").html(function () {
                                    return optionHtml(arr, "registeredCapital");
                                });
                            } else {
                                $("input[name=registeredCapital]").val(res.data.registeredCapital);
                                $("#registeredCapital .help-block").text("");
                            }
                        }

                        if (res.data && res.data.registrationStatus) {
                            var arr = res.data.registrationStatus.split("&&&");
                            if (arr.length > 1) {
                                $("#registrationStatus").html(function () {
                                    return optionHtml(arr, "registrationStatus");
                                });
                            } else {
                                $("input[name=registrationStatus]").val(res.data.registrationStatus);
                                $("#registrationStatus .help-block").text("");
                            }
                        }
                        if (res.data && res.data.scopeBusiness) {
                            var arr = res.data.scopeBusiness.split("&&&");
                            if (arr.length > 1) {
                                $("#scopeBusiness").html(function () {
                                    return optionHtml(arr, "scopeBusiness");
                                });
                            } else {
                                $("textarea[name=scopeBusiness]").val(res.data.scopeBusiness);
                                $("#scopeBusiness .help-block").text("");
                            }
                        }

                        if (res.data.province != "" || res.data.province != null) {
                            $("#province_1").getProvinceC({
                                code: res.data.province,
                                value: res.data.provinceName
                            }, $("#province_1").is(":disabled"));
                            $("#city_1").getCityC(res.data.province, {
                                code: res.data.city,
                                value: res.data.cityName
                            }, $("#city_1").is(":disabled"));
                            $("#area_1").getAreaC(res.data.city, {
                                code: res.data.area,
                                value: res.data.areaName
                            }, $("#area_1").is(":disabled"));
                        }
                        $("#carDealerForm").values(res.data);
                        if (res.data.registrationNum == "" || !res.data.registrationNum) {
                            $("#addInfoS").show();
                        } else {
                            $("#addInfoS").show();
                        }

                        //获取车商编码
                        dealerNo = res.data.dealerNo

                        getDocumentList(dealerId, 801);
                        getDocumentList(dealerId, 802);
                        getDocumentList(dealerId, 803);
                        getDocumentList(dealerId, 804);

                        //车商评分部分
                        $("#scoreTab").show();
                        getCarDealerScore({dealerName: res.data.dealerName});
                        getCarDealerScoreLatestSixMonth({dealerName: res.data.dealerName});
                        dealerName = res.data.dealerName;
                        var dataArr =[["#dealerGrade", "DealerGrade", res.data.dealerGrade]];
                        $.getCommonMethodPort(dataArr);
                    }
                });
                //给车商id隐藏域赋值
                $("#dealerId").val(dealerId);
                //车商新增-点击获取企业信息，上面获取车商id后，走有车商id的数据显示逻辑end
                $('#newCarUserInfo').attr("disabled",false);  
                getPengYuanInfo();             
            }
        }
    });    
}

//车商-新增type=3,未获取企业信息,信息不能修改
function isDisableInfo() {
    if(type == 3){
        $('#newCarUserInfo').attr("disabled",true);
    }
}
isDisableInfo();

//获取企业信息
$("#addInfo").click(function () {
    var dealerName = $("#dealerName").val();
    if (dealerName == "") {
        tip({content: "请输入车行名称"});
        return;
    }

    //车商新增的时候  先调接口获取车商id,在调鹏源接口
    if(type == 3) {
        newCarUserGetCompanyInfo(dealerName);
        return
    }

    comn.ajax({
        url: interUrl.carDealer.carDealerPyGet,
        data: {dealerName: dealerName},
        success: function (res) {
            if (res.data && res.data.legalRepresentative) {
                var arr = res.data.legalRepresentative.split("&&&");
                if (arr.length > 1) {
                    $("#legalRepresentative").html(function () {
                        return optionHtml(arr, "legalRepresentative");
                    });
                } else {
                    $("input[name=legalRepresentative]").val(res.data.legalRepresentative);
                    $("#legalRepresentative .help-block").text("");
                }
            }

            if (res.data && res.data.registeredCapital) {
                var arr = res.data.registeredCapital.split("&&&");
                if (arr.length > 1) {
                    $("#registeredCapital").html(function () {
                        return optionHtml(arr, "registeredCapital");
                    });
                } else {
                    $("input[name=registeredCapital]").val(res.data.registeredCapital);
                    $("#registeredCapital .help-block").text("");
                }
            }

            if (res.data && res.data.registrationStatus) {
                var arr = res.data.registrationStatus.split("&&&");
                if (arr.length > 1) {
                    $("#registrationStatus").html(function () {
                        return optionHtml(arr, "registrationStatus");
                    });
                } else {
                    $("input[name=registrationStatus]").val(res.data.registrationStatus);
                    $("#registrationStatus .help-block").text("");
                }
            }
            if (res.data && res.data.scopeBusiness) {
                var arr = res.data.scopeBusiness.split("&&&");
                if (arr.length > 1) {
                    $("#scopeBusiness").html(function () {
                        return optionHtml(arr, "scopeBusiness");
                    });
                } else {
                    $("textarea[name=scopeBusiness]").val(res.data.scopeBusiness);
                    $("#scopeBusiness .help-block").text("");
                }
            }
            if (res.data){
                res.data.scopeBusiness = "";
                res.data.legalRepresentative = "";
                res.data.registrationStatus = "";
                res.data.registeredCapital = "";
                $("#carDealerForm").values(res.data);
            }
            $("#addInfo").attr("disabled", "disabled");
            $("#dealerName").attr("readonly", true);
            $("#addInfoS").hide();

            //新增车商流程-点击企业信息查询
            pyChecked = 1;   
        }
    });
});

//提交审批
$("#btn-flowSubmit").click(function () {
    saveInfo(function (data) {
        if (data.neededSync !== null && data.neededSync == "1") {
            $("#sureModal").modal("show");
            $(".tipText").text("客户经理业务组发生调整，是否确认提交变更后业务组的区域经理审批?");
            $("#sureBtn").unbind("click").click(function () {
                return comn.ajax({
                    url: interUrl.carDealer.carDealerInfoCorrect,
                    data: {
                        dealerId: item['id']
                    },
                    success: function (res) {
                        $("#sureModal").modal("hide");
                        tip({
                            content: "信息变更成功!"
                        });
                    }
                });
            })
        } else {
            oppSureModal("是否确认提交");
            $("#sureOption").unbind("click").click(function () {
                $("#sureModal").modal("hide");
                flowSubmit(interUrl.carDealer.preSubmit, interUrl.carDealer.submit2next, './Modal/carDealerManage/carDealer/index.html', {dealerId: data.id || dealerId})
            });

        }
    }, true);

});
function beCloseSubmit() {
    //车商审批流程可在发起节点关闭
    $('#btn-closeSubmit').removeClass('hide')
    $("#btn-closeSubmit").click(function () {
        oppSureModal("是否确认关闭");
        $("#sureOption").unbind("click").click(function () {
            $("#sureModal").modal("hide");
            comn.ajax({
                url: interUrl.carDealer.closeCarDealer,
                data: {dealerId: dealerId},
                success: function (res) {
                    tip({
                        content: res.message
                    });
                    if(res.code == 10000) {
                        comn.closeTab();
                    }
                }
            });
        });
    });
}

//撤销
$("#btn-flowCancel").click(function () {
    oppSureModal("是否确认撤销");
    $("#sureOption").unbind("click").click(function () {
        flowCancel();
    })
});

//取消=返回车商列表页面
$("#btn-back").click(function () {
    window.parent.toUrl({
        url: './Modal/carDealerManage/carDealer/index.html'
    })
});

//是否公牌
$("#isPublicLicense").change(function () {
    var _this = $(this);
    if (_this.val() == 1) {
        $("#licenseCompany").removeAttr("readonly").attr("required", true);
    } else {
        $("#licenseCompany").attr("readonly", true).removeAttr("required").val("");
    }
});

//第一年保费
$("#premiumType").change(function () {
    var _this = $(this);
    if (_this.val() == 1) {
        $("#insuranceAmount").removeAttr("readonly");
        $("#insuranceBox").show();
        $("#accountDeposit").removeAttr("readonly", true);
    } else {
        $("#insuranceAmount").attr("readonly", true).val(0);
        $("#insuranceBox").hide();
        $("#insurance,#insuranceName").val("");
        $("#accountDeposit").attr("readonly", true).val(0);
    }
});

//是否续保
$("#isRenewal").change(function () {
    var _this = $(this);
    if (_this.val() == 1) {
        $("#renewalDeposit").removeAttr("readonly");
    } else {
        $("#renewalDeposit").attr("readonly", true).val(0);
    }
});

function ljpd1(a, b) {
    return $("#" + a).change(function () {
        var _this = $(this);
        if (_this.val() == 1) {
            $("#" + b).removeAttr("readonly");
        } else {
            $("#" + b).attr("readonly", true).val(0);
        }
    });
}
//工本费
ljpd1("costType", "costAmount");
//预置车辆购置税
ljpd1("predictedPurchasetax", "vehiclePurchaseTaxFee");

//图表-雷达图
var chart1 = document.getElementById('chart1');
chart1.style.width = "460px";
chart1.style.height = "400px";
var myChart1 = echarts.init(chart1);
myChart1.setOption({
    title: {
        //text: '车商评分是根据以下五个维度综合评估而来',
        //textAlign:'center'
    },
    tooltip: {
        trigger: 'item'
    },
    radar: [
        {
            indicator: [
                {name: '基本信息', max: 100},
                {name: '业务合作', max: 100},
                {name: '风险情况', max: 100},
                {name: '征信状况', max: 100},
                {name: '经营状况', max: 100}
            ],
            splitNumber: 5,
            name: {
                formatter: '{value}',
                textStyle: {
                    fontSize: 16
                }
            },
            axisLabel: {
                show: true
            }
        }
    ],
    series: [{
        name: '车商评分',
        type: 'radar',
        areaStyle: {
            normal: {
                color:'rgba(103,211,212,0.9)'
            }
        },
        lineStyle:{
            normal:{
                color:'#2ec7c9'
            }
        },
        itemStyle:{
            normal:{
                borderColor:"#2ec7c9"
            }
        },
        data: [
            {
                value: [0,0,0,0,0],
                name: '评分'
            }
        ]
    }]
});

function getCarDealerScore(arg) {
    comn.ajax({
        url: interUrl.carDealer.carDealerScore,
        data: arg,
        success: function (res) {
            var data = res.data;
            var entities = data.entities;
            if (entities) {
                var baseMap = data.baseMap, baseMap_value = [],indicator=[];
                for (var key in baseMap) {
                    indicator.push({name:key,max:100});
                    baseMap_value.push(baseMap[key])
                }
                if (entities.length >= 0) {
                    $("#itemScore1").nameValues(entities[0]);
                    $("#itemScore2").nameValues(entities[1]);
                    $("#itemScore3").nameValues(entities[2]);
                    var zh_score1 = entities[0].grade.slice(0,1).toLowerCase();
                    var zh_score2 = entities[1].grade.slice(0,1).toLowerCase();
                    var zh_score3 = entities[2].grade.slice(0,1).toLowerCase();
					$("#itemScore1").addClass(zh_score1);
					$("#itemScore2").addClass(zh_score2);
					$("#itemScore3").addClass(zh_score3);
                }
                myChart1.setOption({
                    series: [{
                        name: '车商评分',
                        type: 'radar',
                        data: [
                            {
                                value: baseMap_value,
                                name: '评分'
                            }
                        ]
                    }]
                });
            } else {
                $("#score_tip").html("暂无当月数据");
                $("#itemScore1").nameValues({});
                $("#itemScore2").nameValues({});
                $("#itemScore3").nameValues({});
            }

        }
    });
}

var chart2 = document.getElementById('chart2');
chart2.style.width = "800px";
chart2.style.height = "300px";
var myChart2 = echarts.init(chart2);
//图表-折线图
function getCarDealerScoreLatestSixMonth(arg) {
    comn.ajax({
        url: interUrl.carDealer.carDealerScoreLatestSixMonth,
        data: arg,
        success: function (res) {
            var data = res.data, i;
            var month = [], score = [];
            if (Object.prototype.toString.apply(data) === '[object Array]' && data.length > 0)
                for (i = 5; i >=0; i--) {
                    month.push(data[i].month);
                    score.push(data[i].score);
                }
            myChart2.setOption({
                tooltip: {
                    trigger: 'axis'
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: month,
                    axisLine:{
                        lineStyle:{
                            color:'#3598db',
                            width:2
                        }
                    },
                    axisLabel:{
                        textStyle:{
                            color:'#333'
                        }
                    }
                },
                yAxis: {
                    type: 'value',
                    max:100,
                    axisLine:{
                        lineStyle:{
                            color:'#3598db',
                            width:2
                        }
                    },
                    axisLabel:{
                        textStyle:{
                            color:'#333'
                        }
                    }
                },
                series: [
                    {
                        name: '评分',
                        type: 'line',
                        stack: '总量',
                        data: score,
                        lineStyle:{
                            normal:{
                                color:'#2ec7c9'
                            }
                        },
                        itemStyle:{
                            normal:{
                                borderColor:"#2ec7c9",
                                color:'#2ec7c9'
                            }
                        }
                    }
                ]
            });
            myChart2.on('click', function (params) {
                if (params.componentType === 'series') {
                    getCarDealerScore({dealerName: dealerName, month: params.name})
                }
            });
        }
    });
}

$(function () {
	comn.ajax({
		url: interUrl.gr.expressCompanyCode,
		data: {
			codeType: "GpsFactory"
		},
		success: function(res){
			var html = "";
			for (var i = 0, len = res.data.length; i < len; i++) {
				var item = res.data[i];
				html += "<option>" + item.codeName +  "</option>"; 
			}
			$("#gpsFactory").html(html); 
			$('#gpsFactory').selectpicker('render')
		} 
	})
});
