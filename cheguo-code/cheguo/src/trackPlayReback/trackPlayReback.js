//地图初始化
const map = new BMap.Map('map');
map.centerAndZoom(new BMap.Point(116.399, 39.910),13);
map.enableScrollWheelZoom();
map.enableContinuousZoom();
//添加地图控件
const navigationControl = new BMap.NavigationControl({
  anchor: BMAP_ANCHOR_TOP_LEFT,
  type: BMAP_NAVIGATION_CONTROL_LARGE,
  enableGeolocation: true
});
map.addControl(navigationControl);

let detail = getArgs('detail');
if(detail) {
  detail = JSON.parse(detail)
}else{
  detail = {}
}
$('#list').html(gpsDetail([detail],2));

let {imei,supplierId,supplierName,productType} = detail;
let [timer,speed,playStatus] = [null,1,'stop'];
let trackDetail = [],
    trackPoints = [],
    positionNames = [];
//获取设备状态信息
Fetch('/api/gpsAPIController/getGpsInfo',{imei,supplierId,supplierName}).then((res) => {
  if(res.data && res.data.length > 0) {
    let data = res.data[0];
    let detailList = Object.assign({},detail,data);
    $('#list').html(gpsDetail([detailList],2));
  }
}).catch(function() {});

//初始化绘制轨迹
getInitDay();
let compare = (function () {
  let cache = {
    start: '',
    end: ''
  };
  return function (startTime,endTime) {
    if(cache['start'] == startTime && cache['end'] == endTime) {
      return;
    }else{
      return cache = {start: startTime,end: endTime};
    }
  }
})();
compare($('input[name=startTime]').val(),$('input[name=endTime]').val());
drawAll('run');

/*
 * 播放控制:
 *   暂停/播放
 *   播放速度 1x 2x 4x 8x
 * */
$('.play').on('click', function () {
  playStatus = $(this).parent('.play-control').hasClass('active') ? 'stop' : 'run';
  $(this).parent('.play-control').toggleClass('active');
  trackPlayReback(trackDetail,playStatus,speed);
});
$('#speed').on('click', 'li', function () {
  clearInterval(timer);
  $(this).addClass('active').siblings('li.active').removeClass('active');
  speed = $(this).data('speed');
  trackPlayReback(trackDetail,playStatus,speed);
});

/*
* 获取轨迹点
* */
$('#getPoint').on('click', () => {
  if($('.play-control').hasClass('active')) {
    return tip({
      message: '请先暂停再查询轨迹'
    })
  }
  if(compare($('input[name=startTime]').val(),$('input[name=endTime]').val())) {
    drawAll();
  }
});

$('.date').fdatepicker({
  format: 'yyyy-mm-dd'
});

/*
 * 侧边详细地址栏 隐藏/显示
 * */
$('#showButton').on('click',function () {
  $(this).toggleClass('show');
  if($(this).hasClass('show')){
    $(this).prev('.address').animate({right: 0});
    $(this).animate({right: '306px'});
  }else{
    $(this).prev('.address').animate({right: '-300px'});
    $(this).animate({right: '12px'});
  }
});

/*
 * 初始化总时长格式
 * @param: 播放总时间 (Number)
 * */
function init(totalTime) {
  if(totalTime > 0) {
    let h = Math.floor(totalTime / 3600);
    let min = Math.floor(totalTime / 60);
    let sec = Math.floor(totalTime - h * 3600 - min * 60);
    h = h > 9 ? h : '0' + h;
    min = min > 9 ? min : '0' + min;
    sec = sec > 9 ? sec : '0' + sec;
    return `${h}:${min}:${sec}`;
  }else {
    $('.play-control').removeClass('active');
    return '00:00:00';
  }
}

/*
 * 时间戳 返回已经播放的时长 hh:mm:ss 格式
 * @param: speed 播放速度
 * */
function timeline(speed = 1) {
  let finished = $('#played').html();
  finished = finished.split(':').map((item) => {
    return Number(item);
  });
  let [h,min,sec] = finished;
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
  return `${h}:${min}:${sec}`;
}

/*
 * 查询轨迹点数据后初始化显示
 * @param: playStatus 是否直接开始绘制 run:绘制 默认(不绘制)
 * */
function drawAll (status) {
  getTrackPoint(
    {
      startTime: $('input[name=startTime]').val(),
      endTime: $('input[name=endTime]').val(),
      imei,
      supplierId,
      supplierName
    }
  ).then(({trackDetails,trackPoint,positionName,base,gps,wifi}) => {
    trackDetail = trackDetails;
    trackPoints = trackPoint;
    positionNames = positionName;
    if(!$('#showButton').hasClass('show')) {
      $('#showButton').addClass('show').animate({ right: '306px' });
      $('.address').animate({ right: 0 });
    }
    if(productType == 1) {
      $('#address_list').html('<h3 class="special-deal">有线设备暂时不支持解析详细地址</h3>')
    }else{
      getPosition(positionNames);
    }
    let infoList = [
      {title: '卫星定位', className: 'marker satellite', value: gps},
      {title: '基站定位', className: 'marker base-station', value: base},
      {title: 'WIFI定位', className: 'marker wifi', value: wifi}
    ];
    $('#info').html(gpsInfo(infoList));
    $('#allTime').html(init(trackDetail.length));
    if(status == 'run') {
      $('.play-control').addClass('active');
      playStatus = 'run';
      trackPlayReback(trackDetail,playStatus,speed);
    }
  }).catch(function (message) {
    tip({
      message: message
    });
    let infoList = [
      {title: '卫星定位', className: 'marker satellite', value: 0},
      {title: '基站定位', className: 'marker base-station', value: 0},
      {title: 'WIFI定位', className: 'marker wifi', value: 0}
    ];
    $('#info').html(gpsInfo(infoList));
    if (productType == 1) {
      $('#address_list').html('<h3 class="special-deal">有线设备暂时不支持解析详细地址</h3>');
    } else {
      $('#address_list').html('<h3 class="special-deal">未查询到轨迹信息</h3>');
    }
  });
}

