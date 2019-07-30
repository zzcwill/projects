var args, base64, cureent_dir, dataLoad_1, dataLoad_2, getDocumentList, getSelectImage, handle_1, handle_2, loadTree, targetDir, treeObj, treeTarget, zTreeOnClick,dataLoad_4;

var pledgeStatus = function (value) { return [null, "已抵押", "未抵押"][value] || null; };
var bankPaymentStatus = function (value) { return [null, "未放款", "已放款"][value] || "未放款"; };
var policyFinishFlag = function (value) { return [null, "未保", "已保", "未保", "未保"][value] || null; };
var isRegistered = function (value) { return [null, "已上牌", "未上牌"][value] || null; };
var overloadStatus = function (value) { return [null, "已逾期", "未逾期"][value] || "未逾期"};
var settleStatus = function (value) { return [null, "已结清", "未结清"][value] || "未结清"};
args = comn.getArgs();
//只针对贷款申请-付款申请已办显示打印准入按钮
if (args["currentNodeKey"] === "LOAN_FINANCE_EXECUTIVE" && args["businessTypeCode"] === "LOAN_APPLY_FLOW") {
    $("#printInformBtn").removeClass("hide").unbind("click").on("click", function () {
        window.open("../../../Modal/task/myTask/printInform.html?loanApplyId=" + args['loanApplyId']);
    });
}

//客户资料，反担保信息，征信信息，影像管理，预算单，过程信息   我的任务-已办,贷款流程查看详情只显示所列出的tab
if(args['type']=='taskDoneLoan'){
      $("#tab1,#tab4,#tab6,#tab7,#tab9,#tab11").hide();
      $("#allInfo").removeClass("active");
      $("#tab2,#info").addClass("active");
}

//车信贷-客户基本信息-显示银行信息
//贷款产品类型 carloanType
function showBankInfo(carloanType) {
  //合作机构反馈列表
  function loanTrustMessageList() {
    comn.ajax({
        url: interUrl.carCreditLoan.loanTrustMessageList,
        data: {
          businessObjectId : args['loanApplyId'],
          channelType: 1
        },
        success: function (res) {
            var html = "";
            var item = res.data;
            var len = item.length;
            for (i = 0; i < len; i++) {
                html = html + [
                  "<tr>",
                    "<td>" + item[i].operateTypeName + "</td>",
                    "<td>" + item[i].statusStr + "</td>",
                    "<td>" + item[i].result + "</td>",
                    "<td>" + item[i].sendTime + "</td>",
                    "<td>" + item[i].modifyTime + "</td>",
                  "</tr>"
                ].join("");
            }        

            $("#table_institutions tbody").append(html);
        }
    });
  }  

  //如果是车信贷
  if(carloanType === 8){
    //显示换卡信息
    $('#carCreditLoanUser').removeClass('hide');
    //显示合作机构反馈和调合作机构列表数据
    $('#table_institutions_box').removeClass('hide');
    loanTrustMessageList();
    //合作银行改合作机构，去掉滴滴业务，去掉银行利差
    $('#showLoanBank').html('合作机构：');
    $('#showLoanDidi').addClass('hide');
    $('#bankIrsFee').parent().parent().addClass('hide');

    //去掉提车方式，付款等级，结算方式
    $('#deliveryMethod').addClass('hide');
    $('#paymentLevel').addClass('hide');
    $('#settleMethod').addClass('hide');

    $('#contractForm').addClass('hide');
    $('#contractText').addClass('hide');

    //贷中信息隐藏银行放款信息和还款卡信息
    $('#bankLendingInformation').addClass('hide');
    $('#repaymentCardInformation').addClass('hide');
  }
}
//如果是微车贷
function showWeiBankInfo(carloanType) {
    if(carloanType == 9){
        // 贷款信息总览-显示贷款额详情
        $('#loanAmountDetail').removeClass('hide');
        $('.loanAmount').addClass('hide');
        $('.webank_totalLoanAmount').removeClass('hide');
        // 客户资料-子女情况/显示籍贯城市/户口类别/个人月平均收入
        $('#childrenDetail').removeClass('hide');
        $('#nativeProvince').removeClass('hide');
        $('#nativeCity').removeClass('hide');
        $('#accountCategory').removeClass('hide');
        $('#monthlyIncomeAverage').removeClass('hide');
        // 通用预算单隐藏
        $("#common_money").remove();
        // 微众合同信息
        $('#contractForm').removeClass('hide');
        $("#weiBank_contract").removeClass('hide');
        // tab页隐藏反担保信息和客户评分卡
        $('#tab8').addClass('hide')
        $('#guarantee').addClass('hide')
        $('#tabScoreCard2').addClass('hide')
        $('#scoreCard2').addClass('hide')
    }else {
        // 微众预算单移除
        $("#weiBank_money").remove();
    }
}

