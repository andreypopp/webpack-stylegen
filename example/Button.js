/**
 * @jsx React.DOM
 */
'use strict';

var React       = require('react');
var ReactStyle  = require('react-style');
var {
  none, stop, transparent,
  rgba, rgb, linearGradient
} = require('react-style/lib/utils');

var baseStyle = ReactStyle({
  display: 'inline-block',
  zoom: 1,
  lineHeight: 'normal',
  whiteSpace: 'nowrap',
  verticalAlign: 'baseline',
  textAlign: 'center',
  cursor: 'pointer',
  userSelect: none
});

var activeStyle = ReactStyle({
  boxShadow: '0 0 0 1px rgba(0,0,0, 0.15) inset, 0 0 6px rgba(0,0,0, 0.20) inset'
});

var hoverStyle = ReactStyle({
  backgroundImage: linearGradient(
                     transparent,
                     stop(rgba(0,0,0, 0.05), '40%'),
                     rgba(0,0,0, 0.10))
});

var focusStyle = ReactStyle({
  backgroundImage: linearGradient(
                     transparent,
                     stop(rgba(0,0,0, 0.05), '40%'),
                     rgba(0,0,0, 0.10)),
  outline: none
});

var style = ReactStyle({
  fontFamily: 'inherit',
  fontSize: '100%',
  padding: '0.5em 1em',
  color: rgba(0, 0, 0, 0.80),
  border: 'none rgba(0, 0, 0, 0)',
  backgroundColor: '#E6E6E6',
  textDecoration: none,
  borderRadius: '2px',
  onActive: activeStyle,
  onHover: hoverStyle,
  onFocus: focusStyle
});

var primaryStyle = ReactStyle({
  backgroundColor: rgb(0, 120, 231),
  color: '#fff'
});

var Button = React.createClass({

  render: function() {
    var styles = [
      baseStyle,
      style,
      this.props.primary && primaryStyle,
      this.props.active && activeStyle
    ];
    return (
      <button styles={styles}>
        {this.props.children}
      </button>
    );
  }

});

module.exports = Button;
