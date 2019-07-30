'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

//地图初始化
var map = new BMap.Map('map');
map.centerAndZoom(new BMap.Point(116.399, 39.910), 13);
map.enableScrollWheelZoom();
map.enableContinuousZoom();
//添加地图控件
var navigationControl = new BMap.NavigationControl({
  anchor: BMAP_ANCHOR_TOP_LEFT,
  type: BMAP_NAVIGATION_CONTROL_LARGE,
  enableGeolocation: true
});
map.addControl(navigationControl);

var detail = getArgs('detail');
if (detail) {
  detail = JSON.parse(detail);
} else {
  detail = {};
}
$('#list').html(gpsDetail([detail], 2));

var _detail = detail,
    imei = _detail.imei,
    supplierId = _detail.supplierId,
    supplierName = _detail.supplierName,
    productType = _detail.productType;
var timer = null,
    speed = 1,
    playStatus = 'stop';

var trackDetail = [],
    trackPoints = [],
    positionNames = [];
//获取设备状态信息
Fetch('/api/gpsAPIController/getGpsInfo', { imei: imei, supplierId: supplierId, supplierName: supplierName }).then(function (res) {
  if (res.data && res.data.length > 0) {
    var data = res.data[0];
    var detailList = Object.assign({}, detail, data);
    $('#list').html(gpsDetail([detailList], 2));
  }
}).catch(function () {});

//初始化绘制轨迹
getInitDay();
var compare = function () {
  var cache = {
    start: '',
    end: ''
  };
  return function (startTime, endTime) {
    if (cache['start'] == startTime && cache['end'] == endTime) {
      return;
    } else {
      return cache = { start: startTime, end: endTime };
    }
  };
}();
compare($('input[name=startTime]').val(), $('input[name=endTime]').val());
drawAll('run');

/*
 * 播放控制:
 *   暂停/播放
 *   播放速度 1x 2x 4x 8x
 * */
$('.play').on('click', function () {
  playStatus = $(this).parent('.play-control').hasClass('active') ? 'stop' : 'run';
  $(this).parent('.play-control').toggleClass('active');
  trackPlayReback(trackDetail, playStatus, speed);
});
$('#speed').on('click', 'li', function () {
  clearInterval(timer);
  $(this).addClass('active').siblings('li.active').removeClass('active');
  speed = $(this).data('speed');
  trackPlayReback(trackDetail, playStatus, speed);
});

/*
* 获取轨迹点
* */
$('#getPoint').on('click', function () {
  if ($('.play-control').hasClass('active')) {
    return tip({
      message: '请先暂停再查询轨迹'
    });
  }
  if (compare($('input[name=startTime]').val(), $('input[name=endTime]').val())) {
    drawAll();
  }
});

$('.date').fdatepicker({
  format: 'yyyy-mm-dd'
});

/*
 * 侧边详细地址栏 隐藏/显示
 * */
$('#showButton').on('click', function () {
  $(this).toggleClass('show');
  if ($(this).hasClass('show')) {
    $(this).prev('.address').animate({ right: 0 });
    $(this).animate({ right: '306px' });
  } else {
    $(this).prev('.address').animate({ right: '-300px' });
    $(this).animate({ right: '12px' });
  }
});

/*
 * 初始化总时长格式
 * @param: 播放总时间 (Number)
 * */
function init(totalTime) {
  if (totalTime > 0) {
    var h = Math.floor(totalTime / 3600);
    var min = Math.floor((totalTime - h*3600) / 60);
    var sec = Math.floor(totalTime - h * 3600 - min * 60);
    h = h > 9 ? h : '0' + h;
    min = min > 9 ? min : '0' + min;
    sec = sec > 9 ? sec : '0' + sec;
    return h + ':' + min + ':' + sec;
  } else {
    $('.play-control').removeClass('active');
    return '00:00:00';
  }
}

/*
 * 时间戳 返回已经播放的时长 hh:mm:ss 格式
 * @param: speed 播放速度
 * */
function timeline() {
  var speed = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

  var finished = $('#played').html();
  finished = finished.split(':').map(function (item) {
    return Number(item);
  });

  var _finished = finished,
      _finished2 = _slicedToArray(_finished, 3),
      h = _finished2[0],
      min = _finished2[1],
      sec = _finished2[2];

  sec += speed;
  if (sec > 59) {
    min += 1;
    sec = sec - 60;
  }
  if (min > 59) {
    h += 1;
    min = min - 60;
  }
  h = h > 9 ? h : '0' + h;
  min = min > 9 ? min : '0' + min;
  sec = sec > 9 ? sec : '0' + sec;
  return h + ':' + min + ':' + sec;
}

