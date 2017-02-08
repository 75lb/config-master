'use strict'
const test = require('test-runner')
const loadConfig = require('../')
const a = require('assert')

test('new API', function () {
  const config = loadConfig('test-app', { startFrom: __dirname + '/fixture/one/two' })
  a.deepEqual(config, {
    one: 1,
    two: 2,
    three: 3,
    four: 'package'
  })
})
