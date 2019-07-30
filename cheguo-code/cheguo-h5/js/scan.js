$(function() {
  var args, url;
  args = common.getArgs();
  $("#page .am-list-body").on("click", ".am-list-item", function() {
    var param;
    param = JSON.stringify($(this).data("json"));
    return location.href = "./scanInfo.html?json=" + param+"&Auth-Id="+args['Auth-Id'];
  });
  if (args['creditId']) {
    url = "customer/credit/risk/list";
  } else if (args['customerId']) {
    url = "customer/risk/list";
  }
  return common.Ajax({
    url: url,
    data: $.extend(args, {
      page: 1,
      pageSize: 100
    }),
    success: function(data) {
      var o;
      return $("#page .am-list-body").html(((function() {
        var i, len, results;
        results = [];
        for (i = 0, len = data.length; i < len; i++) {
          o = data[i];
          results.push(["<div class='am-list-item' data-json='" + (JSON.stringify(o)) + "'>", "<div class='am-list-content'>", "<div class='am-list-title'>", "<div class='am-flexbox'>", "<div class='am-flexbox-item'>", "<span>"+o.borrowerRelationship+":</span>", "&nbsp;&nbsp;" + [o.fullName], "</span>", "</div>", "<div class='am-flexbox-item am-ft-right'>", "<span class='am-ft-sm'></span>", "<span class='am-wingblank am-ft-darkgray am-ft-sm' am-mode='10px'>" + (o.riskTime?o.riskTime:"") + "</span>", "</div>", "</div>", "</div>", "<div class='am-list-title'>", "<span>风险状态:&nbsp;&nbsp;</span>", o.riskStatus === "黑名单" ? "<img src='./images/black.png' style='vertical-align: sub; width: 18px;' />" : void 0, o.riskStatus === "灰名单" ? "<img src='./images/gray.png' style='vertical-align: sub; width: 18px;' />" : void 0, o.riskStatus === "正常" ? "<img src='./images/commn.png' style='vertical-align: sub; width: 18px;' />" : void 0, o.riskStatus === "等待结果" ? "<img src='./images/comon2.png' style='vertical-align: sub; width: 18px;' />" : void 0, o.riskStatus === "黑名单" ? "<span class='am-wingblank am-ft-darkgray am-ft-sm am-ft-red' style='margin-left:5px;'>" + o.riskStatus + "</span>" : void 0, o.riskStatus === "灰名单" ? "<span class='am-wingblank am-ft-darkgray am-ft-sm' style='margin-left:5px; color:#46cc9a;'>" + o.riskStatus + "</span>" : void 0, o.riskStatus === "正常" ? "<span class='am-wingblank am-ft-darkgray am-ft-sm am-ft-blue' style='margin-left:5px;'>" + o.riskStatus + "</span>" : void 0, o.riskStatus === "等待结果" ? "<span class='am-wingblank am-ft-darkgray am-ft-sm' style='margin-left:5px; color: #FFBB33;'>" + o.riskStatus + "</span>" : void 0, "</div>", "</div>", "<div class='am-list-arrow'>", "<div class='am-icon' am-mode='arrow-horizontal'></div>", "</div>", "</div>"].join(""));
        }
        return results;
      })()).join(""));
    }
  });
});
