const http = require('http');
const ConsulConfig = require('./consul');
const consul = new ConsulConfig();

http.createServer(async (req, res) => {
    const {url, method} = req;

    // 测试数据更新
    if (method === 'GET' && url === '/app') {
        try {
            await consul.setUserConfig('name', 'test')
            res.end('ok');
        } catch (err) {
            console.error(err);
            res.end('error');
        }
    }
}).listen(3333);