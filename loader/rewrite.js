'use strict';

var reset = require.resolve('./reset');

module.exports = function rewrite(src) {
  this.cacheable();
  src = src
    .replace(/require\("/g, "require(\"" + reset + '!')
    .replace(/require\('/g, "require('" + reset + '!');
  return src;
};

