'use strict';

var crypto            = require('crypto');
var path              = require('path');
var recast            = require('recast');
var annotateStyleName = require('../annotateStyleName');

module.exports = function annotate(src) {
  if (this && this.cacheable) {
    this.cacheable();
  }
  if (/ReactStyle/.exec(src)) {
    var hash = crypto.createHash('sha1');
    hash.update(this.resourcePath);
    var prefix = hash.digest('hex').slice(0, 8);

    var tree = recast.parse(src);
    tree = annotateStyleName(tree, prefix);
    src = recast.print(tree).code;
  }
  return src;
};
