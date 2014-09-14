'use strict';

var ReactStyle = require.resolve('../index');

module.exports = function entry(src) {
  this && this.cacheable && this.cacheable();
  var css = 'require(' + JSON.stringify(ReactStyle) + ').compileStyleClasses()'
  return src + '\n' + 'module.exports = [[module.id, ' + css + ', ""]];'
};
