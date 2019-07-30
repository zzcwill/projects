var documentDeliveryType ,args, carFn, _maritalStatus = false, permitModify;
var tableConfig = {};
$.map(comn.table, function (v, k) {
    tableConfig[k] = v;
});


args = comn.getArgs();
if (args['currentNodeKey'] === 'DOCUMENT_VERIFY' || args['currentNodeKey'] === 'COPY_CONTRACT') {
	$("#contractPrintNo").removeClass("hide");
}
if (args['releventFlowNode'] == 'DOCUMENT_VERIFY') {
	$("#isGps").removeClass("hide")
}
comn.ajax({
	url : interUrl.creditManagement.isValid,
	data : {
		projectId : args["projectId"]
	},
	success : function (res) {
		if (res.data == 1) {
			$(".isValid").removeClass("hide");
			$("input[name=brandModelName], input[name=billCompanyName], input[name=carTypeDesc]").addClass("required");
		} else {
			$(".isValid").addClass("hide");
			$("input[name=brandModelName], input[name=billCompanyName], input[name=carTypeDesc]").removeClass("required");
		}
	}
})
if (args['documentFlowType'] != "1") {
	$("#cumterInfoFieldset").attr("disabled", "disabled");
}
//计算首付款
function countDownPayment(){
	if(!isNaN($("#billingPrice").val())&&!isNaN($("#loanAmount").val())){
		var v = comn.accSub(parseFloat($("#billingPrice").val() || "0"), parseFloat($("#loanAmount").val() || "0"));
		$("#downPaymentAmount").val(v);
	}
	countPreCollectedAmount();
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
		var fee = parseFloat($("#downPaymentAmount").val() || "0")+parseFloat($("#totalFee").val() || "0")-parseFloat($("#collectedAmount").val() || "0");
		$("#preCollectedAmount").val(fee.toFixed(2));
	}
}

