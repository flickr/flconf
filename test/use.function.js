var config = require('..');
var assert = require('assert');

/* jshint mocha:true */
/* eslint-env mocha */

describe('use (Function)', function () {
  var subject;

  beforeEach(function () {
    subject = config(__dirname + '/fixtures');
  });

  it('adds a reviver to the stack', function () {
    subject.use(function (key, val) {
      if (key === 'log_level') {
        return 10;
      }
      return val;
    });

    subject.use('default');

    assert.deepEqual(subject.load(), {
      log_level: 10
    });
  });

  it('adds multiple revivers to the stack', function () {
    subject.use(function (key, val) {
      if (key === 'log_level') {
        return 10;
      }
      return val;
    });

    subject.use(function (key, val) {
      if (key === 'log_level') {
        return val + 10;
      }
      return val;
    });

    subject.use('default');

    assert.deepEqual(subject.load(), {
      log_level: 20
    });
  });

});
