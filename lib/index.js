'use strict';

var buildCSS                = require('./buildCSS');
var React                   = require('react');
var merge                   = require('react/lib/merge');
var ReactCompositeComponent = require('react/lib/ReactCompositeComponent');
var copyProperties          = require('react/lib/copyProperties');
var DOM                     = require('./DOM');

React.DOM = DOM;

var styleIndex = 0;
var componentRegistry = {}

var prevCreateClass = React.createClass;
React.createClass = function(spec) {
  var cls = prevCreateClass(spec);

  styleIndex += 1;
  cls.styleIndex = cls.type.styleIndex = 'styleIndex' + styleIndex;
  componentRegistry[cls.styleIndex] = cls;

  var prevProcessProps = cls.type.prototype._processProps;
  cls.type.prototype._processProps = function(props) {
    props = prevProcessProps.call(this, props);
    if (this._owner && this._owner._renderedComponent.childStyles) {
      var childStyles = this._owner._renderedComponent.childStyles;
      var styles  = childStyles[this.constructor.styleIndex];
      if (styles) {
        props = merge(props, {styles: (props.styles || []).concat(styles)});
      }
    }
    return props;
  }
  return cls;
};

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
