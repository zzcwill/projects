$(function() {
  // login
  $('#login').bind('click', function() {
    $.ajax({
      type: 'post',
      url: '/api/user/login',
      data: {
        name: $('#name').val(),
        password: $('#password').val(),
      },
      dataType: 'json',
      success(res) {
        console.info(res);
      },
      error() {
      },
    });
  });

  $('#logout').bind('click', function() {
    $.ajax({
      type: 'post',
      url: '/api/user/logout',
      data: {},
      dataType: 'json',
      success(res) {
        console.info(res);
      },
      error() {
      },
    });
  });

  $('#getInfo').bind('click', function() {
    $.ajax({
      type: 'post',
      url: '/api/user/userinfo',
      headers: {
        token: getCookie('csrfToken'),
      },
      data: {
        name: $('#name').val(),
      },
      dataType: 'json',
      success(res) {
        console.info(res);
      },
      error() {
      },
    });
  });

  $('#menu').bind('click', function() {
    $.ajax({
      type: 'post',
      url: '/api/menu/list',
      data: {
        menuCode: 'CLS_WEB_BEFORE',
      },
      dataType: 'json',
      success(res) {
        console.info(res);
      },
      error() {
      },
    });
  });

  $('#menu2').bind('click', function() {
    $.ajax({
      type: 'post',
      url: '/api/menu/list2',
      data: {
        menuCode: 'CLS_WEB_BEFORE',
      },
      dataType: 'json',
      success(res) {
        console.info(res);
      },
      error() {
      },
    });
  });

  $('#cnode').bind('click', function() {
    $.ajax({
      type: 'post',
      url: '/api/cnode/list',
      data: {
        page: 2,
        pageSize: 20,
        tab: 'ask',
      },
      dataType: 'json',
      success(res) {
        console.info(res);
      },
      error() {
      },
    });
  });

  // 上传图片1
  $('#upImage1').click(function() {
    $('#upImageInput1').trigger('click');
  });
  $('#upImageInput1').change(function() {
    const formData = new FormData();
    const _this = this;

    formData.append('fileImg', _this.files[0]);
    formData.append('user', $('#name').val());

    $.ajax({
      url: '/api/upload/new',
      type: 'post',
      data: formData,
      processData: false,
      contentType: false,
      success(res) {
        console.info(res);
      },
    });
  });

  $('#loan').bind('click', function() {
    $.ajax({
      type: 'post',
      url: '/api/loan/list',
      data: {
        flowType: 'LOAN_APPLY_FLOW',
      },
      dataType: 'json',
      success(res) {
        console.info(res);
      },
      error() {
      },
    });
  });

  const customerName = '王';
  $('#customerList').bind('click', function() {
    $.ajax({
      type: 'post',
      url: '/api/customer/list',
      data: {
        customerName,
      },
      dataType: 'json',
      success(res) {
        console.info(res);
      },
      error() {
      },
    });
  });
  $('#customerExport').bind('click', function() {
    window.location.href = '/api/customer/export' + '?customerName=' + customerName;
  });

  $('#cache').bind('click', function() {
    $.ajax({
      type: 'post',
      url: '/api/cache/visit',
      data: {},
      dataType: 'json',
      success(res) {
        console.info(res);
      },
      error() {
      },
    });
  });
});

console.info(getCookie('sessionId'));
console.info(getCookie('csrfToken'));
function getCookie(cookie_name) {
  const allcookies = document.cookie;
  // 索引长度，开始索引的位置
  let cookie_pos = allcookies.indexOf(cookie_name);

  // 如果找到了索引，就代表cookie存在,否则不存在
  if (cookie_pos != -1) {
    // 把cookie_pos放在值的开始，只要给值加1即可
    // 计算取cookie值得开始索引，加的1为“=”
    cookie_pos = cookie_pos + cookie_name.length + 1;
    // 计算取cookie值得结束索引
    let cookie_end = allcookies.indexOf(';', cookie_pos);

    if (cookie_end == -1) {
      cookie_end = allcookies.length;

    }
    // 得到想要的cookie的值
    var value = unescape(allcookies.substring(cookie_pos, cookie_end));
  }
  return value;
}