/*
 * 查询轨迹点数据后初始化显示
 * @param: playStatus 是否直接开始绘制 run:绘制 默认(不绘制)
 * */
function drawAll(status) {
  getTrackPoint({
    startTime: $('input[name=startTime]').val(),
    endTime: $('input[name=endTime]').val(),
    imei: imei,
    supplierId: supplierId,
    supplierName: supplierName
  }).then(function (_ref) {
    var trackDetails = _ref.trackDetails,
        trackPoint = _ref.trackPoint,
        positionName = _ref.positionName,
        base = _ref.base,
        gps = _ref.gps,
        wifi = _ref.wifi;

    trackDetail = trackDetails;
    trackPoints = trackPoint;
    positionNames = positionName;
    if (!$('#showButton').hasClass('show')) {
      $('#showButton').addClass('show').animate({ right: '306px' });
      $('.address').animate({ right: 0 });
    }
    if (productType == 1) {
      $('#address_list').html('<h3 class="special-deal">有线设备暂时不支持解析详细地址</h3>');
    } else {
      getPosition(positionNames);
    }
    var infoList = [{ title: '卫星定位', className: 'marker satellite', value: gps }, { title: '基站定位', className: 'marker base-station', value: base }, { title: 'WIFI定位', className: 'marker wifi', value: wifi }];
    $('#info').html(gpsInfo(infoList));
    $('#allTime').html(init(trackDetail.length));
    if (status == 'run') {
      $('.play-control').addClass('active');
      playStatus = 'run';
      trackPlayReback(trackDetail, playStatus, speed);
    }
  }).catch(function (message) {
    tip({
      message: message
    });
    var infoList = [{ title: '卫星定位', className: 'marker satellite', value: 0 }, { title: '基站定位', className: 'marker base-station', value: 0 }, { title: 'WIFI定位', className: 'marker wifi', value: 0 }];
    $('#info').html(gpsInfo(infoList));
    if (productType == 1) {
      $('#address_list').html('<h3 class="special-deal">有线设备暂时不支持解析详细地址</h3>');
    } else {
      $('#address_list').html('<h3 class="special-deal">未查询到轨迹信息</h3>');
    }
  });
}

var _ref2 = [0],
    playNo = _ref2[0],
    marker = _ref2[1];

var $playCircle = $('#play_circle');
var width = $('.play-line').width();
var $played = $('#played');

/*
* 播放控制
* @param: track 轨迹点
* @param: status 播放状态 stop -> 停止 run -> 绘制
* @param: speed  播放速度控制  1X/2X/4X/8X
* */
function trackPlayReback(track, status) {
  var speed = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;

  if (track.length > 0) {
    if (status == 'stop') {
      clearInterval(timer);
      return;
    }
    timer = setInterval(function () {
      if (playNo < track.length) {
        controlLine(track);
        trackLine(track);
        playNo += 1;
      } else {
        clearInterval(timer);
        playStatus = 'stop';
        $played.html('00:00:00');
        $playCircle.css('left', '-8px');
        $('.play-control').removeClass('active');
        playNo = 0;
        tip({
          message: '轨迹播放完成'
        });
      }
    }, 1000 / speed);
  } else {
    $('.play-control').removeClass('active');
    playStatus = 'stop';
    layer.alert('轨迹回放完成');
    //tip({
    //  message: '轨迹播放完成'
    //});
  }
}
/*
* 播放轴控制
* */
function controlLine(trackDetail) {
  var hasFinished = timeline(1);
  var left = $playCircle.css('left');
  var spe = width / trackDetail.length + (left.substr(0, left.length - 2) - 0);
  $playCircle.css('left', spe + 'px');
  $played.html(hasFinished);
}
/*
* 播放轨迹显示
* */
function trackLine(trackDetail) {
  infoMessage(trackDetail[playNo], trackPoints[playNo]);
  if (playNo > 0) {
    //绘制折线
    var lines = [trackPoints[playNo - 1], trackPoints[playNo]];
    var polyline = new BMap.Polyline(lines, { strokeColor: "#00D914", strokeWeight: 4, strokeOpacity: 0.7 });
    map.addOverlay(polyline);
  }
  //清除旧覆盖物并添加新覆盖物
  if (marker) {
    map.removeOverlay(marker);
  }
  marker = overlay(trackPoints[playNo], carStatus(1), 100, 280, trackDetail[playNo].direction);
  $($('#address_list > li').eq(playNo)).siblings().find('.round,.title').removeClass('running');
  $($('#address_list > li').eq(playNo)).find('.round,.title').addClass('running');
  map.addOverlay(marker);
  map.panTo(trackPoints[playNo]);
}

