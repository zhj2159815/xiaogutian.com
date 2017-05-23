'use strict';

var mysql = require('mysql');
var config = require('../config');

var connection;
var connectConfig = {
  host: config.DB,       //主机
  user: config.DBNAME,               //MySQL认证用户名
  password: config.DBPSW,        //MySQL认证用户密码
  port: config.DBPORT,                   //端口号
  database: config.DBDATABASE      //数据库
};

var handleDisconnect = function () {
  connection = mysql.createConnection(connectConfig);
  connection.connect(function (err) {
    if (err) {
      console.log("进行断线重连：" + new Date());
      setTimeout(handleDisconnect, 2000);   //2秒重连一次
      return;
    }
    console.log("连接成功");
  });
  connection.on('error', function (err) {
    console.log('db error', err);
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      handleDisconnect();
    } else {
      throw err;
    }
  });
};

handleDisconnect();

// //创建一个connection
// var connection = mysql.createConnection({
//   host: config.DB,       //主机
//   user: config.DBNAME,               //MySQL认证用户名
//   password: config.DBPSW,        //MySQL认证用户密码
//   port: config.DBPORT,                   //端口号
//   database: config.DBDATABASE      //数据库
// });

//执行SQL修改删除增加语句
exports.execSQL = function (sqlStr, callback) {
  console.log('execSQL:', sqlStr);
  connection.query(sqlStr, function (err, rows, fields) {
    if (err) {
      console.log('[execSQL] - :' + err);
      return;
    }
    return callback(err, rows);
  });
};

//创建一个connection
exports.connect = function () {
  connection.connect(function (err) {
    if (err) {
      console.log('[query] - :' + err);
      return;
    }
    console.log('[connection connect]  succeed!');
  });
};

//关闭connection
// exports.end = function () {
//   connection.end(function (err) {
//     if (err) {
//       return;
//     }
//     console.log('[connection end] succeed!');
//   });
// };

return exports;