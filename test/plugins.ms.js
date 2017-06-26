var plugin = require('../lib/ms');
var config = require('..');
var assert = require('assert');

/* jshint mocha:true */
/* eslint-env mocha */

describe('plugins/ms', function () {

  it('is available on a config instance', function () {
    assert.equal(typeof config(__dirname).ms, 'function');
  });

  it('does nothing for non-string values', function () {
    assert.deepEqual(JSON.parse('{"foo":23}', plugin), {
      foo: 23
    });
  });

  it('replaces time strings with their millisecond values', function () {
    assert.deepEqual(JSON.parse('{"foo":"23 hours"}', plugin), {
      foo: 82800000
    });
  });

  it('does nothing if the value is not a time string', function () {
    assert.deepEqual(JSON.parse('{"foo":"omg"}', plugin), {
      foo: 'omg'
    });
  });

});
