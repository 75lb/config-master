[![view on npm](http://img.shields.io/npm/v/config-master.svg)](https://www.npmjs.org/package/config-master)
[![npm module downloads per month](http://img.shields.io/npm/dm/config-master.svg)](https://www.npmjs.org/package/config-master)
[![Build Status](https://travis-ci.org/75lb/object-ting.svg?branch=master)](https://travis-ci.org/75lb/object-ting)
[![Dependency Status](https://david-dm.org/75lb/config-master.svg)](https://david-dm.org/75lb/config-master)

config-master
=============
Merges together JSON data from the specified files, in the specified order. Design for app config management. 

example
-------
```js
var loadConfig = require("config-master");

var storedConfig = loadConfig(
    "~/.global-defaults.json", 
    "project-specific-defaults.json", 
    "package.json:config"
);
```
