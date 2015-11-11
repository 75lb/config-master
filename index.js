var detect = require('feature-detect-es6')

module.exports = detect.spread()
  ? require('./lib/config-master')
  : require('./es5/config-master')
