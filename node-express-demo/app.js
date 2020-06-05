var path = require('path');
var express = require('express');
var serveFavicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var cookieSession = require('cookie-session');
var bodyParser = require('body-parser');
var serveStatic = require('serve-static');
var config = require('config-lite')(__dirname);

var logger = require('morgan');
var rfs = require('rotating-file-stream');
var dayjs = require('dayjs');

var indexRouter = require('./router/index');
var usersRouter = require('./router/users');

var app = express();

app.use(cookieSession({
  name: 'session',
  keys: config.cookieSession.keys
}))

app.use(serveFavicon(path.join(__dirname, 'public/images', 'favicon.ico')))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(serveStatic(path.join(__dirname, 'public')));

//view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//set logs
var generator = () => {
  var time = dayjs().format('YYYY-MM-DD');
  return `${time}.log`;
};
var accessLogStream = rfs.createStream(generator, {
  size: '100M',
  interval: '1d', // rotate daily
  path: path.join(__dirname, 'logs')
})
app.use(logger(':method :url :status :res[content-length] - :response-time ms',{stream:accessLogStream}));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in dev
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'dev' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
