'use strict';

var makeCSSBuilder = require('css-builder');
var React          = require('react');
var DOM            = require('./DOM');

React.DOM = DOM;

var classes = [];

var ReactStyle = {

  declareStyle: function(ruleSet) {
    if (typeof ruleSet !== 'function') {
      return function() { return ruleSet; };
    } else {
      return ruleSet;
    }
  },

  declareStyleClass: function(ruleSet, className) {
    classes.push({
      className: className,
      ruleSet: ruleSet
    });
    return function styleClass() { return className; };
  },

  compileStyleClasses: function() {
    var css = makeCSSBuilder();
    for (var i = 0, len = classes.length; i < len; i++) {
      var className = classes[i].className;
      var ruleSet = classes[i].ruleSet;
      if (typeof ruleSet === 'function') {
        ruleSet = ruleSet();
      }
      css.rule('.' + className, ruleSet);
    }
    css = css.toString();
    return css;
  }
};

module.exports = ReactStyle;
