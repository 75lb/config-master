'use strict';
var marked0$0 = [configsInTree, packageConfigsInTree].map(regeneratorRuntime.mark);

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

var path = require('path');
var walkBack = require('walk-back');

module.exports = loadConfig;

function loadConfig(configName, options) {
  options = options || {};
  var configFileName = '.' + configName + '.json';
  var startFrom = options.startFrom || process.cwd();

  var configs = Array.from(configsInTree(startFrom, configFileName)).reverse();
  var packageConfigs = Array.from(packageConfigsInTree(startFrom, configName)).reverse();

  return Object.assign.apply(Object, [{}].concat(_toConsumableArray(packageConfigs), _toConsumableArray(configs)));
}

function configsInTree(startFrom, fileName) {
  var file;
  return regeneratorRuntime.wrap(function configsInTree$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        file = undefined;

      case 1:
        if (!(file = walkBack(startFrom, fileName))) {
          context$1$0.next = 7;
          break;
        }

        context$1$0.next = 4;
        return require(file);

      case 4:
        startFrom = path.resolve(path.dirname(file), '..');
        context$1$0.next = 1;
        break;

      case 7:
      case 'end':
        return context$1$0.stop();
    }
  }, marked0$0[0], this);
}

function packageConfigsInTree(startFrom, configName) {
  var file, config;
  return regeneratorRuntime.wrap(function packageConfigsInTree$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        file = undefined;

      case 1:
        if (!(file = walkBack(startFrom, 'package.json'))) {
          context$1$0.next = 9;
          break;
        }

        config = require(file)[configName];

        if (!config) {
          context$1$0.next = 6;
          break;
        }

        context$1$0.next = 6;
        return config;

      case 6:
        startFrom = path.resolve(path.dirname(file), '..');
        context$1$0.next = 1;
        break;

      case 9:
      case 'end':
        return context$1$0.stop();
    }
  }, marked0$0[1], this);
}