'use strict';

var $ = require('underscore');

function convertToObject(str, defaultValue) {
  try {
    return JSON.parse(str)
  }
  catch (e) {
    return defaultValue;
  }
}

exports.toStr = function (v) {
  if (v === null) {

  }
  return v.toString();
};

exports.toInt = function (str) {
  return parseInt(str) || 0;
};

exports.toFloat = function (str) {
  return parseFloat(str) || 0;
};

exports.toDatetime = function (str) {
  return new Date(str ? Date.parse(str) : 0);
};

exports.toObject = function (str) {
    var obj = convertToObject(str, {});
    return $.isObject(obj) ? obj : {};
};

exports.toArray = function (str) {
    var arr = convertToObject(str, []);
    return $.isArray(arr) ? arr : [];
};

exports.toBool = function (str) {
	if (str)
        return str.toLowerCase() === 'true' || str === '1' || str === '是';
	return false;
};

exports.to = function (type, str) {
	switch (type) {
		case 'array':
			return exports.toArray(str);
		case 'bool':
			return exports.toBool(str);
		case 'datetime':
			return exports.toDatetime(str);
		case 'float':
			return exports.toFloat(str);
		case 'int':
			return exports.toInt(str);
		case 'number':
			return exports.toInt(str);
		case 'object':
			return exports.toObject(str);
		default:
			return exports.toStr(str);
	}
};

return exports;