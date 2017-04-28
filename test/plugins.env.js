var plugin = require('../lib/env');
var config = require('..');
var assert = require('assert');

/* jshint mocha:true */
/* eslint-env mocha */

describe('plugins/env', function () {

	before(function () {
		// define some fake environment variables
		process.env.FOO = 'foo';
		process.env.BAR = 'bar';
	});

  it('is available on a config instance', function () {
    assert.equal(typeof config(__dirname).env, 'function');
  });

  it('does nothing for non-string values', function () {
    assert.deepEqual(JSON.parse('{"foo":23}', plugin), {
      foo: 23
    });
  });

  it('replaces placeholders with environment variable values', function () {
    assert.deepEqual(JSON.parse('{"foo":"${FOO}"}', plugin), {
      foo: process.env.FOO
    });
  });

  it('replaces placeholders in the middle of strings', function () {
    assert.deepEqual(JSON.parse('{"foo":"omg ${FOO} yay"}', plugin), {
      foo: 'omg ' + process.env.FOO + ' yay'
    });
  });

  it('replaces multiple placeholders', function () {
    assert.deepEqual(JSON.parse('{"foo":"${FOO} (${BAR})"}', plugin), {
      foo: process.env.FOO + ' (' + process.env.BAR + ')'
    });
  });

  it('throws if a placeholder is not defined in this environment', function () {
    assert.throws(function () {
      JSON.parse('{"foo":"${BOOM}"}', plugin);
    }, function (err) {
      return err.name === 'ReferenceError' && err.message === 'flconf: process.env.BOOM is undefined';
    });
  });

});
