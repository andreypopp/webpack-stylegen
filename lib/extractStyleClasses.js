'use strict';

var recast            = require('recast');
var invariant         = require('react/lib/invariant');
var types             = recast.types;
var n                 = types.namedTypes;
var b                 = types.builders;
var hasThisExpression = require('./hasThisExpression');

function extractStyleClasses(tree, options) {
  options = options || {};
  var prefix = options.prefix;
  return recast.visit(tree, {
    visitCallExpression: function(path) {
      var node = path.value;
      if (this.isStyleDeclaration(path)) {
        this.checkStyleDeclaration(path);
        var style = node.arguments[0];
        if (!hasThisExpression(style)) {
          var styleName = this.inferStyleClassName(path);
          path.replace(this.buildStyleClassDeclaration(style, styleName));
        }
        return false;
      }
      this.traverse(path);
    },

    isStyleDeclaration: function(path) {
      var node = path.value;
      return (
        n.MemberExpression.check(node.callee) &&
        n.Identifier.check(node.callee.object) &&
        node.callee.object.name === 'ReactStyle' &&
        n.Identifier.check(node.callee.property) &&
        node.callee.property.name === 'declareStyle'
      );
    },

    checkStyleDeclaration: function(path) {
      var node = path.value;
      invariant(
        node.arguments.length === 1,
        'ReactStyle.declareStyle(..) should be called with a single argument'
      );
      invariant(
        n.FunctionExpression.check(node.arguments[0]),
        'ReactStyle.declareStyle(..) argument should be a function expression'
      );
    },

    inferStyleClassName: function(path) {
      var part1;
      var part2;

      if (n.Property.check(path.parentPath.value)) {
        var keyName = path.parentPath.value.key.name;
        if (keyName === 'style') {
          part2 = '';
        } else {
          part2 = '__' + keyName;
        }
      }

      while (path.parentPath) {
        path = path.parentPath;
        if (n.VariableDeclarator.check(path.value)) {
          part1 = path.value.id.name;
        }
      }

      var styleClassName = part1 + part2;
      if (prefix) {
        styleClassName = prefix + '-' + styleClassName;
      }
      return styleClassName;
    },

    buildStyleClassDeclaration: function(style, styleName) {
      return b.callExpression(
        b.memberExpression(
          b.identifier('ReactStyle'),
          b.identifier('declareStyleClass'),
          false),
        [style, b.literal(styleName)]);
    }
  });
}

module.exports = extractStyleClasses;
