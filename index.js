'use strict'
var detect = require('feature-detect-es6')

if (detect.all('const', 'let', 'generators', 'spread')) {
  module.exports = require('./lib/config-master')
} else {
  require('babel-polyfill')
  module.exports = require('./es5/config-master')
}
