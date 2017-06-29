# flconf

[![Build Status](https://travis-ci.org/flickr/flconf.svg?branch=master)](https://travis-ci.org/flickr/flconf)

> Simple, pluggable, hierarchical configs

## install

```
$ npm install flconf --save
```

## usage

If you have a config directory that looks like:

```
config
├── default.json
└── env
    ├── development.json
    ├── production.json
    └── test.json
```

``` js
var config = require('flconf')(__dirname + '/config');

config.use('default');
config.use('env/' + process.env.NODE_ENV || 'development');

module.exports = config.load();
```

flconf will load default.json first, then it will load the config file for the appropriate NODE_ENV. You can specify as many layers of config as you like.

Config filenames can be globs as matched by [minimatch][1].

## methods

``` js
var Config = require('flconf');
```

### Config(dirname)

Creates a new Config instance. You must provide the dirname that flconf will use while loading config files.

You can omit the `new` operator and simply invoke flconf with the dirname if you wish:

```
var config = require('flconf')(__dirname);
```

### config.use(file)

Adds `file` as a layer in this config. `file` should be the path to a config file without the `.json` extension.

### config.use(function)

Adds a plugin to this config's plugin stack. Plugins are simply `JSON.parse` reviver functions that modify the config in some way. See the [plugins](#plugins) section for more details.

### config.load()

Loads all of the specified config files and returns the merged config object.

## plugins

### config.env

Replaces any bash-style environment variables with their actual values in the environment.

``` json
{
  "user": "${LOGNAME}"
}
```

Will load as:

``` json
{
  "user": "ruppel"
}
```

### config.ms

``` js
config.use(config.ms);
```

Replaces ms-style time strings with their value in milliseconds.

``` json
{
  "maxAge": "1 day"
}
```

Will load as:

``` json
{
  "maxAge": 86400000
}
```

### config.json5

``` js
// note that you need to load this plugin
config.use(config.json5.load());
```

Allows the usage of json5 syntax in your config files. The JSON5 plugin will not obstruct the usage of other flconf plugins.

``` js
{
  // comments are totally fine!
  bool: true,
  number: 100,
  string: 'Human Readable JSON',
  object: {},
  array: [],
  null: null
}
```

Will load as:

``` js
{
  bool: true,
  number: 100,
  string: 'Human Readable JSON',
  object: {},
  array: [],
  null: null
}
```

## license

This software is free to use under the MIT license. See the [LICENSE][] file for license text and copyright information.

[1]: https://github.com/isaacs/minimatch
[LICENSE]: https://github.com/flickr/flconf/blob/master/LICENSE
