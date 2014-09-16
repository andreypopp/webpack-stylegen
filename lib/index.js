'use strict';

var React                  = require('react');
var copyProperties         = require('react/lib/copyProperties');
var merge                  = require('react/lib/merge');
var ReactInjection         = require('react/lib/ReactInjection');
var ReactDOM               = require('react/lib/ReactDOM');
var DOM                    = require('./DOM');
var Style                  = require('./Style');
var stylesToCSS            = require('./stylesToCSS');
var styleComponent         = require('./styleComponent');
var styleComponentChildren = require('./styleComponentChildren');

ReactInjection.DOM.injectComponentClasses(DOM);

var styles = [];
var captureStyles = false;

function createStyle(props, className) {
  var children = {};
  var style = {};

  for (var key in props) {
    if (!props.hasOwnProperty(key)) {
      continue;
    }

    var value = props[key];
    if (typeof value === 'object') {
      if (value instanceof Style) {
        children[key] = value;
      } else {
        children[key] = ReactStyle.create(
          value,
          className ? className + '__' + key : null);
      }
    } else {
      style[key] = props[key];
    }
  }

  if (className) {
    if (captureStyles) {
      styles.push(new Style(style, className, children));
    } else if (window.__ReactStyle__ && window.__ReactStyle__[className]) {
      return new Style(style, className, children, true);
    }
  }
  return new Style(style, className, children);
}

var ReactStyle = {

  create: createStyle,
  style: styleComponent,
  styleChildren: styleComponentChildren,

  startCaptureStyles: function() {
    captureStyles = true;
  },

  stopCaptureStyles: function() {
    captureStyles = false;
  },

  compileCapturedStyles: function() {
    return stylesToCSS(styles);
  }
};

copyProperties(createStyle, ReactStyle);

module.exports = createStyle;
