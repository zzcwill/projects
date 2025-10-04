/**
 * 显示黑色透明提示框
 * @param {string} message - 要显示的消息
 * @param {number} duration - 显示时长(毫秒)，默认2000ms
 */
function openToast(message, duration = 2000) {
  // 创建toast元素
  const toast = document.createElement('div');
  
  // 设置样式
  toast.style.position = 'fixed';
  toast.style.left = '50%';
  toast.style.top = '50%';
  toast.style.transform = 'translate(-50%, -50%)';
  toast.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
  toast.style.color = '#fff';
  toast.style.padding = '10px 20px';
  toast.style.borderRadius = '4px';
  toast.style.fontSize = '14px';
  toast.style.maxWidth = '80%';
  toast.style.textAlign = 'center';
  toast.style.zIndex = '10000';
  toast.style.boxSizing = 'border-box';
  toast.style.wordBreak = 'break-word';
  
  // 设置内容
  toast.textContent = message;
  
  // 添加到body
  document.body.appendChild(toast);
  
  // 定时移除
  setTimeout(() => {
    document.body.removeChild(toast);
  }, duration);
}