/**
 * @jsx React.DOM
 */
'use strict';

var React           = require('react/addons');
var cloneWithProps  = React.addons.cloneWithProps;
var ReactStyle      = require('react-style');

var ButtonGroup = React.createClass({

  style: ReactStyle({
    display: 'inline-block',
    children: {
      margin: 0,
      notLastChild: {
        notFirstChild: {
          borderRadius: 0
        }
      },
      firstChild: {
        notLastChild: {
          borderTopRightRadius: 0,
          borderBottomRightRadius: 0
        }
      },
      lastChild: {
        notFirstChild: {
          borderTopLeftRadius: 0,
          borderBottomLeftRadius: 0
        }
      }
    }
  }),

  render() {
    return <div styles={this.style}>{this.props.children}</div>;
  }
});

module.exports = ButtonGroup;