!function (t) {
	t.fn.values1 = function (e) {
		var i = t(this).find(":input").get();
		return "object" != typeof e ? (e = {}, t.each(i, function () {
			this.name && (this.checked || /select|textarea/i.test(this.nodeName) || /text|hidden|password/i.test(this.type)) && (e[this.name] = t(this).val())
		}), e) : (t.each(i, function () {
			this.name && e[this.name] + "" && "undefined" != typeof e[this.name] && ("checkbox" == this.type || "radio" == this.type ? t(this).prop("checked", e[this.name] == t(this).val()) : t(this).val(e[this.name]))
		}), t(this))
	}
}(jQuery);


	//预算单信息
	//getBudgetInfo();
	//(文林要求特此备注 )
	comn.ajax({
		url: interUrl.myTask.deGetApprovalFeeInfo,
		data: {
			projectId: args['projectId']
		},
		success: function(res){
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
			if(res.data.isDiscount===1){ //是贴息业务
				$(".discount_se").show();
			}
			//银行直销逻辑判断  businessTypeId
			if(res.data.businessTypeId==2){
				$("#yhzx-c1").hide();
				$("#yhzx-c").text("应收金额");
				$("#receivableAmount").show();
				$("#payableAmount").hide();
				$("#paymentMethodBox").hide();
			}
			if(res.data.businessTypeId==4){
				$("#xzzDiscountAmount_se").removeClass('hide');
			}
			$("#approvalBudgetInfoForm, #contractInfo").values(res.data); 
		} 
	});
	//打印预算单
	$("#btn-print-budget").click(function(){
		window.open("../../../Modal/task/myTask/print.html?loanApplyId="+args['loanApplyId']);
	});
	documentDeliveryType = args['documentDeliveryType'];
	var documentFlowType = args['documentFlowType'];
	if(!("1" == documentFlowType)){
		$("#carOpinionView").addClass("hide");
	}

	if(args['releventFlowNode'] == "DOCUMENT_VERIFY" && args['yiban'] == '0'){
		//资料审核节点可以修改开票价
		$("[name='billingPrice']").removeAttr("readonly").keyup(function(){
			countDownPayment();
			countLoanRatio();
		});
		$("#btn-save-budget-c").show();
	}else if(args['releventFlowNode'] == "COPY_CONTRACT"){
		$("#textHtml").html("合同抄写"); 
	}

	if("3" == documentFlowType){
		$("#isModifyCar").prop("disabled", "disabled");
		$("#carBtnSave").addClass("hide");
		$("#textHtml").html("资料复核");
	}else if("4" == documentFlowType){
		$("#isModifyCar").prop("disabled", "disabled");
		$("#carBtnSave").addClass("hide");
		$("#textHtml").html("资料接收");
	}
	if(documentFlowType=="2" || documentFlowType=="3"){
		//可修改客户信息和反担保信息
		//$("#cumterInfoFieldset").removeAttr("disabled");
		//$("#baseInfoSave").show();
	}

	//保存业务录入-基本信息
	$("#btn-baseInfo-save").click(function () {
		$("#approvalBaseInfoForm").validate();
		if($("#approvalBaseInfoForm").valid() == true) {
			var sex={sex:$("[name='sex']").val()};
			var maritalStatus={maritalStatus:$("[name='maritalStatus']").val()};
			comn.ajax({
				url: interUrl.myTask.editLoanerInfo,
				data: $.extend($("#approvalBaseInfoForm").values(),sex,maritalStatus,loanApplyId),
				success: function (res) {
					tip({content: res.message || "保存成功!"});
				}
			});
		}

	});

	if(documentDeliveryType == '1'){
	}else if (documentDeliveryType == '2'){
		$("#sub").addClass("hide");
		$("#btnBack").addClass("hide");
		$("#carBtnSave").addClass("hide");
	}
	$("#carBtnSave").click(function(){
		if(args['releventFlowNode']=='COPY_CONTRACT'){
			if($("#frameOnce").val() != 'clicked'){
				return tip({content:'请先通过车架号查询新车优惠价!'})
			}
		}
		if(args['releventFlowNode']=='COPY_CONTRACT' || args['releventFlowNode'] == 'DOCUMENT_VERIFY'){
			if($('input[name=newPrice]').val() && $('select[name=carType]').val() == 1){
				if($('input[name=carFrameNo]').val() != changeToken){
					return tip({
						content: '请先点击【查询新车优惠价】根据车架号查询外部接口返回的车辆价格!'
					})
				}
			}
		}

        if($("#carFormInfo").valid()){
        	//车架号码不能输入半角字符
    		var str = $('input[name=carFrameNo]').val();
			var reg = /^[A-Za-z0-9]+$/; 		
    		if(!reg.test(str)){
    			tip({
					content: '车架号码不能输入全角字符'
				})
				return;
    		}

            var _data = $("#carFormInfo").values();
            _data['projectId'] = args['projectId'];
            comn.ajax({
                url : interUrl.documentManagement.saveCar,
                data : _data,
                success : function(res){
                    tip({
                        content: "保存成功！！"
                    });
                    carFn();
                }
            });
        }
	});

$("#btn-save-budget").click(function(){
	$("#approvalBudgetInfoForm").validate();
	if($("#approvalBudgetInfoForm").valid() == true) {
		comn.ajax({
			url: interUrl.myTask.saveBudgetInfo,
			data: $.extend($("#approvalBudgetInfoForm").values1(), {
				loanApplyId: args['loanApplyId'],
				projectId: args['projectId']
			}),
			success: function (res) {
				if(permitModify){
					$("#reCount").trigger("click"); 
				}
				tip({content: res.message || "保存成功!"});
				comn.ajax({
					url: interUrl.myTask.approvalAsserts,
					data: {loanApplyId:args['loanApplyId']},
					success: function (res) {
						$("#approvalGuarantorForm").values(res.data);
					}
				});
			}
		});
	}
})

// 合同信息
/*comn.ajax({
	url: interUrl.documentManagement.getLoanContractInfo,
	data: { projectId: args['projectId'] },
	success: function(res) {
		if(!args['customerId']){
			args['customerId'] = res.data.customerId; 
		}
		return $("#contractInfo").values(res.data);
	}
});*/

