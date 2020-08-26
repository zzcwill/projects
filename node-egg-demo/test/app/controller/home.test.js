'use strict';

const { app, assert } = require('egg-mock/bootstrap');

describe('test/app/controller/home.test.js', () => {
  it('should assert', () => {
    const pkg = require('../../../package.json');
    assert(app.config.keys.startsWith(pkg.name));
  });

  // it('should GET /', () => {
  //   let ctx = app.mockContext();
  //   return app.httpRequest()
  //     .get('/')
  //     .expect('egg-node-web')
  //     .expect(200);
  // });
});
