// Copyright 2016 Yahoo Inc.
// Licensed under the terms of the MIT license. Please see LICENSE file in the project root for terms.

var assert = require('assert');
var extend = require('deap');
var match = require('minimatch');
var path = require('path');
var glob = require('glob');
var fs = require('fs');

/**
 * @param {String} dirname
 * @constructor
 */

function Config(dirname) {
  assert(dirname, 'Config directory is required');

  if (!(this instanceof Config)) {
    return new Config(dirname);
  }

  this.dirname = dirname;

  this._envs = [];
  this._revs = [];
}

Config.prototype = {};

/**
 * Plugins
 */

Config.prototype.env = require('./lib/env');
Config.prototype.ms = require('./lib/ms');
Config.prototype.json5 = require('./lib/json5');

/**
 * Load and return the compiled config.
 * @returns {Object}
 */

Config.prototype.load = function () {
  return this.process(this.files());
};

/**
 * Add an environment or reviver to the appropriate stack.
 * @param {String|Function} foo
 * @public
 */

Config.prototype.use = function (foo) {
  if (typeof foo === 'function') {
    this._revs.push(foo);
  } else if (typeof foo === 'string') {
    this._envs.push(foo);
  }
};

/**
 * Return the list of files that currently apply to this config
 * based on the registered environments.
 * @returns {Array.<String>}
 */

Config.prototype.files = function () {
  var array = [];
  var files = glob.sync('**/*.json', {
    cwd: this.dirname
  });

  this._envs.forEach(function (env) {

    files.filter(function (file) {
      return array.indexOf(file) === -1;
    }).filter(function (file) {
      return match(env, removeExtension(file));
    }).forEach(function (file) {
      array.push(file);
    });

  });

  return array;
};

/**
 * Creates a new config object from `files`.
 * @param {Array.<String>} files
 * @returns {Object}
 */

Config.prototype.process = function (files) {
  var source;
  var config;
  var i;
  var obj = {};

  for (i = 0; i < files.length; i++) {
    source = fs.readFileSync(path.join(this.dirname, files[i]), 'utf8');
    config = JSON.parse(source, this.reviver());

    extend(obj, config);
  }

  return obj;
};

/**
 * Creates a reviver function from the registered revivers.
 * @returns {Function}
 */

Config.prototype.reviver = function () {
  var revs = this._revs;

  return function (key, val) {
    var i;

    for (i = 0; i < revs.length; i++) {
      val = revs[i](key, val);
    }

    return val;
  };
};

/**
 * Returns `str` with the extension part removed
 * @param {String} str
 * @returns {String}
 */

function removeExtension(str) {
  return str.slice(0, -1 * path.extname(str).length);
}

/**
 * @module Config
 */

module.exports = Config;
