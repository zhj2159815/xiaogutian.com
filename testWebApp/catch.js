'use strict';

var request = require('request');
var cheerio = require('cheerio');
var _ = require('underscore');
var XUNYINURL = 'http://www.xunyingwang.com/movie';            //迅影网电影
var XUNYINURL = 'http://www.xunyingwang.com/tv';             //迅影网电视剧
var XUNYINGMEDIO = 'http://www.xunyingwang.com/videos/resList/';
var async = require('async');

var page = 0;
var zlib = require('zlib');
var fs = require('fs');
var path = require('path');

var movieLists = [];
var downloadLists = [];


/* 开启数据采集器 */
function dataCollectorStartup() {
  dataRequest(XUNYINURL);
}

/* 数据请求 */
function dataRequest(dataUrl) {
  var url = dataUrl;
  page = page + 1;
  url = url + '/?page=' + page;
  request({
    url: url,
    method: 'GET'
  }, function (err, res, body) {
    if (err) {
      console.error('[ERROR]Collection' + err);
      return;
    }

    switch (dataUrl) {
      case XUNYINURL:
        dataParseXunying(body);
        break;
    }
  });
}

function dataPaseXunying(body, item) {
  var $ = cheerio.load(body);
  $('a[mid=' + item.id + ']').each(function () {
    var down = $(this).attr('href');
    var isBaidu = down.indexOf('baidu');
    var code = '';
    if (isBaidu > -1) {
      code = $(this).next().text();
    }
    item.code = code;
    item.href = down;
    downloadLists.push(item);
  });
  saveFile('movie.txt', downloadLists, 0);
}

function requestDetail(item, callback) {
  let url = XUNYINGMEDIO + item.id;
  request({
    url: url,
    method: 'GET',
    headers: {
      'Accept-Encoding': 'gzip',
    },
    encoding: null  // it is very import!!
  }, callback);
}

var getBodyCallback = function (err, res, body) {
  if (err) {
    console.log('err:', err);
  }
  if (res.headers['content-encoding'] == 'gzip') {
    zlib.unzip(body, function (err, buffer) {
      var bodyStr = buffer.toString();
      dataPaseXunying(bodyStr, item);
    });
  }
  else {
    dataPaseXunying(body, item);
  }
};

function getDetail() {
  async.mapLimit(movieLists, requestDetail(e), 1, function (item, getBodyCallback) {
    requestDetail(item, getBodyCallback);
  });

}

function saveFile(file, list, type) {
  var data;
  if (type) {
    // data = list.map(i => {
    //   return '名称:' + i.title + ' 地址:' + i.href + ' 验证码: ';
    // }).join('\r\n');
    data = JSON.stringify(list);
  }
  else {
    data = list.map(i => {
      if (i.code) {
        return '名称:' + i.title + ' 地址:' + i.href + ' 验证码: ' + i.code;
      }
      else {
        return '名称:' + i.title + ' 地址:' + i.href;
      }
    }).join('\r\n');
  }
  // data = 'eee' + '/\r/\n' + 'fff';
  fs.writeFile('./success/' + file, data, function (err) {
    if (err)
      return done(err);
    readJsonFile('movie.json');
  });
}

function readJsonFile(pathStr) {
  pathStr = path.join(__dirname, 'success', pathStr);
  fs.readFile(pathStr, (err, data) => {
    if (err) throw err;
    movieLists = JSON.parse(data.toString());
    // console.log(movieLists);
    getDetail();
  });
}

/* xunying 数据解析 */
function dataParseXunying(body) {
  console.log('xunyingwang(迅影网)');

  var $ = cheerio.load(body);
  $('.movie-item-in a').each(function (e) {
    var title = $(this).attr('title');
    var href = $(this).attr('href');
    if (title) {
      let index = _.findIndex(movieLists, r => { return r.title == title });
      if (index < 0) {
        var ids = href.split('/');
        var id = ids[ids.length - 1].replace('.html', '');
        movieLists.push({ title: title, href: href, id: id });
      }
    }

    if (e == $('.movie-item-in a').length - 1) {
      console.log(movieLists.length);
      var hasNext = $('a[rel=next]').text();
      if (hasNext == '下一页' && page < 2) {
        dataRequest(XUNYINURL);
      }
      else {
        saveFile('movie.json', movieLists, 1);
      }
    }
  });
  // getDetail();
}

dataCollectorStartup();