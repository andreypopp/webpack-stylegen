'use strict';

var React                  = require('react');
var copyProperties         = require('react/lib/copyProperties');
var merge                  = require('react/lib/merge');
var DOM                    = require('./DOM');
var Style                  = require('./Style');
var stylesToCSS            = require('./stylesToCSS');
var styleComponent         = require('./styleComponent');
var styleComponentChildren = require('./styleComponentChildren');

React.DOM = DOM;

var styles = [];
var captureStyles = false;

var ReactStyle = {

  create: function(style, className, skipCapture) {
    style = merge(style);
    var children = {};
    for (var keys = Object.keys(style), i = 0, len = keys.length; i < len; i++) {
      if (typeof style[keys[i]] === 'object') {
        if (!(style[keys[i]] instanceof Style)) {
          children[keys[i]] = ReactStyle.create(
            style[keys[i]],
            className ? className + '__' + keys[i] : null,
            true
          );
        } else {
          children[keys[i]] = style[keys[i]];
        }
        delete style[keys[i]];
      }
    }
    if (className) {
      if (captureStyles) {
        if (!skipCapture) {
          styles.push(new Style(style, className, children));
        }
      } else if (window.__ReactStyle__ && window.__ReactStyle__[className]) {
        return new Style(style, className, children, true);
      }
    }
    return new Style(style, className, children);
  },

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

copyProperties(ReactStyle.create, ReactStyle);

module.exports = ReactStyle.create;
