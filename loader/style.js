'use strict';

var rewrite = require('./rewrite');

module.exports = function style(src) {
  this.cacheable();
  if (/ReactStyle/.exec(src)) {
    return rewrite.call(this, src);
  } else {
    return 'module.exports = [];';
  }
};