/*
* 初始化时间显示
* */
function getInitDay() {
  $('input[name=startTime]').val(getDate({ day: -1 }));
  $('input[name=endTime]').val(getDate());
}

/*
* 获取轨迹点 返回详情,解析好的经纬度数组,详细地址数组,定位方式统计信息
* @param: startTime: 开始时间
* @param: endTime: 结束时间
* @param: imei: imei号
* @param: supplierId: 供应商id
* @param: supplierName: 供应商名称
* */
function getTrackPoint(_ref3) {
  var startTime = _ref3.startTime,
      endTime = _ref3.endTime,
      imei = _ref3.imei,
      supplierId = _ref3.supplierId,
      supplierName = _ref3.supplierName;

  //每次查询初始化
  map.clearOverlays();
  trackDetail = [];
  trackPoints = [];
  positionNames = [];
  playNo = 0;
  $('#allTime').html('00:00:00');
  $('#played').html('00:00:00');
  $('#play_circle').css('left', '-8px');
  var trackDetails = [],
      trackPoint = [],
      positionName = [];
  var gps = 0,
      base = 0,
      wifi = 0;

  var dataYear = Date.parse(endTime) - Date.parse(startTime);
  return new Promise(function (resolve, reject) {
    if (Date.parse(endTime) > Date.parse(getDate()) || Date.parse(startTime) > Date.parse(getDate())) {
      reject('开始时间,结束时间不能大于今天', 0);
      return;
    }
    if (Date.parse(startTime) > Date.parse(endTime)) {
      reject('开始时间不能大于结束时间', 0);
      return;
    }
    if (productType == 2 && dataYear > 7948800000) {
      reject('无线设备只能查询三个月内的轨迹', 0);
      return;
    }
    if (productType == 1 && dataYear > 604800000) {
      reject('有线设备只能查询七天的轨迹', 0);
      return;
    }
    Fetch('/api/gpsAPIController/getGpsTrack', {productType:productType,startTime: startTime, endTime: endTime, imei: imei, supplierId: supplierId, supplierName: supplierName }).then(function (res) {
      if (res.data.length > 0) {
        trackDetails = res.data;
        res.data.forEach(function (item) {
          trackPoint.push(new BMap.Point(item.longitude, item.latitude));
          positionName.push(item.positionName);
          if (item.positionType == 0) {
            base += 1;
          } else if (item.positionType == 1) {
            gps += 1;
          } else if (item.positionType == 2) {
            wifi += 1;
          }
        });
        resolve({ trackDetails: trackDetails, trackPoint: trackPoint, positionName: positionName, base: base, gps: gps, wifi: wifi });
      } else {
        reject('未查询到轨迹信息', 0);
        return;
      }
    });
  });
}

/*
* 侧边栏详细地址
* */
function getPosition(list) {
  var posintionList = [];
  if (list.length > 0) {
    for (var i = 0; i < list.length; i++) {
      posintionList.push('<li><span class="round"></span><span class="title">' + (list[i] || '') + '</span></li>');
    }
  }
  $('#address_list').html(posintionList.join(''));
}

/*
 * 信息窗口提示
 * @param: detail 数据信息
 * @param: point  跟随轨迹点
 * */
function infoMessage(detail, point) {
  var infoWIndow = new BMap.InfoWindow('\n  <table>\n                <tbody>\n                   <tr>\n                        <td>\u5B9A\u4F4D\u7C7B\u578B: </td>\n                        <td>' + positionType(detail.positionType) + '</td>\n                    </tr>\n                    <tr>\n                        <td>\u5B9A\u4F4D\u65F6\u95F4:</td>\n                        <td>' + detail.positionTime + '</td>\n                    </tr>\n                    <tr>\n                        <td>\u901F\u5EA6: </td>\n                        <td>' + (detail.speed ? (detail.speed + "km/h") : "暂无速度" ) + '</td>\n                    </tr>\n                    <tr>\n                        <td>\u5B9A\u4F4D\u5730\u70B9: </td>\n                        <td>' + detail.positionName + '</td>\n                    </tr>\n                </tbody>\n            </table>\n', {
    width: 150,
    height: 0,
    title: "序号" + (playNo + 1)
  });
  map.openInfoWindow(infoWIndow, point);
}
