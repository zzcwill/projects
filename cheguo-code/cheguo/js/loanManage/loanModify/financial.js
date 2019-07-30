var table_pay,tableEvent_pay,handle_pay,choosePay=null,flowType,conclusion, resCE, resQE,discountCaseId;
flowType={flowType:"LOAN_MODIFY_FLOW"}; 

//$.extend($.validator.defaults,{ignore:""});   //隐藏表单也验证

//审批信息
comn.ajax({
  url: interUrl.myTask.approvalInfo,
  data:loanApplyId,
  success: function(res) {
	if(res.data.businessTypeId == 2){
	  $("input[name='receivableAmount']").closest(".input-tip").removeClass("hide");
	  $("input[name='requiredAmount']").closest(".input-tip").addClass("hide"); 
	}
    if(res.data.carType==2){
      $("#sc-isAdvance").show();
    }
    discountCaseId=res.data.discountCaseId?res.data.discountCaseId:'';
    $("#approvalInfoForm").values(res.data);
    if(res.data.businessTypeId==2){//如果是银行直销模式,账户信息-处理方式默认选中差额,去除全额选项
      $("#branchAccount,#dealerAccount").remove();
      $("#payeeMethod_1").prop("checked",true);
      $("#payeeMethod_2").parent('label').remove();
      getPaymentInfo1(interUrl.loanChange.getLoanRefundBalance,"1",2);//获取退款信息
      $("#payeeAmount").attr("readonly",true);
    }else{
      //修改时根据付款方式选择全额或差额接口
      comn.ajax({
        url: interUrl.loanModify.getLoanRefundPayeeMethod,
        data: loanApplyId,
        success: function(res) {
          if(res.data.payeeMethod){
            var _url;
            var payeeMethod=res.data.payeeMethod;
            if(payeeMethod=="1"){
              $("#payeeMethod_1").trigger("click");
              $("#branchAccount").show();
              $("#dealerAccount").hide();
              _url=interUrl.loanChange.getLoanRefundBalance; //差额获取
            }else{
              $("#payeeMethod_2").trigger("click");
              $("#branchAccount").show();
              $("#dealerAccount").show();
              _url=interUrl.loanChange.getLoanRefundFull; //全额获取
            }
            getPaymentInfo1(_url,payeeMethod);//获取退款信息
          }
          if (res.data.canOperate && (res.data.canOperate == 2)) {
            $("#setCanOperate fieldset").prop("disabled", "disabled");
            $("#payeeMethod").attr("name", "payeeMethod").val(res.data.payeeMethod);
          }
        }
      });
    }
      //get pay lists
      if(res.data.coBankId){

        //分公司账户
        $("#payModal").on("shown.bs.modal", function() {
          table_pay = function (params) {
            var p = params.data;
            p['orgId'] = res.data.orgId;
            return comn.ajax({
              url: interUrl.myTask.guaranteeList,
              data: p,
              success: function (res) {
                params.success({
                  'total': res.totalItem,
                  rows: res.data
                });
                return params.complete();
              }
            });
          };
          //$("#payModal").bootstrapTable("load",res.data.guaranteeCompanyAccountList);
          tableEvent_pay = {
            "click .pay": function (e, a, item, index) {
              choosePay(item);
              $("#payModal").modal("hide");
            }
          };
          handle_pay = function (value, row, index) {
            return ["<a class='pay' href='javascript:;'>选择</a>"].join("");
          };
          $("#table_pay").bootstrapTable("refresh");
        })

        $("#payModal2").on("shown.bs.modal", function() {

          //车商账户
          table_pay2 = function (params) {
            var p = params.data;
            p['dealerId'] = res.data.dealerId;
            return comn.ajax({
              url: interUrl.myTask.getAccountList,
              data: $.extend($("#userInfo").values(), p,{discountCaseId:discountCaseId}),
              success: function (res) {
                params.success({
                  'total': res.totalItem,
                  rows: res.data
                });
                return params.complete();
              }
            });
          };
          tableEvent_pay2 = {
            "click .pay": function (e, a, item, index) {
              choosePay(item);
              $("#payModal2").modal("hide");
            }
          };
          handle_pay2 = function (value, row, index) {
            return ["<a class='pay' href='javascript:;'>选择</a>"].join("");
          };
          $("#table_pay2").bootstrapTable("refresh");

        })
        }
      var dataArr =[["#customerSource", "CustomerSource", res.data.customerSource],[".loanTerm", "LoanTerm", res.data.loanTerm]];
      $.getCommonMethodPort(dataArr);
      }
});


