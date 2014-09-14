'use strict';

var makeCSSBuilder    = require('css-builder');
var React             = require('react');
var copyProperties    = require('react/lib/copyProperties');
var DOM               = require('./DOM');
var generateClassName = require('./generateClassName');

React.DOM = DOM;

var styles = [];
var captureStyles = false;

var ReactStyle = {

  create: function(ruleSet) {
    if (captureStyles) {
      var className = generateClassName();
      styles.push({
        className: className,
        ruleSet: ruleSet
      });
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
    var css = makeCSSBuilder();
    for (var i = 0, len = styles.length; i < len; i++) {
      var className = styles[i].className;
      var ruleSet = styles[i].ruleSet;
      if (typeof ruleSet === 'function') {
        ruleSet = ruleSet();
      }
      css.rule('.' + className, ruleSet);
    }
    css = css.toString();
    return css;
  }
};

copyProperties(ReactStyle.create, ReactStyle);

module.exports = ReactStyle.create;
