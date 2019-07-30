$(function() {
  var args, json;
  args = common.getArgs();
  json = JSON.parse(args['json']);
  $("#info").nameValues(json);
  if (json['riskDetail']) {
    return $("#detail").removeClass("fn-hide");
  }
});
