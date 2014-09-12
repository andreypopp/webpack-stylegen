'use strict';

var rewrite = require('./rewrite');

module.exports = function style(src) {
  this && this.cacheable && this.cacheable();
  if (/ReactStyle/.exec(src)) {
    return rewrite(src);
  } else {
    return 'module.exports = [];';
  }
};
