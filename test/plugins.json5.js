var plugin = require('../lib/json5');
var config = require('..');
var assert = require('assert');

/* jshint mocha:true */
/* eslint-env mocha */

describe('plugins/json5', function () {

  before(function () {
    plugin.load();
  });

  it('is available on a config instance', function () {
    assert.equal(config(__dirname).json5, plugin);
  });

  it('parses regular json', function () {
    assert.deepStrictEqual(JSON.parse('{"foo":23, "bar": "yes", "baz": true}', plugin), {
      foo: 23,
      bar: 'yes',
      baz: true
    });
  });

  it('parses json5', function () {
    assert.deepStrictEqual(JSON.parse("{foo:23, bar: 'yes', baz: true}", plugin), {
      foo: 23,
      bar: 'yes',
      baz: true
    });
  });

  it('should itself be an identity resolver', function () {
    var resolver = plugin;

    assert.equal(typeof resolver, 'function');
    assert.equal(resolver('key', 'value'), 'value');
  });

  it('should return an identity resolver from the load method', function () {
    var resolver = plugin.load();

    assert.equal(typeof resolver, 'function');
    assert.equal(resolver('key', 'value'), 'value');
  });

});
