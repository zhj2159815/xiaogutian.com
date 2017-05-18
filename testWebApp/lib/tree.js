
var $ = require('underscore');


setChildren = function (node, groups) {
  var children = groups[node.id];
  node.children = children ? $.map(children, function (child) {
    var temp = $.extend({}, child);
    temp.level = node.level + 1;
    setChildren(temp, groups);
    return temp;
  }) : [];
};

/*
	@dataset		数据集
	@parentField	父节点字段，默认:parentId
*/
exports.toTree = function (dataset, parentField) {
  if (!parentField)
    parentField = 'parentId';

  var groups = $.groupBy(dataset, function (n) {
    return n[parentField];
  });
  return $.map(groups[''], function (root) {
    var temp = $.extend({}, root);
    temp.level = 1;
    setChildren(temp, groups);
    return temp;
  });
};

/*
	转换为树形map
	@ds				数据源
	@keyField		key字段
	@parentField	父节点
*/
exports.toMapTree = function (ds, keyField, parentField) {
  if (!parentField)
    parentField = 'parentId';

  var groups = $.groupBy(ds, function (n) {
    return n[parentField];
  });
  return $.reduce(groups[''], function (map, n) {
    var node = $.clone(n);
    map[node[keyField]] = node;
    setChildMap(node, groups, keyField);
    return map;
  }, {});
};

function setChildMap(node, groups, keyField) {
  var children = groups[node.id];
  node.childMap = children ? $.reduce(children, function (map, child) {
    var temp = $.clone(child);
    map[temp[keyField]] = temp;
    setChildMap(temp, groups, keyField);
    return map;
  }, {}) : {};
};


/*
	笛卡尔积计算
	@lenArr	数据长度数组
	@return	分组之后的下标数组

	e.g.
		var groups = [
			['红', '黄', '蓝'],
			['A', 'B']
		]

		var decare = linq.decareBy([3, 2]);
		decare = [
			[0, 0],
			[0, 1],
			[1, 0],
			[1, 1],
			[2, 0],
			[2, 1]
		];
*/
exports.decareBy = function (lenArr) {
	var currentIndexes = [], maxIndexes = [];
	$.each(lenArr, function (length) {
	    currentIndexes.push(0);
	    maxIndexes.push(length - 1);
	});
	var last = lenArr.length - 1;
	var results = [];
	do {
		results.push($.clone(currentIndexes));
	    if (currentIndexes[last] < maxIndexes[last] || last == 0) {
	        currentIndexes[last]++;
	    }
	    else {
	        for (var i = last - 1; i >= 0; i--) {
	            if (currentIndexes[i] == maxIndexes[i]) {
	                if (i == 0)
	                    currentIndexes[0]++;
	                continue;
	            }

	            currentIndexes[i]++;
	            for (var j = i + 1; j <= last; j++) {
	                currentIndexes[j] = 0;
	            }
				break;
	        }
	    }
	} while (currentIndexes[0] <= maxIndexes[0])
	return results;
};