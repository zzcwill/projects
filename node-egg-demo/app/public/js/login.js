$(function() {
  // login
  $('#login').bind('click', function() {
    $.ajax({
      type: 'post',
      url: '/api/login',
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
      url: '/api/logout',
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
      url: '/api/userinfo',
      headers: {
        token: getCookie('csrfToken')
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
});

console.info(getCookie('sessionId'))
console.info(getCookie('csrfToken'))
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
