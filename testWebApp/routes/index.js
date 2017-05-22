var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {

  if (req.session) {
    console.log('isLogin', res.session);
  }
  else {
    console.log('unLogin', res.session);
  }
  var loginName = req.session && req.session.loginName ? req.session.loginName : '小古田';
  res.render('index', {
    title: loginName
  });
});

module.exports = router;
