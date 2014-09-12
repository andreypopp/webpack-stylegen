'use strict';

module.exports = function source(src) {
  this && this.cacheable && this.cacheable();
  return src;
};
