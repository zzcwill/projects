var xz;
var jqQasicInformationUrl=comn.getArgs();//获取url参数并且格式化成对象
comn.ajax({
    // 请求地址
    url:interUrl.RenewalSituation.baoDanTateils,
    // 传个参数
    data:$.extend($("#baoDanTateils").values(),{
        id:jqQasicInformationUrl.id
    }),
    // 请求成功
    success: function (res) {
    	console.log(res);
        $("#baoDanTateils").values(res.data);
        /*comn.linkage({
            type: "car",
            level:[
                {
                    el: $("#getBrand"),
                    key: res.data.carBrand,
                    target:$("input[name='carBrandName']")
                }, {
                    el: $("#getCarList"),
                    key: res.data.carMake,
                    target:$("input[name='carMake']")
                }, {
                    el: $("#getCarModel"),
                    key: res.data.carModel,
                    target:$("input[name='carModelName']")
                }
            ]
        });*/
    }
});

// 险种列表
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
var table_1;
xz = function(params) {
    tableDataNew(params, {projectId:jqQasicInformationUrl.projectId}, interUrl.RenewalSituation.baodan);
};