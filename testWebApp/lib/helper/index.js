var fs = require("fs");
var path = require('path');
var root = path.join(__dirname, "../../routes");

module.exports = {};

module.exports.initRoutes = function initRoutes(server) {
  fs.readdirSync(root).forEach(function (name) {
    if (name[0] == '.') return;
    var fullPath = path.join(root, name);
    var stat = fs.statSync(fullPath);
    if (stat.isFile())
      require(fullPath.replace(/\\/g, "/"));
  });

};