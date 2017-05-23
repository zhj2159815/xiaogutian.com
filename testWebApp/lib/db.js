var mysql = require('mysql');
var config = require('../config');

//创建一个connection
var connection = mysql.createConnection({
  host: config.DB,       //主机
  user: config.DBNAME,               //MySQL认证用户名
  password: config.DBPSW,        //MySQL认证用户密码
  port: config.DBPORT,                   //端口号
});

//创建一个connection
connection.connect(function (err) {
  if (err) {
    console.log('[query] - :' + err);
    return;
  }
  console.log('[connection connect]  succeed!');
});

//执行SQL语句
connection.query('SELECT 1 + 1 AS solution', function (err, rows, fields) {
  if (err) {
    console.log('[query] - :' + err);
    return;
  }
  console.log('The solution is: ', rows[0].solution);
});
//关闭connection
connection.end(function (err) {
  if (err) {
    return;
  }
  console.log('[connection end] succeed!');
});