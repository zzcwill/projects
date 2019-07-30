var deliveryMethod, gpsType, isRenewal, paymentLevel, premiumType, settleMethod;

premiumType = function(value, row, index) {
  return [null, "公司", "车行", "客户"][value] || null;
};

isRenewal = function(value, row, index) {
  return [null, "是", "否"][value] || null;
};

gpsType = function(value, row, index) {
  return [null, "有线", "无线", "有线+无线"][value] || null;
};

deliveryMethod = function(value, row, index) {
  return [null, "现金", "非现金"][value] || null;
};

paymentLevel = function(value, row, index) {
  return [null, "一般", "紧急"][value] || null;
};

settleMethod = function(value, row, index) {
  return [null, "车行结算", "个人结算", "无需结算"][value] || null;
};



$(function() {
  var args;
  args = common.getArgs();
  return common.Ajax({
    url: 'loanApproval/getLoanBudgetInfo',
    data: args,
    success: function(data) {
      $("#page").nameValues(data);
	  if(data.premiumType != 1){ $("#insuranceCompany").hide(); }
    }
  });
});
