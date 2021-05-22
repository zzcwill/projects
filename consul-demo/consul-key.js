const Consul = require('consul');

const consul = new Consul({
    host: '47.110.42.110',
    port: 8500,
    promisify: true,
});

let getConfig = async (key) => {
	const result = await consul.kv.get(key);

	if (!result) {
			return Promise.reject(key + '不存在');
	}

	let str = JSON.parse(result.Value);
	console.info(str)
}

let setUserConfig = async (key, val) => {
	let data = {
		name: 'local-app-pc-1'
	}

	return consul.kv.set(key, JSON.stringify(data))
}

getConfig('local-app-pc')

setUserConfig('local-app-pc')
