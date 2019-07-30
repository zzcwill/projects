'use strict';
var info = getArgs('info');
if (info) {
  info = JSON.parse(info);
} else {
  info = [];
}

var positionList = [],detailList = [];

//初始化地图
var map = new BMap.Map('map');
var point = new BMap.Point(116.404, 39.915);
map.centerAndZoom(point, 15);
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
var getBaseInfo = Fetch('/api/gpsAPIController/getLoanGpsLocation', { projectId: getArgs('projectId')}).then(function (res) {
  if (res.data && res.data.length > 0) {
    positionList = res.data;
    for(var i = 0;i < positionList.length;i++) {
      (function (i) {
        var list = info.filter(function (item) {
          return item.imei == positionList[i].imei
        });
        detailList.push(Object.assign({},positionList[i],list[0]));
      })(i)
    }
  } else {
    detailList = [{}];
    tip({
      message: res.message || '未查询到定位信息,请尝试刷新重试'
    });
  }
});
getBaseInfo.then(function () {
  $('#list').append(gpsDetail(detailList));
  getLoaction(detailList[0]);
  $($('.detail-body')[0]).addClass('active');
});

//选择不同设备
$(document).on('click','.detail-body',function () {
  var detail = $(this).data('detail');
  $(this).addClass('active').siblings().removeClass('active');
  getLoaction(detail);
});
//信息窗口提示
function infoMessage(detail) {
  var infoWIndow = new BMap.InfoWindow('\n  <table>\n                <tbody>\n                   <tr>\n                        <td>IMEI: </td>\n                        <td>' + (detail.imei || '') + '</td>\n                    </tr>\n                    <tr>\n                        <td>\u8BBE\u5907\u540D\u79F0:</td>\n                        <td>' + (detail.customerName || '--') + '</td>\n                    </tr>\n                    <tr>\n                        <td>\u7535\u8BDD: </td>\n                        <td>' + (detail.customerPhone || '') + '</td>\n                    </tr>\n                    <tr>\n                        <td>\u901F\u5EA6: </td>\n                        <td>' + (detail.speed ? (detail.speed + "km/h") : "暂无速度" )+ '</td>\n                    </tr>\n                    <tr>\n                        <td>\u5B9A\u4F4D\u65F6\u95F4: </td>\n                        <td>' + (detail.positionTime || '未知') + '</td>\n                    </tr>\n                </tbody>\n            </table>\n', {
    width: 100,
    height: 0,
    title: "设备信息"
  });
  map.openInfoWindow(infoWIndow, new BMap.Point(detail.longitude,detail.latitude));
}

//展示定位信息
function getLoaction (detailList) {
  map.clearOverlays();
  if(detailList.longitude) {
    var point = new BMap.Point(detailList.longitude, detailList.latitude);
    map.panTo(point);
    var marker = overlay(point, carStatus(detailList.statusType), 100, 280);
    map.addOverlay(marker);
    $('#gps_map_address').html(detailList.positionName);
    infoMessage(detailList, point);
  }else{
    tip({
      message: '未查询到定位信息'
    });
    $('#gps_map_address').html('未查询到定位信息');
  }
}
