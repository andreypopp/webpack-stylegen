'use strict';

module.exports = function source(src) {
  this.cacheable();
  return src;
};
