/**
 * @jsx React.DOM
 */
'use strict';

var ReactStyle = require('../../lib/index');
var React = require('react');

var Button = React.createClass({

  style: ReactStyle.create({
    color: 'red'
  }),

  render: function() {
    return <button styles={this.style}>Click me</button>;
  }

});

module.exports = Button;
