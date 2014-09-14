'use strict';

var ReactStyle = require('../lib/index');
var React = require('react');
var Button = require('./lib/Button');
var utils = require('./utils');
var Block = require('./lib/layout/Block');

var Application = React.createClass({

  style: ReactStyle.declareStyle(function() {
    return {backgroundColor: utils};
  }),

  render: function() {

  }

});

module.exports = Application;
