'use strict'

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var config = require('./config');
var session = require('express-session');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(express.static(path.join(__dirname, 'fdw/static')));


// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, '/public/favicon.ico')));

app.use(cookieParser());

//使用靠就这个中间件
app.use(session({
  secret: 'wilson',
  loginName: 'guest',
  isLogin: false,
}));

var index = require('./routes/index');
var login = require('./routes/login');
var register = require('./routes/register');
var forget = require('./routes/forget');
var nofound = require('./routes/nofound');
var helper = require("./lib/helper");

// app.use('/', index);
// app.use('/login', login);

// require('./service/configuration').init(app, __dirname, function (err) {
//   console.log('初始化');
// });

// app.use('/register', register);
// app.use('/forget', forget);
// app.use('/404', nofound);

// helper.initRoutes(app);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  console.log('404');
  var err = new Error('Not Found');
  err.status = 404;
  // next(err);
  res.render('404', {
    title: err
  });
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(config.PORT, function (e) {
  console.log('listen on :', config.PORT);
});

module.exports = app;
