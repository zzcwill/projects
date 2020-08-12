exports.sleep = (ms) => {
	var start = Date.now(), expire = start + ms;
	while (Date.now() < expire) ;
	return true;
}