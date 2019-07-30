'use strict';

/*
  解析地址栏参数,返回对应值
    @params: name: key值
 */
var getArgs = function getArgs(name) {
  var args = {};
  var query = location.search.length > 1 ? location.search.substr(1) : '';
  var params = query.length > 0 ? query.split('&') : [];
  if (params.length > 0) {
    params.forEach(function (item) {
      var entries = item.split('=');
      var name = decodeURI(entries[0]);
      var values = decodeURI(entries[1]);
      args[name] = values;
    });
    return args[name];
  }
};
/*
* 生成gps详情
* @param: detail (GPS数据信息) required Array like [{}];
* @param: type (类型 1:定位 2: 轨迹回放)
* */
var gpsDetail = function gpsDetail(detail) {
  var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

  if (!Array.isArray(detail)) throw new Error('params must be Array');
  if (detail.length < 1) return '';
  var statusType = ['离线', '在线'][Number(detail.statusType)];
  function track(o) {
    var statusType = '';
    if(o.statusType) {
      statusType = '<td>' + (['离线', '在线'][Number(o.statusType)] || '') + ' > ' + (o.dayCount || '') + ' \u5929</td>'
    }else {
      statusType = '';
    }
    if (type == 1) {
      return '<tr><td>\u7535\u91CF: ' + (o.power ? o.power + '%' : '--') +'</td>' + statusType + '</tr>';
    } else {
      return '';
    }
  }
  var detailBody = ['<div class="gps-detail">'];
  var header = '\n        <div class="detail-header">\n            <p>\u8BBE\u5907\u4FE1\u606F</p>\n        </div>';
  detailBody.push(header);
  detail.forEach(function (o) {
    var detail = JSON.stringify(o);
    var detailList = '\n    <div class="detail-body" data-detail= \'' + detail + '\'>\n            <table>\n                <tbody>\n                    <tr>\n                        <td colspan="2">IMEI: ' + (o.imei || '') + '</td>\n                    </tr>\n                    <tr>\n                        <td>\u5382\u5BB6: ' + (o.supplierName || '') + '</td>\n                        <td>\u4EA7\u54C1\u7C7B\u578B: ' + (gpsType(o.productType) || '') + '</td>\n                    </tr>\n                    <tr>\n                        <td>\u89C4\u683C\u578B\u53F7: ' + (o.productSpec || '') + '</td>\n                        <td>SIM: ' + (o.sim || '') + '</td>\n                    </tr>\n                    <tr>\n                        <td colspan="2">\u8BBE\u5907\u72B6\u6001</td>\n                    </tr>\n                     ' + track(o) + '\n                    <tr>\n                        <td colspan="2">\u6FC0\u6D3B\u65F6\u95F4: ' + (o.serviceStartTime || '未知') + '</td>\n                    </tr>\n                    <tr>\n                        <td colspan="2">\u5230\u671F\u65F6\u95F4: ' + (o.serviceEndTime || '未知') + '</td>\n                    </tr>\n                </tbody>\n            </table>\n          </div>\n  ';
    detailBody.push(detailList);
  });
  detailBody.push('</div>');
  return detailBody.join('');
};

/*
* 生成info详情
* @param: infoList required:(Array) 状态类型
*         eg: [{
*           title     --> 标题
*           className --> 样式 多个class用空格分割;
*           value     --> value值
*         }]
* */
var gpsInfo = function gpsInfo(infoList) {
  if (!Array.isArray(infoList)) throw new Error('param must be Array');
  if (infoList.length < 1) return;
  var info = ['<div class="gps-info"><dl>'];
  infoList.forEach(function (item) {
    var infoDetail = '\n      <dd title=' + item.title + '>\n                    <i class="' + item.className + '"></i>\n                    <span>' + item.title + ' (' + item.value + ')</span>\n                </dd>\n    ';
    info.push(infoDetail);
  });
  info.push('</dl></div>');
  return info.join('');
};

/*
* 百度地图自定义覆盖物
* @param: center 位置,经纬度 Object: {lng,lat} --> 自动转换成页面像素坐标
* @param: className class名,用于定义覆盖物样式
* @param: width 覆盖物宽度  确保覆盖物中心点位于定位点
* @param: height 覆盖物高度 (可不填,不填默认width)
* */
var overlay = function overlay(center, className, width, height, direction) {
  function SquareOverlay(center, className, width, height, direction) {
    this._center = center;
    this._width = width;
    this._height = height || width;
    this._className = className;
    this._direction = direction;
  }
  SquareOverlay.prototype = new BMap.Overlay();
  SquareOverlay.prototype.initialize = function (map) {
    this._map = map;
    var div = document.createElement("div");
    div.className = this._className;
    map.getPanes().markerPane.appendChild(div);
    this._div = div;
    return div;
  };
  SquareOverlay.prototype.draw = function () {
    var position = this._map.pointToOverlayPixel(this._center);
    this._div.style.position = 'absolute';
    this._div.style.left = position.x - this._width / 2 + "px";
    this._div.style.top = position.y - this._height / 2 + "px";
    this._div.style.transform = 'scale(0.14) rotate(' + this._direction + 'deg)';
  };
  // 实现显示方法
  SquareOverlay.prototype.show = function () {
    if (this._div) {
      this._div.style.display = "";
    }
  };
  // 实现隐藏方法
  SquareOverlay.prototype.hide = function () {
    if (this._div) {
      this._div.style.display = "none";
    }
  };
  return new SquareOverlay(center, className, width, height, direction);
};

