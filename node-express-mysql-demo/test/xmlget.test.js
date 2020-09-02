var path = require('path');
var assert = require('assert');
var app = require('../app');
var request = require('supertest')(app);

describe('# test router api merchant', function () {
	// 同步测试
	it('test', function() {
			assert(1 === 1);
	});
	// 异步测试
	// 异步中，done 在异步结束后执行
	it('GET /api/xml/get', function (done) {
			request
					.get('/api/xml') // 接口地址
					.expect(200) // 判断状态码
					.end(function (err, res) { // 请求结束后拿到返回的数据
							if (err) return done(err);
							assert.equal(res.body.msg,'xml传输');
							done();
					});
	});
});
