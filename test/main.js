var config = require('..');
var assert = require('assert');

/* jshint mocha:true */
/* eslint-env mocha */

describe('main', function () {

  it('requires a dirname', function () {
    assert.throws(config, /Config directory is required/);
  });

  it('returns an object', function () {
    assert.deepEqual(config(__dirname).load(), {});
  });

});