//获取修改清单
getModify();

//退款信息部分
$("input[name='payeeMethod']").on('change',function(){
  var _url;
  var checkedV = this.value; //付款方式  1=差额 2=全额
  var paymentDirection = $("input[name='paymentDirection']").val();  //支付方向  1=收款 2=付款
  var data = $.extend(loanApplyId, { payeeMethod:checkedV }); 
  function callBk(data){
	var pDirection = data.paymentDirection,
	text = (pDirection == "1" || pDirection == "0") ? "收款" : (pDirection == "2" ? "付款" : "");
	$(".paymentDirection").text(text);
	$("#paymentGetForm").values(data); 
  }
  $("#branchAccount").show();
  if(checkedV==1){
    $("#dealerAccount").hide();
	$(".paymentDirection").text(paymentDirection == 1 ? "收款" : "付款")
	if(!resCE){
		comn.ajax({
			url: interUrl.loanChange.getLoanRefundBalance, //差额获取
			data: data,	
			success: function(res){
				callBk(res.data);
				resCE = res.data;
			}
		}) 
	}else{
		callBk(resCE);
	}
  }else{
    $("#dealerAccount").show();
    $(".paymentDirection").text("收款");
	if(!resQE){
		comn.ajax({
			url: interUrl.loanChange.getLoanRefundFull, //全额获取
			data: data,	
			success: function(res){
				callBk(res.data);
				resQE = res.data;
			}
		}) 
	}else{
		callBk(resQE);
	}
  }
  //getPaymentInfo(_url,checkedV);//获取退款信息
});

//收款人信息
/*function getPaymentInfo(url,checkedV){
  comn.ajax({
    url: url,
    data: $.extend(loanApplyId,{payeeMethod:checkedV}),
    success: function(res) {
      var paymentDirection=res.data.paymentDirection;
      $("#paymentGetForm").values(res.data);
      if(paymentDirection=="1" || paymentDirection=="0"){
        $(".paymentDirection").text("收款");
      }else if(paymentDirection=="2"){
        $(".paymentDirection").text("付款");
      }
    }
  });
}*/

//收款人信息-修改
function getPaymentInfo1(url,checkedV,businessTypeId){
  comn.ajax({
    url: url,
    data: $.extend(loanApplyId,{payeeMethod:checkedV}),
    success: function(res) {
      var paymentDirection=res.data.paymentDirection;
      $("#paymentGetForm").values(res.data);
      if(paymentDirection=="1" || paymentDirection=="0"){
        $(".paymentDirection").text("收款");
      }else if(paymentDirection=="2" && (!businessTypeId || businessTypeId==1)){
        $(".paymentDirection").text("付款");
      }else if(paymentDirection=="2" && businessTypeId==2){
        $(".paymentDirection").text("退款");
      }
    }
  });
}

//保存收款信息
$("#btn-payment-save").click(function () {
  var _url,checkedV, formV = $("#paymentGetForm").values();
  var checkedV=$("input[name='payeeMethod']:checked").val();  //选择差额还是全额 1=差额  2=全额
  if(checkedV==1){
	  resCE.payeeAmount = formV.payeeAmount;
    _url=interUrl.loanChange.saveLoanRefundBalance
  }else{
	  resQE.payeeAmount = formV.payeeAmount;
    _url=interUrl.loanChange.saveLoanRefundFull
  }
  $("#paymentGetForm").validate();
  if($("#paymentGetForm").valid() == true){
    comn.ajax({
      url: _url,
      data: $.extend(formV, loanApplyId,flowType),
      success: function(res) {
        tip({content:res.message || '保存成功!'})
      }
    });
  }
});

