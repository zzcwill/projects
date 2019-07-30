var cardType;

cardType = function(value, row, index) {
  return [null, "身份证", "军官证", "侨胞证", "外籍人士"][value] || null;
};

guaranteeType = function(value, row, index) {
  return [null, "抵押"][value] || null;
};

function resultData(o) {
  if (o === 2) {
      return '<div class="am-list-brief am-ft-right">云镜大数据通过</div>'
  } else if (o === 3 || o === 4) {
      return '<div class="am-list-brief am-ft-right">云镜大数据拒绝</div>'
  } else {
      return ''
  }
}
$(function() {
  var args;
  args = common.getArgs();
  return common.Ajax({
    url: 'loanApproval/getLoanGuarantorInfo',
    data: args,
    success: function(data) {
      var guaranteeHtml, i, j, len, len1, loanReversedGuarantorInfosHtml, o, ref, ref1;
      guaranteeHtml = "";
      loanReversedGuarantorInfosHtml = "";
      ref = data.loanGuarantorInfos;
      for (i = 0, len = ref.length; i < len; i++) {
        o = ref[i];
        guaranteeHtml += ["<div class='am-list-item'>", "<div class='am-list-content'>", "<div class='am-list-title'>", "<div class='am-flexbox'>", "<div data-name='guarantorName' class='' style='width: 130px; white-space:normal'>" + o.guarantorName + "</div>", "<div>" + [null, "本人", "夫妻", "父亲", "母亲", "姐妹", "兄弟", "儿子", "亲戚", "朋友", "合伙人", "同事", "女儿", "姐夫", "嫂子", "儿媳"][o.relationshipWithLoaner] + "</div>", "<div data-name='mobileNo' class='am-flexbox-item am-ft-right'>" + (o.mobilePhone?o.mobilePhone:"") + "</div>", "</div>", "</div>", resultData(o.decisionStatus),"<div class='am-list-brief'>", "<div class='am-flexbox'>", "<div data-name='cardType' data-formatter='cardType' class='am-flexbox-item'> " + [null, "身份证", "军官证", "侨胞证", "外籍人士"][o.cardType] + "</div>", "<div data-name='cardNo' class='am-flexbox-item am-ft-right'>" + o.cardNo + "</div>", "</div>", "</div>", "</div>", "</div> "].join("");
      }
      ref1 = data.loanReversedGuarantorInfos;
      for (j = 0, len1 = ref1.length; j < len1; j++) {
        o = ref1[j];
        loanReversedGuarantorInfosHtml += ["<div class='am-list-item'>", "<div class='am-list-content'>", "<div class='am-list-title'>", "<div class='am-flexbox'>", "<div data-name='guarantorName' style='width: 130px; white-space:normal'>" + o.guarantorName + "</div>", "<div>" + [null, "本人", "夫妻", "父亲", "母亲", "姐妹", "兄弟", "儿子", "亲戚", "朋友", "合伙人", "同事", "女儿", "姐夫", "嫂子", "儿媳"][o.relationshipWithLoaner] + "</div>", "<div data-name='mobileNo' class='am-flexbox-item am-ft-right'>" + (o.mobilePhone?o.mobilePhone:"") + "</div>", "</div>", "</div>", resultData(o.decisionStatus),"<div class='am-list-brief'>", "<div class='am-flexbox'>", "<div data-name='cardType' data-formatter='cardType' class='am-flexbox-item'> " + [null, "身份证", "军官证", "侨胞证", "外籍人士"][o.cardType] + "</div>","<div class='am-flexbox-item'></div>", "<div data-name='cardNo' class='am-flexbox-item am-ft-right'>" + o.cardNo + "</div>", "</div>", "</div>", "</div>", "</div> "].join("");
      }
      $("#guarantee").append(guaranteeHtml);
      $("#loanReversedGuarantorInfos").append(loanReversedGuarantorInfosHtml);
      return $("#loanAssetsInfo").nameValues(data.loanAssetsInfo);
    }
  });
});
