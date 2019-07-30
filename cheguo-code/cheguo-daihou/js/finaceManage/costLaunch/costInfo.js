var args,handle_1,dataLoad_1,tableEvent_1,handle_2,dataLoad_2,tableEvent_2,dataLoad_3,handle_3,handle_4,dataLoad_4,tableEvent_4,dataLoad_5,table_pay,tableEvent_pay,handle_pay, argsBopInfoId;
args = comn.getArgs(); //getArgs
argsBopInfoId = {bopInfoId: args['bopInfoId']};
//已保存状态下，撤销按钮一直都在
if (args["releventFlowNode"]) {
	$("#undo").removeClass("hide");
}

if (args["releventFlowNode"] == "FEE_APPLY_GROUP_RISK_APPROVAL") {
	$("#btn-close-loan").remove();
}

if (args["typeOption"] == "none") {
	$("#opinionForm").hide();
	$("#costInfoEd").removeClass("hide");
}

dataLoad_1 = function(params) {
	tableData(params,$("#searchForm_1").values(), interUrl.feeManage.collectionList);
};

tableEvent_1 = {
	"click .choose": function(e, a, item, index) {
		//点击选择触发事件
		delete item['id'];
		$("#costForm").values(item);
		$("#loanChoice").modal("hide");
		$("#costForm [name='managerName']").val(item.launchUserName);
		$("#costForm [name='applyAmount']").val(item.overdueTotalAmount);
		$("#costForm [name='orgName']").val(item.launchOrgName);
		$('#accountNameChoice').removeAttr('disabled');
		$("#mobilePhone").val(item.mobilePhone);
		$("#cardNo").val(item.cardNo);
		$("#getFinace").removeAttr('disabled').off('click').click(function(){
	    comn.addTab({
			title:"贷款详情",
			href: "./Modal/customManage/customer/loanDetail.html?loanApplyId="+ item.projectId+"&customerId="+item.customerId +"&projectId="+ item.projectId +"&space=LOAN&releventFlowNode=LOAN_QUERY&releventFlow=LOAN_QUERY"
			});
	  });
	}
};

handle_1 = function(value, row, index) {
	return ["<a class='choose' href='javascript:;'>选择</a>"].join("");
};

dataLoad_2 = function(params) {
	tableData(params,$("#searchForm_2").values(), interUrl.postLoan.lawsuitList);
};

tableEvent_2 = {
	"click .choose": function(e, a, item, index) {
		//点击选择触发事件
		$("#costForm [name='bussinessId']").val(item.id);
		$("#costForm [name='projectId']").val(item.projectId);
		$("#costForm [name='customerId']").val(item.customerId);
		$("#costForm [name='lawsuitNum']").val(item.lawsuitNum);
		$("#costForm [name='projectNo']").val(item.projectNo);
		$("#costForm [name='customerName']").val(item.customerName);
		$("#costForm [name='managerName']").val(item.managerName);
		$("#costForm [name='orgName']").val(item.orgName);
		$("#costForm [name='launchUserName']").val(item.userName);
		$("#costForm [name='lawsuitStatus']").val(item.lawsuitStatus);
		$("#costForm [name='lawsuitStatusName']").val(lawsuitStatus(item.lawsuitStatus));
		$("#caseChoice").modal("hide");
		$("#costForm [name='applyAmount']").val(item.targetAmount);
		$("#mobilePhone").val(item.customerMobile);
		$("#cardNo").val(item.cardNo);
		$("#getFinace").removeAttr('disabled').off('click').click(function(){
	    comn.addTab({
			title:"贷款详情",
			href: "./Modal/customManage/customer/loanDetail.html?loanApplyId="+ item.projectId+"&customerId="+item.customerId +"&projectId="+ item.projectId +"&space=LOAN&releventFlowNode=LOAN_QUERY&releventFlow=LOAN_QUERY"
		});
	});
	}
};

handle_2 = function(value, row, index) {

	return ["<a class='choose' href='javascript:;'>选择</a>"].join("");
};

dataLoad_4 = function(params) {
	tableData(params,$("#searchForm_4").values(), interUrl.trailer.getList);
};

