/**
 * @jsx React.DOM
 */
'use strict';

var ReactStyle = require('../lib/index');
var React      = require('react');
var Button     = require('./lib/Button');
var utils      = require('./utils');
var Block      = require('./lib/layout/Block');

var Application = React.createClass({

  style: ReactStyle({
    backgroundColor: utils
  }),

  render: function() {
    return (
      <div styles={this.style}>
        Applicaiton
        <div styles={ReactStyle({backgroundColor: 'orange'})}>
          dynamic
        </div>
      </div>
    );
  }

});

module.exports = Application;
