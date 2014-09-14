/**
 * @jsx React.DOM
 */
'use strict';

var React       = require('react');
var ReactStyle  = require('react-style');

var baseStyles = ReactStyle({
  display: 'inline-block',
  zoom: 1,
  lineHeight: 'normal',
  whiteSpace: 'nowrap',
  verticalAlign: 'baseline',
  textAlign: 'center',
  cursor: 'pointer',
  userSelect: 'none'
});

var styles = ReactStyle({
  fontFamily: 'inherit',
  fontSize: '100%',
  padding: '0.5em 1em',
  color: 'rgba(0, 0, 0, 0.80)',
  border: 'none rgba(0, 0, 0, 0)',
  backgroundColor: '#E6E6E6',
  textDecoration: 'none',
  borderRadius: '2px',
  ':active': {
    boxShadow: '0 0 0 1px rgba(0,0,0, 0.15) inset, 0 0 6px rgba(0,0,0, 0.20) inset'
  },
  ':hover': {
    backgroundImage: 'linear-gradient(transparent, rgba(0,0,0, 0.05) 40%, rgba(0,0,0, 0.10))'
  },
  ':focus': {
    backgroundImage: 'linear-gradient(transparent, rgba(0,0,0, 0.05) 40%, rgba(0,0,0, 0.10))',
    outline: 'none'
  }
});

var primaryStyles = ReactStyle({
  backgroundColor: 'rgb(0, 120, 231)',
  color: '#fff'
});

var Button = React.createClass({

  render: function() {
    return (
      <button styles={[baseStyles, styles, this.props.primary && primaryStyles]}>
        {this.props.children}
      </button>
    );
  }

});

module.exports = Button;
