var tableDataNew = function(params, data, url, callback) {
  var p;
  p = params.data;
  if (url) {
    return comn.ajax({
      url: url,
      data: $.extend(data, p),
      success: function(res) {
        params.success({
          'total': res.data.dataCount,
          'rows': res.data.datas
        });
        params.complete();
        return typeof callback === "function" ? callback(res) : void 0;
      }
    });
  }
};