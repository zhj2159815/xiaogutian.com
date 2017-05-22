var express = require('express');
var router = express.Router();
var crypto = require('crypto');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('404', {
    title: '无法找到页面',
  });
});


module.exports = router;