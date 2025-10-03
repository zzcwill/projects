$(document).ready(function() {
  // 验证码按钮倒计时功能
  const getCodeBtn = $('#getCodeBtn');
  const phoneInput = $('#phone');
  let countdown = 60; // 倒计时秒数
  let timer = null;
  
  // 获取验证码按钮点击事件
  getCodeBtn.on('click', function() {
    const phone = phoneInput.val().trim();
    
    // 简单的手机号验证
    if (!/^1\d{10}$/.test(phone)) {
      showToast('请输入正确的手机号码');
      return;
    }
    
    // 禁用按钮并开始倒计时
    startCountdown();
    
    // 这里可以添加发送验证码的AJAX请求
    console.log('发送验证码到手机号：' + phone);
  });
  
  // 开始倒计时
  function startCountdown() {
    // 禁用按钮
    getCodeBtn.prop('disabled', true);
    getCodeBtn.text(`${countdown}秒后重新获取`);
    
    timer = setInterval(function() {
      countdown--;
      getCodeBtn.text(`${countdown}秒后重新获取`);
      
      if (countdown <= 0) {
        // 倒计时结束，恢复按钮状态
        clearInterval(timer);
        getCodeBtn.prop('disabled', false);
        getCodeBtn.text('获取验证码');
        countdown = 60; // 重置倒计时
      }
    }, 1000);
  }
  
  // 登录按钮点击事件
  $('#loginBtn').on('click', function() {
    const phone = phoneInput.val().trim();
    const code = $('#verificationCode').val().trim();
    
    if (!phone) {
      showToast('请输入手机号');
      return;
    }
    
    if (!code) {
      showToast('请输入验证码');
      return;
    }
    
    // 这里可以添加登录验证的AJAX请求
    console.log('提交登录：', { phone, code });
  });
  
  // 微信登录按钮点击事件
  $('#wechatLoginBtn').on('click', function() {
    console.log('微信一键授权登录');
    // 这里可以添加微信授权登录的逻辑
  });
});