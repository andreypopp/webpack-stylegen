var ReactStyle = require('../lib/index');
var React = require('react');
var x;
require('./dep-with-style');
var dep = require('./dep');

var Component = React.createClass({

  style: ReactStyle.declareStyleClass({
    backgroundColor: 'red'
  }, 'Component'),

  render: function() {}

});

module.exports = [[module.id, 'example: ' + dep + '\n', '']];
