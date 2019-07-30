var map, setPlace, Initialization, getValue, secondChank, Finance, prijeCP, carCost, setMainLoan, flagSubmit = false, isLowFeeFlag = false;
map = null;
var a = '';
var getPos = null;
args = comn.getArgs();
var needDoorRule;
var flow = args['flow']; //如果是修改流程,flow=modify
var isSupportDiscount, coId;//该银行是否支持贴息
var formulaForDiscountAmount = {}; //计算贴息金额需要用到的数据
var _discountFlag = false;
var isDecisionEngineFlag = false; //自动化审批两证业务提交时检测是否走决策引擎接口（不对贷款修改开放）
var isDecEngNodeFlag = false; //自动化审批两证业务提交时是否走总部审批接口（不对贷款修改开放）
//配偶云镜大数据查询情况
var spouseSearchStatus = {
    maritalStatus : '',
    spouseDecisionStatus : ''  
}
//配偶云镜大数据查询是否在倒计时
var isTimeOut = false;

/*
 *type = 0 更新
 *type = 1 保存
 *type = 2 查看
 */

if (flow == 'modify') {
    $("[name='separation']").prop('disabled', true);
}

//贷款修改发起时合作银行可修改repaymentAmount
if (args['releventFlow'] === "LOAN_MODIFY_FLOW") {
    $("#coBankId").prop("disabled", false);
    //$("#loanType").prop("disabled", "disabled");
}

//贷款修改 贷款发起两证不可修改
if(args["releventFlow"] === "LOAN_MODIFY_FLOW") $("#isShow input").prop("disabled", "disabled");
function isDecisionEngine() {
    comn.ajax({
        url: interUrl.decisionEngine.decisionengineGet,
        data: {
            creditApplyId: args["creditApplyId"],
            loanApplyId: args["loanApplyId"]
        },
        success: function (res) {
            if (res && res.data) {
                isDecisionEngineFlag = res.data.invokeDecisionEngine ? true : false;
                isDecEngNodeFlag = res.data.p1NextNode.highQualityChannelNextNodeCode === "LOAN_CAR_FINANCE" ? true : false;
                $("#submitCom span").html((args["releventFlow"] === "LOAN_APPLY_FLOW" && isDecEngNodeFlag) ? "提交总部审核" : "提交中级审核")
            }
        }
    })
}
//贷款申请时提交按钮变更为提交签单调度
if(args["releventFlow"] === "LOAN_APPLY_FLOW") {
	$("#submit span").html("提交签单调度");
    isDecisionEngine(); //检测是否走决策引擎接口(只针对贷款申请);
}

//品牌,车系,车型与贴息相关接口
$.fn.extend({
	/*
	 1、参数1: eg: { coId: '银行code'}
	 2、参数2: 标识查看/修改(true/false)
	 */
	frame: function (_data, value,name) { //获取贴息政策
		//参数说明:coId:银行id ,carBrand:品牌code  carMake:车系code   carModel:车型code,  value:当前的code  name:当前的option的name
		comn.ajax({
			url: interUrl.discountPolicy.discountLoanGetPolicy,
			data: _data,
			success: (function (_this) {
				return function (res) {
					if(res.data.length>0){
						var o;
						if(isDiscounted()){
							$("#isDiscount1").prop('checked',true);
							$("#isDiscount2").prop('checked',false);
							showDiscountRelevant();
						}
						return $(_this).html("<option value=''>--请选择--</option>" + ((function () {
								var j, len, ref, results,codeArr=[];
								ref = res.data;
								results = [];
								for (j = 0, len = ref.length; j < len; j++) {
									o = ref[j];
									codeArr.push(o.id);
									results.push("<option value='" + o.id + "'>" + o.policyName + "</option>");
								}
								if($.inArray(value,codeArr)==-1 && value && name){ //如果列表项被停用,则手动加入
									results.push("<option value='" + value + "'>" + name + "</option>");
								}
								return results;
							})()).join("")).val(value || "");
					}else{
						if(isDiscounted()){
							tip({
								content:'当前车型不在贴息范围，请选择贴息为“否”。'
							});
							$("#isDiscount1").prop('checked',false);
							$("#isDiscount2").prop('checked',true);
							hideDiscountRelevant();  //隐藏贴息相关字段并清空原有数据
						}

					}

				};
			})(this)
		});
		return this;
	},
	getBrandC_discount: function(c,flag) {
		if (flag == null) {
			flag = true;
		}
		if (!flag) {
			$(this).getBrand1(c.coId);
		}
		return this;
	},
	/*
	 1、车系获取(改造)
	 2、参数1: eg: { coId: '银行code' carBrand: '品牌code' carBrandId: '品牌id', code: '选中的code值', value: '选中值的中文名称'}
	 3、参数2: 标识查看/修改(true/false)
	 */
	getCarListC_discount: function(c,value,flag) {
		if (flag == null) {
			flag = true;
		}
		if (!flag) {
			$(this).getCarList1(c.coId, c.carBrand, c.carBrandId,value);
		}
		return this;
		//if (flag) {
		//	$(this).html("<option value='" + c.code + "'>" + (c.value || '') + "</option>");
		//} else {
		//	$(this).getCarList1(c.coId, c.carBrand, c.carBrandId,value);
		//}
		//return this;
	},

	/*
	 1、车型(改造)
	 2、参数1: eg: { coId: '银行code' carBrand: '品牌code' carMake: '车系code' ,code: '选中的code值', value: '选中值的中文名称'}
	 3、参数2: 标识查看/修改(true/false)
	 */
	getCarModelC_discount: function(c,value, flag) {
		if (flag == null) {
			flag = true;
		}
		if (!flag) {
			$(this).getCarModel1(c.coId, c.carBrand, c.carMake,value);
		}
		return this;
		//if (flag) {
		//	$(this).html("<option value='" + c.code + "'>" + (c.value || '') + "</option>");
		//} else {
		//	$(this).getCarModel1(c.coId, c.carBrand, c.carMake,value);
		//}
		//return this;
	},
	getBrand1: function(coId) {
		var codeItem;
		//if ($(this).parent().find(".select-box").length>0) {
		//	return;
		//}
		codeItem = function(arr) {
			var o;
			return ((function() {
				var j, len, results;
				results = [];
				for (j = 0, len = arr.length; j < len; j++) {
					o = arr[j];
					results.push("<li data-code='" + o.brandcode + "' data-id='"+ o.brandid+"'>" + o.brandname + "</li>");
				}
				return results;
			})()).join("");
		};
		comn.ajax({
			url: interUrl.discountPolicy.discountLoanGetBrand,
			data:{coId:coId},
			success: (function(_this) {
				return function(res) {
					var $element, item, j, len, o, ref;
					item = {};
					$element = ["<ul class='select-box hidden'>", "<div class='select-box-list'></div>", "<div class='select-box-letter'>"];
					ref = res.data;
					for (j = 0, len = ref.length; j < len; j++) {
						o = ref[j];
						if (o.cars.length) {
							$element.push("<a href='javascript:;'>" + o.name + "</a>");
							item[o.name] = o.cars;
						}
					}
					$element.push("</div></ul>");

					/*
					 *  事件绑定
					 */
					$(_this).css("background-color", "#FFF").on("click", function() {
						$(".select-box").addClass("hidden");
						 $(this).next(".select-box").removeClass("hidden").scrollTop(0);
					}).next(".select-box").remove();
					$(_this).parent().append($element.join("")).on("click", ".select-box-letter a", function() {
						var htmlCode;
						htmlCode = codeItem(item[$(this).text()]);
						 $(this).parents(".select-box").scrollTop(0).find(".select-box-list").html(htmlCode);
					}).find(".select-box-letter").each(function() {
						 $(this).find("a").eq(0).trigger("click");
					});

					 $("body").on("click", function(e) {
						var flag;
						_this = e.target;
						flag = !$(_this).closest(".input-tip").not(".select-box-letter").length;
						if (flag) {
							 $(".select-box").addClass("hidden");
						}
					});
				};
			})(this)
		});
		return this;
	},
	getCarList1: function(coId,carBrand, value) {
		if (coId && carBrand) {
			comn.ajax({
				url: interUrl.discountPolicy.discountLoanGetMake,
				data: {
					coId:coId,
					carBrand: carBrand
				},
				success: (function(_this) {
					return function(res) {
						//$(_this).val("--请选择--").next().remove();
						var $element, item, i, j, len, o, ref;
						item = {};
						$element = ["<ul class='select-box carListSelect hidden'>"];
						ref = res.data.manuInfo;
						for (i = 0, len = ref.length; i < len; i++) {
							o = ref[i];
							if (o.child.length) {
								$element.push("<li><p>"+ o.parent.brandname +"</p><ul class='select-box-list'>");
								for (j = 0; j < o.child.length; j++) {
									var ochild = o.child[j];
									$element.push("<li data-code='" + ochild.brandcode + "'>" + ochild.brandname + "</li>");
								}
								$element.push("</ul></li>");
							}
						}
						/*
						 *  事件绑定0
						 */
						$(_this).css("background-color", "#FFF").on("click", function() {
							$(".select-box").addClass("hidden");
							$(this).next(".select-box").removeClass("hidden").scrollTop(0);
						}).parent().append($element.join(""));

						$("body").on("click", function(e) {
							var flag;
							_this = e.target;
							flag = !$(_this).closest(".input-tip").not(".select-box-letter").length;
							if (flag) {
								$(".select-box").addClass("hidden");
							}
						});
					};
				})(this)
			});
			//comn.ajax({
			//	url: interUrl.discountPolicy.discountLoanGetMake,
			//	data: {
			//		coId:coId,
			//		carBrand: carBrand
			//	},
			//	success: (function(_this) {
			//		return function(res) {
			//			var o;
			//			return $(_this).html("<option value=''>--请选择--</option>" + ((function() {
			//					var j, len, ref, results;
			//					results = [];
			//					ref = res.data.manuInfo;
			//					for(var i=0; i<ref.length;i++){
			//						var carList = ref[i].child;
			//						for (j = 0, len = carList.length; j < len; j++) {
			//							o = carList[j];
			//							results.push("<option value='" + o.brandcode + "'>" + o.brandname + "</option>");
			//						}
			//					}
			//					return results;
			//				})()).join("")).val(value || "");
			//		};
			//	})(this)
			//});
		}
		return this;
	},
	getCarModel: function(code, value) {
		if (code) {
			comn.ajax({
				url: interUrl.common.carModels,
				data: {
					brandcode: code
				},
				success: (function(_this) {
					return function(res) {
						//$(_this).val("--请选择--").next().remove();
						var $element, item, i, j, len, o, ref;
						item = {};
						carStyle=[];
						$element = ["<ul class='select-box carListSelect hidden'>"];
						ref = res.data;
						for (i = 0, len = ref.length; i < len; i++) {
							o = ref[i];
							if (o.cars.length) {
								$element.push("<li><p>"+ o.year +"</p><ul class='select-box-list'>");
								for (j = 0; j < o.cars.length; j++) {
									var ochild = o.cars[j];
									//获取车辆类型
									carStyle.push(o.cars[j]);

									$element.push("<li data-code='" + ochild.carid + "' data-msrp='"+ ochild.msrp +"'>" + ochild.carname + "</li>");
								}
								$element.push("</ul></li>");
							}
						}
						/*
						 *  事件绑定0
						 */
						$(_this).css("background-color", "#FFF").on("click", function() {
							$(".select-box").addClass("hidden");
							$(this).next(".select-box").removeClass("hidden").scrollTop(0);
						}).parent().append($element.join(""));
						$("body").on("click", function(e) {
							var flag;
							_this = e.target;
							flag = !$(_this).closest(".input-tip").not(".select-box-letter").length;
							if (flag) {
								$(".select-box").addClass("hidden");
							}
						});
					};
				})(this)
			});
		}
		return this;
	},
	getCarModel1: function(coId,carBrand,carMake, value) {
		if (coId && carBrand && carMake) {
			comn.ajax({
				url: interUrl.discountPolicy.discountLoanGetModel,
				data: {
					coId:coId,
					carBrand:carBrand,
					carMake:carMake
				},
				success: (function(_this) {
					return function(res) {
						//$(_this).val("--请选择--").next().remove();
						var $element, item, i, j, len, o, ref;
						item = {};
						carStyle=[];
						$element = ["<ul class='select-box carListSelect hidden'>"];
						ref = res.data;
						for (i = 0, len = ref.length; i < len; i++) {
							o = ref[i];
							if (o.cars.length) {
								$element.push("<li><p>"+ o.year +"</p><ul class='select-box-list'>");
								for (j = 0; j < o.cars.length; j++) {
									var ochild = o.cars[j];
									//获取车辆类型
									carStyle.push(o.cars[j]);

									$element.push("<li data-code='" + ochild.carid + "' data-msrp='"+ ochild.msrp +"'>" + ochild.carname + "</li>");
								}
								$element.push("</ul></li>");
							}
						}
						/*
						 *  事件绑定0
						 */
						$(_this).css("background-color", "#FFF").on("click", function() {
							$(".select-box").addClass("hidden");
							$(this).next(".select-box").removeClass("hidden").scrollTop(0);
						}).parent().append($element.join(""));
						$("body").on("click", function(e) {
							var flag;
							_this = e.target;
							flag = !$(_this).closest(".input-tip").not(".select-box-letter").length;
							if (flag) {
								$(".select-box").addClass("hidden");
							}
						});
					};
				})(this)
			});
			//comn.ajax({
			//	url: interUrl.discountPolicy.discountLoanGetModel,
			//	data: {
			//		coId:coId,
			//		carBrand:carBrand,
			//		carMake:carMake
			//	},
			//	success: (function(_this) {
			//		return function(res) {
			//			var o;
			//			return $(_this).html("<option value=''>--请选择--</option>" + ((function() {
			//					var j, len, ref, results;
			//					ref = res.data;
			//					results = [];
			//					for (j = 0, len = ref.length; j < len; j++) {
			//						o = ref[j];
			//						for(var o in ref[j].cars)
			//							results.push("<option value='" + ref[j].cars[o].carid + "' data-msrp='"+ref[j].cars[o].msrp+"'>" + ref[j].cars[o].carname + "</option>");
			//					}
			//					return results;
			//				})()).join("")).val(value || "");
			//		};
			//	})(this)
			//});
		}
		return this;
	},
	getPolicy1: function (args,value,name) { //获取贴息政策-针对客户来源是否是车果线上
		//参数说明:coId:银行id , dealerName:车商名字  carBrand:品牌code  carMake:车系code   carModel:车型code,  value:当前的code  name:当前的option的name
		var _p=$("#normal_cars");
		var carBrand=_p.find("[name=carBrand]").val();
		var carMake=_p.find("[name=carMake]").val();
		var carModel=_p.find("[name=carModel]").val();
		var dealerName=$("#dealerName").val();
		var coId=$("#coBankId").val();
		var _data=args?args:{coId:coId,dealerName:dealerName,carBrand:carBrand,carMake:carMake,carModel:carModel};
		comn.ajax({
			url: interUrl.discountPolicy.discountLoanGetPolicy1,
			data: _data,
			success: (function (_this) {
				return function (res) {
					var o;
					return $(_this).html("<option value=''>--请选择--</option>" + ((function () {
							var j, len, ref, results,codeArr=[];
							ref = res.data;
							results = [];
							if(ref.length==0){
								tip({content:'该银行,车商或车辆不支持贴息业务'});
								$(".discount_se").addClass("hide"); //隐藏贴息相关字段
								$("#discountPolicyId,#discountPolicyName,#discountCaseName,#discountCaseId,#discountAmount,#discountMargin,#discountCarPolicy").val("").removeClass("required");//去掉必填
								$("#isDiscount1").prop('checked',false);
								$("#isDiscount2").prop('checked',true);
							}else{
								$(".discount_se").removeClass("hide"); //显示贴息相关字段
								$("#discountPolicyId,#discountPolicyName,#discountCaseName,#discountCaseId,#discountAmount,#discountMargin,#discountCarPolicy").addClass("required");//增加必填
							}
							for (j = 0, len = ref.length; j < len; j++) {
								o = ref[j];
								codeArr.push(o.id);
								results.push("<option value='" + o.id + "'>" + o.policyName + "</option>");
							}
							if($.inArray(value,codeArr)==-1 && value && name){ //如果列表项被停用,则手动加入
								results.push("<option value='" + value + "'>" + name + "</option>");
							}
							return results;
						})()).join("")).val(value || "");
				};
			})(this)
		});
		return this;
	},
	getCarDealer_discount: function(policyId,applyId,value){ //贴息获取推荐商
		//参数说明:policyId:贴息政策policyId  applyId:贷款编号id
		if(policyId){
			comn.ajax({
				url: interUrl.discountPolicy.discountLoanGetCarDealer,
				data: {
					policyId: policyId,
					applyId:applyId
				},
				success:(function(_this){
					return function(res) {
						var o;
						return $(_this).html("<option value=''>--请选择--</option>" + ((function () {
								var j, len, ref, results;
								ref = res.data;
								results = [];
								for (j = 0, len = ref.length; j < len; j++) {
									o = ref[j];
									results.push("<option value='" + o.id + "' data-employDealerId = '"+o.employDealerId+"' data-employDealerName='"+ o.employDealerName +"' data-dealerGId='"+ o.dealerGrade+"' data-dealerGroupId='"+ o.dealerGroupId+"' data-dealerGroupName='"+ o.dealerGroupName+"'>" + o.dealerName + "</option>");
								}
								return results;
							})()).join("")).val(value || "");
					}
				})(this)
//
            });
            return this;
        }
    }
});
function loanTypeItem(data, bankId, businessCarType, productIdType, value){
	if ($("#product").val() == "") {
		return;
	}
    if ($("#carType").val() == "") {
        return tip({content: "请选择汽车类型！"});
    }
    if ($("#coBankId").val() == "") {
        return tip({content: "请选择合作银行！"});
    }
    if($("#productId").val() == "") {
        return tip({content: "请选择金融产品！"});
	}
	// console.log(bankId+"------"+ businessCarType);
    repaymentAmount(); //重新计算月还款
    if (bankId && businessCarType && productIdType) {
        $("#loanType").getLoanType(data, value);
    }
}
$(document).on("click", "#testedRepaymentAmount", function () {
    repaymentAmount();
})
function repaymentAmount() {   //试算月还款额=【(贷款金额+车辆购置税+保费+GPS费用)*(1+手续费率)-车商贴息政策】/贷款期限(月)    业务品种=4时,试算月还款额=(贷款金额+车辆购置税+保费+GPS费用)*(1+公司手续费率)/期限(月)
    var loanAmount = $("input[name='loanAmount']").val(),   //贷款金额
        handingFee = $("input[name='handingFee']").val(),   //手续费率
        billingPrice = $("input[name=billingPrice]").val(),//开票价
        productId = $("#productId").val(), //业务品种
        loanType = $("#loanType").val() //贷款产品
	if (Number(loanAmount) > 0 && Number(handingFee) > 0 && Number(billingPrice) > 0 && productId && loanType) {
        comn.ajax({
            url: interUrl.loanDetail.getTestedRepaymentAmount,
            data: $("#creditForm").values(),
            success: function(res){
                $("input[name='repaymentAmount']").val(res.data)
            }
        });
	}
}
$("#allLoan input").keyup(function(){
    repaymentAmount();
})

