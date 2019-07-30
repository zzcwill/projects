$(function() {
  var args;
  args = common.getArgs();
  return common.Ajax({
    url: "customer/credit/list",
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
          results.push(["<a href='./creditInfo.html?id=" + o['id'] + "&Auth-Id=" + args['Auth-Id'] + "' class='am-list-item'>", "<div class='am-list-content'>", "<div class='am-list-title'>", "<div class='am-flexbox'>", "<div class='am-flexbox-item'>", "<span>调查日期:</span>", "<span class='am-wingblank' am-mode='10px'>" + o.modifyTime + "</span>", "</div>", "</div>", "</div>", "<div class='am-list-title'>", "<span>合作银行:</span>", "<span class='am-wingblank am-ft-darkgray am-ft-sm' am-mode='10px'>" + o.inquryBank + "</span>", "</div>", "</div>", "<div class='am-list-arrow'>", "<div class='am-icon' am-mode='arrow-horizontal'></div>", "</div>", "</a>"].join(""));
        }
        return results;
      })()).join(""));
    }
  });
});
