var Ajax;

Mock.mock(/hello.json/, {
  'data': {
    'list|20': [
      {
        'id|+1': 1000,
        'email': '@EMAIL',
        'name|1': '@CHINESENAME',
        'age': '@INT(1,100)',
        'ip': '@IP',
        'province': '@REGION',
        'city': '@AREA',
        'date': '@DATE(yyyy-MM-dd)',
        'pid|+1': 999
      }
    ]
  }
});

Ajax = function(option) {
  return $.ajax({
    url: option.url || "",
    type: option.type || "POST",
    dataType: "json",
    async: option.async || true,
    data: option.data || {},
    beforeSend: function(jqXHR, settings) {
      return console.log("send befor");
    },
    complete: function(jqXHR, textStatus) {
      return console.log("send end");
    },
    success: function(data, textStatus, jqXHR) {
      return typeof option.success === "function" ? option.success(data) : void 0;
    },
    error: function(jqXHR, textStatus, errorThrown) {
      return console.log("send error");
    }
  });
};

$(function() {
  return Ajax({
    url: 'hello.json',
    data: {
      'type': 1
    },
    success: function(res) {
      return console.log(res);
    }
  });
});
