// Copyright 2016 Yahoo Inc.
// Licensed under the terms of the MIT license. Please see LICENSE file in the project root for terms.

var ms = require('ms');

/**
 * Plugin to replace ms-style time strings with their value in milliseconds.
 * @param {String} key
 * @param {*} val
 * @returns {*} val
 */

module.exports = function (key, val) {
  var valueInMilliseconds;

  // if you give ms a number, it will try to format
  // it to a string. we only want to convert strings
  // to numbers, so bail early if val isnt' a string.
  if (typeof val !== 'string') {
    return val;
  }

  // ms will return undefined if it can't convert the
  // string to a number.
  valueInMilliseconds = ms(val);

  if (typeof valueInMilliseconds === 'number') {
    return valueInMilliseconds;
  }

  return val;
};
