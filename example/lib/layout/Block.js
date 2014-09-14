/**
 * @jsx React.DOM
 */
'use strict';

var ReactStyle = require('../../../lib/index');
var React = require('react');

var style = ReactStyle.create({
  left: 2
});

var Block = React.createClass({

  hoverStyle: ReactStyle.create({
    top: 1
  }),

  render: function() {
    return <div styles={[this.hoverStyle, style]}>Block</div>;
  }

});

module.exports = Block;
