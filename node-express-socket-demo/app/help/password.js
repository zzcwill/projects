const bcrypt = require('bcryptjs')

let getSalt = () => {
	const salt = bcrypt.genSaltSync(10);
	return salt
}

let setPassWord = (val, salt) => {
	// 生成加密密码
	const psw = bcrypt.hashSync(val, salt);
	return psw;
}

module.exports = {
	getSalt,
	setPassWord
}

