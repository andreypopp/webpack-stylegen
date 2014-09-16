'use strict';

var React                     = require('react');
var ReactDescriptor           = require('react/lib/ReactDescriptor');
var ReactDOMComponent         = require('react/lib/ReactDOMComponent');
var ReactDescriptorValidator  = require('react/lib/ReactDescriptorValidator');
var merge                     = require('react/lib/merge');
var mergeInto                 = require('react/lib/mergeInto');
var toArray                   = require('react/lib/toArray');
var isString                  = require('./isString');
var isArray                   = Array.isArray;

var DOM = {};

function producePropsUpdate(props) {
  var styles = props.styles;

  var update = {
    className: props.className,
    style: props.style ? merge(props.style) : {},
    styles: undefined
  };

  if (styles && isString(styles.className) && styles.compiled) {
    if (update.className) {
      update.className += ' ' + styles.className;
    } else {
      update.className = styles.className;
    }
  } else if (isArray(styles)) {
    var style = {};
    var className = '';

    for (var i = 0, len = styles.length; i < len; i++) {
      var item = styles[i];
      if (item && isString(item.className) && item.compiled) {
        className += ' ' + item.className;
      } else if (item === false || item === null || item === undefined) {
        // do nothing
      } else {
        mergeInto(style, item.style);
      }
    }

    if (update.className) {
      update.className += ' ' + className;
    } else {
      update.className = className;
    }

    if (update.style) {
      update.style = merge(update.style, style);
    } else {
      update.style = style;
    }
  }

  return update;
}

Object.keys(React.DOM).forEach(function(tag) {
  var PrevConstructor = React.DOM[tag].type;

  // React.DOM exports not only components
  if (PrevConstructor === undefined) {
    return;
  }

  var Constructor = function(descriptor) {
    if (descriptor.props.styles) {
      var update = producePropsUpdate(descriptor.props);
      mergeInto(descriptor.props, update);
    }
    this.construct(descriptor);
  };

  Constructor.displayName = tag;
  Constructor.prototype = Object.create(PrevConstructor.prototype);
  Constructor.prototype.constructor = Constructor;

  Constructor.prototype.performUpdateIfNecessary = function(transaction) {
    var descriptor = this._pendingDescriptor;
    if (descriptor.props.styles) {
      var update = producePropsUpdate(descriptor.props);
      mergeInto(descriptor.props, update);
    }
    return PrevConstructor.prototype.performUpdateIfNecessary.call(this, transaction);
  };

  var ConvenienceConstructor = ReactDescriptor.createFactory(Constructor);

  if ("production" !== process.env.NODE_ENV) {
    ConvenienceConstructor = ReactDescriptorValidator.createFactory(
      ConvenienceConstructor
    );
  }

  DOM[tag] = ConvenienceConstructor;
});

module.exports = DOM;
