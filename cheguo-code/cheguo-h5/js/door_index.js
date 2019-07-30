var back;

back = function(o) {
  var key, results, value;
  o = JSON.parse(o);
  $("#page").find(".contractP").eq(o._index).nameValues(o);
  results = [];
  for (key in o) {
    value = o[key];
    results.push($("input[name='contractors[" + o._index + "]." + key + "']").val(value));
  }
  return results;
};

$(function() {
  var args, key, value;
  args = common.getArgs();
  $("#page").nameValues(args);
  for (key in args) {
    value = args[key];
    $("input[name='" + key + "']").val(value);
  }
  $(".contractP").click(function() {
    var o;
    o = {
      'guarantorName': $(this).find("input[name='contractors[" + ($(this).index()) + "].guarantorName']").val(),
      'relationshipWithLoaner': $(this).find("input[name='contractors[" + ($(this).index()) + "].relationshipWithLoaner']").val(),
      'mobilePhone': $(this).find("input[name='contractors[" + ($(this).index()) + "].mobilePhone']").val(),
      'label': $(this).find("input[name='label']").val(),
      'level': 2
    };
    return location.href = "./door_contract.html?" + $.param($.extend(o, {
      _index: $(this).index()
    }));
  });
  common.Ajax({
    url: 'visits/apply',
    data: {
      customerId: args['customerId'],
      applyId: args['applyId']
    },
    success: function(data, res) {
      $("#page").nameValues(data);
      $("input[name='mobilePhone']").val(data.mobilePhone);
      return $("input[name='customerName']").val(data.customerName);
    }
  });
  return $(".am-button").click(function() {
    var arr, i, item, len, o;
    o = {};
    arr = $("form").serializeArray();
    for (i = 0, len = arr.length; i < len; i++) {
      item = arr[i];
      o[item.name] = item.value;
    }
    if (!/^1[3|4|5|7|8]\d{9}$/i.test(o.mobilePhone)) {
      common.dialog('show', {
        icon: 'fail',
        text: "手机号不正确!"
      });
      common.delay(function() {
        return common.dialog('hide');
      }, 2000);
      return;
    }
    if (o.hasDrivingLicense === "") {
      common.dialog('show', {
        icon: 'fail',
        text: "请选择有/无驾使证!"
      });
      common.delay(function() {
        return common.dialog('hide');
      }, 2000);
      return;
    }
    if (o['contractors[0].guarantorName'] === "" || o['contractors[0].relationshipWithLoaner'] === "" || o['contractors[0].mobilePhone'] === "") {
      common.dialog('show', {
        icon: 'fail',
        text: "请添加常用联系人①"
      });
      common.delay(function() {
        return common.dialog('hide');
      }, 2000);
      return;
    }
    if (o['contractors[1].guarantorName'] === "" || o['contractors[1].relationshipWithLoaner'] === "" || o['contractors[1].mobilePhone'] === "") {
      common.dialog('show', {
        icon: 'fail',
        text: "请添加常用联系人②"
      });
      common.delay(function() {
        return common.dialog('hide');
      }, 2000);
      return;
    }
    return common.Ajax({
      url: 'visits/apply/1',
      data: o,
      success: function(data, res) {
        var error;
        if (res.code === 20000) {
          common.dialog('show', {
            icon: 'fail',
            text: res.message
          });
        } else {
          common.dialog('show', {
            icon: 'success',
            text: "申请成功！"
          });
          try {
            save(0);
          } catch (_error) {
            error = _error;
          }
          try {
            window.android.save();
          } catch (_error) {
            error = _error;
          }
        }
        return common.delay(function() {
          return common.dialog('hide');
        }, 2000);
      }
    });
  });
});
