'use strict';

var cloneWithProps         = require('react/lib/cloneWithProps');
var styleComponentChildren = require('./styleComponentChildren');

function styleComponent(styles, component) {
  var componentStyles = [].concat(component.props.styles || [], styles);
  component = cloneWithProps(component, {
    styles: componentStyles,
    children: styleComponentChildren(styles, component.props.children)
  });
  return component;
}

module.exports = styleComponent;
