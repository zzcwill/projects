const Consul = require('consul');

class ConsulConfig {
    constructor () {
        const serviceName = 'app-same';
        this.consul = new Consul({
            host: '47.110.42.110',
            port: 8500,
            promisify: true,
        });
        this.consul.agent.service.register({
            name: serviceName,
            address: '47.110.42.110',
            port: 3000,
            check: {
                http: 'http://47.110.42.110:3001/api/health',
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
    }

    async getConfig(key) {
        const result = await this.consul.kv.get(key);

        if (!result) {
            return Promise.reject(key + '不存在');
        }

        return JSON.parse(result.Value);
    }

    async getUserConfig(key) {
        const result = await this.getConfig(key);

        if (!key) {
            return result;
        }

        return result[key];
    }

    async setUserConfig(key, val) {
        const result = await this.getConfig('app');

        result[key] = val;

        return this.consul.kv.set('app', JSON.stringify(result))
    }
}

module.exports = ConsulConfig;