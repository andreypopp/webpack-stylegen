'use strict';

var crypto            = require('crypto');
var path              = require('path');
var recast            = require('recast');
var annotateStyleName = require('../annotateStyleName');
var transformComputed = require('es6-computed-properties').transform;

module.exports = function annotate(src) {
  this && this.cacheable && this.cacheable();
  if (/ReactStyle/.exec(src)) {
    var hash = crypto.createHash('sha1');
    hash.update(this.resourcePath);
    var prefix = hash.digest('hex').slice(0, 8);

    var tree = recast.parse(src);
    tree = annotateStyleName(tree, prefix);
    tree = transformComputed(tree);
    src = recast.print(tree).code;
  }
  return src;
};
