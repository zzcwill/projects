var args;

args = comn.getArgs();

$(function() {
  args['id'] = args['projectId'];
  comn.ajax({
    url: interUrl.creditManagement.bankInfoGet,
    data: {
      projectId: args['projectId']
    },
    success: function(res) {
      if (res.data.bankPaymentType == "2") {
        $(".cardNum").removeClass("hide");
      }
      $("#basic").values(res.data);
        var dataArr =[["#bankPaymentType", "SingleDoubleCardType", res.data.bankPaymentType || ''],["#loanType", "LoanType", res.data.loanType || '']];
        $.getCommonMethodPort(dataArr);
    }
  });
  $("#bankPaymentType").change(function(){
      if ($(this).val() == "1") {
          $(".cardNum").addClass("hide");
          $(".cardInput").val("").prop("disabled", "disabled")
      } else if ($(this).val() == "2") {
          $(".cardNum").removeClass("hide");
          $(".cardInput").val("").prop("disabled", "")
      }
  })
  return $("#btnSave").click(function() {
    if ($("#basic").valid()) {
        var o = $("#recordInfo").values();
      return comn.ajax({
        url: interUrl.creditManagement.bankInfoSave,
        data: $.extend(o, {applyId: args["applyId"]}),
        success: function(res) {
			comn.closeTab();
        }
      });
    }
  });
});
