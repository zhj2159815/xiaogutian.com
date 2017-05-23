
'use strict';

var moment = require('moment');

exports.getSeconds = function (dt) {
  if (!dt)
    dt = new Date();

  return Math.floor(dt.getTime() / 1000);
};

exports.toTimeStringByFormatStr = function (timeStamp, formatStr) {
  return moment(timeStamp).format(formatStr);
};

exports.toDateTimeString = function (timeStamp) {
  return moment(timeStamp).format('YYYY-MM-DD HH:mm:ss');
};

exports.toDateString = function (timeStamp) {
  return moment(timeStamp).format('YYYY-MM-DD');
};

exports.toTimeString = function (timeStamp) {
  return moment(timeStamp).format('HH:mm:ss');
};

exports.toDateMinuteString = function (timeStamp) {
  return moment(timeStamp).format('YYYY-MM-DD HH:mm');
};

exports.toMonthDayMinuteString = function (timeStamp) {
  return moment(timeStamp).format('MM-DD HH:mm');
};

exports.toMonthDayString = function (timeStamp) {
  var d = new Date(timeStamp);
  return (d.getMonth() + 1) + "月" + d.getDate() + "日";

};

exports.toTimeStampString = function (timeStamp) {
  return moment(timeStamp).format('YYYYMMDDHHmmss');
};

exports.getYearString = function (timeStamp) {
  return moment(timeStamp).format('YYYY');
};

exports.getMonthString = function (timeStamp) {
  return moment(timeStamp).format('MM');
};

exports.getDayString = function (timeStamp) {
  return moment(timeStamp).format('DD');
};

exports.getSortDateString = function (timeStamp) {
  return moment(timeStamp).format('YYYYMMDD');
};

exports.getTimeStamp = function (year, month, day) {
  var date = new Date(year, month - 1, day);
  var dt = Date.parse(date);
  return dt;
};

exports.dayNumOfMonth = function (year, month) {
  var d = new Date(year, month, 0);
  return d.getDate();
};