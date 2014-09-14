'use strict';

var ReactStyle = require.resolve('../index');

module.exports = function entry(src) {
  this && this.cacheable && this.cacheable();
  return [
    'var __ReactStyle = require(' + JSON.stringify(ReactStyle) + ');',
    '__ReactStyle.startCaptureStyles();',
    src,
    '__ReactStyle.stopCaptureStyles();',
    'module.exports = [[module.id, __ReactStyle.compileCapturedStyles(), ""]];'
  ].join('\n');
};