//担保公司选择收款人
$("#accountSelect").click(function(){
  $("#payModal").modal("show");
  choosePay=function(item){
    $("[name='guaranteeCorporationAccountName']").val(item.accountName);
    $("[name='guaranteeCorporationAccountNo']").val(item.cardNumber);
    $("[name='guaranteeCorporationBank']").val(item.subBankName);
  }
});

//车商选择收款人
$("#carAccountSelect").click(function(){
  choosePay=function(item){
    $("[name='dealerAccountName']").val(item.accountName);
    $("[name='dealerAccountNo']").val(item.cardNumber);
    $("[name='dealerBank']").val(item.subBankName);
    $("#carDealerId").val(item.dealerId);
  };
  $("#payModal2").modal("show");
});


//判断显示提交还是退回
$("input[name='conclusion']").on('click',function(){
  var checkedV=$("input[name='conclusion']:checked").val();
  if(checkedV==1){
    $("#btn-opinion-save").show();
    $("#btn-loanReview-back").hide();
  }else{
    $("#btn-opinion-save").hide();
    $("#btn-loanReview-back").show();
  }
});

//流程意见保存和流程提交
$("#btn-opinion-save").click(function () {
  $("#paymentGetForm").validate();
  $("#opinionForm").validate();
    if($("#paymentGetForm").valid() == true && $("#opinionForm").valid() == true) {
      var _url,checkedV;
      var checkedV=$("input[name='payeeMethod']:checked").val();  //选择差额还是全额 1=差额  2=全额
      if(checkedV==1){
        _url=interUrl.loanChange.saveLoanRefundBalance
      }else{
        _url=interUrl.loanChange.saveLoanRefundFull
      }
      oppSureModal("是否确认提交");
      $("#sureOption").unbind("click").click(function () {
        comn.ajax({
          url: _url,
          data: $.extend($("#paymentGetForm").values(), loanApplyId, flowType),
          success: function (res) {
            $("#sureModal").modal("hide");
            //保存流程意见
            comn.ajax({
              url: interUrl.common.opinion,
              data: $.extend($("#opinionForm").values(), argsBopInfoId, {conclusion: 1}),
              success: function (res) {
                flowSubmit(interUrl.loanModify.preSubmit, interUrl.loanModify.submit2next, './Modal/task/myTask/index.html', loanApplyId);
              }
            });
          }
        });
      })
    }
});

//退回上一步
$("#btn-loanReview-back").click(function () {
  $("#opinionForm").validate();
  if($("#opinionForm").valid() == true) {
    oppSureModal("是否确认退回");
    $("#sureOption").unbind("click").click(function () {
      //保存流程意见
      comn.ajax({
        url: interUrl.common.opinion,
        data: $.extend($("#opinionForm").values(), argsBopInfoId, {conclusion: 0}),
        success: function (res) {
          $("#sureModal").modal("hide");
          flowBack2Pre();
        }
      });
    })
  }
});
//opinionForm单独保存
  $("#saveBtn").click(function(){
      oppSureModal("是否确认保存");
      $("#sureOption").unbind("click").click(function () {
        //保存流程意见
        comn.ajax({
          url: interUrl.common.opinionOnly,
          data: $.extend($("#opinionForm").values(), argsBopInfoId),
          success: function (res) {
            $("#sureModal").modal("hide");
            tip({
                  content: "保存成功！"
                });
          }
        });
      });
});
  //页面加载获取opinion内容
  $("#opinionText").getOpinion_s(argsBopInfoId);
  $('#loadCredit').getLoad();

$(function(){
  $('[data-toggle="tooltip"]').tooltip();
  $("#userSearch").click(function() {
    return $("#table_pay2").bootstrapTable('selectPage', '1');
  });
})
