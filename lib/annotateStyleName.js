'use strict';

var recast            = require('recast');
var invariant         = require('react/lib/invariant');
var types             = recast.types;
var n                 = types.namedTypes;
var b                 = types.builders;

function annotateStyleName(tree, options) {
  options = options || {};
  var prefix = options.prefix;
  return recast.visit(tree, {
    visitCallExpression: function(path) {
      var node = path.value;
      if (this.isStyleDeclaration(path)) {
        if (node.arguments.length == 1) {
          var styleName = this.inferStyleClassName(path);
          var replacement = this.buildStyleClassDeclaration(node.callee, node.arguments[0], styleName)
          path.replace(replacement);
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
        node.callee.property.name === 'create'
      ) || (
        n.Identifier.check(node.callee) &&
        node.callee.name === 'ReactStyle'
      );
    },

    buildStyleClassDeclaration: function(callee, style, styleName) {
      return b.callExpression(callee, [style, b.literal(styleName)]);
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
  });
}

module.exports = annotateStyleName;