setPlace = function (address) {//设置地图地点坐标
    var local, sc;
    map.clearOverlays();
    sc = function () {
        try {
            var p;
            p = local.getResults().getPoi(0).point;
            map.centerAndZoom(p, 18);
            return map.addOverlay(new BMap.Marker(p));
        } catch (e) {
            tip({content: '没有搜索到当前地理位置！'});
            /* handle error */
        }
    };
    local = new BMap.LocalSearch(map, {
        onSearchComplete: sc
    });
    return local.search(address);
};
//车商费用
carCost = function (carDealer, loanTerm) {
    $("#dealerFeeId").html("<option value=''>--请选择--</option>");
    comn.ajax({
        url: interUrl.loanDetail.getLoanFeeInfo,
        data: {
            dealerId: carDealer,
            loanTerm: loanTerm
        },
        success: function (res) {
            var j, len, o, ref, str;
            str = "<option value=''>--请选择--</option>";
            ref = res.data;
            if (ref.length < 1) return;
            for (j = 0, len = ref.length; j < len; j++) {
                o = ref[j];
                str += "<option value='" + o.id + "' fee='" + o.handingFee + "'>" + o.feeName + "</option>";
            }
            ;
            $("#dealerFeeId").html(str);
            $("#dealerFeeName").val($("#dealerFeeId option").eq(1).html());
            $("#dealerFeeId").val($("#dealerFeeId option").eq(1).attr("value"));
            $("#handingFee").val($("#dealerFeeId option").eq(1).attr("fee"));
            repaymentAmount();
        }
    });
}

//加载车行,银行信息
function loadMess(a, b, c, d) {
    comn.ajax({
        url: a,
        data: {
            randomTime: (new Date()).getTime()
        },
        success: function (res) {
            var j, len, o, ref, str;
            str = "<option value=''>--请选择--</option>";
            ref = res.data;
            for (j = 0, len = ref.length; j < len; j++) {
                o = ref[j];
                if (c == 1) {
                    str += "<option value='" + o.id + "' data-employDealerId = '" + o.employDealerId + "' data-employDealerName='" + o.employDealerName + "' data-dealerGId='"+ o.dealerGrade+"' data-dealerGroupId='"+ o.dealerGroupId+"' data-dealerGroupName='"+ o.dealerGroupName+"'>" + o.dealerName + "</option>";
                } else if (c == 2) {
                    str += "<option value='" + o.id + "'>" + o.bankName + "</option>";
                } else if (c == 3) {
                    str += "<option value='" + o.id + "'>" + o.groupName + "</option>";
				}
            }
            return b.html(str).val(d);
        }
    });
}
loadMess(interUrl.gr.carDealerList, $("#carDealer"), 1); //车行加载
//loadMess(interUrl.gr.bankList, $("#bankDeraler"), 2); //银行加载
loadMess(interUrl.carDealer.getDealerGroup, $("#dealerGroup"), 3); //经销集团加载
$(document).on("change", "#carDealer", function () { //给车行赋值
    var dealerName = $(this).find("option:selected").html();
    $("#dealerName").val(dealerName);
    $("#employDealerId").val($(this).find("option:selected").attr("data-employDealerId"));
    $("#employDealerName").val($(this).find("option:selected").attr("data-employDealerName"));
    $("#dealerGradeId, #dealerGrade").val($(this).find("option:selected").attr("data-dealerGId") === "undefined" ? "" : $(this).find("option:selected").attr("data-dealerGId"));
    if($(this).find("option:selected").attr("data-dealerGroupName") === "undefined"){
        $("#dealerGroup").val("");
        $("#dealerGroupId").val("");
        $("#dealerGroupName").val("");
    } else {
        $("#dealerGroup").val($(this).find("option:selected").attr("data-dealerGroupId"));
        $("#dealerGroupId").val($(this).find("option:selected").attr("data-dealerGroupId"));
        $("#dealerGroupName").val($(this).find("option:selected").attr("data-dealerGroupName"));
	}
    if (!$(this).find("option:selected").attr('value')) {
        $("#dealerFeeId").html("<option value=''>--请选择--</option>");
        $("#dealerFeeName,#handingFee").val('');
    }
});


//$(document).on("change", "#carDealer1", function() { //给车行赋值-贴息
//	var dealerName = $(this).find("option:selected").html();
//	$("#dealerName1").val(dealerName);
//	$("#employDealerId").val($(this).find("option:selected").attr("data-employDealerId"));
//	$("#employDealerName").val($(this).find("option:selected").attr("data-employDealerName"));
//	if(!$(this).find("option:selected").attr('value')){
//		$("#dealerFeeId").html("<option value=''>--请选择--</option>");
//		$("#dealerFeeName,#handingFee").val('');
//	}
//});

$(document).on("change", "#dealerGroup", function () { //给银行赋值
    var dealerGroupId = $(this).find("option:selected").val();
    if (dealerGroupId == "") {
        $("#dealerGroupId").val("");
        $("#dealerGroupName").val("");
	} else {
        $("#dealerGroupId").val($(this).find("option:selected").val());
        $("#dealerGroupName").val($(this).find("option:selected").html());
	}
});

$(document).on("change", "#bankDeraler", function () { //给银行赋值
    var bankName = $(this).find("option:selected").html();
    $("#coBankName").val(bankName);
});
$(document).on("change", ".carSelect", function() { //给车辆赋值
	var msrp = $(this).attr("data-msrp");
	var name = $(this).attr("name");
	var codeName = $(this).val();
	$("input[name="+name+"Name]").val(codeName);
	if ($(this).attr("id") == "getBrand") {
		$("input[name=carBrand]").val($(this).attr("data-code"));
	}
	if(msrp != undefined) {$("#msrp").val(msrp);}   //赋值车价格
});
$(document).on("change", ".citySelect", function () { //给省市赋值
    var name = $(this).attr("fors");
    var codeName = $(this).find("option:selected").html();
    $("input[name=" + name + "]").val(codeName);
});

