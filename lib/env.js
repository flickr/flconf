// Copyright 2016 Yahoo Inc.
// Licensed under the terms of the MIT license. Please see LICENSE file in the project root for terms.

/**
 * Matches bash-style parameter expansion expressions
 * @type {RegExp}
 * @private
 * @see http://www.tldp.org/LDP/Bash-Beginners-Guide/html/sect_03_04.html#sect_03_04_03
 */

var TOKEN = /\$\{(\w+)\}/g;

/**
 * Plugin to expand bash-style variable expressions in `val`
 * @param {String} key
 * @param {*} val
 * @returns {*} val
 */

module.exports = function (key, val) {
  if (typeof val !== 'string') {
    return val;
  }

  return val.replace(TOKEN, function (_, name) {
    return process.env[name];
  });
};
