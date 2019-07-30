$(function() {
  var args, key, value;
  args = common.getArgs();
  for (key in args) {
    value = args[key];
    $("input[name='" + key + "']").val(value);
  }
  $(".captcha").click(function(e) {
    var arr, i, item, len, o;
    o = {};
    arr = $("form").serializeArray();
    for (i = 0, len = arr.length; i < len; i++) {
      item = arr[i];
      o[item.name] = item.value;
    }
    return common.Ajax({
      url: 'visits/apply/resetPwd',
      data: o,
      success: function(res) {
        return console.log(res);
      }
    });
  });
  return $(".am-button").click(function() {
    var arr, i, item, len, o;
    o = {};
    arr = $("form").serializeArray();
    for (i = 0, len = arr.length; i < len; i++) {
      item = arr[i];
      o[item.name] = item.value;
    }
    return common.Ajax({
      url: 'visits/apply/doResetPwd',
      data: o,
      success: function(data, res) {
        if (res.code === 1000) {
          common.dialog('show', {
            icon: 'success',
            text: '设置成功'
          });
        } else {
          common.dialog('show', {
            icon: 'error',
            text: '设置失败'
          });
        }
        return common.delay(function() {
          return common.dialog('hide');
        });
      }
    });
  });
});
