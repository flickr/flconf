var plugin = require('../lib/env');
var config = require('..');
var assert = require('assert');

/* jshint mocha:true */
/* eslint-env mocha */

describe('plugins/env', function () {

  it('is available on a config instance', function () {
    assert.equal(typeof config(__dirname).env, 'function');
  });

  it('does nothing for non-string values', function () {
    assert.deepEqual(JSON.parse('{"pwd":23}', plugin), {
      pwd: 23
    });
  });

  it('replaces placeholders with environment variable values', function () {
    assert.deepEqual(JSON.parse('{"pwd":"${PWD}"}', plugin), {
      pwd: process.env.PWD
    });
  });

  it('replaces placeholders in the middle of strings', function () {
    assert.deepEqual(JSON.parse('{"pwd":"omg ${PWD} yay"}', plugin), {
      pwd: 'omg ' + process.env.PWD + ' yay'
    });
  });

  it('replaces multiple placeholders', function () {
    assert.deepEqual(JSON.parse('{"PS1":"${PWD} (${LOGNAME})"}', plugin), {
      PS1: process.env.PWD + ' (' + process.env.LOGNAME + ')'
    });
  });

});