//两证业务
$(document).on("click", ".twoCardBusiness", function(){
    var v = $(this).val();
    $("#twoCardBusiness").val(v);
    if (v === "1") {
        $("#submitCom").removeClass("hide");
        $("#submit").addClass("hide");
    } else {
        $("#submitCom").addClass("hide");
        $("#submit").removeClass("hide");
    }
})
dataLoad_3 = function (params) {//流程任务提交流转人员选择
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
                params.success({'total': res.data.userTasks.length, rows: res.data.userTasks});
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

tableEvent_4 = {
    "click .loanStart1": function (e, a, item, index) {
        comn.addTab({
            title: '查看征信',
            href: './Modal/loanManage/creditManage/creditInfo.html?type=1&businessId=' + item.creditId
        });
    },
    "click .loanStart2": function (e, a, item, index) {
        $("#setMainLoan").modal("show");
        setMainLoan = function () {
            comn.ajax({
                url: interUrl.myTask.updateCustomerCredit,
                data: {
                    loanApplyId: args["loanApplyId"],
                    newCreditId: item.creditId
                },
                success: function (res) {
                    tip({content: "更换主贷征信成功请重新选择金融产品！"});
                    location.reload();
                }
            });
        }

    }
};

handle_4 = function (value, row, index) {
    //return ["<button type='button' class='btn btn-primary btn-xs loanStart1'>查看详情</button>"].join("");
    return ["<div class='btn-group btn-group-xs'>",
        "<button type='button' class='btn btn-primary dropdown-toggle' data-toggle='dropdown'>操作",
        "<span class='caret'></span>",
        "<span class='sr-only'>下拉切换</span>",
        "</button>",
        "<ul class='dropdown-menu' role='menu'>",
        "<li><a class='loanStart1'>查看详情</a></li>",
        row.isMainLoanApply != 1 && args['loanApplyId'] && args['type'] != "2" ? "<li><a class='loanStart2'>设为主贷</a></li>" : "",
        "</ul>",
        "</div>"].join("");
};


dataLoad_5 = function (params) {//二手车列表
    tableData(params, $("#userInfo").values(), interUrl.loanDetail.getSecondHandCarList);
};
handle_5 = function (value, row, index) {
    return ["<button type='button' class='btn btn-primary btn-xs loanStart5'>选择</button>"].join("");
};
tableEvent_5 = {
    "click .loanStart5": function (e, a, item, index) {
        //对json重新定义构造
        jsonRestructure(item, function (res) {
            var res = JSON.parse(res);
            $(".projectMessage").values(res.data);

            $("#getBrand").getBrandC($("#getBrand").is(":disabled"));
            $("#getCarList").getCarListC(res.data.carBrand, {
                code: res.data.carMake,
                value: res.data.carMakeName
            }, $("#getCarList").is(":disabled"));
            $("#getCarModel").getCarModelC(res.data.carMake, {
                code: res.data.carModel,
                value: res.data.carModelName
            }, $("#getCarModel").is(":disabled"));
            $("#customerChoice").modal('hide');
            if (item.provinceCode && item.cityCode){
                $("#carProvince").getProvinceC({
                    code: item.provinceCode,
                    value: item.provinceName
                }, $("#carProvince").is(":disabled"));
                $("#carCity").getCityC(item.provinceCode, {
                    code: item.cityCode,
                    value: item.cityName
                }, $("#carCity").is(":disabled"));
			}
        })

        $('[name="msrp"]').val(item.msrp);
    }
};
//开票单位
dataLoad_6 = function (params) {//二手车列表
    tableData(params, $("#billingUnitForm").values(), interUrl.loanDetail.getDealerList);
};
handle_6 = function (value, row, index) {
    return ["<button type='button' class='btn btn-primary btn-xs loanStart6'>选择</button>"].join("");
};
tableEvent_6 = {
    "click .loanStart6": function (e, a, item, index) {
		$("#billCompanyName").val(item.dealerName);
		$("#billingUnit").modal("hide");
    }
};
$("#btn-search1, #billingUnitBtn").click(function(){
    $("#table_6").bootstrapTable("refresh", {url: "..."});
})
$("#customerBtn").click(function () {
    $("#coBank").val($("#coBankId").val());
    $("#table_5").bootstrapTable("refresh", {url: "..."});
})
jsonRestructure = function (data, _cb) {
    var CorrespondingVal =
        [
            {"value": "carBrandName", "corresponding": "carBrand"},
            {"value": "carBrand", "corresponding": "carBrandKey"},
            {"value": "carMake", "corresponding": "carSeriesKey"},
            {"value": "carMakeName", "corresponding": "carSeriesName"},
            {"value": "carModel", "corresponding": "carModelKey"},
            {"value": "carModelName", "corresponding": "carModeName"},
            {"value": "evaluationPrice", "corresponding": "secondEstimatePrice"},
            {"value": "secondHandCarPrice", "corresponding": "secondHandCarPrice"},
            {"value": "secondEstimateDatetime", "corresponding": "secondEstimateDatetime"},
            {"value": "carId", "corresponding": "id"},
            {"value": "carSerialno", "corresponding": "estimateNum"},
            {"value": "sellPrice", "corresponding": "invoicePrice"},
            {"value": "msrp", "corresponding": "onlinePrice"}
        ];
    var length = CorrespondingVal.length;
    var tenJson = '';
    tenJson += '{"code": 10000,"data": {';
    for (var i = 0; i < length; i++) {
        var smer = CorrespondingVal[i].corresponding;
        if (i < length - 1) {
            tenJson += '"' + CorrespondingVal[i].value + '": "' + data[smer] + '",';
        } else {
            tenJson += '"' + CorrespondingVal[i].value + '": "' + data[smer] + '"';
        }
    }
    tenJson += '}}';

    if (_cb) _cb(tenJson);
}

secondChank = function (data) {    //二手车数据处理
    if (data.data.carType == '2') {
        //$("#carType option").eq(1).change(); before 2016-06-03
        $(".carSerialnoBox ").removeClass("hide");  //add for 2016-06-03
    }
    ;
};

prijeCP = function (datas, type, das) {
    comn.ajax({
        url: interUrl.loanDetail.getFinancialProduct,
        data: datas,
        success: function (res) {
            if (res.data) {
                var length = res.data.length;
                var html = '<option value="">--请选择--</option>';
                for (var i = 0; i < length; i++) {
                    html += '<option value="' + res.data[i].id + '" data-nper="' + res.data[i].nper + '" data-rate="'+ res.data[i].benchmarkRate+'">' + res.data[i].productName + '</option>'
                }
                $("#productId").html(html);
            }
            ;
            if (type == '1') {
                $("#productId option[value='" + das.data.productId + "']").attr("selected", true);
            }
        }
    });
}


Finance = function (data) {    //金融产品处理
    //$("#product option[value='"+data.data.businessTypeId+"']").change();
    $("#businessTypeName").val(data.data.businessTypeName);
    changeNum = 1;
    var code = data.data.businessTypeId;
    var coBankId = data.data.coBankId;
    datas = {
        businessTypeId: code,
        coBankId: coBankId
    };
    prijeCP(datas, 1, data);
}

Initialization = function (data, types) {
    if (data.data.carType == 1) {
        $(".carSerialnoBox").addClass('hide')
    }
    ;
    if (data.data.customerSource == 2) {
        $(".sourceSerialnoBox").addClass('hide')
    }
    ;
    if (types == '0' || types == '2') {
        secondChank(data);
        Finance(data);
    }
}

//基本信息-借款人信息和配偶信息
function getBaseInfo() {
    comn.ajax({
        url: interUrl.myTask.approvalBaseInfo,
        data: {loanApplyId: args['loanApplyId']},
        async:false,
        success: function (res) {
            //if(res.data.dealerGroup) $("#isDealerGroup").removeClass("hide");
            if (!res.data.cardNoValid) {
                $("input[name='cardNoValidTime']").addClass("required");
            }
            $("#professionCode").getOccupationList(res.data.professionCode);
            $("#post").getJobList(res.data.post);
            $("#workNatureCode").getUnitList(res.data.workNatureCode);
            if (res.data.freeDoor == '1') {
                $("#needDoorImg").show();
            }
            if (res.data.modifyFlag == 1) {
                $("#loanAmount, #handingFee, #billingPrice").attr("readonly", true);
            }
            $("#getPos, #getPos2").data("callback", function (BMap, map) {
                var myIcon = new BMap.Icon("./../../../images/picture_icon.png", new BMap.Size(30, 30));

                function addMarker(point) {
                    var marker = new BMap.Marker(point, {icon: myIcon});
                    map.addOverlay(marker);
                }

                $.each(res.data.realVisitAddressItudeList, function (i, o) {
                    var pointArr = o.split(",");
                    addMarker(new BMap.Point(pointArr[0], pointArr[1]));
                });
            });
            if (res.data.maritalStatus == 1) {
                $("#spousePanel").show();
	            $(".customerMarital").addClass('input-group input-group-sm')
	            $(".maritalStatus").removeClass('hidden')
                window['_spouseMobilePhone_baseInfo'] = res.data.spouseMobilePhone;
                if (res.data.spouseCompanyAddressPid != "" || res.data.spouseCompanyAddressPid != null) {
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
                $("#province_3").change(function () {
                    if (this.value) {
                        $("#province_3_name").val($(this).find('option:selected').text());
                        $("#area_3").val("");
                        return $("#city_3").getCity(this.value).unbind("change").change(function () {
                            if (this.value) {
                                $("#city_3_name").val($(this).find('option:selected').text());
                                return $("#area_3").getArea(this.value);
                            }
                        });
                    }
                });
                $("#city_3").change(function () {
                    if (this.value) {
                        $("#city_3_name").val($(this).find('option:selected').text());
                        return $("#area_3").getArea(this.value);
                    }
                });
                $("#area_3").change(function () {
                    $("#area_3_name").val($(this).find('option:selected').text());
                });
            }
            if (res.data.homeAddressPid != "" || res.data.homeAddressPid != null) {
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
            if (res.data.companyAddressPid != "" || res.data.companyAddressPid != null) {
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
            if (res.data.dealerGroupId != "" || res.data.dealerGroupId != null) {
                $("#dealerGroup").val(res.data.dealerGroupId);
                $("#dealerGroupId").val(res.data.dealerGroupId);
                $("#dealerGroupName").val(res.data.dealerGroupName);
			}

            var housingStatus = res.data.housingStatus;
            var c = $("#mortgageRepayment");
            var a = "<span class='text-danger'>*</span>";
            if (housingStatus != "" || housingStatus != null) {
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
            $("#province_1").change(function () {
                if (this.value) {
                    $("#province_1_name").val($(this).find('option:selected').text());
                    $("#area_1").val("");
                    return $("#city_1").getCity(this.value).unbind("change").change(function () {
                        if (this.value) {
                            $("#city_1_name").val($(this).find('option:selected').text());
                            return $("#area_1").getArea(this.value);
                        }
                    });
                }
            });
            $("#city_1").change(function () {
                if (this.value) {
                    $("#city_1_name").val($(this).find('option:selected').text());
                    return $("#area_1").getArea(this.value);
                }
            });
            $("#area_1").change(function () {
                $("#area_1_name").val($(this).find('option:selected').text());
            });
            //$("#province_2").getProvince(res.data.companyAddressPid) before 2016-06-01
            $("#province_2").change(function () {
                if (this.value) {
                    $("#province_2_name").val($(this).find('option:selected').text());
                    $("#area_2").val("");
                    return $("#city_2").getCity(this.value).unbind("change").change(function () {
                        if (this.value) {
                            $("#city_2_name").val($(this).find('option:selected').text());
                            return $("#area_2").getArea(this.value);
                        }
                    });
                }
            });
            $("#city_2").change(function () {
                if (this.value) {
                    $("#city_2_name").val($(this).find('option:selected').text());
                    return $("#area_2").getArea(this.value);
                }
            });
            $("#area_2").change(function () {
                $("#area_2_name").val($(this).find('option:selected').text());
            });
            window['_mobilePhone_baseInfo'] = res.data.mobilePhone;
            $("#approvalBaseInfoForm").values(res.data);
            $("#getPos, #getPos2").data("pos", res.data.visitAddressLongitude + "," + res.data.visitAddressLatitude);
            if ($("#realCarOwner").val() == null || $("#realCarOwner").val() == "") {
                $("#realCarOwner").val($("#customerName").val());
            }
            $("input[name='cardNoValidTime']").addClass(['required', ''][res.data.cardNoValid]);
            $("#filePath").html(res.data.filePath ? "<img src='"+ res.data.filePath +"' height=85 />" : "");
            $("#faceUrl").html(res.data.faceUrl ? "<img src='"+ res.data.faceUrl +"' height=85 />" : "");

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

// 判断汽车类型是否被禁用
function isCarTypeDisabled(carType,flag) {
    //从loanApply/launch接口得到数据carType不为空而且数据字典codeName是1,那就是不能修改,其他都是可修改
	if(!carType) {return}
	// flag 判断是不是第一次进入,是--根据launch接口赋值，否--只根据数据字典判断是否启用
    flag && $("#carType").val(carType).change();
    comn.ajax({
        url: interUrl.myTask.EditCarTypeParam,
        data: {codeType:'EditCarTypeParam'},
        success: function (res) {
            if(res.data.length && res.data[0].codeName == 1) {
                $("#carType").attr("disabled", true);
                $("#carTypeID").val($("#carType").val()).removeAttr("disabled");
            }else {
                $("#carType").attr("disabled", false);
			}
        }
    })
}

$(function () {

    if (loanApplyId || args['loanApplyId']) {
        getBaseInfo(); //加载客户信息
        getContacter();
    }
    var preSubmitURL = "", submit2nextURL = "", cancelURL = "";
    $("#setLoanSure").click(function () {
        setMainLoan();
    }); //设置为主贷
    if (args['releventFlow'] == "LOAN_MODIFY_FLOW" && args['releventFlowNode'] == "LOAN_MODIFY_LAUNCH") {
        $("#product, #carType").attr("disabled", true);
        $("#carTypeID, #businessTypeId").removeAttr("disabled");
        //贷款修改提交接口
        preSubmitURL = interUrl.loanModify.preSubmit;
        submit2nextURL = interUrl.loanModify.submit2next;
        cancelURL = interUrl.loanModify.cancel;
        getBaseInfo(); //加载客户信息
        getContacter();
    } else {
        //贷款申请流程提交
        preSubmitURL = interUrl.loanDetail.loansubmit;
        submit2nextURL = interUrl.myTask.submit2next;
        cancelURL = interUrl.loanDetail.loanReview;
    }

    $(document).on("click", ".loanStart3", function () {
        var a, b, c,
            a = $("#businessObjectId").val(),
            b = $("#task input[type='radio']:checked").attr('userId');
        c = $("#task input[type='radio']:checked").attr('userName');
        var _url = flagSubmit ? (args["releventFlow"]==="LOAN_MODIFY_FLOW" ? interUrl.loanModify.submit2NextByNodeKey: (isDecisionEngineFlag ? interUrl.decisionEngine.submit2NextByNodeKey : interUrl.loanDetail.pre2NextByNodeKey)) : submit2nextURL;
        var _data1 = {
            loanApplyId: a,
            nextNodeUserId: b,
            nextNodeUserName: c
        }
        isLowFeeFlag ? _data1.lowfeeId = a : "";
        flagSubmit ? _data1.nodeKey = (args["releventFlow"] === "LOAN_MODIFY_FLOW" ? "LOAN_MODIFY_APPROVE_OFFICE_STAFF": (isDecEngNodeFlag ? "LOAN_CAR_FINANCE" : "LOAN_APPROVE_OFFICE_STAFF")) : _data1;
        comn.ajax({
            url: isLowFeeFlag ? interUrl.loanDetail.lowfeeSubmit2next : _url,
            data: _data1,
            success: function (res1) {
                tip({
                    content: res1.message
                });
                comn.closeTab();
            }
        });
    })

    $("#table_3").bootstrapTable();
    if (args['releventFlow'] == "LOAN_APPLY_FLOW") {
		if($("#loanApplyId").val()){
			$("#close").removeClass("hide");
		}
        $(document).on("click", "#close", function () {
            oppSureModal("是否确认关闭？");
            $("#sureOption").unbind("click").click(function () {
                comn.ajax({
                    url: interUrl.myTask.closeLoanApply,
                    data: {loanApplyId: args['loanApplyId']},
                    success: function (res1) {
                        tip({
                            content: res1.message
                        });
                        comn.closeTab();
                    }
                });

            });
        });
    }
    $(document).on("click", "#preservation,#submit,#submitCom", function () {
        // if (args["releventFlow"] === "LOAN_MODIFY_FLOW" && $("#isChange").val() === "change") {
        //     return tip({content: "请先保存预算单"});
        // }                     


        if ($("#isChange").val() === "change") {
            return tip({content: "请先保存预算单"});
        }
				if($('input[name=vin]').val() != changeToken){
					clearWarn();
				}
        flagSubmit = $(this).attr("id") === "submitCom" ? true : false;
        $("#creditForm").validate();
        if ($("#creditForm").valid() == true) {
            var a = $(this).attr('val');
            var data, data_extend;
            $('[name="estimatePlateAddressPname"]').val($("#province_4 option:selected").text());
            $('[name="estimatePlateAddressCname"]').val($("#city_4 option:selected").text());
            $('[name="estimatePlateAddressRname"]').val($("#area_4 option:selected").text());
            data = $.extend($("#creditForm").values(), {
                dealerId: $('[name="dealerId"]').val(),
                coBankId: $("#coBankId").val() || $("#coBankId1").val()
            });
            if (args["type"] == "0") urls = interUrl.loanDetail.loanUpdate;
            if (args["type"] == "1") urls = interUrl.loanDetail.loansave;
            if (judgeNeedDoorSumit()) {
                if (a == '1') {    //点击保存
                    oppSureModal("是否确认保存");
                    $("#sureOption").unbind("click").click(function () {
                        if (isNeedDiscount_revent()) { //如果是贴息
                            data_extend = $("#discount_cars").values(); //贴息的车辆信息
                            data = $.extend(data, data_extend);
                        } else {
                            data = $.extend(data, $("#normal_cars").values());
                        }
                        comn.ajax({
                            url: urls,
                            data: $.extend(data, {
                                creditId: args["creditApplyId"],
                                flowType: args['releventFlow']
                            }),
                            success: function (res) {
                            	$("#imageManage").addClass("imageManage"); //保存信息后给影像管理做标识可更新；
                                loanApplyId = res.data;
                                if (args['releventFlow'] == "LOAN_APPLY_FLOW") {
                                    $("#close").removeClass('hide');
                                }
                                if (!args['loanApplyId']) {
                                    args['loanApplyId'] = res.data;
                                }
                                if (args["type"] == "1") $("#loanApplyId").val(loanApplyId);

                                if (res.status == "0") {
                                    tip({content: res.message});

                                    $("#needDoorPanel").values({
                                        freeDoor: '0',
                                        housingStatus: '0',
                                        reservedFundsYear: null,
                                        socialYear: null
                                    });
                                    $("#needDoor_1").hide();
                                    $("#sureModal").modal("hide");
                                    return;
                                }

                                $("#product").attr("disabled", true);
                                $("#businessTypeId").removeAttr("disabled");

                                if (a == 1) {
                                    tip({content: '保存成功'});
                                    getBaseInfo(); //加载客户信息                              

                                    getContacter();
                                }
                                $("#sureModal").modal("hide");
                            }
                        });
                    });
                } else if (a == '0') {    //点击提交 

                    oppSureModal("是否确认提交");
                    $("#sureOption").unbind("click").click(function () {
                        if (args['loanApplyId']) {
                            comn.ajax({
                                url: interUrl.loanDetail.verify,
                                data: {
                                    loanApplyId: args['loanApplyId'],
                                    flowType: args['releventFlow'],
                                    nodeKey: args['currentNodeKey'] || args['releventFlowNode']
                                },
                                success: function (res) {
                                    if (res.data && res.data.message) {
                                        tip({content: res.data.message});
                                    }
                                }
                            })
                        }

                        if (isNeedDiscount_revent()) { //如果是贴息
                            data_extend = $("#discount_cars").values(); //贴息的车辆信息
                            data = $.extend(data, data_extend);
                        } else {
                            data = $.extend(data, $("#normal_cars").values());
                        }
                        comn.ajax({
                            url: urls,
                            data: $.extend(data, {
                                creditId: args["creditApplyId"],
                                flowType: args['releventFlow']
                            }),
                            success: function (res) {
                                $("#imageManage").addClass("imageManage"); //保存信息后给影像管理做标识可更新；
                                loanApplyId = res.data;
                                if (!args['loanApplyId']) {
                                    args['loanApplyId'] = res.data;
                                }
                                if (args["type"] == "1") $("#loanApplyId").val(loanApplyId);

                                if(isTimeOut === true) {
                                    tip({content: "配偶在查询云镜大数据中，不准提交"});
                                    return                                     
                                }

                                getBaseInfo(); //加载客户信息

                                //配偶云镜大数据查询结果，导致不能提交相关逻辑start                                
                                if(spouseSearchStatus.maritalStatus === 1 && spouseSearchStatus.spouseDecisionStatus === 0) {
                                    $("#sureModal").modal("hide");
                                    $("#spouseSearchInfo2").modal("show");
                                    return 
                                } 
                                if(spouseSearchStatus.maritalStatus === 1 && spouseSearchStatus.spouseDecisionStatus === 1) {
                                    tip({content: "配偶未查询云镜大数据查询中，查询结束后在提交"});
                                    return 
                                }   
                                if(spouseSearchStatus.maritalStatus === 1 && spouseSearchStatus.spouseDecisionStatus === 3) {
                                    tip({content: "配偶命中大数据黑名单，无法继续流程"});
                                    return 
                                }
                                if(spouseSearchStatus.maritalStatus === 1 && spouseSearchStatus.spouseDecisionStatus === 4) {
                                    tip({content: "配偶命中大数据黑名单，无法继续流程"});
                                    return 
                                }  
                                if(spouseSearchStatus.maritalStatus === 1 && spouseSearchStatus.spouseDecisionStatus === 200) {
                                    $("#sureModal").modal("hide");
                                    $("#spouseSearchInfo2").modal("show");
                                    return 
                                }   
                                //配偶云镜大数据查询结果，导致不能提交相关逻辑end  

                                getContacter();

                                if (res.status == "0") {
                                    tip({content: res.message});

                                    $("#needDoorPanel").values({
                                        freeDoor: '0',
                                        housingStatus: '0',
                                        reservedFundsYear: null,
                                        socialYear: null
                                    });
                                    $("#needDoor_1").hide();
                                    $("#sureModal").modal("hide");
                                    return;
                                }
                                if (a == 0) {
                                    isLowFeeFlag = false;
                                	comn.ajax({
                                		url: interUrl.loanDetail.checkHandFee,
										data: {
                                			applyId: args["loanApplyId"]
										},
										success: function(res){
                                            if (res.data.isLowerThanFee === 1) {
                                                if (res.data.isLowerProductConfig === 1) {
                                                    text = "命中产品：此贷款的手续费率小于该贷款产品的最低手续费率" + res.data.lowestFee + "%，需提交给分公司总经理、汽车金融部总经理特批，是否继续提交？";
												} else if (res.data.isDealerGroup === 1) {
                                            		text = "此贷款的手续费率小于该推荐商适用于该营销品牌集团的最低手续费率" + res.data.lowestFee + "%，需提交给分公司总经理、汽车金融部总经理特批，是否继续提交？";
												} else {
                                            		text = "此贷款的手续费率小于该推荐商适用的最低手续费率" + res.data.lowestFee + "%，需提交给分公司总经理、汽车金融部总经理特批，是否继续提交？";
												}
                                                $("#sureModal1").modal("show");
                                                $(".tipText1").html(text)
                                                $("#sureOption1").unbind("click").click(function () {
                                                    subIsLowerThanFee(); //预提交
                                                    $("#sureModal1").modal("hide");
                                                    isLowFeeFlag = true;
                                                })
                                            } else {
                                                submission(res); //预提交
                                            }
										}
									})

                                }
                                $("#sureModal").modal("hide");
                            }
                        });
                    });
                }
            } else {
                tip({content: "免上门要求中,住房状况,公积金情况,社保情况请至少填一项"});
            }
        }
        ;
    })
    function subIsLowerThanFee() { //预提交手续费率小于该推荐商适用于该营销品牌集团的最低手续费率
        comn.ajax({
            url: interUrl.loanDetail.lowfeeLaunch,
            data: {
                applyId: args["loanApplyId"]
            },
            success: function(res) {
                $("#table_3").bootstrapTable('refresh', {query:res.data});
            }
        })
    }
	function submission(a) {   //预提交调用
        /**
		 * isDecisionEngineFlag: **true: 走决策引擎
		 * isDecEngNodeFlag：**true：提交节点名为总部审批
         */
		var data = loanApplyId || args["loanApplyId"];
        var _url = flagSubmit ? (args["releventFlow"]==="LOAN_MODIFY_FLOW" ? interUrl.loanModify.pre2NextByNodeKey: interUrl.loanDetail.pre2carFinanceSubmit) : preSubmitURL;
        var _data1 = {
            loanApplyId: data
        }
        flagSubmit ? _data1.nodeKey = (args["releventFlow"] === "LOAN_MODIFY_FLOW" ? "LOAN_MODIFY_APPROVE_OFFICE_STAFF":(isDecEngNodeFlag ? "LOAN_CAR_FINANCE" : "LOAN_APPROVE_OFFICE_STAFF")) : _data1;
		comn.ajax({
			url: _url,
			data: _data1,
			success: function(res) {
				if (res.data.userTasks.length > 1) {
					$("#table_3").bootstrapTable('refresh', {query:res.data});
				} else {
					var a, b, c, //直接提交
						a = res.data.businessObjectId,
						b = res.data.userTasks[0].userId,
						c = res.data.userTasks[0].userName;

                    var _url = flagSubmit ? (args["releventFlow"]==="LOAN_MODIFY_FLOW" ? interUrl.loanModify.submit2NextByNodeKey: (isDecisionEngineFlag ? interUrl.decisionEngine.submit2NextByNodeKey : interUrl.loanDetail.pre2NextByNodeKey)) : submit2nextURL;
                    var _data1 = {
                        loanApplyId: a,
                        nextNodeUserId: b,
                        nextNodeUserName: c
                    }
                    flagSubmit ? _data1.nodeKey = (args["releventFlow"] === "LOAN_MODIFY_FLOW" ? "LOAN_MODIFY_APPROVE_OFFICE_STAFF":(isDecEngNodeFlag ? "LOAN_CAR_FINANCE" : "LOAN_APPROVE_OFFICE_STAFF")) : _data1;
						comn.ajax({
							url: _url,
							data: _data1,
							success: function(res1) {
								tip({
									content: res1.message
								});
								comn.closeTab();
							}
						});
				}
			}
		})
	}
	//普通品牌车型联动
	$(document).on("change", "#getBrand", function (){
		var code = $(this).attr("data-code"),_p=$("#normal_cars");
		_p.find("input[name=carBrand]").val(code);
		//_p.find("input[name=carBrandName]").val($(this).val());
		$("#getCarList, #getCarModel").val("").next().remove();
		$("#getCarList").getCarList(code);

	});
	$(document).on("change", "#getCarList", function (){
		var code = $(this).attr("data-code"),_p=$("#normal_cars");
		_p.find("input[name=carMake]").val(code);
		_p.find("input[name=carMakeName]").val($(this).val());
		$("#getCarModel").val("").next().remove();
		$("#getCarModel").getCarModel(code);
	});
	$(document).on("change", "#getCarModel", function (){
		//车型更换清空预警
		clearWarn();
		var code = $(this).attr("data-code"),_p=$("#normal_cars");
		_p.find("input[name=carModel]").val(code);
		_p.find("input[name=carModelName]").val($(this).val());
		var msrp = $(this).attr('data-msrp');

		var carStyleId=[];
		for(var i=0;i<carStyle.length;i++){
			carStyleId.push(carStyle[i].carid)
		}
		var index=carStyleId.indexOf(parseInt(code));
		$("input[name=bodyStructure]").val(carStyle[index].bodystructure);

		if($(this).attr('disabled')!='disabled' || !$(this).attr('disabled')){
			$("[name=msrp]").val(msrp);
		}
		if($('#customerSource').val()=='3' && $("[name='isDiscount']:checked").val()=='1'){
			//若贴息业务成功选择了“是”后，又修改了车辆信息，则重新根据合作银行、推荐商、车辆信息匹配出贴息政策，
			$("#discountPolicyId").getPolicy1();
			repaymentAmount();
		}

    });

	//贴息品牌车型联动
	$(document).on("change", "#getBrand1", function (){
		var carBrand = $(this).attr("data-code"),carBrandId=$(this).attr("data-id"),_p=$("#discount_cars");
		_p.find("input[name=carBrand]").val(carBrandId);
		//_p.find("input[name=carBrandId]").val(carBrandId);
		_p.find("input[name=carBrandName]").val($(this).val());
		$("#getCarList1, #getCarModel1").val("").next().remove();
		$("#getCarList1").getCarList1(coId,carBrandId);
	});
	$(document).on("change", "#getCarList1", function (){
		var carMake = $(this).attr("data-code"),_p=$("#discount_cars");
		//var carMakeName = $(this).val();
		_p.find("input[name=carMake]").val(carMake);
		var carBrand=_p.find("[name=carBrand]").val();
		//_p.find("input[name=carMakeName]").val(carMakeName);
		//_p.find("input[name=carMake]").val(carMake);
		$("#getCarModel1").val("").next().remove();
		$("#getCarModel1").getCarModel1(coId,carBrand,carMake);

	});
	$(document).on("change", "#getCarModel1", function (){
		clearWarn();
		var carModel = $(this).attr("data-code"),_p=$("#discount_cars");
		//var carModelName = $(this).val();
		var msrp = $(this).attr('data-msrp');
		if($(this).attr('disabled')!='disabled' || !$(this).attr('disabled')){
			$("[name=msrp]").val(msrp);
		}
		_p.find("input[name=carModel]").val(carModel);
		//_p.find("input[name=carModelName]").val(carModelName);
		var carBrand=_p.find("[name=carBrand]").val();
		var carMake=_p.find("[name=carMake]").val();

		var carStyleId=[];
		for(var i=0;i<carStyle.length;i++){
			carStyleId.push(carStyle[i].carid)
		}
		var index=carStyleId.indexOf(carModel);

		$("input[name=bodyStructure]").val(carStyle[index].bodystructure);
			//获取贴息政策
			var _data={coId:coId,carBrand:carBrand,carMake:carMake,carModel:carModel};
			$("#discountPolicyId").getPolicy(_data);

	});

    //根据贴息政策等获取贴息方案
    $(document).on("change", "#discountPolicyId", function () {
        var policyId = $(this).val(), _p, customerSource = $("#customerSource").val(), carBrand, carMake, carModel, nper;
        if (policyId !== "") {
            var discountPolicyName = $(this).find("option:selected").html();
            $("input[name=discountPolicyName]").val(discountPolicyName);
            if (customerSource == '3') {
                _p = $("#normal_cars");
            } else {
                _p = $("#discount_cars");
            }
            carBrand = _p.find("[name=carBrand]").val();
            carMake = _p.find("[name=carMake]").val();
            carModel = _p.find("[name=carModel]").val();
            nper = $("#loanTerm").val();
            //获取贴息政策
            var _data = {policyId: policyId, carBrand: carBrand, carMake: carMake, carModel: carModel, nper: nper};
            $("#discountCaseId").getScheme(_data);
            if (!$("#carDealer").attr('disabled') || $("#carDealer").attr('disabled') != 'disabled') {
                if (flow === "modify") {
                    $("#carDealer").getCarDealer_discount(policyId, $("#applyId").val());
                } else {
                    $("#carDealer").getCarDealer_discount(policyId, 0);
                }
            }

        }
    });

    function getScheme() {
        var _p = $("#discount_cars");
        var policyId = $("#discountPolicyId").val();
        var carBrand = _p.find("[name=carBrand]").val();
        var carMake = _p.find("[name=carMake]").val();
        var carModel = _p.find("[name=carModel]").val();
        var nper = $("#loanTerm").val();
        if (policyId !== "" && carBrand !== "" && carMake !== "" && carModel !== "" && nper !== "") {
            //获取贴息政策
            var _data = {policyId: policyId, carBrand: carBrand, carMake: carMake, carModel: carModel, nper: nper};
            $("#discountCaseId").getScheme(_data);
        }
    }


    //根据贴息方案获取公式数据
    $(document).on("change", "#discountCaseId", function () {
        var $this = $(this), val = $this.val();
        if (val !== "") {
            var formula = $this.find("option:selected").attr("data-formula"), text = $this.find("option:selected").html();
            $("#discountCaseName").val(text);
            formulaForDiscountAmount = $.parseJSON(formula);
            countDiscountAmount();
        }
    });


    //输入贷款金额,计算贴息金额
    $(document).on("keyup", "#loanAmount", function () {
        var loanAmount = $("[name='loanAmount']").val();
        var carType = $("#carType").val();
        IsShowNeedDoor(needDoorRule, loanAmount, carType);
        countDiscountAmount();
    });

    //计算贴息金额
    function countDiscountAmount() {
        if (isNeedDiscount_revent()) { //如果需要贴息
            var loanAmount = $("#loanAmount").val(); //贷款金额
            var discountAmount = $("#discountAmount");
            var discountType = formulaForDiscountAmount.discountType; //discountType: 0：按金额，1：按比例，2：按费率
            var discountRate = formulaForDiscountAmount.discountRate; //贴息金额或者比例
            var discountLimit = formulaForDiscountAmount.discountLimit; //贴息上限
            if (loanAmount !== "") {
                if (discountType == '1') { //如果是百分比
                    var a = (parseFloat(loanAmount) * (discountRate / 100)).toFixed(2), b;
                    if (discountLimit) {
                        b = (a >= discountLimit) ? discountLimit : a;
                    } else {
                        b = a;
                    }
                    discountAmount.val(b);
                }else if (discountType == '2'){
                	_discountFlag = true;
                    countDiscountCarFee();
                } else {
                    discountAmount.val(discountRate);
                }
                countDiscountCarPolicy(); //计算贴息政策
            }

        }
    }

    //输入贴息差额计算贴息政策
    $(document).on("keyup", "#discountMargin", function () {
        var val = parseFloat($(this).val());
        if (val < 0 || val > parseFloat($("#discountAmount").val())) {
            tip({content: "贴息差额必须大于等于0,小于贴息金额"});
            $("#discountCarPolicy").val("");
            return false;
        } else {
            countDiscountCarPolicy(); //计算贴息政策
        }
    });
	//discountType按费率计算时
    function countDiscountCarFee() {
        var formula = $("#discountCaseId").find("option:selected").attr("data-formula");
        var formulaJson = $.parseJSON(formula);
        if (formulaJson.discountType == "2") {
            _discountFlag = true;
		}
    	if (_discountFlag) {
            var loanAmount = Number($("#loanAmount").val()); //贷款金额
            var handingFee = Number($("#handingFee").val()) ? (Number($("#handingFee").val()) / 100) : 0; //公司费率
			var rateV = Number($("#productId").find("option:selected").attr("data-rate")) || 0;
			var rate = rateV / 100;
            /**贴息政策：担保服务费 + 银行分期手续
             * 担保服务费(向上取整)：贷款额 * (1 + 公司费率)/(1 + 基准费率) - 贷款额
             * 银行分期手续(保留2位小数)：(担保服务费 + 贷款额) * 基准费率
             */
            var guaranteeFee =  Math.ceil(loanAmount * (1 + handingFee) / (1 + rate) - loanAmount);
            var bankInstallmentFee = ((guaranteeFee + loanAmount) * rate).toFixed(2);
            var sum = comn.accAdd(guaranteeFee, bankInstallmentFee);
            $("#discountAmount").val(sum.toFixed(2));
		}
	}

    //车商贴息政策=贴息金额-贴息差额；
    function countDiscountCarPolicy() {
        var discountAmount = parseFloat($("#discountAmount").val() || 0); //贴息金额
        var discountMargin = parseFloat($("#discountMargin").val() || 0); //贴息差额
        $("#discountCarPolicy").val((discountAmount - discountMargin).toFixed(2));
        repaymentAmount();
    }

    //判断是否展示是否贴息
    function isNeedDiscount() {
        var carType = $("#carType").val(), product = $("#product").val();
        if (carType === "1" && product != "2" && product != "4") {
            return true;
        } else {
            return false;
        }
    }

    //判断是否显示滴滴
    function isNeedDrops() {
        var carType = $("#carType").val(), product = $("#product").val();
        if (carType === "1" && product === "1") {
            return true;
        } else {
            return false;
        }
    }

    //判断是否展示贴息相关字段
    function isNeedDiscount_revent() {
        var carType = $("#carType").val(), product = $("#product").val();
        var isDiscount = $("[name='isDiscount']:checked").val();
        if (carType == "1" && isDiscount == "1" && product != "2" && product != "4") {
            return true;
        } else {
            return false;
        }
    }

	$("input[name='isDiscount']").change(function(){
		$("input[name=bodyStructure]").val("");
		$(".trimName").addClass('hide');
		var value=$("input[name='isDiscount']:checked").val();
		var coBankId=$("#coBankId").val();
		var dealerName=$("#dealerName").val();
		var isdiscount=$("#coBankId option:selected").attr("data-isdiscount"); //该银行是否支持贴息,1为支持,0为不支持
		var customerSource=$("#customerSource").val(); //客户来源
		$("#getCarList1, #getCarModel1, #getCarList, #getCarModel").val("").next().remove(); //是否贴息都清空已选品牌车系车型
		if(value==="1"){
			//针对车果线上客户
			if(customerSource=='3'){
				$("#discountPolicyId").getPolicy1();
				repaymentAmount();
			}else{
				if(isdiscount!=1){
					tip({content:"该合作银行暂无合作贴息业务，请确认！"});
					$("#isDiscount1").prop("checked",false);
					$("#isDiscount2").prop("checked",true);
				}else{
					isSupportDiscount=1;
					showDiscount_relevant(); //显示贴息相关字段
					$("#getBrand1").getBrandC_discount({coId:coBankId}, false).css("background-color","#fff").val("");
					repaymentAmount();
				}
			}
		}else{
			if(customerSource=='3'){
				$(".discount_se").addClass("hide");
				$("#discountPolicyId,#discountPolicyName,#discountCaseName,#discountCaseId,#discountAmount,#discountMargin,#discountCarPolicy").val("").removeClass("required");//清空并清除必填控制
			}else{
				hideDiscount_relevant();  //隐藏贴息相关字段并清空原有数据
			}
			repaymentAmount();
		}
	});

    //隐藏是否贴息选择
    function hideDiscount_se() {
        $("#isSupportDiscount_se").addClass("hide");
        $("#isDiscount2").prop("checked", true);
    }

    //显示是否贴息选择
    function showDiscount_se() {
        $("#isSupportDiscount_se").removeClass("hide");
    }

    //隐藏贴息相关字段
    function hideDiscount_relevant() {
    	$(".trimName").addClass("hide");
		$("#frameVin").attr('disabled',false);
        $(".discount_se").addClass("hide");
        $("#discount_cars").addClass("hide");
        $("#normal_cars").removeClass("hide");
        $("#getBrand,#getCarList,#getCarModel").val("").addClass("required");
        loadMess(interUrl.gr.carDealerList, $("#carDealer"), 1); //重新加载车行
	    $("#dealerGrade").val("");
        $("#getBrand1,#getCarList1,#getCarModel1,#discountPolicyId,#discountPolicyName,#discountCaseName,#discountCaseId,#discountAmount,#discountMargin,#discountCarPolicy").val("").removeClass("required");//清空并清除必填控制
        $("#employDealerName").val("");
        $("#dealerFeeId").html("<option value=''>--请选择--</option>");
        repaymentAmount();//重新计算预期月还款额
    }

    //显示贴息相关字段
    function showDiscount_relevant() {
		$(".trimName").addClass("hide");
		$("#frameVin").attr('disabled',false);
        $("#normal_cars").addClass("hide");
        $("#getBrand,#getCarList,#getCarModel").val("").removeClass("required");
        //$("#normal_carDealer").addClass("hide");
        $("#discount_cars").removeClass("hide");
        $(".discount_se").removeClass("hide");
        $("#getBrand1,#getCarList1,#getCarModel1,#discountPolicyId,#discountPolicyName,#discountCaseName,#discountCaseId,#discountAmount,#discountMargin,#discountCarPolicy").addClass("required");//增加必填
    }

    //车果线上客户贴息相关
    function discountCoustomer3() {
        var businessTypeId = $("#product").val();
        $("#isDiscount1,#isDiscount2").prop("checked", false);
        if ($("#carType").val() == '1' && $("#product").val() == '1' && (businessTypeId != '2' || businessTypeId != '4')) {
            $("#isSupportDiscount_se").removeClass("hide");
            $("#drops").removeClass("hide");
        } else {
            $("#isSupportDiscount_se").addClass("hide");
            $(".discount_se").addClass("hide");
            $("#drops").addClass("hide");
            $("#discountPolicyId,#discountPolicyName,#discountCaseName,#discountCaseId,#discountAmount,#discountMargin,#discountCarPolicy").val("").removeClass("required");//清空并清除必填控制
            repaymentAmount();
        }
    }

    var changeNum = 0;
    //切换业务品种,   贷款编号，金融产品获取
    $(document).on("change", "#product", function () {
        var businessTypeName = $(this).find("option:selected").html();
        $("#businessTypeName").val(businessTypeName);
        $("#businessTypeId").val($(this).val());
        var code = $(this).val();
        if (code == 4) {
            $("#xzzDiscountAmount_se").removeClass('hide');
            $("#isSupportDiscount_se").addClass('hide');
            $("#drops").addClass("hide");
        } else {
            if (code == 2) {
                $("#isSupportDiscount_se").addClass('hide');
                $("#drops").addClass("hide");
            }
            $("#xzzDiscountAmount_se").addClass('hide');
            $("#xzzDiscountAmount").val('');
        }
        var coBankId = $("#coBankId").val();
        if ($("#customerSource").val() == '3') {
            discountCoustomer3();
        } else {
            if (!isNeedDiscount()) {
                $("#isDiscount1,#isDiscount2").prop("checked", false);
                $("#isSupportDiscount_se").addClass("hide");
                hideDiscount_relevant();
            } else {
                $("#isSupportDiscount_se").removeClass("hide");
            }
        }
        if (!isNeedDrops()) {
            $("#drops").addClass("hide");
        } else {
            $("#drops").removeClass("hide");
        }

        if (args["type"] == "2") {
            return false
        }
        ;
        if (args["type"] != 0) {
            changeNum = 1;
        }
        ;
        if (changeNum > 0) {
            comn.ajax({
                url: interUrl.loanDetail.getLoanProjectNo,
                data: {businessTypeId: code},
                success: function (res) {
                    $("#projectNo").val(res.data);
                }
            });
        }
        changeNum++;
        datas = {
            businessTypeId: code,
            coBankId: $("#coBankId").val()
        };
        prijeCP(datas, 0, 0);
    });

    //切换是否垫款
    // $("input[name='isAdvance']").on('change', function () {
    // 	var checkedV = $("input[name='isAdvance']:checked").val();
    // 	if (checkedV == 1) {
    // 		$("#xzzDiscountAmount_se").removeClass('hide');
    // 	}else {
    // 		$("#xzzDiscountAmount_se").addClass('hide');
    // 		$("#xzzDiscountAmount").val('');
    // 	}
    // });

    //新总总贴息金额
    $("#xzzDiscountAmount").blur(function () {
        var val = $(this).val();
        var loanAmount = $("#loanAmount").val();
        if (loanAmount != '' && !isNaN(loanAmount)) {
            if (parseFloat(val) > parseFloat(loanAmount)) {
                tip({content: '新总总贴息金额<=贷款金额'})
            } else if (parseFloat(val) < 0) {
                tip({content: '新总总贴息金额>=0'})
            }
        }
    });

    //切换汽车类型
    $(document).on("change", "#carType", function () {    //汽车类型及客户来源处理
        var fors = $(this).attr("fors"),
            code = $(this).val();
        if ($("#customerSource").val() != '3') { //如果客户来源不是车果线上,则关联贴息操作
            if (!isNeedDiscount()) {
                $("#isDiscount1,#isDiscount2").prop("checked", false);
                $("#isSupportDiscount_se").addClass("hide");
                $("#drops").addClass("hide");
                hideDiscount_relevant();
            } else {
                $("#isSupportDiscount_se").removeClass("hide");
                $("#drops").removeClass("hide");
            }
        } else {
            discountCoustomer3();
        }

		var loanAmount=$("[name='loanAmount']").val();
		var carType=$("#carType").val();
		if(carType==1){
			//新车显示查询优惠价
			$(".newCarSearch").removeClass("hide");
		}else{
			$(".newCarSearch").addClass("hide");
		}
		IsShowNeedDoor(needDoorRule,loanAmount,carType);
		repaymentAmount();
		if(code == 1){
			$(".carSelect, #getBrand").attr("disabled",false);
			$(".carSelect").next().remove();
			$("#getBrand, .carSelect").getBrandC( $("#getBrand").is(":disabled")).css("background-color","#fff");
			//$("#getBrand").getBrand();
			//$("#getCarList, #getCarModel").html("<option value=''>--请选择--</option>");
			$("#getBrand, .carSelect").val("");
			$("input[name=carSerialno],input[name=carId],input[name=evaluationPrice],input[name=sellPrice],input[name=secondHandCarPrice]").val('');
			//$(".carSelect option").eq(0).attr("checked",true);
			$("#getBrand option:first,#getCarList option:first,#getCarModel option:first").prop("selected", 'selected');
			$("."+fors).addClass('hide');
		}else if(code == 2){
			//$(".carSelect").html("<option value=''>--请选择--</option>");
			$("#getBrand, .carSelect").val("").css("background-color","");
			$("."+fors).removeClass('hide');
			$(".carSelect, #getBrand").attr("disabled",true);
			$(".carSelect, #getBrand").prev().removeAttr("disabled");
		}
        var bankId = $("#coBankId").val();
        var businessCarType = $("#carType").val();
        var productIdType = $("#productId").val();
        var orgId = comn.user.companyId;
        var loanData = {
            bankId: bankId,
            businessCarType: businessCarType,
            productId: productIdType,
            orgId: orgId
        }
        $("#allLoan").addClass("hide");
        $("#allLoan input").val("");
        loanTypeItem(loanData, bankId, businessCarType, productIdType);
	});
    $(document).on("change", "#loanType", function(){
    	if ($(this).val() === "7") {
    		var item = $(this).find("option:selected").attr("data-item");
    		if (item) {
    			var itemArr = item.split(",");
    			$("#allLoan").removeClass("hide");
    			if (itemArr.length > 1) {
    				$.each(itemArr, function(i, v){
                        $("div[for='"+ v +"']").removeClass("hide");
					})
				}
			}
		} else {
            $("#allLoan").addClass("hide");
            $("#allLoan input").val("");
		}
		var _id = $(this).find("option:selected").attr("data-id");
        $("#loanProductConfigId").val(_id ? _id : '');
        repaymentAmount(); //重新计算月还款
	});
    $("input[name='discountAmount']").keyup(function () {
        repaymentAmount();
    });
    $("select[name='loanTerm'],select[name='dealerFeeId']").change(function () {
        repaymentAmount();
    });


    $("#province").change(function () {
        if (this.value) {
            $("#area").val("");
            return $("#city").getCity(this.value).unbind("change").change(function () {
                if (this.value) {
                    return $("#area").getArea(this.value);
                }
            });
        }
    });
    $("#province_4").change(function () {
        if (this.value) {
            $("#area_4").val("");
            return $("#city_4").getCity(this.value).unbind("change_4").change(function () {
                if (this.value) {
                    return $("#area_4").getArea(this.value);
                }
            });
        }
    });
    if (args["type"] == "0") { // 对url进行处理
        $("#title").html('发起贷款');
        var loanApplyId = args["loanApplyId"];
        load(interUrl.loanDetail.loanGet, {
            loanApplyId: loanApplyId
        });
    } else if (args["type"] == "1") {
        $("#title").html('发起贷款');
        var creditApplyId = args["creditApplyId"];
        load(interUrl.loanDetail.launch, {
            creditApplyId: creditApplyId
        })
    } else if (args["type"] == "2") {
        $("#carDealer").hide();
        $("#dealerName").attr('type', 'text').attr("disabled", true);
        $("#title").html('贷款详情');
        var loanApplyId = args["loanApplyId"];
        load(interUrl.loanDetail.loanGet, {
            loanApplyId: loanApplyId
        })
    }
    ;
	$('.sub').click(function(){
		if(args['loanApplyId']) {
            load(interUrl.loanDetail.loanGet, {
                loanApplyId: args['loanApplyId']
            });
		}
	});
	$("#imageManage").click(function(){
		if($(this).hasClass("imageManage")) {
            if(args['loanApplyId']) {
                $("#detail").children().remove();
                $("#detail").load("../../common/documentDetail/index.html");
                $(this).removeClass("imageManage");
            }
		}
	})
    $('.budgetTab').click(function(){
        if(args['loanApplyId']) {
            $("#budget").children().remove();
            $("#budget").load("../../../Modal/common/commonBudget/budget.html");
        }
    });
    //加载数据信息
    function load(a, b) {
        if (a == interUrl.loanDetail.loanGet) {
            $("#product").attr("disabled", true);
            $("#businessTypeId").removeAttr("disabled");
        }
        comn.ajax({
            url: a,
            data: b,
            success: function (res) {
                if(res.data){
                    if(res.data.vin && res.data.vin != ""){
											changeToken = res.data.vin;
                        //$(".vinWarn").removeClass("hide");
                    }
									if(res.data.newPrice && res.data.newPrice > 0){
										$(".vinWarn").removeClass("hide");
									}
                    if (res.data.twoCardBusiness && res.data.twoCardBusiness === 1) {
                        $("#submitCom").removeClass("hide");
                        if (args['releventFlow'] == "LOAN_MODIFY_FLOW" && args['releventFlowNode'] == "LOAN_MODIFY_LAUNCH") {
						} else {
                            $("#submit").addClass("hide");
						}
                    }
                }
                if (a == interUrl.loanDetail.launch) {
                    isCarTypeDisabled(res.data.carType,true)
                }else if (a == interUrl.loanDetail.loanGet) {
                    isCarTypeDisabled(res.data.carType,false)
                }
                getComanpyBank(res.data.coBankId); //校验开票单位是否必填
                if (args["type"] == "2") {
                    $("#creditFormList").attr("disabled", true);
                    $(".btnBox").html('').append('<button type="button" class="btn btn-primary" id="return"><span>返回</span></button>');
                }
                if (res.status == 'LOAN_LAUNCH') {
                    tip({content: res.message});
                    return comn.closeTab();
                }
                args['projectId'] = res.data.projectId;
                //add for 2016-06-03
                if (res.data.carType == "2") {
                    $(".carSelect, #getBrand").attr("disabled", true);
                    $(".carSelect, #getBrand").prev().removeAttr("disabled");
                }
                if (res.data.carType == "2" && flow === "modify") {
                    $(".newCarSearch").addClass("hide");
				}
//                if (flow === 'modify') {
//                    $("#customerBtn").attr("disabled", true);
//                }
                if (!args["type"] == "0") {
                    //购车地址
                    $("#carProvince").getProvinceC({
                        code: res.data.provinceCode,
                        value: res.data.provinceName
                    }, $("#carProvince").is(":disabled"));
                    $("#carCity").getCityC(res.data.provinceCode, {
                        code: res.data.cityCode,
                        value: res.data.cityName
                    }, $("#carCity").is(":disabled"));


                    $("#province").getProvinceC({
                        code: res.data.visitAddressPid,
                        value: res.data.visitAddressPname
                    }, $("#province").is(":disabled"));
                    $("#city").getCityC(res.data.visitAddressPid, {
                        code: res.data.visitAddressCid,
                        value: res.data.visitAddressCname
                    }, $("#city").is(":disabled"));
                    $("#area").getAreaC(res.data.visitAddressCid, {
                        code: res.data.visitAddressRid,
                        value: res.data.visitAddressRname
                    }, $("#area").is(":disabled"));
                    $("#province").change(function () {
                        if (this.value) {
                            $("#area").val("");
                        }
                    });
                    $("#city").change(function () {
                        if (this.value) {
                            return $("#area").getArea(this.value);
                        }
                    });

                    $("#province_4").getProvinceC({
                        code: res.data.estimatePlateAddressPid,
                        value: res.data.estimatePlateAddressPname
                    }, $("#province_4").is(":disabled"));
                    $("#city_4").getCityC(res.data.estimatePlateAddressPid, {
                        code: res.data.estimatePlateAddressCid,
                        value: res.data.estimatePlateAddressCname
                    }, $("#city_4").is(":disabled"));
                    $("#area_4").getAreaC(res.data.estimatePlateAddressCid, {
                        code: res.data.estimatePlateAddressRid,
                        value: res.data.estimatePlateAddressRname
                    }, $("#area_4").is(":disabled"));
                    $("#province_4").change(function () {
                        if (this.value) {
                            $("#area_4").val("");
                        }
                    });
                    $("#city_4").change(function () {
                        if (this.value) {
                            return $("#area_4").getArea(this.value);
                        }
                    });

                    $("#getBrand").getBrandC($("#getBrand").is(":disabled"));
                    $("#getCarList").getCarListC(res.data.carBrand, {
                        code: res.data.carMake,
                        value: res.data.carMakeName
                    }, $("#getCarList").is(":disabled"));
                    $("#getCarModel").getCarModelC(res.data.carMake, {
                        code: res.data.carModel,
                        value: res.data.carModelName
                    }, $("#getCarModel").is(":disabled"));
                }

                needDoorRule = res.data.freedDoorRule;
                if (needDoorRule == "") {
                    $("#needDoorPanel").hide().values({
                        freeDoor: '2',
                        housingStatus: '0',
                        reservedFundsYear: null,
                        socialYear: null
                    });
                }
                //是否展示"是否贴息"
                isSupportDiscount = res.data.isSupportDiscount;
                coId = res.data.coBankId; //合作银行id
                //是否贴息
                if (res.data.isDiscount === 1 && res.data.customerSource !== 3) {
                    showDiscount_relevant();
                    $("#getBrand1").getBrand1(coId, res.data.carBrand).val(res.data.carBrandName);
                    $("#getCarList1").getCarList1(coId, res.data.carBrand, res.data.carMake);
                    $("#getCarModel1").getCarModel1(coId, res.data.carBrand, res.data.carMake, res.data.carModel);
                    //$("#carDealer").getCarDealer_discount(res.data.policyId, 0, res.data.carDealer);
                    $("#carDealer").getCarDealer_discount(res.data.policyId || res.data.discountPolicyId, 0, res.data.carDealer || res.data.dealerId);
                    $("#discountPolicyId").getPolicy({
                        coId: coId,
                        carBrand: res.data.carBrand,
                        carMake: res.data.carMake,
                        carModel: res.data.carModel
                    }, res.data.discountPolicyId, res.data.discountPolicyName);
                    if (res.data.schemeInfo) {
                        formulaForDiscountAmount = res.data.schemeInfo.disPolicySchemeNpers[0]; //计算贴息金额需要用到的数据
                        $("#discountCaseId").getScheme({
                            policyId: res.data.discountPolicyId,
                            carBrand: res.data.carBrand,
                            carMake: res.data.carMake,
                            carModel: res.data.carModel,
                            nper: res.data.loanTerm
                        }, res.data.discountCaseId, res.data.discountCaseName, res.data.schemeInfo.disPolicySchemeNpers[0]);
                    } else {
                        $("#discountCaseId").getScheme({
                            policyId: res.data.discountPolicyId,
                            carBrand: res.data.carBrand,
                            carMake: res.data.carMake,
                            carModel: res.data.carModel,
                            nper: res.data.loanTerm
                        }, res.data.discountCaseId);

                    }
                    if (flow === 'modify') {
                        $("#carDealer").getCarDealer_discount(res.data.policyId, res.data.applyId, res.data.carDealer);
                    }
                }

                if (res.data.carType && res.data.businessTypeId && (res.data.carType != 1 || res.data.businessTypeId == 2 || res.data.businessTypeId == 4)) {//业务品种选择“银行直销”或汽车类型选择“二手车”时，则隐藏“是否贴息”字段
                    $("#isSupportDiscount_se").addClass("hide");
					$(".discount_se").addClass("hide");
                    $("#drops").addClass("hide");
                }
                //if(flow==='modify'){ //如果是贷款修改流程,合作银行可修改
                //}
                $("#coBankName").hide();
                loadBank(res.data.coBankId);
                $("#creditForm").values(res.data);

                if (res.data.freeDoor == "2") {
                    $("#needDoorPanel").hide();
                }
                if (res.data.freeDoor == "0") {
                    $("#needDoor_1").hide();
                }
                if (res.data.maritalStatus != '1') {
                    $("#needDoor_spouse").hide();
                }
	            // console.log(res.data.maritalStatus+'1234567890')
	            if (res.data.maritalStatus == 1) {
		            $(".customerMarital").addClass('input-group input-group-sm')
		            $(".maritalStatus").removeClass('hidden')
	            }
	            //线上用户（贴息、滴滴）显示逻辑同线下保持一致，顾隐藏贴息和滴滴的相关逻辑
	            if (res.data.customerSource == "3") {
                    $("#carDealer").attr("disabled", true);
                    // 由1000改为1500，且去除判断条件
                    setTimeout(function(){
                        $("#carDealer").val(res.data.dealerId ? res.data.dealerId : '')
                    }, 1500);
                    // $("#isSupportDiscount_se").addClass('hide');
                    // $("#drops").addClass("hide");
                    $("#discount_cars").remove();
                    if (res.data.isDiscount === 1) {
                        var _data = {
                            coId: res.data.coBankId,
                            dealerName: res.data.dealerName,
                            carBrand: res.data.carBrand,
                            carMake: res.data.carMake,
                            carModel: res.data.carModel
                        };
                        $("#discountPolicyId").getPolicy1(_data, res.data.discountPolicyId, res.data.discountPolicyName);
                        // $("#isSupportDiscount_se").removeClass('hide');
                        // $("#drops").removeClass("hide");
                    }
                    // else if (res.data.isDiscount === 2 && res.data.carType == '1' && res.data.product == '1') {
                    //     $("#isSupportDiscount_se").removeClass('hide');
                    //     $("#drops").removeClass("hide");
                    // }
                }
                //业务品种为银行直销-垫款(code=4)时
                if (res.data.businessTypeId == 4) {
                    $("#isSupportDiscount_se").addClass('hide');
                    $("#drops").addClass("hide");
                    $("#xzzDiscountAmount_se").removeClass('hide');
                } else if (res.data.businessTypeId == 2) {
                    $("#isSupportDiscount_se").addClass('hide');
                    $("#drops").addClass("hide");
                }
                if (res.data.visitAddressItude) {
                    getPos(res.data.visitAddressItude.split(","));
                }
                if (res.data.dealerFeeName) {
                    $("#dealerFeeId").html("<option value='" + res.data.dealerFeeId + "' fee='" + res.data.handingFee + "'>" + res.data.dealerFeeName + "</option>");
                }
                //计算预期月还款额
                // if (res.data.loanTerm && res.data.loanAmount && res.data.handingFee) {
                //     repaymentAmount();
                // }
                //$("#carDealer").trigger("change");

                /*var point = new BMap.Point(cpointArr[0], cpointArr[1]);
                 var marker = new BMap.Marker(point);        // 创建标注
                 map.centerAndZoom(point, 12);
                 map.addOverlay(marker);*/

                if (!res.data.jointObligor == '') $(".jointObligor").removeClass('hide');   //共同还款人显示隐藏

                if (res.data.loanStatus == 4) $("#revoke").removeClass('hide');
                businessTypeId = res.data.businessTypeId;
                Initialization(res, args["type"]);   //初始化处理函数

                //console.log('推荐商:'+$("#carDealer").attr('disabled'));
                if (res.data.isDiscount === 2) {
                    loadMess(interUrl.gr.carDealerList, $("#carDealer"), 1, res.data.dealerId);
                }
                // console.log(res.data)
                // console.log(res.data.coBankId+"======="+res.data.carType)
                var _loanData = {
                    bankId: res.data.coBankId,
                    businessCarType: res.data.carType || '1',
                    orgId: comn.user.companyId,
                    productId: res.data.productId
                };
                // console.log(res.data.coBankId+"-----:"+res.data.carType)
                loanTypeItem(_loanData, res.data.coBankId, (res.data.carType || '1'), res.data.productId, res.data.loanType);
                if (res.data.loanType === 7 && (res.data.isInsuranceFee || res.data.isGpsFee || res.data.isPurchaseTaxFee)) {
                	$("#allLoan").removeClass("hide");
                	res.data.isInsuranceFee ? $("div[for=isInsuranceFee]").removeClass("hide") : "";
                	res.data.isGpsFee ? $("div[for=isGpsFee]").removeClass("hide") : "";
                	res.data.isPurchaseTaxFee ? $("div[for=isPurchaseTaxFee]").removeClass("hide") : "";
				}
            }
        });
    }

    $(document).on("click", "#return,#cancel", function () {
//  	return window.parent.toUrl({
//  		url: "./Modal/dloananagemsloanReviewindex.html"
//  	});
        comn.closeTab();
    });

    $("#revoke").click(function () {  //撤销贷款申请
        oppSureModal("是否撤销贷款");
        // console.log(cancelURL);
        $("#sureOption").unbind("click").click(function () {
            comn.ajax({
                url: cancelURL,
                data: {
                    loanApplyId: $("#loanApplyId").val()
                },
                success: function (res) {
                    tip({content: res.message});
                    comn.closeTab();
                }
            });
        });
    });

    $("#handingFee").on('keyup', function () {
        var val = $(this).val();
        if (val && !isNaN(val)) {
            if (val >= 100) {
                val = "";
            } else {
                var len = val.length;
                var dot = val.indexOf('.');
                var _int = parseInt(val);
                var dotCount = val.substring(dot + 1, len);
                if (dotCount.length > 4) {
                    dotCount = dotCount.substr(0, 4);
                    val = _int + '.' + dotCount;
                } else {
                    val = val;
                }
            }
        } else {
            val = "";
        }

        $(this).val(val);
        if ($("#isDiscount1").is(":checked")) {
            countDiscountCarFee(); //贴息政策重新计算；
            countDiscountCarPolicy();
        }
    });
    //小tip
//  $("#getCarModel").hover(function(){
//  	var value = $("#msrp").val();
//  	layer.tips('厂商建议零售价'+value+'万', '#getCarModel', {
//		    tips: [1, '#0FA6D8'] //还可配置颜色
//		});
//  },function(){
//  	 layer.closeAll();
//  })

    //加载银行信息
    function loadBank(val) {
        comn.ajax({
            url: interUrl.gr.bankList,
            success: function (res) {
                var j, len, o, ref, str;
                str = "<option value=''>--请选择--</option>";
                ref = res.data;
                for (j = 0, len = ref.length; j < len; j++) {
                    o = ref[j];
                    str += "<option value='" + o.id + "' data-isdiscount='" + o.discount + "'>" + o.bankName + "</option>";
                }
                return $("#coBankId").html(str).val(val).show();
            }
        })
    }

    //选择金融产品,带出该金融产品的”贷款期限”；
    $(document).on("change", "#productId", function () {
        var productName = $(this).find("option:selected").html();
        $("#productName").val(productName);
        var nper = $("#productId option:selected").attr('data-nper');
        $("#loanTerm").val(nper);   //贷款期限赋值
        $("input[name=loanTerm]").val(nper);
        $("#loanTerm").change();
        var carDealer = $("#carDealer").val();
        var loanTerm = $("#loanTerm").val();
        if (carDealer !== "" && loanTerm !== "") {
            carCost(carDealer, loanTerm);//重新获取车商费用
        }
        if (isNeedDiscount_revent()) {
            getScheme();
        }

        repaymentAmount();
        //更改金融产品调贷款类型
        var bankId = $("#coBankId").val();
        var businessCarType = $("#carType").val();
        var productIdType = $("#productId").val();
        var orgId = comn.user.companyId;
        var loanData = {
            bankId: bankId,
            businessCarType: businessCarType,
            productId: productIdType,
            orgId: orgId
        }
        $("#allLoan").addClass("hide");
        $("#allLoan input").val("");
		loanTypeItem(loanData, bankId, businessCarType, productIdType);
    });

    //车商费用选择
    $(document).on("change", "#dealerFeeId", function () {
        var nper = $("#dealerFeeId option:selected").html();
        var handingFee = $("#dealerFeeId option:selected").attr('fee');
        $("#dealerFeeName").val(nper);
        $("#handingFee").val(handingFee);
    });

    //选择合作银行
    $(document).on("change", "#coBankId", function () {
        var $this = $(this), isSupportDiscount = 0, isDiscount = $("[name='isDiscount']:checked").val(), datas;
        if ($this.val() !== '') {
            var text = $("#coBankId option:selected").html(), isSupportDiscount = $("#coBankId option:selected").attr('data-isdiscount');
            $('#coBankName').val(text);
            datas = {
                businessTypeId: $("#product").val(),
                coBankId: $this.val()
            };
            prijeCP(datas, 0);
            if ($("#customerSource").val() != 3 && $("#carType").val() == 1) { //如果客户来源不是app,则关联贴息操作
                //if(isDiscount==1){
                //	$("#getBrand1").getBrandC_discount({coId:$this.val()}, false).css("background-color","#fff").val("");
                //}
                $("#isDiscount1,#isDiscount2").prop("checked", false);
                var productId = $("#product").val();
                if (productId != "2" && productId != "4") {
                    hideDiscount_relevant();
                }
            } else if ($("#customerSource").val() == '3' && $("#carType").val() == '1' && $("#product").val() == '1' && $("[name='isDiscount']:checked").val() == '1') {
                $("#discountPolicyId").getPolicy1();//重新获取贴息政策
                repaymentAmount();
            }
            coId = this.value;
            $("#carDealer,#employDealerName").val("");
            $("#dealerFeeId").html("<option value=''>--请选择--</option>");
            getComanpyBank($(this).val()); //校验开票单位是否必填
        }
    });

    //推荐商和贷款期限选择
    $(document).on("change", "#carDealer,#loanTerm", function () {
        var carDealer = $("#carDealer option:selected").attr('value'),
            loanTerm = $("#loanTerm option:selected").attr('value');
        if (carDealer != '' && loanTerm != '') {
            carCost(carDealer, loanTerm);
        }
        repaymentAmount();
    });
	//贷款金额、手续费率从下拉cookie取
	$(document).on("blur", "#loanAmount, #handingFee", function(){
        if ($("#isDiscount1").is(":checked")) {
            countDiscountCarFee(); //贴息政策重新计算；
            countDiscountCarPolicy();
        } else {
            repaymentAmount(); //通过else 让repaymentAmount 只调用一次； countDiscountCarPolicy（）里面也会调用一次repaymentAmount
		}
	})

    $("#btn-search").click(function () {
        $("#coBank").val($("#coBankId").val());
        $("#table_5").bootstrapTable('refresh', {url: '...'});
    });


    //地图
    var ac, menu;
    if (args['type'] != 0 && args['type'] != 2) {
        map = new BMap.Map("map");
        menu = new BMap.ContextMenu();
        menu.addItem(new BMap.MenuItem("获取当前位置", function (e) {
            map.clearOverlays();
            map.addOverlay(new BMap.Marker(e));
            $("#position").val(e.lng + "," + e.lat);
            $("#longitude").val(e.lng);   //经度
            $("#latitude").val(e.lat);    //纬度
            return
        }));
        map.addContextMenu(menu);
        map.centerAndZoom("杭州", 12);
    } else {
        getPos = function (arr) {
            map = new BMap.Map("map");
            menu = new BMap.ContextMenu();
            menu.addItem(new BMap.MenuItem("获取当前位置", function (e) {
                map.clearOverlays();
                map.addOverlay(new BMap.Marker(e));
                $("#position").val(e.lng + "," + e.lat);
                $("#longitude").val(e.lng);   //经度
                $("#latitude").val(e.lat);    //纬度
                return
            }));
            var point = new BMap.Point(arr[0], arr[1]);
            map.addContextMenu(menu);
            map.centerAndZoom(point, 12);
            var marker = new BMap.Marker(point);        // 创建标注
            map.addOverlay(marker);
        }

    }

    $("#getPos2").click(function () {
        if ($("#province").val()) {
            province = $("#province").find("option:selected").text()
        } else {
            province = ""
        }

        if ($("#city").val()) {
            cityText = $("#city").find("option:selected").text();
            city = cityText == "省直辖县级行政区划" ? "" : cityText;
        } else {
            city = ""
        }

        if ($("#area").val()) {
            area = $("#area").find("option:selected").text()
        } else {
            area = ""
        }
        setPlace(province + city + area + $("#address").val());
    });
});

//是否需要上门判断逻辑
$("[name='freeDoor']").click(function () {
    var checkedV = $("input[name='freeDoor']:checked").val();
    if (checkedV == 1) {
        $("#needDoor_1").show();
    } else {
        $("#needDoor_1").hide().values({ //将值重新置为空
            freeDoor: 1,
            housingStatus: '0',
            reservedFundsYear: null,
            socialYear: null
        });
    }
});

function IsShowNeedDoor(needDoorRule, loanAmount, carType) {
    if (needDoorRule != "" && typeof needDoorRule == "string" && loanAmount != "" && carType != "") {
        var _loanAmount = Number(loanAmount);
        var rule = needDoorRule.split(":");
        var new_loanAmount, second_loanAmount;
        new_loanAmount = Number(rule[0]);
        second_loanAmount = Number(rule[1]);
        if (carType == "1" && _loanAmount > new_loanAmount) {
            $("#needDoorPanel").hide().values({
                freeDoor: '2',
                housingStatus: '0',
                reservedFundsYear: null,
                socialYear: null
            });
            $("#needDoor_1").show();
        } else if (carType == "2" && _loanAmount > second_loanAmount) {
            $("#needDoorPanel").hide().values({
                freeDoor: '2',
                housingStatus: '0',
                reservedFundsYear: null,
                socialYear: null
            });
            $("#needDoor_1").show();
        } else {
            $("#needDoorPanel").show().values({
                freeDoor: '1',
                housingStatus: '0',
                reservedFundsYear: null,
                socialYear: null
            });
            $("#needDoor_1").show();
        }
    }
}

//免上门5个条件填了其中一项就可以提交
function judgeNeedDoorSumit() {
    var needDoor = $("[name='freeDoor']:checked").val();
    var housingStatus = $("[name='housingStatus']").val();
    var reservedFundsYear = $("[name='reservedFundsYear']").val();
    var socialYear = $("[name='socialYear']").val();
    var spouseReservedFundsYear = $("[name='spouseReservedFundsYear']").val() || "";
    var spouseSocialYear = $("[name='spouseSocialYear']").val() || "";
    if (needDoor == "1" && !$("#needDoorPanel").is(":hidden")) {
        if (housingStatus != "0" || reservedFundsYear != "" || socialYear != "" || spouseReservedFundsYear != "" || spouseSocialYear != "") {
            return true;
        } else {
            return false;
        }
    } else {
        return true;
    }
}

//保存业务录入-基本信息
function saveBaseInfo(callback) {
    if ($("#approvalBaseInfoForm").valid() == true) {
        var sex = {sex: $("[name='sex']").val()};
        var maritalStatus = {maritalStatus: $("[name='maritalStatus']").val()};
        comn.ajax({
            url: interUrl.myTask.editLoanerInfo,
            data: $.extend($("#approvalBaseInfoForm").values(),sex,maritalStatus,{
				loanApplyId: args['loanApplyId']
			}),
            success: function (res) {
                tip({content: res.message || "保存成功!"});
                if (typeof(callback) == "function") {
                    callback();
                }
            }
        });
    }
}

$(function () {
    //if (args['releventFlowNode'] == "LOAN_MODIFY_LAUNCH") {
    //    $("input[name='positionMerge']:radio").attr("disabled", true);
    //}
    //证件是否长期有效
    $("input[name='cardNoValid']").change(function(){
        if(this.value == 0){
            $("input[name='cardNoValidTime']").addClass("required");
        }else{
            $("input[name='cardNoValidTime']").removeClass("required");
        }
    });
    $('.nav-tabs li a').click(function (e) {
        var innerText = $(this).html();
        e.preventDefault();
        if (args['loanApplyId'] || innerText == "征信记录" || innerText == "贷款信息") {
            $(this).tab('show');
            $($(this).attr("href")).find("[data-url]").each(function () {
                $(this).getLoad();
            });
        } else {
            tip({content: '请保存贷款信息后再操作! '});
        }
    })

    $("#btn-contacter-add").click(function () {
        $("#contacter_modal .modal-title").text("新增紧急联系人");
        $("#contacter_modal").modal("show");
        handle_save = function () {
            $("#contacterForm").validate();
            if ($("#contacterForm").valid() == true) {
                comn.ajax({
                    url: interUrl.myTask.saveLoanCustomerContacter,
                    data: $.extend($("#contacterForm").values(), {loanApplyId: args['loanApplyId']}),
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

    $(document).on("change", "#professionCode", function () {
        $("#profession").val($(this).find("option:selected").text());
    });
    $(document).on("change", "#post", function () {
        $("#postName").val($(this).find("option:selected").text());
    });

    $(document).on("change", "#workNatureCode", function () {
        $("#workNature").val($(this).find("option:selected").text());
    });

// 加载关系人
    $("select[name='relationship']").getExpressCompanyCode("RelationShipType");

    $("#btn-contacter-save").click(function () {
        handle_save();
    });
    $("#btn-baseInfo-save").click(function () {
        $("#approvalBaseInfoForm").validate();
        if (($("#approvalBaseInfoForm input[name=driverLicence]").val() == "") || ($("#approvalBaseInfoForm input[name=education]").val() == "") || ($("#approvalBaseInfoForm input[name=profession]").val() == "") || ($("#approvalBaseInfoForm input[name=industry]").val() == "") || ($("#approvalBaseInfoForm input[name=housingStatus]").val() == "") || ($("#approvalBaseInfoForm input[name=reservedFundsYear]").val() == "") || ($("#approvalBaseInfoForm input[name=socialYear]").val() == "")) {
            tip({content: "请先保存客户评分卡"});
            return;
        }
        if ($("#spousePanel").attr("style") == "" && ($("#approvalBaseInfoForm input[name=spouseDriverLicence]").val() == "")) {
            tip({content: "请先保存客户评分卡"});
            return;
        }
        saveBaseInfo();
    });

//暂存
    $("#tempSave").click(function () {
        var value_mobile = $("input[name=mobilePhone]").val();
        var value_homePhone = $("input[name=homePhone]").val();
        var value_workPhone = $("input[name=companyPhone]").val();
        var value_spouseMobilePhone = $("input[name=spouseMobilePhone]").val();
        var value_spouseCompanyPhone = $("input[name=spouseCompanyPhone]").val()
        /*if (value_mobile) {
         if (!$("input[name=mobilePhone]").valid()) {
         return false;
         };
         }
         if (value_homePhone) {
         if (!$("input[name=homePhone]").valid()) {
         return false;
         };
         }

         if (value_workPhone) {
         if (!$("input[name=companyPhone]").valid()) {
         return false;
         };
         }
         if (value_spouseMobilePhone) {
         if (!$("input[name=spouseMobilePhone]").valid()) {
         return false;
         };
         }

         if (value_spouseCompanyPhone) {
         if (!$("input[name=spouseCompanyPhone]").valid()) {
         return false;
         };
         }*/
        if (args["releventFlowNode"] == "LOAN_LAUNCH" || args['releventFlowNode'] == "LOAN_MODIFY_LAUNCH") {
            var sex = {sex: $("[name='sex']").val()};
            var maritalStatus = {maritalStatus: $("[name='maritalStatus']").val()};
            comn.ajax({
                url: interUrl.myTask.editLoanerInfo,
                data: $.extend($("#approvalBaseInfoForm").values(), sex, maritalStatus, {
                    loanApplyId: args['loanApplyId'],
                    isTempStorage: true
                }),
                success: function (res) {
                    tip({content: res.message || "客户信息暂存成功!"});
                }
            });
        }
    });


});

function fnCall() {
    comn.ajax({
        url: interUrl.myTask.approvalBaseInfo,
        data: {loanApplyId: args['loanApplyId']},
        success: function (res) {
            var o = {
                "realCarOwner": res.data.realCarOwner,
                "isAgency": res.data.isAgency
            };
            window['_mobilePhone_baseInfo'] = res.data.mobilePhone;
            $("#approvalBaseInfoForm").values(o);
        }
    })
}

//基本信息-紧急联系人
function getContacter() {
    table_contacter = function (params) {
        var p = params.data;
        return comn.ajax({
            url: interUrl.myTask.customerContacter,
            data: $.extend({loanApplyId: args['loanApplyId']}, p),
            success: function (res) {
                params.success({
                    'total': res.totalItem,
                    rows: res.data
                });
                return params.complete();
            }
        });
    };
    //修改表格统一配置参数
    var tableConfig = {};
    $.map(comn.table, function (v, k) {
        tableConfig[k] = v;
    });
    tableConfig['height'] = "340";
    $("#table_contacter").bootstrapTable(tableConfig);
}

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
            if ($("#contacterForm").valid() == true) {
                comn.ajax({
                    url: interUrl.myTask.modifyLoanCustomerContacter,
                    data: $.extend($("#contacterForm").values(), {contacterId: a, loanApplyId: args['loanApplyId']}),
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

//车架号查询
var token='';//token值校验重复查询
var changeToken = '';//校验车架号更改
//新车显示查询优惠价
if($("select[name=carType]").find("option:selected").val()==1){
	$(".newCarSearch").removeClass("hide");
}

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
//选择车型
$(document).on("change","#vinCarType",function(){
    var carId=$(this).val();
	// console.log(carId);
	if(carId !=""&&carId!="--请选择--"){
		var carName=$("#vinCarType").find("option:selected").html();
		$("input[name=carModelName]").val(carName);
		$("input[name=carModel]").val(carId);
		var idCar=[];
		for(var i=0;i<vinCarInfoList.length;i++){
			idCar.push(vinCarInfoList[i].carId);
		};
		var num=idCar.indexOf(parseFloat(carId));
		$("input[name=newPrice]").val(vinCarInfoList[num].newPrice);//新车优惠价
		$("input[name=bodyStructure]").val(vinCarInfoList[num].bodyStructure);//汽车类型
		// if(isDiscounted()) {
		//获取贴息政策
		var _data = {
			coId: coId,
			carBrand: $("input[name=carBrand]").val(),
			carMake: vinCarInfoList[num].carCode,
			carModel: carId
		};
		$("#discountPolicyId").frame(_data);
		// }
		warnLevel($("input[name=billingPrice]").val());
	}
	// $("input[name=carName]").val(carName);

});
var vinCarInfoList=[];
var carStyle=[];
var res = /(?!^[a-zA-z]+$)(?!^[0-9]+$)[a-zA-z0-9]{17}/;
$("#frameSearch").on("click", function () {
		clearWarn();
    var carType = $("#carType").find("option:selected").html();
    var frameNumber = $("input[name=vin]").val();
    if (frameNumber == "") {
        tip({
            content: "请输入车架号"
        })
    } else {
        if (res.test(frameNumber)) {
            if (token != frameNumber) {
                token = frameNumber;
							  changeToken = frameNumber;
                comn.ajax({
                    url: interUrl.loanDetail.getVinInfo,
                    data: {
                        vin: frameNumber,
                        applyId: args["loanApplyId"],
                        provinceCode: $("#carProvince").val(),
                        provinceName: $("input[name=provinceName]").val(),
                        cityCode: $("#carCity").val(),
                        cityName: $("input[name=cityName]").val()
                        // flowType: args["releventFlow"],
                    },
                    success: function (res) {
                        $("#frameVin").attr("disabled", "disabeld");

                        //品牌
                        $("input[name=carBrandName]").val(res.data.brandName);
                        $("input[name=carBrand]").val(res.data.brandId);
                        //车系
                        $("input[name=carMakeName]").val(res.data.modelName);
                        $("input[name=carMake]").val(res.data.modelCode);

                        if (res.data.vinCarInfoList.length > 1) {
                            $("input[name=carModelName]").val("");
                            $(".trimName").removeClass("hide");
                            $("#vinCarType").html(getVinCar(res.data.vinCarInfoList));
                            vinCarInfoList = res.data.vinCarInfoList;
                        } else {
                            $(".trimName").addClass("hide");
                            //车型
                            $("input[name=carModelName]").val(res.data.vinCarInfoList[0].carName);
                            $("input[name=carModel]").val(res.data.vinCarInfoList[0].carId);
                            // $("input[name=carName]").val(res.data.vinCarInfoList[0].carName);
                            $("input[name=newPrice]").val(res.data.vinCarInfoList[0].newPrice);//新车优惠价
                            $("input[name=bodyStructure]").val(res.data.vinCarInfoList[0].bodyStructure);//汽车类型

                            // if (isDiscounted()) { //如果是贴息
                            //获取贴息政策
                            var _data = {
                                coId: coId,
                                carBrand: $("input[name=carBrand]").val(),
                                carMake: res.data.modelCode,
                                carModel: res.data.vinCarInfoList[0].carId
                            };
                            $("#discountPolicyId").frame(_data);
                            // }

                        }
                        $("input[name=queryUserName]").val(window.parent.userName.innerHTML);
                        warnLevel($("input[name=billingPrice]").val());
                    }
                })
            }
        } else {
					tip({
						content: "车架号必须由17位的数字加字母组成,请确认"
					})
				}
    }
});
function warnLevel(value){
    $("#billingPrice").val(value);
    var billingPrice=$("#billingPrice").val();
    var newPrice=$("input[name=newPrice]").val();
		if(newPrice && newPrice > 0){
			$(".vinWarn").removeClass("hide");
			var level=(billingPrice-newPrice)/newPrice*100;
			if(level<20 &&level>5){
				$("input[name=warningLevel]").val("黄色预警");
				$("input[name=warningResult]").val("系统预算单开票价高于第一车网新车优惠价5%，请审批员核实!");

			}else if(level>20){
				$("input[name=warningLevel]").val("红色预警");
				$("input[name=warningResult]").val("系统预算单开票价高于第一车网市场成交价20%，请审批员核实!");
			}else{
				$("input[name=warningLevel]").val("正常");
				$("input[name=warningResult]").val("正常");
			}
		}
}
//清除预警信息
function clearWarn(){
	$('input[name=newPrice]').val('');
	$('input[name=warningLevel]').val('');
	$('input[name=warningResult]').val('');
	$('.vinWarn').addClass('hide');
}
$("input[name=billingPrice]").bind("input propertychange",function(){
    var _this=this.value;
		if($('input[name=newPrice]').val()){
			warnLevel(_this);
		}
});
//判断是否贴息
function isDiscounted() {
	var carType = $("#carType").val(), product = $("#product").val();
	var isDiscount = $("[name='isDiscount']:checked").val();
	if (carType == "1" && isDiscount == "1" && product != "2" && product != "4") {
		return true;
	} else {
		return false;
	}
}
//隐藏贴息相关字段
function hideDiscountRelevant() {
	$(".discount_se").addClass("hide");
	loadMess(interUrl.gr.carDealerList, $("#carDealer"), 1); //重新加载车行
	$("#employDealerName,#discountCaseName,#discountCaseId").val("");
	// $("#discountCaseName").val("");
	$("#dealerFeeId").html("<option value=''>--请选择--</option>");
	repaymentAmount();//重新计算预期月还款额
}

//显示贴息相关字段
function showDiscountRelevant() {
	$(".discount_se").removeClass("hide");
}
//获取合作银行是否必填
function getComanpyBank(bankId){
    var dataArr =[["", "IssuingOfficeVertify"]];
    var bankArr;
    $.getCommonMethodPort(dataArr, function (dataArr) {
    	if (dataArr && dataArr.IssuingOfficeVertify) {
            bankArr = dataArr.IssuingOfficeVertify;
			for(var i = 0; i < bankArr.length; i++) {
				// console.log(bankId == Number(bankArr[i].codeId))
				// console.log(bankId+"----"+bankArr[i].codeId)
				if (Number(bankId) == Number(bankArr[i].codeId)) {
					$("#billCompanyName").addClass("required");
					break;
				} else {
                    $("#billCompanyName").removeClass("required").parents(".billCompanyArea").removeClass("has-error");
                    $("#billCompanyName-error").remove();

				}
			}
		}
    });
}

// 变更主贷人
function changeLender() {
	var coBankId = $("#coBankId1").val()
	var customerId = $("#customerId").val()
	comn.ajax({
		url: interUrl.myTask.reverseSpouseInformation,
		data: {coBankId: coBankId,customerId:customerId},
		success: function (res) {
			// console.log(res)
			$("#creditForm").values(res.data)
		}
	})
	// console.log(loanApplyId)
}
$('#changeLender').on('click',changeLender)


//云镜大数据相关start
//配偶云镜大数据查询点击显示弹窗
$("#spouseSearch").click(function() {
   $("#spouseSearchInfo").modal("show");
});
//查询云镜大数据弹窗-提交按钮事件
$("#spouseSearch2").click(function() {
    //滚动条滚到顶部
    $('body,html').animate({scrollTop: 0}, 1000);

	comn.ajax({
		url: interUrl.cloudMirrorReport.decisionengineLoanQueryDecision,
		data: {
            loanApplyId: args['loanApplyId'],
            type:1,
        },
		success: function (res) {
            isTimeOut = true;
            $("#spouseSearchInfo").modal("hide");

            $('#spouseSearch').addClass('hide');
            $('#spouseSearchTip').removeClass('hide');
            $('#spouseSearchTip').text('查询中(9秒)');

            function setTime(n) {
                var times = n;
                var t = setInterval(function(){
                    times --;
                    var timesStr = '查询中(' + times + '秒)';
                    $('#spouseSearchTip').html(timesStr);
                    if(times === 0) {
                        clearInterval(t);
                        function getInfo() {
                            comn.ajax({
                                url: interUrl.myTask.approvalBaseInfo,
                                data: {loanApplyId: args['loanApplyId']},
                                success: function (res) {
                                    var data = res.data;

                                    //获得配偶相关信息
                                    spouseSearchStatus.maritalStatus = data.maritalStatus;
                                    spouseSearchStatus.spouseDecisionStatus = data.spouseDecisionStatus;   
                                    
                                    if(data.spouseDecisionStatus === 1) {
                                        $('#spouseSearchTip').text('请稍后再刷新查看');
                                        return;
                                    }
                                    
                                    if(data.spouseDecisionStatus === 2) {
                                        $('#spouseSearchTip').text('配偶云镜大数据通过');
                                        return;
                                    }
            
                                    if(data.spouseDecisionStatus === 3 || data.spouseDecisionStatus === 4) {
                                        $('#spouseSearchTip').text('配偶命中大数据黑名单');
                                        return;
                                    } 
                                    
                                    if(data.spouseDecisionStatus === 200) {
                                        $('#spouseSearch').removeClass('hide');
                                        $('#spouseSearchTip').addClass('hide');
                                        $('#spouseSearchTip').text('');
                                        return;
                                    }                                    
                                },
                            })                                            
                        }
                        getInfo();
                        isTimeOut = false;
                    }
                },1000)
            }
            setTime(9);       
		}
	})    
});
//点击提交-没有查询配偶云镜大数据判断
$('#spouseSearch3').click(function(){
    $("#spouseSearchInfo2").modal("hide"); 
    $("#spouseSearch").trigger("click");   
});

//云镜大数据相关end


