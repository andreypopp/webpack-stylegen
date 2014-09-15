'use strict';

var buildCSS          = require('./buildCSS');
var React             = require('react');
var copyProperties    = require('react/lib/copyProperties');
var DOM               = require('./DOM');

React.DOM = DOM;

var styles = [];
var captureStyles = false;

var ReactStyle = {

  create: function(ruleSet, className) {
    if (className) {
      if (captureStyles) {
        styles.push({
          className: className,
          ruleSet: ruleSet
        });
        return ruleSet;
      } else if (window.__ReactStyle__ && window.__ReactStyle__[className]) {
        return className;
      }
    }
    return ruleSet;
  },

  startCaptureStyles: function() {
    captureStyles = true;
  },

  stopCaptureStyles: function() {
    captureStyles = false;
  },

  compileCapturedStyles: function() {
    var css = buildCSS();
    var classNames = {};
    for (var i = 0, len = styles.length; i < len; i++) {
      var className = styles[i].className;
      classNames[className] = true;
      var ruleSet = styles[i].ruleSet;
      css.rule('.' + className, ruleSet);
    }
    css = css.toString();
    return {css: css, classNames: classNames};
  }
};

copyProperties(ReactStyle.create, ReactStyle);

module.exports = ReactStyle.create;
