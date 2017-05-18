var $ = require('underscore');
var convert = require('../lib/convert');

var idReg = /^[a-zA-Z0-9]{32}$/;
var mobileReg = /^1\d{10}$$/;
var positiveIntReg = /^\d+$/;
var priceReg = /^\d+(\.\d{1,2})?$/;
var priceGapReg = /^-?\d+(\.\d{1,2})?$/;
var qqReg = /^[1-9]\d{4,12}$/;
var routeReg = /^\/\w+\/\w+-?\w+/;
var telReg = /^(\d{3,4}-)?\d{7,8}$/;
var domainReg = /^[a-z][a-z0-9]{1,8}$/;
var levelReg = /^(1|2|3)$/;
var intReg = /^-?[0-9]\d*$/;
var boolReg = /^(0|1|true|false)$/;
var boolCN = /^(是|否)$/;

exports.bool = boolReg;

exports.ge0Int = function (str) {
  if (positiveIntReg.test(str))
    return $convert.toInt(str) > 0;
  return false;
};

