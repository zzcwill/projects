var cardType, reservedFunds, spouseDecisionStatus;

cardType = function(value, row, index) {
  return [null, "身份证", "军官证", "侨胞证", "外籍人士", ""][value] || null;
};

monthlyIncome = function(value, row, index) {
  return ["", "1-4999", "5000-9999", "10000-14999", "15000-19999", "2万以上"][value] || null;
};

reservedFunds = function(value, row, index) {
  return ["", "无", "1-500", "501-1000", "1001-1500", "1501-2000", "2001-2500", "2501-3000", "3000以上"][value] || null;
};

spouseDecisionStatus = function(value, row, index) {
  if (value === 2) {
      return '通过'
  } else if (value === 3 || value === 4) {
      return '拒绝'
  } else {
      return [];
  }
};
$(function() {
  var args;
  args = common.getArgs();
  return common.Ajax({
    url: 'loanApproval/getLoanCustomerInfo',
    data: args,
    success: function(data) {
      return $("#page").nameValues(data);
    }
  });
});