var actionType = function(value, row) {
	var text = "";
	switch (value) {
		case 'add':
			text = "增加"; 
			break;
		case 'modify':
			text = "修改"; 
			break;
		case 'delete':
			text = "删除"; 
			break;
	}
	return text; 
}

var objectType = function(value, row) {
	var text = "";
	switch (value) {
		case 'LOAN_APPLY':
			text = "贷款申请"; 
			break;
		case 'LOAN_PROJECT':
			text = "贷款项目"; 
			break;
		case 'LOAN_CUSTOMER':
			text = "贷款客户"; 
			break;
		case 'LOAN_CONTRACT':
			text = "贷款联系人"; 
			break;
		case 'LOAN_FEE':
			text = "贷款费用"; 
			break;
		case 'LOAN_GUARANTOR':
			text = "贷款保证人"; 
			break;
		case 'LOAN_PAYMENT':
			text = "贷款支付"; 
			break;
	}
	return text; 
}

//文档传递流程
var table_document,handle_document,tableEvent_document;
table_document = function (params) {
	tableData(
		params,
		{
			projectId: args['projectId']
		},
		interUrl.loanDetail.getLoanDocumentTransmitList
	); 
};

var getLoanModifyHistory = function(params){
	tableData(
		params,
		{
			projectId: args['projectId']
		},
		interUrl.gr.getLoanModifyHistory
	); 
}

