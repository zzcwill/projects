$(function() {
  var args, key, value, website;
  args = common.getArgs();
  website = args['website'];
  if (website.indexOf('chinamobile') !== -1) {
    $("#logo")[0].src = "./images/yidong_logo.jpg";
    $(".submit").css("background-color", "#ff8200");
  } else if (website.indexOf('chinatelecom') !== -1) {
    $("#logo")[0].src = "./images/dianxin_logo.jpg";
  } else if (website.indexOf('chinaunicom') !== -1) {
    $("#logo")[0].src = "./images/lt_logo.jpg";
    $(".submit").css("background-color", "#ff6600");
  }
  for (key in args) {
    value = args[key];
    $("input[name='" + key + "']").val(value);
  }
  $(".forgetPwd").click(function() {
    return location.href = "./door_newPwd.html?token=" + args.token + "&website=" + args.website + "&account=" + args['account'] + "&Auth-Id=" + args['Auth-Id'];
  });
  $("input[name='password']").blur(function() {
    if (this.value.trim().length > 0) {
      return $(".captcha").removeAttr("disabled");
    } else {
      return $(".captcha").attr("disabled", "diabled");
    }
  });
  $(".captcha").click(function() {
    var arr, i, item, len, o;
    if (!$("input[name='password']").val().trim().length > 0) {
      return;
    }
    o = {
      count: 1
    };
    arr = $("form").serializeArray();
    for (i = 0, len = arr.length; i < len; i++) {
      item = arr[i];
      o[item.name] = item.value;
    }
    return common.Ajax({
      url: 'visits/apply/2/captcha',
      data: o,
      success: function(data, rse) {
        if (data.code === 20000) {
          return common.dialog('show', {
            icon: 'fail',
            text: res.message
          });
        } else {
          return common.dialog('show', {
            icon: 'success',
            text: res.message
          });
        }
      }
    });
  });
  return $(".submit").click(function() {
    var arr, i, item, len, o;
    if (!$("input[name='password']").val().trim().length > 0) {
      return;
    }
    o = {
      count: 0
    };
    arr = $("form").serializeArray();
    for (i = 0, len = arr.length; i < len; i++) {
      item = arr[i];
      o[item.name] = item.value;
    }
    return common.Ajax({
      url: 'visits/apply/2',
      data: o,
      success: function(data, res) {
        if (res.code === 20000) {
          common.dialog('show', {
            icon: '',
            text: res.message
          });
          return common.delay(function() {
            return common.dialog('hide');
          });
        } else {
          common.dialog('show', {
            icon: 'success',
            text: res.message
          });
          return common.delay(function() {
            return common.dialog('hide');
          });
        }
      }
    });
  });
});
