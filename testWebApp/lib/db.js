var mysql = require('mysql');

//创建一个connection
var connection = mysql.createConnection({     
  host     : '192.168.0.200',       //主机
  user     : 'root',               //MySQL认证用户名
  password : 'abcd',        //MySQL认证用户密码
  port: '3306',                   //端口号
}); 

