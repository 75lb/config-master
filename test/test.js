'use strict'
const TestRunner = require('test-runner')
const loadConfig = require('../')
const a = require('assert')
const path = require('path')

const runner = new TestRunner()

runner.only('Deep Merge Configs', function () {
  const config = loadConfig('test-app', {
    startFrom: path.resolve(__dirname, 'fixture/one/two'),
    deep: true
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

runner.test('Default Configs', function () {
  const config = loadConfig('test-app', {
    startFrom: path.resolve(__dirname, 'fixture/one/two')
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

runner.test('deep merging arrays', function () {
  const config = loadConfig('test-app', {
    startFrom: path.resolve(__dirname, 'fixture2/a'),
    deep: true
  })
  a.deepEqual(config, {
    array1: [ 1, 2, 3, 4 ],
    array2: [
      { one: 1, two: 2 },
      { three: 3 }
    ]
  })
})

runner.test('deeper merging arrays', function () {
  const config = loadConfig('test-app', {
    startFrom: path.resolve(__dirname, 'fixture3/a'),
    deep: true
  })
  a.deepEqual(config, {
    "mocks": [
      {
        "route": "/three",
        "responses": [
          {
            "request": { "method": "PUT" },
            "response": {
              "body": "<h1>Mock response for 'PUT' request on /three</h1>"
            }
          }
        ]
      },
      {
        "route": "/three",
        "responses": [
          {
            "request": { "method": "GET" },
            "response": {
              "body": "<h1>Mock response for 'GET' request on /three</h1>"
            }
          },
          {
            "request": { "method": "POST" },
            "response": {
              "status": 400,
              "body": { "message": "That method is not allowed." }
            }
          }
        ]
      }
    ]
  })
})
