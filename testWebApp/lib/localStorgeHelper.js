'use strict';

var localStorage = window.localStorage;

exports.getByItem = function (itemStr) {
  return localStorage.getItem(itemStr);
};

exports.getByItemAttributeStr(itemStr, attributeStr){
  var itemValue = localStorage.getItem(itemStr);
  var item = JSON.parse(itemValue)[attributeStr];
  return item;
};

exports.setItem = function (itemStr, dataValue) {
  var valueStr = JSON.stringify(dataValue);
  localStorage.setItem(itemStr, valueStr);
};

exports.setItemAttribute = function (itemStr, value) {
  var itemValue = JSON.parse(localStorage.getItem(itemStr));
  itemValue[attributeStr] = value;
  localStorage.setItem(itemStr, JSON.stringify(itemValue));
};

exports.removeItemAttribute = function (itemStr, attributeStr) {
  var item = localStorage.getItem(itemStr);
  delete item[attributeStr];
  localStorage.setItem(itemStr, JSON.stringify(item));
};

