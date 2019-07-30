/*
  解析地址栏参数,返回对应值
    @params: name: key值
 */
const getArgs = name => {
  let args = {};
  var query = location.search.length > 1 ? location.search.substr(1) : '';
  var params = query.length > 0 ? query.split('&') : [];
  if(params.length > 0){
    params.forEach((item) => {
      let entries = item.split('=');
      let name = decodeURI(entries[0]);
      let values = decodeURI(entries[1]);
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
const gpsDetail = (detail,type=1) => {
  if (!Array.isArray(detail)) throw new Error('params must be Array');
  if (detail.length < 1)  return '';
  let statusType = ['离线','在线'][Number(detail.statusType)];
  function track (o) {
    if(type == 1) {
      return `<tr><td>电量: ${o.power||''}%</td><td>${['离线','在线'][Number(o.statusType)]||''} > ${o.dayCount||''} 天</td></tr>`
    }else{
      return '';
    }
  }
  let detailBody = ['<div class="gps-detail">'];
  let header = `
        <div class="detail-header">
            <p>设备信息</p>
        </div>`;
  detailBody.push(header);
  detail.forEach((o)=> {
    let detail = JSON.stringify(o);
    let detailList = `
    <div class="detail-body" data-detail= '${detail}'>
            <table>
                <tbody>
                    <tr>
                        <td colspan="2">IMEI: ${o.imei||''}</td>
                    </tr>
                    <tr>
                        <td>厂家: ${o.supplierName||''}</td>
                        <td>产品类型: ${gpsType(o.productType)||''}</td>
                    </tr>
                    <tr>
                        <td>规格型号: ${o.productSpec||''}</td>
                        <td>SIM: ${o.sim||''}</td>
                    </tr>
                    <tr>
                        <td colspan="2">设备状态</td>
                    </tr>
                     ${track(o)}
                    <tr>
                        <td colspan="2">激活时间: ${o.serviceStartTime||''}</td>
                    </tr>
                    <tr>
                        <td colspan="2">到期时间: ${o.serviceEndTime || ''}</td>
                    </tr>
                </tbody>
            </table>
          </div>
  `;
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
const gpsInfo = (infoList) => {
  if(!Array.isArray(infoList)) throw new Error('param must be Array');
  if(infoList.length < 1) return;
  let info = ['<div class="gps-info"><dl>'];
  infoList.forEach((item) => {
    let infoDetail = `
      <dd title=${item.title}>
                    <i class="${item.className}"></i>
                    <span>${item.title} (${item.value})</span>
                </dd>
    `;
    info.push(infoDetail);
  });
  info.push('</dl></div>')
  return info.join('');
};

/*
* 百度地图自定义覆盖物
* @param: center 位置,经纬度 Object: {lng,lat} --> 自动转换成页面像素坐标
* @param: className class名,用于定义覆盖物样式
* @param: width 覆盖物宽度  确保覆盖物中心点位于定位点
* @param: height 覆盖物高度 (可不填,不填默认width)
* */
const overlay = (center, className, width, height, direction) => {
  function SquareOverlay(center, className, width, height ,direction) {
    this._center = center;
    this._width = width;
    this._height = height || width;
    this._className = className;
    this._direction = direction
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
    this._div.style.top = position.y - (this._height) / 2 + "px";
    this._div.style.transform = 'scale(0.14) rotate('+ this._direction +'deg)';
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
  return new SquareOverlay(center, className, width, height,direction);
};

/*
* gps地图infoWindow信息窗口
* */
const infoWindow = (detail) => {

  let infoWIndow = new BMap.InfoWindow(`
  <table>
                <tbody>
                   <tr>
                        <td>IMEI: </td>
                        <td>${detail.imei}</td>
                    </tr>
                    <tr>
                        <td>设备名称:</td>
                        <td>${detail.supplierName}</td>
                    </tr>
                    <tr>
                        <td>电话: </td>
                        <td>${detail.customerPhone}</td>
                    </tr>
                    <tr>
                        <td>速度: </td>
                        <td>${detail.speed}</td>
                    </tr>
                    <tr>
                        <td>定位时间: </td>
                        <td>${detail.positionTime}</td>
                    </tr>
                </tbody>
            </table>
`,{
    width: 100,
    height: 0,
    title : "设备信息"
  });
  map.openInfoWindow(infoWIndow,point);
};

/*
* post请求
* @param: url 请求接口 (required)
* @param: data 请求参数
* */
const Fetch = (url,data={}) => {
  let realUrl = url.substr(5);
  return new Promise((resolve,reject) => {
    $.post(url,data, (res) => {
      let data = res;
      if(data.code == 20000) {
        reject(res);
        return tip({
          message: data.message || "<code>" + realUrl + "</code><br /> 接口异常！！！"
        });
      }else if (data.code === 10000) {
        if (typeof data == 'string') {
          data = JSON.parse(res);
        }
        resolve(data);
      }else {
        reject(res);
      }
    })
  });
};
/*
* 获取时间 -> 获得相对于今天的时间 格式:yyyy-MM-dd  (默认返回今天)
* @param: Object {year,month,day}
*                 year: 可选 (Number) -> N年后 ,可以为负数,负数即为N年前, 默认今年
*                 month: 可选 (Number) -> N月后 ,可以为负数,负数即为N月前, 默认当月
*                 day: 可选 (Number) -> N天后 ,可以为负数,负数即为N天前, 默认当天
* */
const getDate = ({year,month,day}={}) => {
  let date = new Date();
  let [nowYear,nowMonth,today] = [date.getFullYear(),date.getMonth(),date.getDate()];
  if(year) date.setFullYear(nowYear + year);
  if(month) date.setMonth(nowMonth + month);
  if(day) date.setDate(today + day);
  let outYear = date.getFullYear();
  let outMonth = date.getMonth() < 9 ? '0' + (date.getMonth()+1) : date.getMonth()+1;
  let outDay = date.getDate() < 10 ? '0' + date.getDate() : date.getDate() ;
  return outYear + '-' + outMonth + '-' + outDay;
};

/*
* 信息提示
* @param: content Object {message,width,height}
*
* */
function tip(content){
  var html = '<div class="glob-tip">' + content.message || "消息提示" + '</div>';
  $('body').append(html);
  var height = $(window).height();
  var $globTip = $('.glob-tip');
  var tipHeight = $globTip.height();
  //var width = $(document).width();
  $globTip.css({
    width: '300px',
    height: 'auto',
    padding: '10px 15px',
    backgroundColor: '#1ab394',
    color: '#fff',
    fontSize: '14px',
    textAlign: 'center',
    position: 'absolute',
    top: height/2 - tipHeight/2 + 'px',
    left: '50%',
    marginLeft: '-150px',
    borderRadius: '6px',
    display: 'none'
  }).fadeIn();
  var timer = setTimeout(function () {
    $globTip.fadeOut();
    $globTip.remove();
  },2000);
  $globTip.on('mouseout',function (){
    setTimeout(function () {
      $globTip.fadeOut();
      $globTip.remove();
    },500);
  }).on('mouseover',function () {
    clearTimeout(timer);
  });
}

//枚举
const gpsType = value => {
  return ['','有线','无线'][value];
};
//定位类型
const positionType = value => {
  return ['基站定位-LBS','卫星定位-GPS','WIFI定位-WIFI','蓝牙定位-BEACON'][value];
}

//车辆状态

const carStatus = value => {
  return ['icon-car default','icon-car running','icon-car stopped'][value]
};

