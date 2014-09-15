'use strict';

var buildCSS          = require('./buildCSS');
var React             = require('react');
var cloneWithProps    = require('react/lib/cloneWithProps');
var copyProperties    = require('react/lib/copyProperties');
var merge             = require('react/lib/merge');
var DOM               = require('./DOM');
var Style             = require('./Style');

React.DOM = DOM;

var styles = [];
var captureStyles = false;

var ReactStyle = {

  create: function(style, className, skipCapture) {
    style = merge(style);
    var children = {};
    for (var keys = Object.keys(style), i = 0, len = keys.length; i < len; i++) {
      if (typeof style[keys[i]] === 'object') {
        children[keys[i]] = ReactStyle.create(
          style[keys[i]],
          className ? className + '__' + keys[i] : null,
          true
        );
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

  styleChildren: function(children, styles) {
    var length = React.Children.count(children);
    return React.Children.map(children, function(child, idx) {
      if (idx === 0 && styles.children.firstChild) {
        return cloneWithProps(
          child,
          {styles: [].concat(child.props.styles, styles.children.firstChild)}
        );
      } else if (idx === length - 1 && styles.children.lastChild) {
        return cloneWithProps(
          child,
          {styles: [].concat(child.props.styles, styles.children.lastChild)}
        );
      } else {
        return cloneWithProps(
          child,
          {styles: [].concat(child.props.styles, styles.children.children)}
        );
      }
      return child;
    });
  },

  startCaptureStyles: function() {
    captureStyles = true;
  },

  stopCaptureStyles: function() {
    captureStyles = false;
  },

  compileCapturedStyles: function() {
    var css = buildCSS();
    for (var i = 0, len = styles.length; i < len; i++) {
      css.style(styles[i]);
    }
    return {css: css.toString(), classNames: css.classNames};
  }
};

copyProperties(ReactStyle.create, ReactStyle);

module.exports = ReactStyle.create;
