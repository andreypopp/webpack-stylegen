/**
 * @jsx React.DOM
 */
'use strict';

function fn(name) {
  var args = [];
  for (var i = 1, len = arguments.length; i < len; i++) {
    if (arguments[i] === undefined) {
      break;
    }
    args.push(arguments[i]);
  }
  return `${name}(${args.join(', ')})`;
}

function seq() {
  var args = [];
  for (var i = 0, len = arguments.length; i < len; i++) {
    if (arguments[i] === undefined) {
      break;
    }
    args.push(arguments[i]);
  }
  return args.join(' ');
}

var none = 'none';
var transparent = 'transparent';
var inherit = 'inherit';
var rgba = fn.bind(null, 'rgba');
var rgb = fn.bind(null, 'rgb');
var linearGradient = fn.bind(null, 'linear-gradient');
var stop = seq;

module.exports = {
  none, transparent, rgba, rgb, linearGradient, stop
};
