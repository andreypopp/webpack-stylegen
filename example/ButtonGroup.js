/**
 * @jsx React.DOM
 */
'use strict';

var React           = require('react');
var ReactStyle      = require('react-style');

var ButtonGroup = React.createClass({

  style: ReactStyle({
    display: 'inline-block',
    children: {
      margin: 0,
      borderRadius: 0
    },
    firstChild: {
      margin: 0,
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0
    },
    lastChild: {
      margin: 0,
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0
    }
  }),

  render() {
    var styles = [this.style, this.props.styles];
    return ReactStyle.style(styles,
      <div>{this.props.children}</div>
    );
  }
});

module.exports = ButtonGroup;
