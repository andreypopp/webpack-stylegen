var ReactStyle = require('../../lib/index');
var React = require('react');

var Button = React.createClass({

  style: ReactStyle.declareStyle(function() {
    return {color: 'red'};
  }),

  hoverStyle: ReactStyle.declareStyle(function() {
    return {color: 'white'};
  }),

  render: function() {}

});

module.exports = Button;
