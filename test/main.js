var config = require('..');
var assert = require('assert');

/* jshint mocha:true */
/* eslint-env mocha */

describe('main', function () {

  it('requires a dirname', function () {
    assert.throws(config, /Config directory is required/);
  });

  describe('#load', function () {

    it('returns an object', function () {
      assert.deepEqual(config(__dirname).load(), {});
    });

  });

  describe('#parse', function () {

    it('defaults to JSON.parse', function () {
      assert.strictEqual(config(__dirname).parse, JSON.parse);
    });

  });

  describe('#pattern', function () {

    it('defaults to a glob for .json files', function () {
      assert.equal(config(__dirname).pattern, '**/*.json');
    });

  });

});
