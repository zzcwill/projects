const { cookieSession } = require("../../config/default");

var { resFail, resCodeArr } = global.help.resData;
var { HttpException } = global.help.httpCode

var catchError = async (err, req, res, next) => {
  if(err) {
    // 开发环境
    var isHttpException = err instanceof HttpException;
    var isDev = req.app.get('env') === 'dev';

    if (isDev) {
      if(!isHttpException) {
        if(err.name === 'SequelizeDatabaseError') {
          res.status(500)
          res.json(resFail(err.parent.sqlMessage, resCodeArr[1][0]))            
        }
        if(err.name !== 'SequelizeDatabaseError') {
          throw err;          
        }     
      } 
      if (isHttpException) {
        res.status(err.status)
        res.json(resFail(err.msg, err.code))
      }        
    }  
    
    if (!isDev) {
      if (isHttpException) {
        res.status(err.status)
        res.json(resFail(err.msg, err.code))
      }  
      if (!isHttpException) {
        res.status(500)
        res.json(resFail('服务器内部异常', resCodeArr[1][0]))
      }         
    }
  }
}

module.exports = catchError
