'use strict';

var recast = require('recast');

function hasThisExpression(tree) {
  var isDynamic = false;
  recast.visit(tree, {
    visitThisExpression: function(path) {
      isDynamic = true;
      return false;
    }
  });
  return isDynamic;
}

module.exports = hasThisExpression;
