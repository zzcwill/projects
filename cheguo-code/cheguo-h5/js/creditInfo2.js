$(function() {
  var args;
  args = common.getArgs();
  common.Ajax({
    url: 'loanApproval/getRecentCustomerCredit',
    data: args,
    success: function(data) {
      var o;
      return $("#relavants").append(((function() {
        var i, len, ref, results;
        ref = data.relavants;
        results = [];
        for (i = 0, len = ref.length; i < len; i++) {
          o = ref[i];
          results.push(["<div class='am-list-item infoSwitch'>", "<div class='am-list-label'>" + ((o.borrowerRelationship === '1' && '借款人') || (o.borrowerRelationship === '2' && '共同还款人') || (o.guaranteeRelationship === 1 && '担保人') || (o.guaranteeRelationship === 2 && '反担保人')) + "</div>", "<div class='am-list-content'>", "<div class='am-flexbox am-ft-right'>", "<div class='am-flexbox-item'>" + o.fullName + "</div>", "<div class='am-flexbox-item'>" + (o.creditStatus || "") + "</div>", "</div>", "</div>", "<div class='am-list-arrow'>", "<div class='am-icon' am-mode='arrow-vertical'>", "</div>", "</div>", "</div>", "<div class='info fn-hide' style='padding: 10px 15px; background-color: #FFF;'>", "<div class='am-ft-darkgray am-ft-left am-ft-md'>征信情况:</div>", "<ul class='am-ft-sm'>", "<li>关系：" + (o.borrowerRelationship ? ([null, "本人", "夫妻", "父亲", "母亲", "兄弟", "姐妹", "儿子", "亲戚", "朋友", "合伙人", "同事", "女儿", "姐夫", "嫂子", "儿媳"][o.borrowerRelationship]) : '') + "</li>", "<li>" + ['', "身份证", "军官证", "侨胞证", "外籍人士", ""][o.cardType] + "：" + (o.cardId ? o.cardId : '') + "</li>", "<li>征信情况：" + (o.creditDetail || "") + "</li>", "<li>调查方式：" + (o.checkType || "") + "</li>", "<li>调查人：" + (o.staffName || "") + "</li>", "<li>更新时间：" + (o.modifyTime || "") + "</li>", "</ul>", "</div>"].join(""));
        }
        return results;
      })()).join(""));
    }
  });
  return $("#page").on("click", ".infoSwitch", function() {
    var _attr;
    _attr = $(this).find(".am-icon").attr("am-mode");
    $(".am-icon").attr("am-mode", "arrow-vertical");
    if (_attr === "arrow-vertical") {
      $(this).find(".am-icon").attr("am-mode", "arrow-vertical up");
    } else {
      $(this).find(".am-icon").attr("am-mode", "arrow-vertical");
    }
    return $(this).find(".am-icon").parents(".am-list-item").next(".info").toggleClass("fn-hide").siblings(".info").addClass("fn-hide");
  });
});
