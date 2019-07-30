/**
 * Created by apple on 18/1/13.
 */
let detail = getArgs('detail');
if(detail) {
  detail = JSON.parse(detail)
}else{
  detail = {};
}
let {imei,supplierId,supplierName} = detail;
let [positionData,timeDate] = [{},{}];
//let {imei,supplierId,supplierName} = {imei:1,supplierId:3,supplierName:5};
//初始化地图
const map = new BMap.Map('map');
let point = new BMap.Point(116.404, 39.915);
map.centerAndZoom(point, 12);
//添加地图控件
const navigationControl = new BMap.NavigationControl({
  anchor: BMAP_ANCHOR_TOP_LEFT,
  type: BMAP_NAVIGATION_CONTROL_LARGE,
  enableGeolocation: true
});
map.addControl(navigationControl);

//页面初始化展示

let statusDetail = [
  {title: '行驶', className: 'marker running', value: 0},
  {title: '静止', className: 'marker stopped', value: 0},
  {title: '离线', className: 'marker default', value: 0},
  {title: '未激活', className: 'disabled', value: 0}
];
$('#info').append(gpsInfo(statusDetail));

//获取定位信息
let position = Fetch('/api/gpsAPIController/getGpsLocation',{imei,supplierId,supplierName}).then((res) => {
  if(res.data && res.data.length > 0){
    positionData = res.data[0]
  }else {
    tip({
      message: res.message || '未查询到定位信息,请尝试刷新重试'
    })
  }
});
//获取激活时间
let getGpsInfo = Fetch('/api/gpsAPIController/getGpsInfo',{imei,supplierId,supplierName}).then((res) => {
  if(res.data && res.data.length > 0) {
    timeDate = res.data[0];
  }
});
Promise.all([position,getGpsInfo]).then(function () {
  let detailList = Object.assign({},detail,positionData,timeDate);
  let initPoint = new BMap.Point(detailList.longitude, detailList.latitude);
  map.centerAndZoom(initPoint, 15);
  let marker = overlay(initPoint,carStatus(detailList.statusType),100,280);
  map.addOverlay(marker);
  $('#gps_map_address').html(detailList.positionName);
  $('#list').append(gpsDetail([detailList]));
  infoMessage(detailList,initPoint);
});


//信息窗口提示
function infoMessage(detail,point) {
  let infoWIndow = new BMap.InfoWindow(`
  <table>
                <tbody>
                   <tr>
                        <td>IMEI: </td>
                        <td>${detail.imei || ''}</td>
                    </tr>
                    <tr>
                        <td>设备名称:</td>
                        <td>${detail.customerName || ''}</td>
                    </tr>
                    <tr>
                        <td>电话: </td>
                        <td>${detail.customerPhone || ''}</td>
                    </tr>
                    <tr>
                        <td>速度: </td>
                        <td>${detail.speed || ''}</td>
                    </tr>
                    <tr>
                        <td>定位时间: </td>
                        <td>${detail.positionTime || ''}</td>
                    </tr>
                </tbody>
            </table>
`, {
    width: 100,
    height: 0,
    title: "设备信息"
  });
  map.openInfoWindow(infoWIndow, point);
}

