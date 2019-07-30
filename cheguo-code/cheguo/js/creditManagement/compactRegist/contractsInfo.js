var args, dataLoad_1,dataLoad_2,contractId;

args = comn.getArgs();
if (args['registered'] === "registered") {
    $("#btnPreSave").hide();
}

function getParams(data,type){
  var paramObject = {};
  var paramsGet,paramsArr;
  paramsArr = ['loanTerm','discountCarPolicy','interestStartDate','interestEndDate','firstRepaymentDate', 'contractAmount','noticeDownpaymentAmount','noticePeriodpaymentAmount','noticeFinalpaymentAmount'];
  if(type == 2){
    paramsGet = paramsArr.map(function (item) {
      if(item == 'loanTerm' || item == 'discountCarPolicy'){
        return item;
      }
      return item + 'Second'
    });
  }else{
    paramsGet = paramsArr
  }
  for(var i=0;i<paramsArr.length;i++){
    paramObject[paramsArr[i]] = data[paramsGet[i]]
  }
  return paramObject;
}
if (args['type'] === "show" || args['registered'] === 'registered') {//
    dataLoad_1 = function(params) {
        return tableData(params, {contractId:contractId,creditCardType: 1,page:1, pageSize:10}, interUrl.mockList || interUrl.loanDetail.getLoanContractRepayPlanList);
    };
    dataLoad_2 = function(params) {
        return tableData(params, {contractId:contractId,creditCardType: 1,page:1, pageSize:10}, interUrl.mockList || interUrl.loanDetail.getLoanContractRepayPlanList);
    };
}else {
    dataLoad_1 = function(params) {
        return tableData(params, $.extend(getParams($("#recordInfo").values(),1),{creditCardType: 1}), interUrl.mockList || interUrl.creditManagement.loanContracPlanList);
    };
    dataLoad_2 = function(params) {
        return tableData(params, $.extend(getParams($("#recordInfo").values(),2),{creditCardType: 2}), interUrl.mockList || interUrl.creditManagement.loanContracPlanList);
    };
}

$(function() {
	$("input[name='bankInstallmentFee']").change(function(){
		var loanAmount = parseFloat($("input[name='requiredAmount']").val()),
			bankInstallmentFee = parseFloat($(this).val()),
			contractAmount = (loanAmount || 0) + (bankInstallmentFee || 0);
			$("input[name='contractAmount']").val(contractAmount); 
	});

	$("input[name='interestStartDate'], select[name='loanTerm']").change(function(){
		var M = parseInt(loanTerm($("select[name='loanTerm']").val())),
			date = $("input[name='interestStartDate']").val(),
			o = moment(date).add(M, 'M'),
			_text = o.format("YYYY-MM-DD");
		$("input[name='interestEndDate']").val(_text != "Invalid date" ? _text : "");

		if($(this).attr("name") == "interestStartDate"){
			var _ftext = moment(date).add(1, 'M').format("YYYY-MM-DD");
			$("input[name='firstRepaymentDate']").val(_ftext != "Invalid date" ? _ftext : "");
		}
	});

  comn.ajax({
    url: args["type"] == "show" ? interUrl.creditManagement.loanContractGet : interUrl.creditManagement.loanContractEdit,
    data: {
      projectId: args['projectId']
    },
    success: function(res) {
		var o = res.data;
        contractId = o.id;
      if(o.contractType == 2){
        $('.extra').removeClass('hide');
        $('.extra').find('input,textarea').removeAttr('disabled');
      }else{
        $('.extra').addClass('hide');
        $('.extra').find('input,textarea').attr('disabled','disabled');
      }
		o.contractAmount = o.contractAmount || (o.requiredAmount + o.bankInstallmentFee);
		o.registerDate = o.registerDate || moment().format("YYYY-MM-DD");
		o.interestStartDate = o.interestStartDate || o.bankPaymentDate;
		o.interestEndDate = args['type'] === "show" || args['registered'] === "registered" ? o.interestEndDate : moment(o.interestStartDate || o.bankPaymentDate).add(parseInt(loanTerm(o.loanTerm)), 'M').format("YYYY-MM-DD");
    o.interestStartDateSecond = o.interestStartDateSecond || o.bankPaymentDateSecond;
    o.interestEndDateSecond = moment(o.interestStartDateSecond || o.bankPaymentDateSecond).add(parseInt(loanTerm(o.loanTerm)), 'M').format("YYYY-MM-DD");
      $(".ibox-content").values(o);
	 if (o.enableEdit == "0"){
		  $("input[name='billDate']").attr("readonly", true);
	  }
      if (args['type'] === "show") {
        $("#info").attr("disabled", true);
        $("#btn-isShow").hide();
        if(o.contractType == 2){
          $("#extraPlan").removeClass("hide").find("table").bootstrapTable(comn.table);
        }
        return $("#plan").removeClass("hide").find("table").bootstrapTable(comn.table);
      }
    }
  });
  $("#btnPlan").click(function() {
    if ($("#recordInfo").valid()) {
      if($('#contractType').find('option:selected').val() == 2){
        $("#extraPlan").removeClass("hide").find("table").bootstrapTable("destroy").bootstrapTable(comn.table);
      }
      return $("#plan").removeClass("hide").find("table").bootstrapTable("destroy").bootstrapTable(comn.table);
    }
  });
     $("#btnPreSave").click(function () {
        $("input").removeClass("required");
         comn.ajax({
            url: interUrl.creditManagement.tmpSave,
            data: $("#info").values(),
            success: function(res) {
                tip({
                    content: '暂存成功'
                });
                comn.closeTab();
            }
        });
    });
   $("#btnSave").click(function() {
    if ($("#recordInfo").valid()) {
       comn.ajax({
        url: interUrl.creditManagement.loanContractSave,
        data: $("#info").values(),
        success: function(res) {
          tip({
            content: '操作成功！！'
          });
		  comn.closeTab();
        }
      });
    }
  });
});
$('#contractType').on('change',function () {
  var val = $(this).find('option:selected').val();
  if(val == 2){
    $('.extra').removeClass('hide');
    $('.extra').find('input,textarea').removeAttr('disabled');
  }else{
    $('.extra').addClass('hide');
    $('.extra').find('input,textarea').attr('disabled','disabled');
  }
});
$.getCommonMethodPort([['#contractType','SingleDoubleCardType']]);