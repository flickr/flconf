// Copyright 2016 Yahoo Inc.
// Licensed under the terms of the MIT license. Please see LICENSE file in the project root for terms.

var JSON5 = require('json5');

/**
 * * Identity resolver
 * @param {String} key
 * @param {*} val
 * @returns {*} val
 */

var identity = module.exports = function (key, val) {
	return val;
};

/**
 * Module Loader
 * @returns {Function} identity
 */

module.exports.load = function () {
	JSON.parse = JSON5.parse;
	return identity;
};