/*
* gps地图infoWindow信息窗口
* */
var infoWindow = function infoWindow(detail) {

  var infoWIndow = new BMap.InfoWindow('\n  <table>\n                <tbody>\n                   <tr>\n                        <td>IMEI: </td>\n                        <td>' + detail.imei + '</td>\n                    </tr>\n                    <tr>\n                        <td>\u8BBE\u5907\u540D\u79F0:</td>\n                        <td>' + detail.supplierName + '</td>\n                    </tr>\n                    <tr>\n                        <td>\u7535\u8BDD: </td>\n                        <td>' + detail.customerPhone + '</td>\n                    </tr>\n                    <tr>\n                        <td>\u901F\u5EA6: </td>\n                        <td>' + detail.speed + '</td>\n                    </tr>\n                    <tr>\n                        <td>\u5B9A\u4F4D\u65F6\u95F4: </td>\n                        <td>' + detail.positionTime + '</td>\n                    </tr>\n                </tbody>\n            </table>\n', {
    width: 100,
    height: 0,
    title: "设备信息"
  });
  map.openInfoWindow(infoWIndow, point);
};

/*
* post请求
* @param: url 请求接口 (required)
* @param: data 请求参数
* */
var Fetch = function Fetch(url) {
  var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var realUrl = url.substr(5);
  return new Promise(function (resolve, reject) {
    $.post(url, data, function (res) {
      var data = res;
      if (data.code == 20000) {
        reject(res);
        return tip({
          message: data.message || "<code>" + realUrl + "</code><br /> 接口异常！！！"
        });
      } else if (data.code === 10000) {
        if (typeof data == 'string') {
          data = JSON.parse(res);
        }
        resolve(data);
      } else {
        reject(res);
      }
    });
  });
};
/*
* 获取时间 -> 获得相对于今天的时间 格式:yyyy-MM-dd  (默认返回今天)
* @param: Object {year,month,day}
*                 year: 可选 (Number) -> N年后 ,可以为负数,负数即为N年前, 默认今年
*                 month: 可选 (Number) -> N月后 ,可以为负数,负数即为N月前, 默认当月
*                 day: 可选 (Number) -> N天后 ,可以为负数,负数即为N天前, 默认当天
* */
var getDate = function getDate() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      year = _ref.year,
      month = _ref.month,
      day = _ref.day;

  var date = new Date();
  var _ref2 = [date.getFullYear(), date.getMonth(), date.getDate()],
      nowYear = _ref2[0],
      nowMonth = _ref2[1],
      today = _ref2[2];

  if (year) date.setFullYear(nowYear + year);
  if (month) date.setMonth(nowMonth + month);
  if (day) date.setDate(today + day);
  var outYear = date.getFullYear();
  var outMonth = date.getMonth() < 9 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
  var outDay = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
  return outYear + '-' + outMonth + '-' + outDay;
};

/*
* 信息提示
* @param: content Object {message,width,height}
*
* */
function tip(content) {
  var html = '<div class="glob-tip">' + content.message || "消息提示" + '</div>';
  $('body').append(html);
  var height = $(window).height();
  var $globTip = $('.glob-tip');
  var tipHeight = $globTip.height();
  $globTip.fadeIn().css({
    top: height / 2 - tipHeight / 2 + 'px',
    marginLeft: '-150px'
  });
  var timer = setTimeout(function () {
    $globTip.fadeOut();
    $globTip.remove();
  }, 2000);
  $globTip.on('mouseout', function () {
    setTimeout(function () {
      $globTip.fadeOut();
      $globTip.remove();
    }, 500);
  }).on('mouseover', function () {
    clearTimeout(timer);
  });
}

//枚举
var gpsType = function gpsType(value) {
  return ['', '有线', '无线'][value];
};
//定位类型
var positionType = function positionType(value) {
  return ['基站定位-LBS', '卫星定位-GPS', 'WIFI定位-WIFI', '蓝牙定位-BEACON'][value];
};

//车辆状态

var carStatus = function carStatus(value) {
  return ['icon-car default', 'icon-car running', 'icon-car stopped'][value];
};
