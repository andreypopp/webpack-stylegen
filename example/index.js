'use strict';

var ReactStyle = require('../lib/index');
var React = require('react');
var Button = require('./Button');
var utils = require('./utils');

var Application = React.createClass({

  style: ReactStyle.declareStyleClass(function() {
    return {backgroundColor: utils};
  }, 'Application'),

  render: function() {}

});

module.exports = Application;
