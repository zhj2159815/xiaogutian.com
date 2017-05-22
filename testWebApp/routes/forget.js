var express = require('express');
var router = express.Router();
var crypto = require('crypto');

/* GET home page. */
router.get('/', function (req, res, next) {
  var userName = req.query.username,
    password = req.query.password;
  console.log('isLogin:', req.session);
  if (req.session) {
    console.log('isLogin');
  }


  res.render('login', {
    title: '登录',
  });
});

router.post('/', function (req, res) {
  var userName = req.body.userName;
  var password = req.body.password;

  if (req.session) {
    console.log('isLogin', req.session);
  }
  else {
    console.log('unLogin', req.session);
  }

  console.log('加密前的密码:' + password);
  var md5 = crypto.createHash('md5');   //crypto模块功能是加密并生成各种散列
  var en_upwd = md5.update(password).digest('hex');
  console.log('加密后的密码:' + en_upwd);

  req.session.islogin = 'success';
  req.session.loginName = userName;

  res.locals.islogin = req.session.islogin;
  res.locals.loginName = req.session.loginName;
  res.cookie('islogin', 'success', { maxAge: 60000 });

  console.log('session:', req.session);
  res.render('index', {
    title: '<h1>' + userName + '</h1>'
  });
});

module.exports = router;