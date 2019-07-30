var table_pay,tableEvent_pay,handle_pay,choosePay=null,flowType,conclusion;
flowType={flowType:"LOAN_CANCEL_FLOW"};

//type=1 分公司财务主管 type=2 分公司出纳
$("#flowTitle").text(args['currentNodeName']);
if(type==2){
  $("#type2").show();
  $("#f_type2").hide();
  $("#btn-loanReview-back").show();
  $('#showPay').removeClass('hide');
}

//审批信息
comn.ajax({
  url: interUrl.myTask.approvalInfo,
  data:loanApplyId,
  success: function(res) {
	  if(res.data.businessTypeId == 2){
		  $("input[name='requiredAmount']").closest(".input-tip").addClass("hide");
		  $("input[name='collectedAmount']").closest(".input-tip").removeClass("hide");
		  $("input[name='receivableAmount']").closest(".input-tip").removeClass("hide"); 
		  $("#type2").addClass("hide");
	  }
    if(res.data.carType==2){
      $("#sc-isAdvance").show();
    }
     $("#approvalInfoForm").values(res.data);
    if(res.data.businessTypeId==2){//如果是银行直销模式,账户信息-处理方式默认选中差额,去除全额选项
      $(".yhzx_hide").hide();
      $("#payeeAmount").attr("readonly",true);
    }
      //get pay lists
	 if(res.data.coBankId){
		 //担保公司选择收款人
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
	 }

	  $("#payModal2").on("shown.bs.modal", function() { 
        //车商账户
        table_pay2 = function (params) {
          var p = params.data;
          p['dealerId'] = res.data.dealerId;
          return comn.ajax({
            url: interUrl.myTask.getAccountList,
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
        tableEvent_pay2 = {
          "click .pay": function (e, a, item, index) {
            $("[name='dealerAccountName']").val(item.accountName);
            $("[name='dealerAccountNo']").val(item.cardNumber);
            $("[name='dealerBank']").val(item.subBankName);
            $("[name='dealerAccountType']").val(item.accountType);
            $("#payModal2").modal("hide");
          }
        };
        handle_pay2 = function (value, row, index) {
          return ["<a class='pay' href='javascript:;'>选择</a>"].join("");
        };
        $("#table_pay2").bootstrapTable("refresh");

      }) 

      }
});

//获取收付款信息
getPaymentInfo();

//收款人信息
function getPaymentInfo(){
  comn.ajax({
    url: interUrl.loanChange.getLoanRefundFull,
    data:loanApplyId,
    success: function(res) {
      $("#paymentGetForm").values(res.data);
      //获取付款方式
      if(args['type'] == 2){
        $("#payType").payTypeMent(args['loanApplyId'],res.data.payType, args["businessTypeCode"], args["currentNodeKey"]);
      }
    }
  });
}

//保存收款信息
$("#btn-payment-save").click(function () {
  $("#paymentGetForm").validate();
  if($("#paymentGetForm").valid() == true){
    comn.ajax({
      url: interUrl.loanChange.saveLoanRefundFull,
      data: $.extend($("#paymentGetForm").values(),loanApplyId,flowType),
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
//$("#carAccountSelect").click(function(){
  //choosePay=function(item){
	//$("[name='dealerAccountName']").val(item.accountName);
	//$("[name='dealerAccountNo']").val(item.cardNumber);
	//$("[name='dealerBank']").val(item.subBankName);
  //};
  //$("#payModal").modal("show");
//});


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
  if($("#paymentGetForm").valid() == true){
    comn.ajax({
      url: interUrl.loanChange.saveLoanRefundFull,
      data: $.extend($("#paymentGetForm").values(),loanApplyId,flowType),
      success: function(res) {
        $("#opinionForm").validate();
        if($("#opinionForm").valid() == true) {
          oppSureModal("是否确认提交");
          $("#sureOption").unbind("click").click(function () {
            //保存流程意见
            comn.ajax({
              url: interUrl.common.opinion,
              data: $.extend($("#opinionForm").values(), argsBopInfoId, {conclusion: 1}),
              success: function (res) {
                $("#sureModal").modal("hide");
                if($('#payType').find('option:selected').val() && $('#payType').find('option:selected').val() != 0 ){
                  flowSubmit(interUrl.loanCancel.preSubmit, interUrl.loanCancel.submit2next, './Modal/task/myTask/index.html', loanApplyId,"CA");
                  return;
                }
                flowSubmit(interUrl.loanCancel.preSubmit, interUrl.loanCancel.submit2next, './Modal/task/myTask/index.html', loanApplyId);
              }
            });
          })
        }
      }
    });
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
