
var env = require('../lib/env');
var ms = require('../lib/ms');
var json5 = require('../lib/json5');
var assert = require('assert');

/* jshint mocha:true */
/* eslint-env mocha */

var resolver = function (key, value) {
  return [json5, env, ms].reduce(function (val, plugin) {
    return plugin(key, val);
  }, value);
};

describe('plugins/json5 integration', function () {

  before(function () {
    process.env.FOO = 'FOO';
    json5.load();
  });

  it('should not obstruct other flconf plugins', function () {
    assert.deepStrictEqual(JSON.parse("{foo:23, bar: 'yes', baz: true, week: '7 days', FOO: '${FOO}'}", resolver), {
      foo: 23,
      bar: 'yes',
      baz: true,
      week: 604800000,
      FOO: 'FOO'
    });
  });

});
