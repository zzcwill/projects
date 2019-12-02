//汉字字母数字下划线
export function validateName(str) {
  const reg = /^[\u4E00-\u9FA5a-zA-Z0-9_]+$/;
  return reg.test(str);
}

//字母数字下划线
export function validateCode(str) {
  const reg = /^\w+$/;
  return reg.test(str);
}

//手机号码
export function validatePhone(str) {
  const reg = /^1\d{10}$/;
  return reg.test(str);
}
