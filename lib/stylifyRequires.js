'use strict';

var recast  = require('recast');
var types   = recast.types;
var n       = types.namedTypes;
var b       = types.builders;
var style   = require.resolve('../loader/style');

function stylifyRequires(tree, hasStyles) {
  recast.visit(tree, {

    visitCallExpression: function(path) {
      var node = path.value;

      if (this.isCJSRequireCall(node)) {
        node = this.rewriteCJSRequire(node);
        path.replace(node);
        return false;
      } else {
        this.traverse(path);
      }
    },

    isCJSRequireCall: function(node) {
      return (
        n.Identifier.check(node.callee) &&
        node.callee.name === 'require' &&
        node.arguments.length === 1
      );
    },

    rewriteCJSRequire: function(node) {
      var value = node.arguments[0].value;
      if (value[0] !== '-') {
        value = value.split('!');
        value.unshift(style);
        value = value.join('!');
      }
      return b.callExpression(
        node.callee,
        [b.literal(value)]
      );
    }

  });

  return tree;
}

function makeConcat(args) {
  return b.callExpression(
      b.memberExpression(
        b.arrayExpression([]),
        b.identifier('concat'),
        false),
      args);
}

function makeModuleExports() {
  return b.memberExpression(
    b.identifier('module'),
    b.identifier('exports'),
    false
  );
}

module.exports = stylifyRequires;
