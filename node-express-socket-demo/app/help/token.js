const jwt = require('jsonwebtoken');
const config = global.config;


// 颁布令牌
const setToken = (user) => {
  const secretKey = config.security.secretKey;
  const expiresIn = config.security.expiresIn;
  const token = jwt.sign(user, secretKey, {
    expiresIn: expiresIn
  })
  return token
}

const getUser = (token) => {
	var user = jwt.verify(token, config.security.secretKey);
	return user
}


module.exports = {
  setToken,
	getUser
}
