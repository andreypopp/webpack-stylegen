var ReactStyle = require('../../../lib/index');
var React = require('react');

var Block = React.createClass({

  style: ReactStyle.declareStyle(function() {
    return {left: 2};
  }),

  hoverStyle: ReactStyle.declareStyle(function() {
    return {top: 1};
  }),

  render: function() {}

});

module.exports = Block;
