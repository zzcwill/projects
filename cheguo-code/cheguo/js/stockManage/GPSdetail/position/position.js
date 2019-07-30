'use strict';

var detail = getArgs('detail');
if (detail) {
  detail = JSON.parse(detail);
} else {
  detail = {};
}
var _detail = detail,
    imei = _detail.imei,
    supplierId = _detail.supplierId,
    supplierName = _detail.supplierName;
var positionData = {},
    timeDate = {};
//let {imei,supplierId,supplierName} = {imei:1,supplierId:3,supplierName:5};
//初始化地图

var map = new BMap.Map('map');
var point = new BMap.Point(116.404, 39.915);
map.centerAndZoom(point, 12);
//添加地图控件
var navigationControl = new BMap.NavigationControl({
  anchor: BMAP_ANCHOR_TOP_LEFT,
  type: BMAP_NAVIGATION_CONTROL_LARGE,
  enableGeolocation: true
});
map.addControl(navigationControl);

//页面初始化展示

var statusDetail = [{ title: '行驶', className: 'marker running', value: 0 }, { title: '静止', className: 'marker stopped', value: 0 }, { title: '离线', className: 'marker default', value: 0 }, { title: '未激活', className: 'disabled', value: 0 }];
$('#info').append(gpsInfo(statusDetail));

//获取定位信息
var position = Fetch('/api/gpsAPIController/getGpsLocation', { imei: imei, supplierId: supplierId, supplierName: supplierName }).then(function (res) {
  if (res.data && res.data.length > 0) {
    positionData = res.data[0];
  }
});
//获取激活时间
var getGpsInfo = Fetch('/api/gpsAPIController/getGpsInfo', { imei: imei, supplierId: supplierId, supplierName: supplierName }).then(function (res) {
  if (res.data && res.data.length > 0) {
    timeDate = res.data[0];
  }
});
Promise.all([position, getGpsInfo]).then(function () {
  var detailList = Object.assign({}, detail, positionData, timeDate);
  $('#list').append(gpsDetail([detailList]));
  if(detailList.longitude) {
    var initPoint = new BMap.Point(detailList.longitude, detailList.latitude);
    map.centerAndZoom(initPoint, 15);
    var marker = overlay(initPoint, carStatus(detailList.statusType), 100, 280);
    map.addOverlay(marker);
    $('#gps_map_address').html(detailList.positionName);
    infoMessage(detailList, initPoint);
  }else{
    tip({
      message: '未查询到定位信息'
    });
    $('#gps_map_address').html('未查询到定位信息');
  }
}).catch(function () {
  $('#list').append(gpsDetail([detail]));
});

//信息窗口提示
function infoMessage(detail, point) {
  var infoWIndow = new BMap.InfoWindow('\n  <table>\n                <tbody>\n                   <tr>\n                        <td>IMEI: </td>\n                        <td>' + (detail.imei || '') + '</td>\n                    </tr>\n                    <tr>\n                        <td>\u8BBE\u5907\u540D\u79F0:</td>\n                        <td>' + (detail.customerName || '') + '</td>\n                    </tr>\n                    <tr>\n                        <td>\u7535\u8BDD: </td>\n                        <td>' + (detail.customerPhone || '') + '</td>\n                    </tr>\n                    <tr>\n                        <td>\u901F\u5EA6: </td>\n                        <td>' + (detail.speed ? detail.speed + "km/h" : "暂无速度" ) + '</td>\n                    </tr>\n                    <tr>\n                        <td>\u5B9A\u4F4D\u65F6\u95F4: </td>\n                        <td>' + (detail.positionTime || '未知') + '</td>\n                    </tr>\n                </tbody>\n            </table>\n', {
    width: 100,
    height: 0,
    title: "设备信息"
  });
  map.openInfoWindow(infoWIndow, point);
}
