//接受dealerId  (车商ID)
$(function() {
  var args;
  args = common.getArgs();
  return common.Ajax({
    url: 'carDealer/manageTeam/get',
    data: args,
    success: function(data) {
      var index, item;
      return $("#page").html(((function() {
        var i, len, results;
        results = [];
        for (index = i = 0, len = data.length; i < len; index = ++i) {
          item = data[index];
          results.push(["<div am-mode='flat chip 43px' class='am-list'>", "	<div class='am-list-header'>人员 " + (index + 1) + " </div>", "	<div class='am-list-body'>", "		<div class='am-list-item'>", "			<div class='am-list-title'>客户经理名称</div>", "			<div data-name='dealerName' class='am-list-extra'>" + item['managerName'] + "</div>", "		</div>", "		<div class='am-list-item'>", "			<div class='am-list-title'>管理类型</div>", "			<div data-name='contactName' class='am-list-extra'>" + item['manageType'] + "</div>", "		</div>", "		<div class='am-list-item'>", "			<div class='am-list-title'>所在机构</div>", "			<div data-name='contactPhone' class='am-list-extra'>" + item['companyName'] + "</div>", "		</div>", "		<div class='am-list-item'>", "			<div class='am-list-title'>所在部门</div>", "			<div data-name='addRess' class='am-list-extra'>" + item['departmentName'] + "</div>", "		</div>", "       <div class='am-list-item'>", "			<div class='am-list-title'>业务小组</div>", "			<div data-name='addRess' class='am-list-extra'>" + item['groupName'] + "</div>", "		</div>", "	</div>", "</div>"].join(""));
        }
        return results;
      })()).join(""));
    }
  });
});
