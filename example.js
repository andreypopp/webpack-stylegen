var ReactStyle = 1;
var x;
var React = require('react');
var Component = React.createClass({render: function() {
  x = 12;
}});
require('./dep-with-style');
var dep = require('./dep');
module.exports = 'example has ' + dep;
