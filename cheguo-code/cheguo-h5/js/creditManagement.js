var isRegistered, repayCardNo, registerTarget, pledgeStatus, deliverType;
isRegistered = function(value, row, index) {
  return [null, "是", "否"][value] || null;
};

repayCardNo = function(value, row, index) {
  return [null, "公司", "客户", "车行"][value] || null;
}

registerTarget = function(value, row, index) {
  return [null, "公司", "个人"][value] || null;
}

pledgeStatus = function(value, row, index) {
  return [null, "已抵押", "未抵押"][value] || null;
}

deliverType = function(value, row, index) {
  return [null, "快递", "客户自取", "客户经理代送", "其他"][value] || null;
}

$(function() {
  var args;
  args = common.getArgs();
  return common.Ajax({
    url: 'infoQuery/getLoanInformation',
    data: args,
    success: function(data) {
      //上牌信息
      $("div[data-name=isRegistered]").html(isRegistered(data.licensePlateInfoVo.isRegistered));
      $("div[data-name=repayCardNo]").html(repayCardNo(data.licensePlateInfoVo.repayCardNo));
      $("div[data-name=registerDate]").html(data.licensePlateInfoVo.registerDate);
      $("div[data-name=plateNo]").html(data.licensePlateInfoVo.plateNo);
      $("div[data-name=plateArea]").html(data.licensePlateInfoVo.plateArea);
      $("div[data-name=registerTarget]").html(registerTarget(data.licensePlateInfoVo.registerTarget));
      $("div[data-name=operatorRealname_1]").html(data.licensePlateInfoVo.operatorRealname);
      $("div[data-name=warrantDate]").html(data.licensePlateInfoVo.warrantDate);
      $("div[data-name=registerType]").html(data.licensePlateInfoVo.registerType);
      //抵押物情况
      $("div[data-name=pledgeStatus]").html(pledgeStatus(data.pledgeInfoVo.pledgeStatus));
      $("div[data-name=pledgeDate]").html(data.pledgeInfoVo.pledgeDate);
      $("div[data-name=wararntNo]").html(data.pledgeInfoVo.wararntNo);
      $("div[data-name=operatorRealname_2]").html(data.pledgeInfoVo.operatorRealname);
      //银行放款信息
      $("div[data-name=loanAmount]").html(data.bankRemittanceInfoVo.loanAmount);
      $("div[data-name=bankPaymentAmount]").html(data.bankRemittanceInfoVo.bankPaymentAmount);
      $("div[data-name=bankPaymentDate]").html(data.bankRemittanceInfoVo.bankPaymentDate);
      $("div[data-name=bankPaymentRemark]").html(data.bankRemittanceInfoVo.bankPaymentRemark);
      //还款卡信息
      $("div[data-name=coBankName]").html(data.repaymentCardInfoVo.coBankName);
      $("div[data-name=cardNo]").html(data.repaymentCardInfoVo.repayCardNo);
      $("div[data-name=receiveDate]").html(data.repaymentCardInfoVo.receiveDate);
      $("div[data-name=deliverType]").html(deliverType(data.repaymentCardInfoVo.deliverType));
      $("div[data-name=deliverDate]").html(data.repaymentCardInfoVo.deliverDate);
      $("div[data-name=deliverAddr]").html(data.repaymentCardInfoVo.deliverAddr);
      $("div[data-name=note]").html(data.repaymentCardInfoVo.note);
    }
  });
});
