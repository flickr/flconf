var config = require('..');
var assert = require('assert');

/* jshint mocha:true */
/* eslint-env mocha */

describe('use (String)', function () {
  var subject;

  beforeEach(function () {
    subject = config(__dirname + '/fixtures');
  });

  it('loads the config by name', function () {
    subject.use('default');

    assert.deepEqual(subject.load(), {
      log_level: 'info'
    });
  });

  it('merges multiple configs by name', function () {
    subject.use('default');
    subject.use('env/production');

    assert.deepEqual(subject.load(), {
      log_level: 'none',
      api_host: 'https://api.flickr.com'
    });
  });

  it('merges multiple configs in order', function () {
    subject.use('default');
    subject.use('env/production');
    subject.use('region/us-east-1');

    assert.deepEqual(subject.load(), {
      log_level: 'none',
      api_host: 'https://api-us-east.flickr.com'
    });
  });

  it('treats config names as globs', function () {
    subject.use('default');
    subject.use('env/production');
    subject.use('region/eu-east-1');

    assert.deepEqual(subject.load(), {
      log_level: 'none',
      api_host: 'https://api-eu.flickr.com'
    });
  });

});
