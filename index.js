var detect = require('feature-detect-es6')

if (!detect.generators()) {
  require('babel-polyfill')
}

if (detect.all('spread', 'generators')) {
  module.exports = require('./lib/config-master')
} else {
  module.exports = require('./es5/config-master')
}
