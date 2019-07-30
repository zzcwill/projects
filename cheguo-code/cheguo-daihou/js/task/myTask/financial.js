var table_pay,tableEvent_pay,handle_pay,table_pay2,tableEvent_pay2,handle_pay2,table_pay3,tableEvent_pay3,handle_pay3;
//$.extend($.validator.defaults,{ignore:""});  //隐藏表单也验证

//分公司财务主管:type=1 guaranteeAccount 分公司账户  dealerAccount 车商账户  pollAccount 资金池账户
//资金管理部主任:type=2
//资金管理部出纳:type=3
$("#flowTitle").text(args['currentNodeName']);
if(type==1){
  $("#loanPool").hide(); //隐藏资金池账户
  getPaymentInfo();
}else if(type==2){
  $("#guaranteeAccount,#dealerAccount").attr("disabled",true);
  //收款信息
  getPaymentInfo();
}else if(type==3){
  $("#guaranteeAccount,#dealerAccount,#pollAccount").attr("disabled",true);
  $("#type3").show();
  $("#f_type3").hide();
  $("#btn-loanReview-back").show();
}
var controlPre=true;
//审批信息
comn.ajax({
  url: interUrl.myTask.approvalInfo,
  data:loanApplyId,
  success: function(res) {
    if(res.data.carType==2){
      $("#sc-isAdvance").show();
    }
    if(res.data.maritalStatus!=1){
      $("#singleImg").show();
    }
    //银行直销逻辑判断  businessTypeId
    if(res.data.businessTypeId==2){
      $("#yhzx").show();
      $("#ptlc").remove();
      $("#paymentGetForm").hide();
      controlPre = false;
    }else{
      if(type==3){
        $("[name='guaranteeCorporationPaymentAmount']").val(res.data.requiredAmount);
        getPaymentInfo();
      }
    }

    $("#approvalInfoForm").values(res.data);

  }
});


//收款人信息
function getPaymentInfo(){
  comn.ajax({
    url: interUrl.myTask.paymentGetGuarantee,
    data:loanApplyId,
    success: function(res) {
      $("#paymentGetForm").values(res.data);
      $("#payModal").on("shown.bs.modal", function() {
        //分公司账户
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

      });

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
            $("#payModal2").modal("hide");
          }
        };
        handle_pay2 = function (value, row, index) {
          return ["<a class='pay' href='javascript:;'>选择</a>"].join("");
        };
        $("#table_pay2").bootstrapTable("refresh");

      })

    if(type=='2' || type=='3'){
      $("#payModal3").on("shown.bs.modal", function() {
        //资金池账户
        table_pay3 = function (params) {
          var p = params.data;
          return comn.ajax({
            url: interUrl.myTask.getCapatilPoolAccountList,
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
        tableEvent_pay3 = {
          "click .pay": function (e, a, item, index) {
            $("[name='capitalPoolAccountName']").val(item.accountName);
            $("[name='capitalPoolAccountNo']").val(item.cardNumber);
            $("[name='capitalPoolBank']").val(item.subBankName);
            $("#payModal3").modal("hide");
          }
        };
        handle_pay3 = function (value, row, index) {
          return ["<a class='pay' href='javascript:;'>选择</a>"].join("");
        };
        $("#table_pay3").bootstrapTable("refresh");
      })
    }

    }
  });
}

//保存收款信息
$("#btn-payment-save").click(function () {
  $("#paymentGetForm").validate();
  if($("#paymentGetForm").valid() == true){
    comn.ajax({
      url: interUrl.myTask.saveToGuarantee,
      data: $.extend($("#paymentGetForm").values(),loanApplyId),
      success: function(res) {
        tip({content:res.message || '保存成功!'})
      }
    });
  }
});

//选择分公司收款人
$("#accountSelect").click(function(){
  $("#payModal").modal("show");
});

//选择车商收款人
$("#accountSelect2").click(function(){
  $("#payModal2").modal("show");
});

//选择资金池收款人
$("#accountSelect3").click(function(){
  $("#payModal3").modal("show");
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
  if(controlPre){
    $("#paymentGetForm").validate();
    $("#opinionForm").validate();
    if($("#paymentGetForm").valid() == true && $("#opinionForm").valid() == true){
      comn.ajax({
        url: interUrl.myTask.saveToGuarantee,
        data: $.extend($("#paymentGetForm").values(),loanApplyId),
        success: function(res5) {
          saveOpinion();
        }
      });
    }
  }else if(!controlPre){
    saveOpinion();
  }
});

//退回上一步
$("#btn-loanReview-back").click(function () {
  $("#opinionForm").validate();
  if($("#opinionForm").valid() == true){
    oppSureModal("是否确认退回");
    $("#sureOption").unbind("click").click(function () {
      //保存流程意见
      comn.ajax({
        url: interUrl.common.opinion,
        data: $.extend($("#opinionForm").values(), argsBopInfoId),
        success: function (res) {
          $("#sureModal").modal("hide");
          flowBack2Pre();
        }
      });
    })
  }
});

function saveOpinion(){
  $("#opinionForm").validate();
  if($("#opinionForm").valid() == true) {
    oppSureModal("是否确认提交");
    $("#sureOption").unbind("click").click(function () {
      //保存流程意见
      comn.ajax({
        url: interUrl.common.opinion,
        data: $.extend($("#opinionForm").values(), argsBopInfoId),
        success: function (res) {
          $("#sureModal").modal("hide");
          flowSubmit(interUrl.myTask.preSubmit, interUrl.myTask.submit2next, './Modal/task/myTask/index.html', loanApplyId);
        }
      });
    })
  }
}

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