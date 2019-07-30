$(function() {
  var args, key, value;
  args = common.getArgs();
  for (key in args) {
    value = args[key];
    $("input[name='" + key + "'], select[name='" + key + "']").val(decodeURIComponent(value));
  }
  return $(".button").click(function() {
    var arr, error, i, item, len, o, strO;
    o = {};
    arr = $("form").serializeArray();
    for (i = 0, len = arr.length; i < len; i++) {
      item = arr[i];
      o[item.name] = item.value;
    }
    strO = JSON.stringify(o);
    try {
      backPevPage(strO);
    } catch (_error) {
      error = _error;
    }
    try {
      return window.android.backPevPage(strO);
    } catch (_error) {
      error = _error;
    }
  });
});
