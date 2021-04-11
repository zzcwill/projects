const { Forbidden } = global.help.httpCode;
const config = global.config;
const { cacheService } = require('../service/');

const auth = async (req, res, next) => {
  if(config.noauthArr.indexOf(req.url) !== -1) {
    next();
    return
  }

  let token = ''
  if(req.body.token) {
    token = req.body.token;
  }

  if(req.query.token) {
    token = req.query.token;
  }

  // 无带token
  if (!token) {
    next( new Forbidden('需要传token') );
    return
  }

  let tokenCache = await cacheService.get(token);

  if(!tokenCache) {
    next( new Forbidden('无效的token') );
    return
  }  

  res.user = tokenCache;

  next()
}

module.exports = auth
