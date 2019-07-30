$(function() {
  var args;
  args = common.getArgs();
  common.Ajax({
    url: 'customer/credit/get',
    data: args,
    success: function(data) {
      var o;
      if (!data) {
          return;
      }
        if (data.businessType &&  data.businessType == 8) {
            $("#nameShow").html("合作机构")
        }
      $("#info").nameValues(data);
      return $("#relavants").append(((function() {
        var i, len, ref, results;
        ref = data.relavants;
        results = [];
        for (i = 0, len = ref.length; i < len; i++) {
          o = ref[i];
          results.push([
              "<div class='am-list-box'>",
              "<div class='am-list-item "+ (data.businessType == 8 ? '' : 'infoSwitch') +"'>",
              "<div class='am-list-label'>" + ((o.borrowerRelationship == 1 && '借款人') || (o.borrowerRelationship == 2 && '共同还款人') || (o.guaranteeRelationship == 1 && '担保人') || (o.guaranteeRelationship == 2 && '反担保人')) + "</div>",
              "<div class='am-list-content'>",
              "<div class='am-flexbox am-ft-right'>",
              "<div class='am-flexbox-item'>" + (o.fullName || "") + "</div>",
              "<div class='am-flexbox-item'>" + checkResult(o.checkResult) + "</div>",
              "</div>",
              "</div>",
              (data.businessType === 8 ? '' : ("<div class='am-list-arrow'><div class='am-icon' am-mode='arrow-vertical'></div></div>")),
              "</div>",
              "<div class='info fn-hide'>",
              "<div class='am-list-item'>",
              "<div class='am-list-title'>手机号码</div>",
              "<div data-name='staffName' class='am-list-extra'>"+ (o.mobile || "") +"</div>",
              "</div>",
              "<div class='am-list-item' style='flex-direction: column'>",
              "<div class='am-title'>征信内容描述</div>",
              "<div class='am-artical'>"+ (o.creditRemark || "") +"</div>",
              "</div>",
              "<div class='am-ft-sm-creit'>",
              "<div class='am-list-item'>",
              "<div class='am-list-title'>有无信贷</div>",
              "<div class='am-list-extra'>"+ loanRepayment(o.loanRepayment)+"</div>",
              "</div>", creiditInfo(o), "</div>",
              "</div>",
              "</div>"
          ].join(""));
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
function creiditInfo(obj) {
    var o = obj;
    var html = "<div class='am-list-item'>"+
        "<div class='am-list-title'>婚姻状况</div>"+
        "<div class='am-list-extra'>"+ maritalStatus(o.maritalStatus) +"</div>"+
        "</div>"+
        "<div class='am-list-item' style='justify-content: space-between'>"+
        "<div class='am-list-title'>信贷情况</div>"+
        "<div class='am-list-extra' style='text-overflow: clip; white-space: inherit; width: 190px; display: inline-table; flex: none'>"+ creditMemoFlag(o.creditMemoFlag != undefined ? o.creditMemoFlag : '') +"</div>"+
        "</div>"+
        "<div class='am-list-item'>"+
        "<div class='am-list-title'>贷款余额</div>"+
        "<div class='am-list-extra'>"+ (o.loanBalance || "") +"</div>"+
        "</div>"+
        "<div class='am-list-item'>"+
        "<div class='am-list-title'>为他人提供担保额</div>"+
        "<div class='am-list-extra'>"+ (o.amountGuaranteed || "") +"</div>"+
        "</div>"+
        "<div class='am-list-item'>"+
        "<div class='am-list-title'>当期逾期总额</div>"+
        "<div class='am-list-extra'>"+ (o.loanAmnout || "") +"</div>"+
        "</div>"+
        "<div class='am-list-item'>"+
        "<div class='am-list-title'>授信总额</div>"+
        "<div class='am-list-extra'>"+ (o.creditAmount || "") +"</div>"+
        "</div>"+
        "<div class='am-list-item'>"+
        "<div class='am-list-title'>最近6个月使用额度</div>"+
        "<div class='am-list-extra'>"+ (o.averageSpendingInmonths || "") +"</div>"+
        "</div>"+
        "<div class='am-list-item'>"+
        "<div class='am-list-title'>12月内累计逾期次数</div>"+
        "<div class='am-list-extra'>"+ (o.overdueTimesInmonths || "") +"</div>"+
        "</div>";
    return o.loanRepayment === 1 ? html : '';
}
function loanRepayment(value){
    if (value == "1") {
        return "有"
    } else if (value == "0") {
        return "无"
    } else {
        return ""
    }
};
function checkResult(value) {
    return ["", "通过", "不通过"][value] || "";
}
function maritalStatus(value) {
    return ["未婚", "已婚", "不明确", "离婚"][value] || "";
}
function creditMemoFlag(value) {
    var text = "";
    if (value == '') {
        return "";
    }
    if (value == '1' || value == '3' || value == '5' || value == '7' || value == '17' || value == '19' || value == '21' || value == '23'){
        text += '有房贷'
    }
    if (value == '2' || value == '3' || value == '6' || value == '7' || value == '18' || value == '19' || value == '22' || value == '23'){
        text += (value == '2' || value == '6' || value == '18' || value == '22') ? '有经营性贷款' : '，有经营性贷款'
    }
    if (value == '4' || value == '5' || value == '6' || value == '7' || value == '20' || value == '21' || value == '22' || value == '23'){
        text += (value == '4' || value == '20') ? '有信用卡' : '，有信用卡'
    }
    if (value == '16' || value == '17' || value == '18' || value == '19' || value == '20' || value == '21' || value == '22' || value == '23'){
        text += value == '16' ? '其他贷款' : '，其他贷款'
    }
    return text;
}