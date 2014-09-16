'use strict';

function fn(name) {
  return function() {
    var args = [];
    for (var i = 0, len = arguments.length; i < len; i++) {
      if (arguments[i] === undefined) {
        break;
      }
      args.push(arguments[i]);
    }
    return name + '(' + args.join(', ') + ')';
  };
}

function seq(sep) {
  return function() {
    var args = [];
    for (var i = 0, len = arguments.length; i < len; i++) {
      if (arguments[i] === undefined) {
        break;
      }
      args.push(arguments[i]);
    }
    return args.join(sep);
  };
}

function complexStyle(compiler, sep) {
  return function() {
    var style = [];
    for (var i = 0, len = arguments.length; i < len; i++) {
      if (typeof arguments[i] === 'string') {
        style.push(arguments[i]);
      } else {
        style.push(compiler(arguments[i]));
      }
    }
    return style.join(sep);
  };
}

var none = 'none';
var transparent = 'transparent';
var inherit = 'inherit';
var center = 'center';
var pointer = 'pointer';
var inset = 'inset';
var normal = 'normal';
var baseline = 'baseline';
var nowrap = 'nowrap';
var inlineBlock = 'inline-block';

var rgba = fn('rgba');
var rgb = fn('rgb');
var linearGradient = fn('linear-gradient');

var stop = seq(' ');
var padding = seq(' ');

var shadow = complexStyle(function(opts) {
  return [
    opts.offsetX || '0',
    opts.offsetY || '0',
    opts.blur || '',
    opts.spread || '',
    opts.color || '',
    opts.type || ''
  ].join(' ');
}, ', ');
var border = complexStyle(function(opts) {
  return [
    opts.width || '',
    opts.style || 'solid',
    opts.color || ''
  ].join(' ');
}, ' ');


module.exports = {
  none: none,
  transparent: transparent,
  rgba: rgba,
  rgb: rgb,
  linearGradient: linearGradient,
  stop: stop,
  shadow: shadow,
  border: border,
  pointer: pointer,
  center: center,
  nowrap: nowrap,
  baseline: baseline,
  normal: normal,
  inherit: inherit,
  inset: inset,
  inlineBlock: inlineBlock,
  padding: padding
};