// 汽车信息
carFn = function(){
	comn.ajax({
		url: interUrl.creditManagement.licenseGet,
		data: {
			projectId: args['projectId']
		},
		success: function(res) {
			if(res.data){
                //如果是车主贷分期则发票日期和发票号码不必填
                if(res.data.loanType === "5"){
                    $(".carOwnerLoan").removeClass("required")
                }
				if(res.data.carFrameNo && res.data.carFrameNo != "" && res.data.carType == 1){
					//$(".vinWarn").removeClass("hide");
					changeToken = res.data.carFrameNo;
				}
				if(res.data.newPrice){
					$(".vinWarn").removeClass("hide");
					$("#frameOnce").val('clicked');
				}
			}
			return $("#carFormInfo").values(res.data);
		}
	});
};
// 贷款基本信息
comn.ajax({
	url: interUrl.documentManagement.deliverGetApprovalProjectInfo,
	data: {
		projectId: args['projectId']
	},
	success: function(res) {
		$("#vinPrice").val(res.data.billingPrice);
		$(".carType").val(res.data.carType);
		if (res.data.loanType && res.data.loanType == "7"){
			$(".isLoanType").removeClass("hide");
		}
		if((args['releventFlowNode']=="COPY_CONTRACT" || args['releventFlowNode']=="DOCUMENT_VERIFY")&&res.data.carType=="1"){
			$(".newCarSearch").removeClass("hide");
		}
		if(res.data.carType=="2"){
			$("#frameOnce").val('clicked');
			$("#isSecondCarShow").removeClass("hide"); //针对二手车显示使用年限（月）
		}
		permitModify = res.data.permitModify;
		$("#contractInfo").values(res.data);
		if(res.data.permitModify){
		  $("#reCount").closest("fieldset").removeAttr("disabled"); 
		}
		$("#loanApplyInfo").values(res.data);

		var benchmarkRate = res.data.benchmarkRate || 0; 
		if(benchmarkRate!=0){
			var guaranteeServiceFee = res.data.guaranteeServiceFee || 0;
			var fee = (parseFloat(guaranteeServiceFee)*parseFloat(benchmarkRate)/100).toFixed(2);
			$("#bankInstallmentProxyFee").val(fee); //计算分期付款手续费(委托书)
			
			var loanAmount = res.data.loanAmount || 0;
			var fee = (parseFloat(loanAmount)*parseFloat(benchmarkRate)/100).toFixed(2);
			$("#bankInstallmentContractFee").val(fee); //计算分期付款手续费(还款合同)
		}
	}
});

//获取客户信息
getBaseInfo();