//保单信息 api=getLoanInsuranceInfoList
var table_insurance,handle_insurance1,handle_insurance,tableEvent_insurance;
table_insurance = function (params) {
	tableData(
		params,
		{
			projectId: args['projectId']
		},
		interUrl.loanDetail.getLoanInsuranceInfoList
	); 
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

$("#print").click(function(){
    window.open("../../../Modal/task/myTask/print.html?loanApplyId="+args['id'])
});

  //借款人信息
comn.ajax({
  url: interUrl.loanDetail.getLoanCustomerInfo,
  data: {projectId:args['projectId']},
  success: function (res) {
    var housingStatus = res.data.housingStatus;
    var c = $("#mortgageRepayment");
    var a = "<span class='text-danger'>*</span>";
    //$('#loadCredit').getLoad();
    $("#getPos").data("callback",function(BMap, map){
      var pictureIcon = new BMap.Icon("./../../../images/picture_icon.png", new BMap.Size(30,30));
      function addMarker(point){
        var marker = new BMap.Marker(point, {icon: pictureIcon});
        map.addOverlay(marker);
      }
      $.each(res.data.realVisitAddressItudeList, function(i, o){
        var pointArr = o.split(",");
        addMarker(new BMap.Point(pointArr[0], pointArr[1]));
      });
    });

    if (housingStatus == 5) {
      c.show().find("label").html(a + "租金:");
    } else if (housingStatus == 6) {
      c.show().find("label").html(a + "说明:");
    } else {
      c.hide();
    }
    if(res.data.maritalStatus==1){
      $("#spousePanel").show();
    }
    $("#approvalBaseInfoForm").values(res.data);
    $("#getPos").data("pos", res.data.visitAddressItude);
      $("#filePath").html(res.data.filePath ? "<img src='"+ res.data.filePath +"' height=85 />" : "");
      $("#faceUrl").html(res.data.faceUrl ? "<img src='"+ res.data.faceUrl +"' height=85 />" : "");

      //配偶云镜大数据按钮相关判断start
      function spouseReportJudge (data) {
          console.log(data.maritalStatus)
          console.log(data.decisionStatus)
          console.log(data.spouseDecisionStatus)

          if(data.decisionStatus === 2) {
              $('#spouseSearchTip').removeClass('hide');
              var html = "<span class='glyphicon glyphicon-ok glyphicon-ok-ico'></span>云镜大数据通过";
              $('#spouseSearchTip').html(html);
          }

          if(data.decisionStatus === 3 || data.decisionStatus === 4) {
              $('#spouseSearchTip').removeClass('hide');
              var html = "<span class='glyphicon glyphicon-remove glyphicon-ok-ico'></span>云镜大数据不通过";
              $('#spouseSearchTip').html(html);
          }

          if(data.maritalStatus === 1) {
              if(data.spouseDecisionStatus === 2) {
                  $('#spouseSearchTip2').removeClass('hide');
                  var html = "<span class='glyphicon glyphicon-ok glyphicon-ok-ico'></span>云镜大数据通过";
                  $('#spouseSearchTip2').html(html);
              }

              if(data.spouseDecisionStatus === 3 || data.spouseDecisionStatus === 4) {
                  $('#spouseSearchTip2').removeClass('hide');
                  var html = "<span class='glyphicon glyphicon-ok glyphicon-ok-ico'></span>云镜大数据通过";
                  $('#spouseSearchTip2').html(html);
              }
          }
      }
      spouseReportJudge(res.data);
      //配偶云镜大数据按钮相关判断end
  }
});


table_contacter = function (params) {
	tableData(
		params,
		{
			projectId: args['projectId']
		},
		interUrl.loanDetail.getLoanCustomerContacter
	); 
};

//预算单
comn.ajax({
  url: interUrl.loanDetail.getLoanFeeInfoInfoQuery,
  data: {projectId:args['projectId']},
  success: function (res) {
      if (res.data.loanType === 7 && (res.data.isPurchaseTaxFee || res.data.isInsuranceFee || res.data.isGpsFee)) {
          $("#allLoan").removeClass("hide");
          res.data.isInsuranceFee ? $("div[for=isInsuranceFee]").removeClass("hide") : "";
          res.data.isGpsFee ? $("div[for=isGpsFee]").removeClass("hide") : "";
          res.data.isPurchaseTaxFee ? $("div[for=isPurchaseTaxFee]").removeClass("hide") : "";
      }
      if ((res.data.cannelStatus === 3) || (res.data.cannelStatus === 2 && res.data.isDealerGroup === 1)) $("#isDealerGroup").removeClass("hide");
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
    if(res.data.carType=="1" && res.data.businessTypeId=="1"){//是否贴息
      $("#isDiscount_se").show();
      if(res.data.isDiscount===1){
        $("#discountAmount_se,#isAdvanceDiscount_se").show();
      }
    }
    if(res.data.isDiscount===1){ //是贴息业务
      $(".discount_se").show();
    }
    if(res.data.viceSignerName=="" || res.data.viceSignerName==null){
      $("#viceSignerNameC").hide(); //若无副签单员则隐藏
    }
    if(res.data.carType==2){
      //如果是二手车
      $("#isSecondCar").show();
      $("#valuationFeeTip").removeClass('hide');
    }
    if(res.data.premiumType!=1){
      $("#insuranceBox").hide();
    }
    $("#approvalBudgetInfoForm").values(res.data);

    //判断是否车信贷，是车信贷显示相应东西
    showBankInfo(res.data.loanType);
    // 判断微车贷要显示的特殊东西
    showWeiBankInfo(res.data.loanType);
    //判断是否车价贷，是的话是否有权限查看云镜报告
    judgeCarMoneyLoanCanReport();
  }
});

//反担保信息-抵/质押信息
comn.ajax({
  url: interUrl.loanDetail.getLoanAssetsInfo,
  data: {projectId:args['projectId']},
  success: function (res) {
    $("#approvalGuarantorForm").values(res.data);
  }
});

//保证人信息table
table_guarantor = function (params) {
	tableData(
		params,
		{
			projectId: args['projectId']
		},
		interUrl.loanDetail.getLoanGuarantorInfo
	); 
};

$("#table_guarantor").bootstrapTable(comn.table); 
  //汽车信息
  comn.ajax({
    url: interUrl.loanDetail.getLoanCarInfoAndLicensePlateInfo,
    data: {
      projectId: args['projectId']
    },
    success: function(res) {
      $("#carForm").values(res.data); //汽车信息
        if (res.data.carType == "2") {
            $("#tab13").removeClass("hide");
        }
      //贷中管理-上牌信息
      if(res.data.isRegistered==1){ //已上牌或没有上牌信息
        $("#switch").html($("#tpl_1").html());
        if(res.data.registerTarget==2){
          $("#companyNameS,#companyCodeS").hide();
        }
      }else if(!res.data.isRegistered){
        $("#switch").html($("#tpl_1").html());
      }
      else{
        $("#switch").html($("#tpl_2").html());
      }
      $("#licenseInfo").values(res.data);

    }
  });

////通用流程意见获取
var dataLoad_opinion, lowFeeDataLoad_opinion,lowFeeDataLoad_opinion2;
dataLoad_opinion = function (params) {
	tableData(
		params,
		{
			'boId': args['projectId']
		},
		interUrl.loanDetail.flowLoan
	);
};
lowFeeDataLoad_opinion = function (params) {
    tableData(
        params,
        {
            projectId: args['projectId']
        },
        interUrl.lowFee.flow
    );
};
lowFeeDataLoad_opinion2 = function (params) {
    tableData(
        params,
        {
	        boId: args['projectId']
        },
        interUrl.lowFee.flow2
    );
};

var table_repaymentPlan,table_repaymentPlanExtra;
  //合同信息-信用卡贷款登记
  comn.ajax({
    url: interUrl.loanDetail.infoQueryGetLoanContractInfo,
    data: {
      projectId: args['projectId']
    },
    success: function(res) {
      $.getCommonMethodPort([['#contractType','SingleDoubleCardType',res.data.contractType || 1]]);
      $("#contractForm").values(res.data);
      if(res.data.contractType == 2){
        $('.extra').removeClass('hide');
        //还款计划附加费
        table_repaymentPlanExtra = function (params) {
          if (res.data.id) {
            tableData(
              params,
              {
                'contractId': res.data.id,
                creditCardType: 2
              },
              interUrl.loanDetail.getLoanContractRepayPlanList
            );
          }else{
            return params.complete();
          }
        };
        $("#extraPlan").bootstrapTable(comn.table);
      }
        //还款计划 api=getPreLoanContractRepayPlanList
        table_repaymentPlan = function (params) {
          if (res.data.id) {
			tableData(
				params,
				{
					'contractId': res.data.id,
          creditCardType: 1
				},
				interUrl.loanDetail.getLoanContractRepayPlanList
			); 
          }else{
            return params.complete();
          }
        };
      $("#table_repaymentPlan").bootstrapTable(comn.table);
    }
  });

    //合同文本
    contractTable = function (params) {
        tableData(params, {busId: args['projectId']}, interUrl.loanDetail.eContractList)
    };
    contractTable_handle = function(value, row, index){
        return row.filePath ? ["<button type='button' class='btn btn-xs btn-primary showDetail'>查看</button>"].join("") : '--';
    };
    contractTable_vent = {
        "click .showDetail": function (e, a, item, index) {
            PDFObject.embed(item.filePath, "#pdf_box");
            $("#pdf").modal('show');
        }
    };
    //修改表格统一配置参数
    var tableConfig = {};
    $.map(comn.table, function (v, k) {
        tableConfig[k] = v;
    });
    tableConfig['height'] = "300";
    tableConfig['pagination'] = false;
    $("#contractTable").bootstrapTable(tableConfig);


  //贷中管理-抵押情况 plateInfoForm  api=getPledgeInfoInfo
  comn.ajax({
    url: interUrl.loanDetail.getPledgeInfoInfo,
    data: {
      projectId: args['projectId']
    },
    success: function (res) {
      if(res.data.pledgeStatus){
        if(res.data.pledgeStatus==1){
          $("#switch2").html($("#tpl_1_1").html());
        }else{
          $("#switch2").html($("#tpl_2_2").html());
        }
        $("#plateInfoForm").values(res.data);
      }else{
        //$("#plateInfo").hide();
      }
    }
  });

  //贷中管理-银行放款信息 recordInfo api=getBankRemittanceInfo
  comn.ajax({
    url: interUrl.loanDetail.getBankRemittanceInfo,
    data: {
      projectId: args['projectId']
    },
    success: function (res) {
        $("#recordInfo").values(res.data);
    }
  });

  //贷中管理-还款卡信息 repaymentInfo  api=getRepaymentCardInfo
  comn.ajax({
    url: interUrl.loanDetail.getRepaymentCardInfo,
    data: {
      projectId: args['projectId']
    },
    success: function (res) {
      if(res.data.deliverType){
        if(res.data.deliverType==1){
          $("#switch3").html($("#tpl_3_1").html());
        }else if(res.data.deliverType==2){
          $("#switch3").html($("#tpl_3_2").html());
        }else if(res.data.deliverType==3){
          $("#switch3").html($("#tpl_3_3").html());
        }
      }
      $("#repaymentInfo").values(res.data);
    }
  });

setStep = function(data, $el) {
var item, setArr;

setArr = (function() {
  var i, len, results;
  results = [];
  for (i = 0, len = data.length; i < len; i++) {
	item = data[i];
	results.push({
	  title: item.nodeName,
	  isSubmitted: item.isSubmitted,
	  content: item.submitDate
	});
  }
  return results;
})();

$el.loadStep({
  size: "small",
  color: "green",
  steps: setArr
});
};

function tabChange(id) {
	$("body")[0].scrollTop = 0;
	$('.nav-tabs a[href="#'+ id +'"]').tab('show');
}

var documentDeliverFlowCurrentNodeName = function(businessTypeCode, $el){
	comn.ajax({
		url: interUrl.gr.getFlowPath,
		data: {
			projectId: args['projectId'],
			businessTypeCode: businessTypeCode
		},
		success: function(res) {
			setStep(res.data, $el);
		}
	});
};

var loanFlowCurrentNodeName = function(flowType){
	comn.ajax({
		url: interUrl.gr.getFlowPath,
		data: {
			projectId: args['projectId'],
			businessTypeCode: flowType
		},
		success: function(res) {
			loanFlowCurrentNodeName = null;
			setStep(res.data, $(".ystep1"));
		}
	}); 
};


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


$(function () {
  //loanFlag判断是否直接跳到影像管理  2是贷中管理-资料检查核对；3报表查询-发票预警-查看贷款
  if((args['loanFlag'] == '2') || (args['loanFlag'] == '3')){
	$('#tab5 a[href="#detail"]').tab('show'); 
  }
  if(args['loanApplyId']){ $("#btn-print-budget").removeClass("hide"); }

  //总揽信息 
  comn.ajax({
    url: interUrl.gr.getLoanInfoOverview,
    data: {
      projectId: args['projectId']
    },
    success: function(res) {
      if (res.data.loanType == 2) {
        $(".flow-img").removeClass("hide");
      }
	  if(res.data.maritalStatus == 1){ $("#maritalStatusIsShow").removeClass("hide"); }
      $("#allInfo").nameValues(res.data,true);

	  $("a[data-name='loanFlowCurrentNodeName']").click(function(){
		  var cls = $(this).data("target");
		  if(typeof(loanFlowCurrentNodeName) == "function"){
			  loanFlowCurrentNodeName(res.data.flowType); 
		  }
		  $("." + cls).removeClass("hide").siblings().addClass("hide");
	  });
	  $(document).on('click','#loanAmountDetail',function() {
          $("#record").modal("show")
      })
    }
  });

  var businessTimes = {documents: 0, senconds: 0};
  $("a[data-name='documentDeliverFlowCurrentNodeName'], a[data-name='secondCarFlowCurrentNodeName']").click(function(){
	  var cls = $(this).data("target"), dName = $(this).data("name");
	  if(dName == "documentDeliverFlowCurrentNodeName"){
		  if(businessTimes.documents == 0){
			  (function(){
				  businessTimes.documents++;
				  documentDeliverFlowCurrentNodeName("DOCUMENT_TRANSMIT_FLOW", $("." + cls)); 
			  })(); 
		  }
	  }else if(dName == "secondCarFlowCurrentNodeName"){
		  if(businessTimes.senconds == 0){
			  (function(){
				  businessTimes.senconds++;
				  documentDeliverFlowCurrentNodeName("SECOND_HAND_CAR_TRANSFER_FLOW", $("." + cls)); 
			  })(); 
		  }
	  }
	  $("." + cls).removeClass("hide").siblings().addClass("hide");
  }); 

  //获取银行对接情况api
  getBankBackInfoListApi();
});

// 推送还款计划
function pushRepaymentPlan() {
	var pushButton = $(".push-repayment-plan button")
	pushButton.on('click',function () {
		comn.ajax({
			url: interUrl.loanDetail.manualPushPlan,
			data: {
				projectId: args['projectId']
			},
			success: function(res) {
				tip({
					content: res.data
				});
			}
		});
	})
}
// 判断推送还款计划按钮是否显示
function pushButtonFlag(fn) {
	var pushButton = $(".push-repayment-plan")
	comn.ajax({
		url: interUrl.loanDetail.judgeLoanPayStatus,
		data: {
			projectId: args['projectId']
		},
		success: function(res) {
			if (res.data) {
				pushButton.show()
				fn()
			}
		}
	});
}
pushButtonFlag(pushRepaymentPlan)



//判断是否车价贷-如果是，在判断有无查看云镜报告权限
function judgeCarMoneyLoanCanReport() {
  //是否有查看云镜报告权限接口
  comn.ajax({
    url: interUrl.cloudMirrorReport.cloudMirrorPower,
    data: {
    },
    success: function (res) {
      if(res.data.reportPower === 1) {
        $('.cloudMirrorReport').removeClass('hide');
      }
    }
  });
}

//要是显示云镜报告按钮-点击云镜报告-获取云镜报告内容
$(".cloudMirrorReport").on('click', function () {
  var apiNum = 0;
  var creditId = '';
  var token = '';
  var yunServerUrl = '';

  //获取云镜报告征信id
  comn.ajax({
    url: interUrl.credit.loanCreditInfo,
    data: {
      flowType: args['releventFlow'] || "",
      projectId: args["projectId"],
      loanApplyId: args["loanApplyId"]
    },
    success: function (res) {
      creditId = res.data.relavants[0].creditId;
      apiNum++
      showYunReport();
    }
  });

  //获取云镜报告token
  comn.ajax({
    url: interUrl.cloudMirrorReport.decisionTokenGet,
    data: {},
    success: function (res) {
      token = res.data;
      apiNum++
      showYunReport();
    }
  });

  //获取云镜报告相应环境地址
  comn.ajax({
    url: interUrl.common.getSystemName,
    type: "GET",
    success: function (res) {
      yunServerUrl = res.data.yunServerUrl;
      apiNum++
      showYunReport();
    }
  });


  //得到全部所需要的值再去展示云镜报告
  function showYunReport() {
    if (apiNum === 3) {
      //获取反担保人-查询云镜大数据-第三种类型的次数大于等于1时候，改变云镜报告传参
      comn.ajax({
        url: interUrl.cloudMirrorReport.decisionengineLoanQueryTimes,
        data: { loanApplyId: args['loanApplyId'] },
        success: function (res) {
          var value = res.data.userdTimes > 0 ? args["projectId"] : creditId;
          var url = yunServerUrl + '/secondReport.html?token=' + token + '&bizType=1&orderNo=' + value + '&bizType2=2&orderNo2=' + args["projectId"] + '&isMenu=2';

          //获取云镜报告高度
          var orders = [
            {
              "bizType": 1,
              "orderNo": value,
            },
            {
              "bizType": 2,
              "orderNo": args["projectId"],
            }            
          ];
          orders = JSON.stringify(orders);
          comn.ajax({
            url: interUrl.cloudMirrorReport.decisionengineQueryInfo,
            data: {
              orders: orders,
            },
            success: function (res2) {
              if (res2.data === '0') {
                setTimeout(function () {
                  comn.ajax({
                    url: interUrl.cloudMirrorReport.decisionengineQueryInfo,
                    data: {
                      orders: orders
                    },
                    success: function (res3) {
                      if (res3.data !== '0') {
                        $('#contentIframe').css('height', res3.data + 'px');
                      }
                    }
                  });
                }, 8000);
              } else {
                $('#contentIframe').css('height', res2.data + 'px');
              }

              $('#contentIframe').attr('src', url);
            }
          });
        }
      });
    }
  }
});