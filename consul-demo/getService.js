const Consul = require('consul');

const consul = new Consul({
    host: '47.110.42.110',
    port: 8500,
    promisify: true,
});

let serviceName = 'local-app-pc'

// let getmMmbers = async () => {
// 	let members = await consul.agent.members()
// 	console.info(members)
// }

let getmServiceList = async (service) => {
	let servicelist = await consul.agent.service.list()

	let { Address, Port } = servicelist[service]

	let serviceUrl = `http://${Address}:${Port}`
	console.info(serviceUrl)
	console.info(serviceUrl + '/api/health')
}

// getmMmbers()
getmServiceList('app-same')