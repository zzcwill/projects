export function isPhone(rule, value, callback) {
  if (value === '' || value === undefined) {
    callback()
  } else {
    const reg = /0?(1)[0-9]{10}/
    if (!reg.test(value)) {
      callback(new Error('手机号码格式不正确'))
    } else {
      callback()
    }
  }
}

export function isMail(rule, value, callback) {
  if (value === '' || value === undefined) {
    callback()
  } else {
    const reg = /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/
    if (!reg.test(value)) {
      callback(new Error('邮箱格式不正确'))
    } else {
      callback()
    }
  }
}

export function validateId(rule, value, callback) {
  if (value === '' || value === undefined) {
    callback()
  } else {
    const reg = /^\d{17}(\d|X|x)$/
    if (!reg.test(value)) {
      callback(new Error('身份证号码格式不正确'))
    } else {
      callback()
    }
  }
}
