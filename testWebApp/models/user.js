'use strict';

var db = require('../lib/db');

exports.add = function (data, callback) {
  let insertStr = 'insert into userinfo(UserName,UserPass) values(\'' + data.username + '\',\'' + data.password + '\')';
  db.execSQL(insertStr, function (err, results) {
    callback(err, results);
  });
};

exports.find = function (data, callback) {
  let selectStr = 'select * from userinfo where UserName=\'' + data.username + '\'';
  db.execSQL(selectStr, function (err, results) {
    console.log('select', err, results);
    callback(err, results);
  });
};

exports.regist = function (data, callback) {
  console.log(data);
};

return exports;