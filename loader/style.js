'use strict';

var recast          = require('recast');
var stylifyRequires = require('../lib/stylifyRequires');
var registry        = require.resolve('../lib/registry');

module.exports = function style(src) {
  this && this.cacheable && this.cacheable();
  var hasStyles = /ReactStyle/.exec(src);
  var tree = recast.parse(src);
  tree = stylifyRequires(tree, hasStyles);
  src = recast.print(tree).code;
  src = [
    src,
    'require(' + JSON.stringify('-!' + registry) + ').add([[module.id, ' + JSON.stringify(this.resourcePath + '\n') + ', ""]]);'
  ].join('\n');
  return src;
};
