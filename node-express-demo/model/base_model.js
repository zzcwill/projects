/**
 * 给所有的 Model 扩展功能
 * http://mongoosejs.com/docs/plugins.html
 */
var time = require('../extend/time.js');

module.exports = function (schema) {
  schema.methods.create_at_ago = function () {
    return time.today(this.create_at);
  };
};
