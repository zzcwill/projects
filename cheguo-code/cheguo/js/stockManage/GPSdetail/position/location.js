function getArgs () {
  var params,items,name,value,args;
  args = {};
  params = location.search ? location.search.substr('1') : '';
  items = params.length > 0 ? params.split('&') : [];
  items.forEach(function (item) {
    var content = item.split('=');
    if(content.length > 0){
      name = content[0];
      value = content[1];
      args[name] = value;
    }
  });
  return args;
}
function tip(content){
  var html = '<div class="tip">' + content + '</div>';
  $('body').append(html);
  var height = $(window).height();
  var tipHeight = $('.tip').height();
  var width = $(document).width();
  $('.tip').css({
    width: '200px',
    height: 'auto',
    padding: '10px 15px',
    backgroundColor: '#1ab394',
    color: '#fff',
    fontSize: '14px',
    textAlign: 'center',
    position: 'absolute',
    top: height/2 - tipHeight/2 + 'px',
    left: width/2 - 100 + 'px',
    borderRadius: '4px',
    display: 'none'
  }).fadeIn();
  var timer = setTimeout(function () {
    $('.tip').fadeOut();
  },2000);
  $('.tip').on('mouseout',function (){
    setTimeout(function () {
      $('.tip').fadeOut();
    },500);
  }).on('mouseover',function () {
    clearTimeout(timer);
  });
}
var imei = getArgs()['imei'];
$.ajax({
  url: '/api/gpsAPIController/getGpsMap',
  dataType: 'json',
  type: 'post',
  data: {
    imei: imei
  },
  success: function (data) {
    if(data.code == 10000){
      var res = data;
      if(typeof data == 'string'){
        res = JSON.parse(data);
      }
      if(res.data[0].dom){
        $("#iframe")[0].srcdoc = res.data[0].dom;
      }else{
        tip('未获取定位数据，请试试刷新页面后查看！')
      }
    }else if(data.code === 20000){
      tip(data.message);
    }
  }
});