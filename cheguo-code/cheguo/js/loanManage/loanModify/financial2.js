var table_pay,tableEvent_pay,handle_pay,flowType,conclusion;
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
     $("#approvalInfoForm").values(res.data);
      //get pay lists
      if(res.data.coBankId){
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
              $("[name='guaranteeCorporationAccountName']").val(item.accountName);
              $("[name='guaranteeCorporationAccountNo']").val(item.cardNumber);
              $("[name='guaranteeCorporationBank']").val(item.subBankName);
              $("#payModal").modal("hide");
            }
          };
          handle_pay = function (value, row, index) {
            return ["<a class='pay' href='javascript:;'>选择</a>"].join("");
          };
          $("#table_pay").bootstrapTable("refresh");
        })
        }
      var dataArr =[["#customerSource", "CustomerSource", res.data.customerSource],[".loanTerm", "LoanTerm", res.data.loanTerm]];
      $.getCommonMethodPort(dataArr);
      }
});


//获取修改清单
getModify();

//退款信息部分
getPaymentInfo();

function getPaymentInfo(){
  comn.ajax({
    url: interUrl.loanChange.getLoanRefundFull,
    data: loanApplyId,
    success: function(res) {
      $("#paymentGetForm").values(res.data);
    }
  });
}

//保存收款信息
$("#btn-payment-save").click(function () {
  $("#paymentGetForm").validate();
  if($("#paymentGetForm").valid() == true){
    comn.ajax({
      url: interUrl.loanChange.saveLoanRefundFull,
      data: $.extend($("#paymentGetForm").values(),loanApplyId,flowType,{payeeMethod:2}),
      success: function(res) {
        tip({content:res.message || '保存成功!'})
      }
    });
  }
});

//担保公司选择收款人
$("#accountSelect").click(function(){
  $("#payModal").modal("show");
});


//流程意见保存和流程提交
$("#btn-opinion-save").click(function () {
  $("#paymentGetForm").validate();
  $("#opinionForm").validate();
    if($("#paymentGetForm").valid() == true && $("#opinionForm").valid() == true) {
      oppSureModal("是否确认提交");
      $("#sureOption").unbind("click").click(function () {
        comn.ajax({
          url: interUrl.loanChange.saveLoanRefundFull,
          data: $.extend($("#paymentGetForm").values(), loanApplyId, flowType, {payeeMethod: 2}),
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
