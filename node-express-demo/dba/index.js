var path = require('path');
var mongoose = require('mongoose');
var config = require('config-lite')(path.join(__dirname,'../'));

mongoose.connect(config.mongoConfig.client.url);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connect error'));
db.once('open', function() {
    console.log('db is connect');
});

exports.mongoose = mongoose

