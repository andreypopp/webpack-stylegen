var ReactStyle = require('../lib/index');
var React = require('react');

var Button = React.createClass({

  style: ReactStyle.declareStyleClass(function() {
    return {color: 'red'};
  }, 'Button'),

  render: function() {}

});

module.exports = Button;
