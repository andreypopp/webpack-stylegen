'use strict';

var React             = require('react');
var cloneWithProps    = require('react/lib/cloneWithProps');
var copyProperties    = require('react/lib/copyProperties');
var merge             = require('react/lib/merge');
var DOM               = require('./DOM');
var Style             = require('./Style');
var stylesToCSS       = require('./stylesToCSS');

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

  style: function(styles, component) {
    var componentStyles = [].concat(component.props.styles || [], styles);
    component = cloneWithProps(component, {
      styles: componentStyles,
      children: this.styleChildren(styles, component.props.children)
    });
    return component;
  },

  styleChildren: function(styles, children) {
    var childrenStyles = [];
    var firstChildStyles = [];
    var lastChildStyles = [];

    if (!Array.isArray(styles)) {
      styles = [styles];
    }

    for (var i = 0, len = styles.length; i < len; i++) {
      if (!styles[i] || !styles[i].children) {
        continue;
      }
      if (styles[i].children.children) {
        childrenStyles.push(styles[i].children.children);
      }
      if (styles[i].children.firstChild) {
        firstChildStyles.push(styles[i].children.firstChild);
      }
      if (styles[i].children.lastChild) {
        lastChildStyles.push(styles[i].children.lastChild);
      }
    }

    var length = React.Children.count(children);
    return React.Children.map(children, function(child, idx) {
      if (child === null) {
        return null;
      }
      if (idx === 0 && firstChildStyles.length > 0) {
        return cloneWithProps(
          child,
          {styles: [].concat(child.props.styles || [], firstChildStyles)}
        );
      } else if (idx === length - 1 && lastChildStyles.length > 0) {
        return cloneWithProps(
          child,
          {styles: [].concat(child.props.styles, lastChildStyles)}
        );
      } else {
        return cloneWithProps(
          child,
          {styles: [].concat(child.props.styles, childrenStyles)}
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
    return stylesToCSS(styles);
    var css = buildCSS();
    for (var i = 0, len = styles.length; i < len; i++) {
      css.style(styles[i]);
    }
    return {css: css.toString(), classNames: css.classNames};
  }
};

copyProperties(ReactStyle.create, ReactStyle);

module.exports = ReactStyle.create;
