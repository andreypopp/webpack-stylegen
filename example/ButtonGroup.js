/**
 * @jsx React.DOM
 */
'use strict';

var React           = require('react');
var ReactStyle      = require('react-style');

var ButtonGroup = React.createClass({

  childStyles: {
    Button: ReactStyle({
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
    })
  },

  style: ReactStyle({
    display: 'inline-block'
  }),

  render() {
    var styles = [this.style, this.props.styles];
    return <div styles={styles}>{this.props.children}</div>;
  }
});

module.exports = ButtonGroup;
