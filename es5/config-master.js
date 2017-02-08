'use strict';

var _marked = [configsInTree, packageConfigsInTree].map(regeneratorRuntime.mark);

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var path = require('path');
var walkBack = require('walk-back');
var mergeWith = require('lodash.mergewith');

module.exports = loadConfig;

function loadConfig(configName, options) {
  options = options || {};
  var configFileName = '.' + configName + '.json';
  var startFrom = options.startFrom || process.cwd();

  var configs = Array.from(configsInTree(startFrom, configFileName));
  var packageConfigs = Array.from(packageConfigsInTree(startFrom, configName));
  console.error(require('util').inspect(configs, { depth: 13, colors: true }));
  console.error(require('util').inspect(packageConfigs, { depth: 13, colors: true }));

  if (options.deep) {
    var customiser = function customiser(objValue, srcValue) {
      if (Array.isArray(objValue)) {
        return objValue.concat(srcValue);
      }
    };

    return mergeWith.apply(undefined, _toConsumableArray(packageConfigs).concat(_toConsumableArray(configs), [customiser]));
  } else {
    return Object.assign.apply(null, [{}].concat(packageConfigs.reverse()).concat(configs.reverse()));
  }
  return merge[options.deep || false ? 'deep' : 'flat'].apply(null, [{}].concat(packageConfigs).concat(configs));
}

function configsInTree(startFrom, fileName) {
  var file;
  return regeneratorRuntime.wrap(function configsInTree$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          file = void 0;

        case 1:
          if (!(file = walkBack(startFrom, fileName))) {
            _context.next = 7;
            break;
          }

          _context.next = 4;
          return require(file);

        case 4:
          startFrom = path.resolve(path.dirname(file), '..');
          _context.next = 1;
          break;

        case 7:
        case 'end':
          return _context.stop();
      }
    }
  }, _marked[0], this);
}

function packageConfigsInTree(startFrom, configName) {
  var file, config;
  return regeneratorRuntime.wrap(function packageConfigsInTree$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          file = void 0;

        case 1:
          if (!(file = walkBack(startFrom, 'package.json'))) {
            _context2.next = 9;
            break;
          }

          config = require(file)[configName];

          if (!config) {
            _context2.next = 6;
            break;
          }

          _context2.next = 6;
          return config;

        case 6:
          startFrom = path.resolve(path.dirname(file), '..');
          _context2.next = 1;
          break;

        case 9:
        case 'end':
          return _context2.stop();
      }
    }
  }, _marked[1], this);
}