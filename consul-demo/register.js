const Consul = require('consul');

const consul = new Consul({
    host: '47.110.42.110',
    port: 8500,
    promisify: true,
});

let serviceName = 'local-app-pc'

consul.agent.service.register({
	name: serviceName,
	address: '47.110.42.110',
	port: 3301,
	check: {
			http: 'http://47.110.42.110:3301/api/health',
			interval: '10s',
			timeout: '5s',
	}
}, function(err, result) {
	if (err) {
			console.error(err);
			throw err;
	}

	console.log(serviceName + ' 注册成功！');
})