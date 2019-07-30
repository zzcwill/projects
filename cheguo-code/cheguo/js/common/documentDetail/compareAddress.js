//获取地址参数
var getArgs = function () {
    var url, items, i,item,name,value;
    url = (location.search.length > 0 ? location.search.substr(1) : '');
    items = (url.length > 1 ? url.split("&") : []);
    i=0;
    var args={};
    while (i<items.length) {
        item=items[i].split("=");
        name=decodeURIComponent(item[0]);
        value=decodeURIComponent(item[1]);
        if(name.length){
            args[name]=value;
        }
        i++;
    }
    return args;
};
//console.log(getArgs()['keepAddrLongitude'],getArgs()['keepAddrLatitude']);
var map = new BMap.Map('map');//创建Map实例
map.centerAndZoom(new BMap.Point(getArgs()['keepAddrLongitude'],getArgs()['keepAddrLatitude']), 12);//初始化地图,设置地图中心点地图等级
//保管地keepAddrLatitude
var keepPoint = new BMap.Point(getArgs()['keepAddrLongitude'],getArgs()['keepAddrLatitude']);
var keepPic = new BMap.Icon('../../../images/red_icon.png', new BMap.Size(24, 24));
var keepMarker = new BMap.Marker(keepPoint, {icon: keepPic});

//上传照片地址
var uploadPoint = new BMap.Point(getArgs()['photographLongitude'],getArgs()['photographLatitude']);
var uploadPic = new BMap.Icon('../../../images/picture_icon.png', new BMap.Size(24, 24));
var uploadMarker = new BMap.Marker(uploadPoint, {icon: uploadPic});

//圆
var circleOption = {
    strokeColor: '#B5D2EC',
    fillColor: '#B5D2EC',
    strokeWeight: 1,
    strokeStyle: "solid",
    fillOpacity: 0.6,
    enableClicking: false
};
var circle = new BMap.Circle(keepPoint, 5000, circleOption);

//添加覆盖物
map.addOverlay(keepMarker);
map.addOverlay(uploadMarker);
map.addOverlay(circle);
