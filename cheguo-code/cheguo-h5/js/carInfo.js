//接受dealerId  (车商ID)
$(function() {
  var args;
  args = common.getArgs();
  return common.Ajax({
    url: 'carDealer/get',
    data: args,
    success: function(data) {
      data.addRess = (data.provinceName || "") + (data.cityName || "") + (data.areaName || "") + (data.detailedAddress || "");
      data.time = (data.validStartTime || "") + " 至 " + (data.validEndTime || "");
      return $("#page").nameValues(data);
    }
  });
});
