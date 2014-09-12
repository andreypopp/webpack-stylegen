'use strict';

module.exports = function style(src) {
  this.cacheable();
  if (/ReactStyle/.exec(src)) {
    return src.replace(/require\('/g, "require('" + require.resolve('./reset') + '!');
  } else {
    return 'module.exports = [];';
  }
};
