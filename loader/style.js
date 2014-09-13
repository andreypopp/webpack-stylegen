'use strict';

var esprima    = require('esprima-fb');
var escodegen  = require('escodegen');
var escope     = require('escope');
var estraverse = require('estraverse');
var rewrite    = require('./rewrite');

function optimize(src) {
  var tree = esprima.parse(src);
  var scope = escope.analyze(tree).scopes[0];
  return src;
}

module.exports = function style(src) {
  this && this.cacheable && this.cacheable();
  if (/ReactStyle/.exec(src)) {
    src = optimize(src);
    return rewrite(src);
  } else {
    return 'module.exports = [];';
  }
};
