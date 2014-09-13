'use strict';

var rewrite = require('./rewrite');

module.exports = function source(src) {
  this && this.cacheable && this.cacheable();
  return rewrite(src);
};
