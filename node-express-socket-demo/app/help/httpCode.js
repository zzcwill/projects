// 10000   调用成功
// 20000   调用失败
// 30000   未登录
// 30001   token失效
// 40000   接口不存在
const resCodeArr = [
  [10000],
  [20000],
  [30000,30001],
  [40000]
]

class HttpException extends Error {
  constructor(msg = '服务器内部异常', code = resCodeArr[1][0]) {
    super()
    this.status = 200
		this.code = code
    this.msg = msg
  }
}

class ParameterException extends HttpException {
  constructor(msg = '参数错误', code = resCodeArr[1][0]) {
    super()
    this.status = 200
		this.code = code
    this.msg = msg
  }
}

class AuthFailed extends HttpException {
  constructor(msg = '用户未登录', code = resCodeArr[2][0]) {
    super()
    this.status = 200
		this.code = code
    this.msg = msg
  }
}

class Forbidden extends HttpException {
  constructor(msg = 'token失效', code = resCodeArr[2][1]) {
    super()
    this.status = 200
		this.code = code
    this.msg = msg
  }
}

class NotFound extends HttpException {
  constructor(msg = '接口不存在', code = resCodeArr[3][0]) {
    super()
    this.status = 200
		this.code = code
    this.msg = msg
  }
}

module.exports = {
  HttpException,
  ParameterException,
  AuthFailed,
  NotFound,
  Forbidden
}