let [playNo,marker] = [0];
let $playCircle = $('#play_circle');
let width = $('.play-line').width();
let $played = $('#played');

/*
* 播放控制
* @param: track 轨迹点
* @param: status 播放状态 stop -> 停止 run -> 绘制
* @param: speed  播放速度控制  1X/2X/4X/8X
* */
function trackPlayReback (track,status,speed = 1) {
  if(track.length > 0) {
    if (status == 'stop') {
      clearInterval(timer);
      return;
    }
    timer = setInterval(function () {
      if(playNo < track.length ) {
        controlLine(track);
        trackLine(track);
        playNo += 1;
      }else{
        clearInterval(timer);
        playStatus = 'stop';
        $played.html('00:00:00');
        $playCircle.css('left', '-8px');
        $('.play-control').removeClass('active');
        playNo = 0;
        tip({
          message: '轨迹播放完成'
        })
      }
    },1000/speed)
  }else {
    $('.play-control').removeClass('active');
    playStatus = 'stop';
    tip({
      message: '轨迹播放完成'
    })
  }
}
/*
* 播放轴控制
* */
function controlLine(trackDetail) {
  let hasFinished = timeline(1);
  let left = $playCircle.css('left');
  let spe = width / trackDetail.length + (left.substr(0, left.length - 2) - 0);
  $playCircle.css('left', spe + 'px');
  $played.html(hasFinished);
}
/*
* 播放轨迹显示
* */
function trackLine (trackDetail) {
  infoMessage(trackDetail[playNo], trackPoints[playNo]);
  if(playNo > 0){
    //绘制折线
    let lines = [trackPoints[playNo - 1], trackPoints[playNo]];
    let polyline = new BMap.Polyline(lines, {strokeColor: "#00D914", strokeWeight: 4, strokeOpacity: 0.7});
    map.addOverlay(polyline);
  }
  //清除旧覆盖物并添加新覆盖物
  if(marker) {
    map.removeOverlay(marker);
  }
  marker = overlay(trackPoints[playNo], carStatus(1), 100, 280,trackDetail[playNo].direction);
  $($('#address_list > li').eq(playNo)).siblings().find('.round,.title').removeClass('running');
  $($('#address_list > li').eq(playNo)).find('.round,.title').addClass('running');
  map.addOverlay(marker);
  map.panTo(trackPoints[playNo]);
}

/*
* 初始化时间显示
* */
function getInitDay () {
  $('input[name=startTime]').val(getDate({day:-1}));
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
function getTrackPoint ({startTime,endTime,imei,supplierId,supplierName}) {
  //每次查询初始化
  map.clearOverlays();
  trackDetail =[];
  trackPoints = [];
  positionNames = [];
  playNo = 0;
  $('#allTime').html('00:00:00');
  $('#played').html('00:00:00');
  $('#play_circle').css('left', '-8px');
  let trackDetails = [],
      trackPoint = [],
      positionName = [];
  let [gps, base, wifi] = [0,0,0];
  let dataYear = Date.parse(endTime) - Date.parse(startTime);
  return new Promise((resolve,reject) => {
    if(Date.parse(endTime) > Date.parse(getDate()) || Date.parse(startTime) > Date.parse(getDate())) {
      reject('开始时间,结束时间不能大于今天',0);
      return;
    }
    if(Date.parse(startTime) > Date.parse(endTime)) {
      reject('开始时间不能大于结束时间',0);
      return;
    }
    if(dataYear > 31536000000) {
      reject('只能查询一年内的轨迹',0);
      return;
    }
    Fetch('/api/gpsAPIController/getGpsTrack',{startTime,endTime,imei,supplierId,supplierName}).then((res) => {
      if(res.data.length > 0) {
        trackDetails = res.data;
        res.data.forEach((item) => {
          trackPoint.push(new BMap.Point(item.longitude,item.latitude));
          positionName.push(item.positionName);
          if(item.positionType == 0) {
            base += 1
          } else if(item.positionType == 1) {
            gps += 1;
          }else if(item.positionType == 2) {
            wifi += 1;
          }
        });
        resolve({trackDetails,trackPoint,positionName,base,gps,wifi});
      }else{
        reject('未查询到轨迹信息',0);
        return;
      }
    });
  });
}

/*
* 侧边栏详细地址
* */
function getPosition (list) {
  let posintionList = [];
  if(list.length > 0) {
    for (let i = 0;i < list.length;i++) {
      posintionList.push(`<li><span class="round"></span><span class="title">${list[i]||''}</span></li>`)
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
  let infoWIndow = new BMap.InfoWindow(`
  <table>
                <tbody>
                   <tr>
                        <td>定位类型: </td>
                        <td>${positionType(detail.positionType)}</td>
                    </tr>
                    <tr>
                        <td>定位时间:</td>
                        <td>${detail.positionTime}</td>
                    </tr>
                    <tr>
                        <td>速度: </td>
                        <td>${detail.speed}</td>
                    </tr>
                    <tr>
                        <td>定位地点: </td>
                        <td>${detail.positionName}</td>
                    </tr>
                </tbody>
            </table>
`, {
    width: 150,
    height: 0,
    title: "设备信息"
  });
  map.openInfoWindow(infoWIndow, point);
}