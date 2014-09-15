/**
 * @jsx React.DOM
 */
'use strict';

var React       = require('react');
var ReactStyle  = require('react-style');
var {
  none, stop, transparent, inset, pointer, center, nowrap, baseline, normal,
  inherit, inlineBlock,
  rgba, rgb, linearGradient,
  shadows, shadow, border, padding
} = require('react-style/lib/utils');

var baseStyle = ReactStyle({
  display: inlineBlock,
  zoom: 1,
  lineHeight: normal,
  whiteSpace: nowrap,
  verticalAlign: baseline,
  textAlign: center,
  cursor: pointer,
  userSelect: none
});

var activeStyle = ReactStyle({
  boxShadow: shadow(
               {blur: '1px', color: rgba(0, 0, 0, 0.15), type: inset},
               {blur: '6px', color: rgba(0, 0, 0, 0.20), type: inset})
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
  fontFamily: inherit,
  fontSize: '100%',
  padding: padding('0.5em', '1em'),
  color: rgba(0, 0, 0, 0.80),
  border: border(none, rgba(0, 0, 0, 0)),
  backgroundColor: '#E6E6E6',
  textDecoration: none,
  borderRadius: '6px',
  onActive: activeStyle,
  onHover: hoverStyle,
  onFocus: focusStyle
});

var Button = React.createClass({

  render() {
    var styles = [
      baseStyle,
      style,
      this.props.active && activeStyle
    ].concat(this.props.styles);
    return (
      <button styles={styles}>
        {this.props.children}
      </button>
    );
  },

  statics: {
    styles: {
      primary: ReactStyle({
        backgroundColor: rgb(0, 120, 231),
        color: '#fff'
      }),

      success: ReactStyle({
        color: 'white',
        background: rgb(28, 184, 65)
      }),

      error: ReactStyle({
        color: 'white',
        background: rgb(202, 60, 60)
      })
    }
  }

});

module.exports = Button;
