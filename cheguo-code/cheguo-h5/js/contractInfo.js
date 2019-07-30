$(function() {
  var args;
  args = common.getArgs();
  return common.Ajax({
    url: 'infoQuery/getLoanContractInfo',
    data: args,
    success: function(data) {
      $("#page").nameValues(data);
    }
  });
});
