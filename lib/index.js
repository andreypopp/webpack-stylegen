'use strict';

var makeCSSBuilder = require('css-builder');

var classes = [];

var ReactStyle = {
  
  declareStyleClass: function(ruleSet, className) {
    classes.push({
      className: className,
      ruleSet: ruleSet
    });
  },

  compileStyleClasses: function() {
    var css = makeCSSBuilder();
    for (var i = 0, len = classes.length; i < len; i++) {
      var className = classes[i].className;
      var ruleSet = classes[i].ruleSet;
      css.rule('.' + className, ruleSet);
    }
    css = css.toString();
    return css;
  }
};

module.exports = ReactStyle;