tableEvent_4 = {
	"click .choose": function(e, a, item, index) {
		//点击选择触发事件
		$("#costForm [name='bussinessId']").val(item.id);
		$("#costForm [name='projectId']").val(item.projectId);
		$("#costForm [name='customerId']").val(item.customerId);
		$("#costForm [name='dragCarNum']").val(item.dragCarNum);
		$("#costForm [name='launchUserName']").val(item.launchUserName);
		$("#costForm [name='projectNo']").val(item.projectNo);
		$("#costForm [name='customerName']").val(item.customerName);
		$("#costForm [name='managerName']").val(item.managerName);
		$("#costForm [name='orgName']").val(item.orgName);
		$("#trailerChoice").modal("hide");
		$("#costForm [name='applyAmount']").val(item.dragFee);
		$("#mobilePhone").val(item.mobile);
		$("#cardNo").val(item.cardNo);
		$("#getFinace").removeAttr('disabled').off('click').click(function(){
	    comn.addTab({
			title:"贷款详情",
			href: "./Modal/customManage/customer/loanDetail.html?loanApplyId="+ item.projectId +"&customerId="+item.customerId+"&projectId="+ item.projectId +"&space=LOAN&releventFlowNode=LOAN_QUERY&releventFlow=LOAN_QUERY"
			});
	  });
	}
};

handle_4 = function(value, row, index) {
	return ["<a class='choose' href='javascript:;'>选择</a>"].join("");
};

dataLoad_5 = function(params){
	tableData(params, {roleCode: "R01"}, interUrl.gr.userList);
};

table_pay = function(params) {
	//当前登录用户所在机构的收款人
	tableData(params, {orgId: comn.user.companyId}, interUrl.feeManage.guaranteeAccountList);
};
tableEvent_pay = {
  "click .pay": function(e, a, item, index) {
    $("[name='accountName']").val(item.accountName);
    $("[name='accountNo']").val(item.cardNumber);
    $("[name='bankName']").val(item.subBankName);
    $("#payeeChoice").modal("hide");
  }
};
handle_pay = function(value, row, index) { return ["<a class='pay' href='javascript:;'>选择</a>"].join(""); };
function today(){
	var date, y, m, d,today;
	date=new Date();
	y=date.getFullYear();
	m=date.getMonth()<9 ? "0"+(date.getMonth()+1) : date.getMonth()+1;
	d=date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
	return today = y+"-"+m+"-"+d;
}
function nodeN(approveAmount, applyAmount, paymentAmount, actualDate) {
	//var actualDate = actualDate ? actualDate : today();
	var actualDate = actualDate ? actualDate : '';
	var html = [
		'<div class="input-tip">',
		'<label class="col-xs-3 col-sm-3 col-md-3 control-label"><span class="text-danger">*&nbsp;</span>费用发生日期：</label>',
		'<div class="col-xs-5 col-sm-5 col-md-5">',
		'<input type="text" name="actualDate" value='+ actualDate  +' placeholder="请输入费用发生日期" class="form-control date required"/>',
		'</div>',
		'</div>',
		'<div class="input-tip">',
		'<label class="col-xs-3 col-sm-3 col-md-3 control-label"><span class="text-danger">*&nbsp;</span>审批金额：</label>',
		'<div class="col-xs-5 col-sm-5 col-md-5">',
			'<input type="text" name="approveAmount" value='+ (approveAmount || applyAmount) +' placeholder="请输入审批金额" class="form-control number required" aria-required="true"/>',
		'</div>',
		'</div>'].join("");

	if(args['releventFlowNode'] == "FEE_APPLY_GROUP_RISK_APPROVAL" || args['releventFlowNode'] == "FEE_APPLY_BRANCH_MANAGER_APPROVAL" || args['releventFlowNode'] == "FEE_APPLY_PROVINCE_RISK_APPROVAL"){
		$(".isActualDate").hide();
		$("#costForm").find(".adLine").append(html);
	}

	if(args['releventFlowNode'] == "PAYMENT"){
		$(".isActualDate").hide();
		var html2 = [
			'<div class="input-tip">',
			'<label class="col-xs-3 col-sm-3 col-md-3 control-label"><span class="text-danger">*&nbsp;</span>付款金额：</label>',
			'<div class="col-xs-5 col-sm-5 col-md-5">',
				'<input type="text" name="paymentAmount" value='+ (paymentAmount || approveAmount) +' placeholder="请输入付款金额" class="form-control number required" aria-required="true"/>',
			'</div>',
		'</div>'].join("");

		$("#costForm").find(".adLine").append(html + html2);
	}

}

