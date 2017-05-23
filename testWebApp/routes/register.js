'use strict';

var express = require('express');
var router = express.Router();
var user = require('../models/user');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('register', {
    title: '注册',
  });
});

// router.post('/', function (req, res, next) {
//   try {
//     var username = req.body.username;
//     var password = req.body.password;
//     var surePassword = req.body.surePassword;
//     if (password != surePassword) {
//       return { err: '密码不一致', results: false };
//     }
//     user.find({ username: username }, function (err, results) {
//       if (!err) {
//         if (!results.length) {
//           var md5 = crypto.createHash('md5');   //crypto模块功能是加密并生成各种散列
//           var en_upwd = md5.update(password).digest('hex');
//           user.add({ username: username, password: en_upwd }, function (error, results) {
//             console.log(error, results);
//             return { err: null, results: true };
//           });
//         }
//       }
//     });
//   }
//   catch (e) {
//     console.log(e);
//   }

// });

router.post('/regist', function (req, res, next) {
  try {
    console.log('req:', req);
  }
  catch (e) {
    console.log(e);
  }
});


module.exports = router;