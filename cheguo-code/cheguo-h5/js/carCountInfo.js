//接受dealerId  (车商ID)
$(function() {
  var args;
  args = common.getArgs();
  return common.Ajax({
    url: 'carDealer/account/list',
    data: args,
    success: function(data) {
      var index, item;
      return $("#page").html(((function() {
        var i, len, results;
        results = [];
        for (index = i = 0, len = data.length; i < len; index = ++i) {
          item = data[index];
          results.push(["<div am-mode='flat chip 43px' class='am-list'>", "	<div class='am-list-header'>账户 " + (index + 1) + " </div>", "	<div class='am-list-body'>", "		<div class='am-list-item'>", "			<div class='am-list-title'>户名</div>", "			<div data-name='dealerName' class='am-list-extra'>" + item['accountName'] + "</div>", "		</div>", "		<div class='am-list-item'>", "			<div class='am-list-title'>账户类型</div>", "			<div data-name='contactName' class='am-list-extra'>" + ['', '对公账户', '个人账户'][item['accountType']] + "</div>", "		</div>", "		<div class='am-list-item'>", "			<div class='am-list-title'>开户银行</div>", "			<div data-name='contactPhone' class='am-list-extra'>" + item['openBankName'] + "</div>", "		</div>", "		<div class='am-list-item'>", "			<div class='am-list-title'>支行名称</div>", "			<div data-name='addRess' class='am-list-extra'>" + item['subBankName'] + "</div>", "		</div>", "       <div class='am-list-item'>", "			<div class='am-list-title'>卡号</div>", "			<div data-name='addRess' class='am-list-extra'>" + item['cardNumber'] + "</div>", "		</div>", "       <div class='am-list-item'>", "			<div class='am-list-title'>备注</div>", "			<div data-name='addRess' class='am-list-extra' style='white-space: pre-wrap;'>" + item['remark'] + "</div>", "		</div>", "	</div>", "</div>"].join(""));
        }
        return results;
      })()).join(""));
    }
  });
});