$(function(){
  if (args["businessTypeCode"] === "FEE_APPLY_FLOW") {
    //页面加载获取opinion内容
    $("#opinionText").getOpinion_s(argsBopInfoId);
  }
	//判断显示提交还是退回
	$("input[name='conclusion']").on('click', function () {
	    var checkedV = $("input[name='conclusion']:checked").val();
	    if (checkedV == 1) {
	      	$("#btn-opinion-save").show();
	      	$("#btn-loanReview-back").hide();
	      	$('#btn-close-loan').addClass('hide');
	    } else {
	      	$("#btn-opinion-save").hide();
	      	$("#btn-loanReview-back").show();
	      //最后一个节点隐藏闭关费用申请按钮
			if (args["releventFlowNode"] == "PAYMENT") {
				$("#btn-close-loan").addClass("hide");
			} else {
				$('#btn-close-loan').removeClass('hide');
			}
	    }
	});

	//返回上一步
	$("#btn-loanReview-back").click(function () {
	    oppSureModal("是否确认退回");
	    $("#sureOption").unbind("click").click(function () {
	        //提交时先保存流程意见
	        comn.ajax({
	            url: interUrl.common.opinion,
	            data: $.extend($("#opinionForm").values(), {bopInfoId: args['bopInfoId']}),
	            success: function (res) {
	                $("#sureModal").modal("hide");
					flowBack2fee();
	            }
	        });
	    })
	});

	//流程退回
	function flowBack2fee(){
		console.log(interUrl.feeManage.recycleBack2pre);
		comn.ajax({
			url: interUrl.feeManage.applyBack2pre,
			data: {feeApplyId: args['feeId']},
			success: function (res1) {
				tip({content: res1.message});
				comn.closeTab();
			}
		});
	}

	$("#payeeChoice").on("shown.bs.modal", function(){
		$('#table_pay').bootstrapTable(comn.table);
	});

	$("#loanChoice").on("shown.bs.modal", function(){
		$('#table_1').bootstrapTable(comn.table);
	});

	$("#caseChoice").on("shown.bs.modal", function(){
		$('#table_2').bootstrapTable(comn.table);
	});

	$("[name='coBankId'],[name='bankId']").bank_Get();

	$('#btn-search_1').off('click').click(function(){
		$("#table_1").bootstrapTable('refresh', {url: "..."});
	});
	$('#btn-search_2').off('click').click(function(){
		$("#table_2").bootstrapTable('refresh', {url: "..."});
	});
	$('#btn-search_4').off('click').click(function(){
		$("#table_4").bootstrapTable('refresh', {url: "..."});
	});

	var flowTitle = "";
	switch (args['releventFlowNode']) {
		case 'PAYMENT': flowTitle = "费用付款";
			break;
		case 'FEE_APPLY_GROUP_RISK_APPROVAL': flowTitle = "集团风险总监审批";
			break;
		case 'FEE_APPLY_BRANCH_MANAGER_APPROVAL': flowTitle = "分公司经理审批";
			break;
		case 'FEE_APPLY_PROVINCE_RISK_APPROVAL': flowTitle = "风险部经理审批";
			break;
		case 'LAUNCH_FEE_APPLY': flowTitle = "费用申请发起";
			break;
		default : flowTitle = "发起费用申请";
			break;
	}
	$("#flowTitle").text(flowTitle);
	//根据url的type区分页面类型，show为查看，approve为提交，edit为编辑,  无为新申请
	if(args['type']){
		comn.ajax({
		  url: interUrl.feeManage.get,
		  data: {feeId:args['feeId']},
		  success: function (res) {
			var o = res.data;

			args['loanApplyId'] = o.id;
			args['businessTypeCode'] = o.businessType;

		  	$("#switch_1").html($("#tpl_" + o.feeCategoryCode).html() || "");

		  	$('#feeCategoryCode').getFeeCategoryCode(o.feeCategoryCode, (args['type'] == "show" ? "" : "feeApply" ));

			$('#feeCode').getFeeCode(o.feeCategoryId, o.feeCode);
			if(o.lawsuitStatus){
				$("#costForm [name='lawsuitStatusName']").val(lawsuitStatus(o.lawsuitStatus));
			}
		    $("#costForm").values(o);
		    $('#getFinace').removeAttr('disabled').off('click').click(function(){
		      comn.addTab({
		        title:"贷款详情",
		        href: "./Modal/customManage/customer/loanDetail.html?loanApplyId="+ o.projectId+"&customerId="+o.customerId +"&projectId="+ o.projectId +"&space=LOAN&releventFlowNode=LOAN_QUERY&releventFlow=LOAN_QUERY"
		      });
		    });
			nodeN(o.approveAmount, o.applyAmount, o.paymentAmount, o.actualDate);  //不同节点显示不一样
			if(args['flowEnd'] || args['status']){
				$("#flowTitle").text('查看费用详情');
				$('#costForm input[name=approveAmount],#costForm input[name=paymentAmount]').attr('readonly',true);
			}
			  if (o.paymentMethod == "1") {
				  $("#isCashPaymentMethod_"+o.feeCategoryCode).hide();
				  $("input[name=accountName], input[name=accountNo], input[name=bankName]").removeClass("required");
			  }
		  }
		});
		if(args['type']=='show'){
			$('.disabledClass').attr('disabled','true');
			$('.buttonBox').hide();
		}
	}else{
		$("#switch_1").html($("#tpl_10" ).html());
		$("input[name=operator]").val(comn.user.realname);
		$('#feeCategoryCode').getFeeCategoryCode('10', "feeApply");
		$('#feeCode').getFeeCode('7');
	}
	//$("input[name=actualDate]").val() == "" ? $("input[name=actualDate]").getToday() : $("input[name=actualDate]").val(); //如果页面没值，则显示当前日期
	if(args['businessTypeCode']){ //流和中就显示出来流程意见
		$("#opinionForm").removeClass("hide");
	}
	//取消按钮
	$(document).on("click", "#cancel,#btn-cancel", function() {
//		return window.parent.toUrl({
//			url: "./Modal/customManage/cheguoCustomer/index.html"
//		});
		comn.closeTab();
	});

	$("#opinionTab").click(function(e){
		e.preventDefault();
		if(!args['businessTypeCode']){
			return tip({content: "请先保存 !"});
		}
		$("#opinion>div").getLoad();
		$(this).tab('show');
	});

	//撤销按钮
	$('#undo').click(function(){
		comn.ajax({
				url: interUrl.feeManage.applyCancel,
				data: {feeApplyId: args['feeId']||$('#id').val()},
				async: false,
				success: function(res) {
					tip({content: "撤销成功！"});
					comn.closeTab();
				}
			});
	});

	//保存按钮
	$('#btn-save').click(function(){
		if (args["feeType"] === "tip") {
			feeSubmitSave("save")
		} else {
			$('#costForm').validate();
			if ($("#costForm").valid() == true) {
				feeManageNotice("save")
			}
		}

	});
	function feeSubmitSave(status){
		$('#costForm').validate();
		if ($("#costForm").valid() == true) {
			comn.ajax({
				url : interUrl.feeManage.onlyFeeManageNotice,
				data : $('#costForm').values(),
				success : function(res) {
					var o = res.data;
					if (o.count) {
						$("#feeSureModal").modal("show");
						$("#feeTipText").html(o.notice);
						$("#settlementSureOption").unbind("click").on("click", function(){
							feeManageNotice(status);
							$("#feeSureModal").modal("hide");
						})
					} else {
						feeManageNotice(status);
					}
				}
			})
		}
	}
	function feeManageNotice(status){
		comn.ajax({
			url: interUrl.feeManage.save,
			data: $('#costForm').values(),
			async: false,
			success: function(res) {
				if (status === "save") {
					var o = res.data;
					$('#costForm').values(o);
					$("#id").val(o.id);
					args['loanApplyId'] = o.id;
					args['businessTypeCode'] = o.businessType;
					tip({content: "保存成功！"});
					if(!args['releventFlowNode'] || args['releventFlowNode']=='LAUNCH_FEE_APPLY'){
						$('#undo').removeClass('hide');
					}
				} else {
					var o = res.data;
					$("#id").val(o.id);
					args['loanApplyId'] = o.id;
					args['businessTypeCode'] = o.businessType;
					flowSubmit(interUrl.feeManage.applyPreSubmit, interUrl.feeManage.applySubmit2next, './Modal/task/myTask/index.html', {feeApplyId: res.data.id});
				}
			}
		});
	}

  $("#btn-save-money").click(function() {
	  feeManageNotice("save")
  })
	//opinionForm单独保存
  $("#saveBtn").click(function(){
      oppSureModal("是否确认保存");
      $("#sureOption").unbind("click").click(function () {
        //保存流程意见
        comn.ajax({
          url: interUrl.common.opinionOnly,
          data: $.extend($("#opinionForm").values(), {"bopInfoId": args['bopInfoId']}),
          success: function (res) {
            $("#sureModal").modal("hide");
            tip({
                  content: "保存成功！"
                });
          }
        });
      });
	});

	//提交按钮
	$('#btn-comit').click(function(){
		if (args["feeType"] === "tip") {
			feeSubmitSave("submit")
		} else {
			$('#costForm').validate();
			if ($("#costForm").valid() == true) {
				feeManageNotice("submit")
			}
		}
	});

	$("#btn-opinion-save").click(function(){
		if ($("#costForm").valid() == true) {
			comn.ajax({
				url: interUrl.feeManage.save,
				data: $('#costForm').values(),
				async: false,
				success: function(res) {

					comn.ajax({
						url: interUrl.common.opinion,
						data: $.extend($('#opinionForm').values(), {"bopInfoId": args['bopInfoId']}),
						async: false,
						success: function(res) {
							flowSubmit(interUrl.feeManage.applyPreSubmit, interUrl.feeManage.applySubmit2next, './Modal/task/myTask/index.html', {feeApplyId: args['feeId']});
						}
					});

				}
			});
		}
	});

//关闭费用申请
$('#btn-close-loan').click(function(){
  $("#opinionForm").validate();
  if($("#opinionForm").valid() == true) {
    oppSureModal("是否确认关闭费用申请！");
    $("#sureOption").unbind("click").click(function () {
      $("#sureModal").modal("hide");
      comn.ajax({
          url: interUrl.feeManage.applyClose,
          data: {feeApplyId: args['feeId']},
          success: function (res) {
              tip({content: res.message});
              comn.closeTab();
          }
      });
    });
  }
});

	//用户弹窗确认按钮
	$("#btnSure").click(function() {
    var arr;
    arr = $("#agentChoice").find("table").bootstrapTable('getSelections');
    if (arr.length < 1) {
      return tip({
        content: "请先选择一个用户再进行操作！！！"
      });
    }
    $("#costForm").values({
      	userId: arr[0].uid,
		operator: arr[0].realname
    });
    return $("#agentChoice").modal("hide");
  });

//根据费用类别区别页面
	$('#feeCategoryCode').on('change',function(){
		var val=this.value;
		var id=$(this).find("option:selected").attr('data-id');
		$("#switch_1").html($("#tpl_" + val).html() || "");
		$('#feeCode').getFeeCode(id);
		$("input[name=operator]").val(comn.user.realname);
		$("input[name=accountName], input[name=accountNo], input[name=bankName]").addClass("required");
		//$("input[name=actualDate]").val() == "" ? $("input[name=actualDate]").getToday() : $("input[name=actualDate]").val(); //如果页面没值，则显示当前日期
	});
});

$(document).on("change", "#PaymentMethod_10, #PaymentMethod_20, #PaymentMethod_30, #PaymentMethod_40", function() {
	var idName = $(this).attr("id");
	if ($(this).val() == "1") {
		$("#isCash"+idName).hide();
		$("input[name=accountName], input[name=accountNo], input[name=bankName]").removeClass("required");
	} else {
		$("#isCash"+idName).show();
		$("input[name=accountName], input[name=accountNo], input[name=bankName]").addClass("required");
	}
})