// 加载关系人
$("select[name='relationship']").getExpressCompanyCode("RelationShipType");
//基本信息-紧急联系人
table_contacter = function (params) {
	var p=params.data;
	return comn.ajax({
		url: interUrl.documentManagement.getContacter,
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

$("#table_contacter").bootstrapTable(tableConfig);

	var handle_2, tableEvent_2, handle_save = null;
	handle_2 = function (value, row, index) {
		return ["<div class='btn-group btn-group-xs'>", "<button type='button' class='btn btn-primary'>操作</button>", "<button type='button' class='btn btn-primary dropdown-toggle' data-toggle='dropdown'>", "<span class='caret'></span>", "<span class='sr-only'>下拉切换</span>", "</button>", "<ul class='dropdown-menu' role='menu'>", "<li><a class='delete'>删除</a></li>", "<li><a class='edit'>修改</a></li>", "</ul>", "</div>"].join("");
		// return "--"
	};

	tableEvent_2 = {
		"click .delete": function (e, a, item, index) {
			comn.ajax({
				url: interUrl.myTask.deliverDeleteLoanCustomerContacter,
				data: $.extend({contacterId: a},loanApplyId),
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
				if($("#contacterForm").valid() == true){
					comn.ajax({
						url: interUrl.myTask.deliverModifyLoanCustomerContacter,
						data: $.extend($("#contacterForm").values(),loanApplyId, {contacterId:a}),
						success: function (res) {
							$("#table_contacter").bootstrapTable('refresh');
							$("#contacter_modal").modal("hide");
							fnCall();

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
				url: interUrl.myTask.loanInsideSaveLoanCustomerContacter,
				data: $.extend($("#contacterForm").values(), loanApplyId),
				success: function (res) {
					$("#table_contacter").bootstrapTable('refresh');
					$("#contacter_modal").modal("hide");
					fnCall();
				}
			});
		}
	}
});

$("#btn-contacter-save").click(function () {
	handle_save();
});

// 文档清单
comn.ajax({
    url: interUrl.documentManagement.deliverGet,
    data: {
      id: args['businessId']
    },
    success: function(res) {
      	var k, o;
      	return $("#documentDetailList tbody").html((function() {
        var i, len, ref, results;
        ref = res.data.list;
        results = [];
        for (k = i = 0, len = ref.length; i < len; k = ++i) {
          o = ref[k];
          results.push(["<tr>", "<td>" + k + "</td>", "<td>" + o.documentName + "</td>", "<td>" + o.originalCount + "</td>", "<td>" + o.duplicateCount + "</td>", "</tr>"].join(""));
        }
        return results;
      })());
    }
});

// 汽车金融部
comn.ajax({
	url : interUrl.documentManagement.documentOpinionLast,
	data : {
		boId : args['loanApplyId'],
		businessType : 'LOAN_APPLY_FLOW',
		nodeKey : 'LOAN_FINANCE_EXECUTIVE'
	},
	success : function(res){
		if(res.data.conclusion == "0"){
			$("#carConclusion2").attr("checked",true);
		}else if(res.data.conclusion == "1"){
			$("#carConclusion1").attr("checked",true);
		}
		if(res.data.isGpsInstalled1 == "1"){
			$("#isGpsInstalled1").attr("checked",true);
		}else if(res.data.isGpsInstalled1 == "2"){
			$("#isGpsInstalled2").attr("checked",true);
		}
		$("textarea[name='carOpinion']").val(res.data.opinion);
	}
});
carFn();
	
$(document).on("click", "#isDocument", function(){
    $("#isWZBank").val("");
})

// 取消
$("#btnCancel").click(function(){
	comn.closeTab();
});
//提交
$("#sub").click(function() {
	if($("#basic").find("form#opinionFormSub").valid()){
		oppSureModal("是否确认提交");
		$("#sureOption").unbind("click").click(function () {
            if (args["currentNodeKey"] === "DOCUMENT_REVIEW" && $("#isWZBank").val() === "1") {
                return tip({content: "请先复核线上发送给银行的影像文件，谢谢！"})
            }
            if (args["currentNodeKey"] === "DOCUMENT_REVIEW" && $("#isClick").val() === "wzBank"){
                isApprove();
            }
            if ($("#isSave").val() === "firstSaveReview" && args["currentNodeKey"] === "DOCUMENT_REVIEW" && $("#isClick").val() === "wzBank") {
                return tip({content: "请先保存待复核内容项，再进行提交，谢谢！"})
            }
            if (($("#isCheck0").val() === "hasZeroCheck" || $("#isCheckNo").val() === "hasCheckNo") && args["currentNodeKey"] === "DOCUMENT_REVIEW"  && $("#isClick").val() === "wzBank") {
                return tip({content: "待复核内容项必须都选择【有】并且需核对的内容必须都核对无误全部勾选后才能提交下一步，请确认！"})
            }
						if(args['currentNodeKey'] === 'COPY_CONTRACT'){
							if($("#frameOnce").val() !== 'clicked'){
								return tip({content:'请先通过车架号查询新车优惠价'})
							}
						}
						if(args['releventFlowNode']=='COPY_CONTRACT' || args['releventFlowNode'] == 'DOCUMENT_VERIFY'){
							if($('input[name=newPrice]').val() && $('select[name=carType]').val() == 1){
								if($('input[name=carFrameNo]').val() != changeToken){
									return tip({
										content: '请先点击【查询新车优惠价】根据车架号查询外部接口返回的车辆价格!'
									})
								}
							}
						}
			comn.ajax({
				url: interUrl.common.opinion,
				data: $.extend($("#opinionFormSub").values(), {
					bopInfoId: args['bopInfoId']
				}),
				success: function (res) {
					$("#sureModal").modal("hide");
					comn.ajax({
						url: interUrl.documentManagement.preSubmit,
						data: {deliverId: args['businessId']},
						success: function (res0) {
							var nextNodeUserName=res0.data.userTasks[0].userName;
							var nextNodeUserId=res0.data.userTasks[0].userId;
							var nodeCode={nodeCode:res0.data.nextFlowNodeCode};
							var p3={nextNodeUserName:nextNodeUserName,nextNodeUserId:nextNodeUserId};
							if (res0.data.userTasks.length == 0) {
								$("#userDialogBlank").modal("show");
							}else if(res0.data.userTasks.length>1){
								table_sign = function (params) {
									var p=params.data;
									params.success({'total':res0.data.userTasks.length, rows: res0.data.userTasks});
									params.complete();
								};
								tableEvent_sign = {
									"click .role": function (e, a, item, index) {
										p2 = {nextNodeUserName: item.userName, nextNodeUserId: a}
									}
								};

								handle_sign = function (value, row, index) {
									return ["<input type='radio' name='userId' class='role' value='" + value + "'/>"].join("");
								};
								$("#nextNode").html(res0.data.nextFlowNodeName);
								$("#table_sign").bootstrapTable();
								$("#table_sign").bootstrapTable('load', res0.data.userTasks);
								$("#signModal").modal("show");
								setTimeout("$('#table_sign').find('tr').eq(1).find('[name=\"userId\"]').prop('checked','checked')",500);
								p2=p3;
								$("#select-sign-btn").unbind("click").click(function(){
									comn.ajax({
										url: interUrl.documentManagement.submit2next,
										data: $.extend({deliverId: args['businessId']},p2),
										success: function (res2) {
											$("#signModal").modal("hide");
											tip({content:res2.message});
											comn.closeTab();
										}
									})
								})
							}else{
								comn.ajax({
									url: interUrl.documentManagement.submit2next,
									data: $.extend({deliverId: args['businessId']},p3),
									success: function (res4) {
										tip({content:res4.message});
										comn.closeTab();
									}
								})
							}
						}
					})
				}
			});
		})
	}
});


//退回上一步
$("#btnBack").click(function(){
	if($("#opinionFormSub").valid()){
		oppSureModal("是否确认退回");
		$("#sureOption").unbind("click").click(function () {
            if ($("#isSave").val() === "firstSaveReview" && args["currentNodeKey"] === "DOCUMENT_REVIEW" && $("#isClick").val() === "wzBank") {
                return tip({content: "请先保存待复核内容项，再进行提交，谢谢！"})
            }
			//保存流程意见
			comn.ajax({
				url: interUrl.common.opinion,
				data: $.extend($("#opinionFormSub").values(), {
					bopInfoId: args['bopInfoId'] 
				}),
				success: function (res) {
					$("#sureModal").modal("hide");
					comn.ajax({
						url: interUrl.documentManagement.back2pre,
						data: {
							deliverId: args['businessId']
						},
						success: function (res) {
							tip({content: res.message});
							comn.closeTab();
						}
					});
				}
			});

		});
	}
});

//判断显示提交还是退回
$("input[name='conclusion']").on('click',function(){
  var checkedV=$("input[name='conclusion']:checked").val();
  if(checkedV==1){
    $("#sub").show();
    $("#btnBack").hide();
  }else{
    $("#sub").hide();
    $("#btnBack").show();
  }
});

//基本信息-借款人信息和配偶信息
function getBaseInfo(){
	comn.ajax({
		url: interUrl.documentManagement.getDataAuditing,
		data: {
			projectId : args["projectId"]
		},
		success: function (res) {

			//如果有配偶没征信显示提示，改未婚
			if(res.data.spouseNoCreditNotice) {
				$('#spouseNoCreditTipTxt').text(res.data.spouseNoCreditNotice);
				$('#spouseNoCreditTip').removeClass('hide');
			}

			$("#professionCode").getOccupationList(res.data.professionCode);
			$("#post").getJobList(res.data.post);
			$("#workNatureCode").getUnitList(res.data.workNatureCode);
			if(!res.data.cardOrExpiryDate){ $("input[name='cardExpiryDate']").addClass("required"); }
			if(res.data.jointObligorId && res.data.jointObligor){
				if(args['businessTypeCode'] != "DOCUMENT_TRANSMIT_FLOW"){ //在文档传递流程里没有"将共同还款人设为主贷人"按钮 
					$("#setLoanUser").removeClass("hide").click(function(){ //设置主贷反转按钮(显示) 
						comn.ajax({
							url: interUrl.myTask.reverseSpouseInfo,
							data: {loanApplyId: args['loanApplyId']},
							success: function(res){
								console.log(res);
							}
						})

					});
				
				}
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
				_maritalStatus = true;
				if (res.data.spouseCardType == 1) {
					$("#spouseCardNo").addClass("idCard");
				} else {
					$("#spouseCardNo").removeClass("idCard");
				}
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
				//$("#province_3").getProvince(res.data.spouseCompanyAddressPid)
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
				//	c.show().find("label").html(a+"月还款:");
				//}else if(housingStatus==3){
				//	c.show().find("label").html(a+"月租:");
				//}else if(housingStatus==4){
				//	c.show().find("label").html(a+"说明:");
				//}else if(housingStatus==1){
				//	c.hide();
				//}
				if (housingStatus == 5) {
					c.show().find("label").html(a + "租金:");
				} else if (housingStatus == 6) {
					c.show().find("label").html(a + "说明:");
				} else {
					c.hide();
				}
			}
			// $("#province_1").getProvince(res.data.homeAddressPid)
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
			//$("#province_2").getProvince(res.data.companyAddressPid)
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
			$("#approvalBaseInfoForm").values(res.data);
            $("#filePath").html(res.data.filePath ? "<img src='"+ res.data.filePath +"' height=85 />" : "");
            $("#faceUrl").html(res.data.faceUrl ? "<img src='"+ res.data.faceUrl +"' height=85 />" : "");
			$("#getPos").data("pos", res.data.visitAddressLongitude + "," + res.data.visitAddressLatitude);
			if($("#realCarOwner").val()==null||$("#realCarOwner").val()==""){
				$("#realCarOwner").val($("#customerName").val());
			}
		}
	});
}

$("#btn_saveCustomerInfo").click(function() {
	if($("#approvalBaseInfoForm").valid()){
		var id = $("#idCustomer").val();
		comn.ajax({
			url: interUrl.documentManagement.saveCustomerInfo,
			data: $.extend($("#approvalBaseInfoForm").values(), {
				id: id,
				projectId : args["projectId"],
				customerId: args["customerId"]
			}),
			success: function (res) {
				$("#idCustomer").val(res.data)
				tip({content: "保存成功"});
			}
		});
	}
})
$(document).on("change", "#maritalStatus", function() {
	if ($(this).val() == "1") {
		$("#spousePanel").show();
		if (_maritalStatus ==  false) {
			$("#province_3").getProvince().change(function() {
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
			})
		}
		$("#city_3").change(function() {
			if (this.value) {
				$("#city_3_name").val($(this).find('option:selected').text());
				return $("#area_3").getArea(this.value);
			}
		});
		$("#area_3").change(function(){
			$("#area_3_name").val($(this).find('option:selected').text());
		});
	} else {
		$("#spousePanel").hide();
	}
})
$(document).on("change", "select[reqiireds='cardType']", function() {
	var val = this.value;
	if (val != "1") {
		$("#spouseCardNo").removeClass("idCard").removeClass("required");
	} else {
		$("#spouseCardNo").addClass("idCard").addClass("required");
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

$(function () {
	$("input[name='cardOrExpiryDate']").change(function(){
		if(this.value == 0){
			$("input[name='cardExpiryDate']").addClass("required");
		}else{
			$("input[name='cardExpiryDate']").removeClass("required");
		}
	});

    if((args['releventFlowNode']=="COPY_CONTRACT")){
        $("#reSave").closest("fieldset").removeAttr("disabled");
    }

    $("#reSave").click(function(){
        comn.ajax({
            url: interUrl.common.saveToBankDate,
            data: {
                projectId: args['projectId'],
                toBankDate: $("input[name='signDate']").val()
            },
            success: function(res){
                tip({content:res.message || '保存成功!'})
			}
        });
	});

  $("#reCount").click(function(){
	comn.ajax({
	  url: interUrl.myTask.deGetSaveFeeInfo,
	  data: {
		projectId: args['projectId'],
        loanAmount: $("input[name='loanAmount']").val()
	  },
	  success: function(res){
		var benchmarkRate = res.data.benchmarkRate || 0;
		if(benchmarkRate!=0){
			var guaranteeServiceFee = res.data.guaranteeServiceFee || 0;
			var fee = (parseFloat(guaranteeServiceFee)*parseFloat(benchmarkRate)/100).toFixed(2);
			$("#bankInstallmentProxyFee").val(fee); //计算分期付款手续费(委托书)
			
			var loanAmount = res.data.loanAmount || 0;
			var fee = (parseFloat(loanAmount)*parseFloat(benchmarkRate)/100).toFixed(2);
			$("#bankInstallmentContractFee").val(fee); //计算分期付款手续费(还款合同)
		}
		$("#loanApplyInfo, #contractInfo").values(res.data); 
	  } 
	}); 
  });
});



//车架号查询
//新车显示查询优惠价
if($("select[name=carType]").find("option:selected").val()==1){
	$(".newCarSearch").removeClass("hide");
}

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
	var carName=$("#vinCarType").find("option:selected").html();
	if(carName!="--请选择--"){
		$("input[name=warningCarName]").val(carName);
		var idCar=[];
		for(var i=0;i<vinCarInfoList.length;i++){
			idCar.push(vinCarInfoList[i].carId);
		};
		var num=idCar.indexOf(parseFloat(carId));
		$("input[name=newPrice]").val(vinCarInfoList[num].newPrice);

		warnLevel();
	}
	// $("input[name=carModelName]").val(carName);
	// $("input[name=carModel]").val(carId);

});
var vinCarInfoList=[];

var token='';//token值校验重复查询
var changeToken = '';//车架号更改必须重新查询
var res = /(?!^[a-zA-z]+$)(?!^[0-9]+$)[a-zA-z0-9]{17}/;
$("#frameSearch").on("click", function () {
	var carType = $("#carType").find("option:selected").html();
	var frameNumber = $("input[name=carFrameNo]").val();
	if (frameNumber == "") {
		tip({
		content: "请输入车架号"
		})
	} else {
    	//车架号码不能输入半角字符
		var str = $('input[name=carFrameNo]').val();
		var reg = /^[A-Za-z0-9]+$/; 		
		if(!reg.test(str)){
			tip({
				content: '车架号码不能输入全角字符'
			})
			return;
		}
		
		if (res.test(frameNumber)) {
			$("#frameOnce").val('clicked');
			if(token!=frameNumber){
				token=frameNumber;
				changeToken = frameNumber;
				//$('.vinWarn').addClass('hide');
				$(".trimName").addClass("hide");
				$("input[name=warningCarName]").val("");
				$("input[name=newPrice]").val("");
				$("input[name=warningResult]").val("");
				$("input[name=warningLevel]").val("");
				comn.ajax({
					url: interUrl.loanDetail.getVinInfo,
					data: {
						vin: frameNumber,
						applyId: args["loanApplyId"],
						provinceCode:$("input[name=provinceCode]").val(),
						provinceName:$("input[name=provinceName]").val(),
						cityCode:$("input[name=cityCode]").val(),
						cityName:$("input[name=cityName]").val()
					},
					success: function (res) {
						//$(".frameOnce").val(1);
						$("#frameVin").attr("disabled", "disabeld");

						// //品牌
						// $("input[name=carBrandName]").val(res.data.brandName);
						// $("input[name=carBrand]").val(res.data.brandId);
						// //车系
						// $("input[name=carMakeName]").val(res.data.modelName);
						// $("input[name=carMake]").val(res.data.modelId);

						if(res.data.vinCarInfoList.length>1){
							$(".trimName").removeClass("hide");
							// $("input[name=carModelName]").val("");
							// $("input[name=carModel]").val("");
							$("#vinCarType").html(getVinCar(res.data.vinCarInfoList));
							vinCarInfoList=res.data.vinCarInfoList;
						}else{
							$(".trimName").addClass("hide");
							//车型
							// $("input[name=carModelName]").val(res.data.vinCarInfoList[0].carName);
							// $("input[name=carModel]").val(res.data.vinCarInfoList[0].carId);
							$("input[name=warningCarName]").val(res.data.vinCarInfoList[0].carName);
							$("input[name=newPrice]").val(res.data.vinCarInfoList[0].newPrice);
						}
						$("input[name=queryUserName]").val(window.parent.userName.innerHTML);
						warnLevel();
					}

				})
			}
		}else{
			tip({
				content:"车架号必须由17位的数字加字母组成,请确认"
			})
		}

	}
});
function warnLevel(){
	$("#vinPrice").val();
	var billingPrice=$("#vinPrice").val();
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



//获取银行对接情况列表-遍历方法-新增
function getBankBackInfoList(data) {
	var html = "";
	var item = data;
	var len = data.length;
	for (i = 0; i < len; i++) {
		html += [
			"<tr>",
				"<td>"+ (item[i].serialNo || '--') +"</td>",				
				"<td>"+ (item[i].loanStatusDesc || '--')+"</td>",
				"<td>"+ (item[i].loanReason || '--') +"</td>",				
				"<td>"+ item[i].createTime +"</td>",
				"<td>"+ item[i].updateTime +"</td>",
			"</tr>"
		].join("");
	}
	$("#bankBackInfoTable tbody").append(html);	
}
//获取银行对接情况列表api
function getBankBackInfoListApi() {
  comn.ajax({
    url: interUrl.gr.getBankProjectInfoList,
    data: {
      projectId: args['projectId']
    },
    success: function(res) {
    	if(res.data) {
    		getBankBackInfoList(res.data);
    	}
    }
  });	
}

getBankBackInfoListApi();



//发票信息提示本地缓存判断
function invoiceTip() {
	if(localStorage.getItem("invoiceTip")) {
		$('#invoiceTip').addClass('hide');
	}
	$('#invoiceTip button span').on('click',function () {
		localStorage.setItem('invoiceTip', '1');
	})
}
invoiceTip();
//点击汽车信息按钮重新加载汽车信息，获取发票验证保存的信息
$('#carInfo').on('click',function(){
	carFn();	
})

//文档传递流程校验风险预警,判断是否显示不同等级的页签
if (args["releventFlow"] === "DOCUMENT_TRANSMIT_FLOW") {
    comn.ajax({
        url: interUrl.common.getRiskRule,
        data:{
            loanApplyId : args["loanApplyId"],
            currentNodeKey: args["currentNodeKey"]
        },
        success: function(res) {
            if (res.data) {
                $.each(res.data, function(i, v) {
                    if (v.risklevel === "红色预警") {
                        //console.log("red:"+ i);
                        $("#isShowWarning").removeClass("hide");
                        return false;
                    } else if (v.risklevel === "黄色预警") {
                        //console.log("yellow:"+ i);
                        $("#isShowWarning").css("background-position", "0 -30px").removeClass("hide");
                        return false;
                    }
                    //console.log("out:"+i);
                })
            }
        }
    })
}