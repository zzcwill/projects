var config = require('config-lite')(__dirname);
global.config = config;
var help = require('./help');
global.help = help;
var middleware = require('./middleware');
global.middleware = middleware;

var path = require('path');
var express = require('express');
var serveFavicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var cookieSession = require('cookie-session');
var bodyParser = require('body-parser');
var serveStatic = require('serve-static');
var cors = require('cors');

var helmet = require('helmet');

var logger = require('morgan');
var rfs = require('rotating-file-stream');

var pageRouter = require('./router/page');
var apiRouter = require('./router/api');

var app = express();

app.use(cookieSession({
  name: global.config.cookieSession.name,
  keys: global.config.cookieSession.keys
}))

app.use(serveFavicon(path.join(__dirname, 'public/images', 'favicon.ico')))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(serveStatic(path.join(__dirname, 'public')));
app.use(helmet());
// app.use(cors());

//view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//set logs
var generator = () => {
  var time = global.help.dayjs().format('YYYY-MM-DD');
  return `${time}.log`;
};
var accessLogStream = rfs.createStream(generator, {
  size: '100M',
  interval: '1d', // rotate daily
  path: path.join(__dirname, '../logs/http')
})
app.use(logger('combined',{stream:accessLogStream}));

app.use('/', pageRouter);
app.use('/api', global.middleware.auth, apiRouter);

app.use((req, res, next) => {
  var err = new global.help.httpCode.NotFound();
  next(err);
});

app.use(global.middleware.catchError)

module.exports = app;
