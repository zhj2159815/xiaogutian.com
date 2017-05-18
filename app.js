'use strict'

//定时任务

// var schedule = require('node-schedule');
// function scheduleRecurrenceRule() {
//     var rule = new schedule.RecurrenceRule();
//     // rule.dayOfWeek = 2;
//     // rule.month = 3;
//     // rule.dayOfMonth = 1;
//     // rule.hour = 1;
//     // rule.minute = 42;
//     rule.second = 0;
//     schedule.scheduleJob(rule, function () {
//         console.log('scheduleRecurrenceRule:' + new Date());
//     });
// }

// // scheduleRecurrenceRule();

// //转换
// var convert = require('./lib/convert.js');
// var a = '[3,3,4]';
// console.log(convert.to('array', a));

// //加密
// var mycrypto = require('./lib/crypto.js');
// var options = {
//     key: 'blues',
//     encoding: {
//         input: 'utf8',
//         output: 'hex'
//     },
//     algorithms: ['bf', 'blowfish', 'aes-128-cbc']
// };
// var en = mycrypto.encrypt(options.key, options.algorithms, '123456');
// var de = mycrypto.decrypt(options.key, options.algorithms, en);

//express
var config = require('./config');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
// var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');


var app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
// app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.listen(config.PORT, function () {
    console.log("listen on ", config.PORT);
});

module.exports = app;