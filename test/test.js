'use strict'
var test = require('test-runner')
var loadConfig = require('../')
var a = require('core-assert')

test('Deep Merge Configs', function () {
  var config = loadConfig('test-app', {
    startFrom: __dirname + '/fixture/one/two',
    deep : true
  })
  a.deepEqual(config, {
    one: 1,
    two: 2,
    three: 3,
    four: 'package',
    deep: {
      one: 1,
      two: 2
    }
  })
})

test('Default Configs', function () {
  var config = loadConfig('test-app', {
    startFrom: __dirname + '/fixture/one/two'
  })
  a.deepEqual(config, {
    one: 1,
    two: 2,
    three: 3,
    four: 'package',
    deep: {
      two: 2
    }
  })
})
