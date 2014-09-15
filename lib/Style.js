'use strict';

var mergeInto = require('react/lib/merge');

function Style(style, className, children, compiled) {
  this.style = style;
  this.className = className;
  this.children = children;
  this.compiled = compiled;
}

module.exports = Style;
