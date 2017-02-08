'use strict'
const path = require('path')
const walkBack = require('walk-back')
const mergeWith = require('lodash.mergewith')

/**
 * A convention for storing and retrieving application config. You supply a string (e.g. `'example-app'`), the libary will walk up the directory tree merging config stored for this app. The following locations are searched, with the latter taking precedence:
 *
 * - any package.json, beneath the `example-app` property
 * - any `.example-app.json` files
 *
 * @module config-master
 */
module.exports = loadConfig

/**
 * @param {string} - config name
 * @param [options] {object} - options
 * @param [options.startFrom] {string} - directory to begin looking for config
 * @param [options.deep] {boolean} - deep merge configs (default: false)
 * @returns {Object}
 * @alias module:config-master
 */
function loadConfig (configName, options) {
  options = options || {}
  const configFileName = '.' + configName + '.json'
  const startFrom = options.startFrom || process.cwd()

  const configs = Array.from(configsInTree(startFrom, configFileName))
  const packageConfigs = Array.from(packageConfigsInTree(startFrom, configName))
  console.error(require('util').inspect(configs, { depth: 13, colors: true }))
  console.error(require('util').inspect(packageConfigs, { depth: 13, colors: true }))

  if (options.deep) {
    function customiser(objValue, srcValue) {
      if (Array.isArray(objValue)) {
        return objValue.concat(srcValue);
      }
    }
    return mergeWith(...packageConfigs, ...configs, customiser)
  } else {
    return Object.assign.apply(null, [ {} ].concat(packageConfigs.reverse()).concat(configs.reverse()))
  }
  return merge[options.deep || false ? 'deep' : 'flat']
    .apply(null, [ {} ].concat(packageConfigs).concat(configs))
}

function * configsInTree (startFrom, fileName) {
  let file
  while ((file = walkBack(startFrom, fileName))) {
    yield require(file)
    startFrom = path.resolve(path.dirname(file), '..')
  }
}

function * packageConfigsInTree (startFrom, configName) {
  let file
  while ((file = walkBack(startFrom, 'package.json'))) {
    let config = require(file)[configName]
    if (config) yield config
    startFrom = path.resolve(path.dirname(file), '..')
  }
}
