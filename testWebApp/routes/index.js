var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: '<h1>小古田</h1>',
    users: [
      { name: 'zhangjian', age: 22 },
      { name: 'zhangjian', age: 22 },
      { name: 'zhangjian', age: 23 },
      { name: 'zhangjian', age: 24 },
    ]
  });
});

module.exports = router;
