/**
 * @jsx React.DOM
 */
'use strict';

require('normalize.css/normalize.css');

var React      = require('react');
var ReactStyle = require('react-style');
var {rgb}      = require('react-style/lib/utils');
var Icon       = require('react-fa');
var Button     = require('./Button');

var success = ReactStyle({
  color: 'white',
  background: rgb(28, 184, 65)
});

var error = ReactStyle({
  color: 'white',
  background: rgb(202, 60, 60)
});

var Application = React.createClass({

  style: ReactStyle({
    backgroundColor: 'white',
    fontFamily: '"Myriad Pro", sans-serif',
    padding: '1em'
  }),

  render: function() {
    return (
      <div styles={this.style}>
        Applicaiton
        <Button primary style={success}>
          <Icon name="cog" /> OK
        </Button>
        <Button style={error}>
          <Icon name="remove" /> Cancel
        </Button>
        <Button active>
          Active
        </Button>
      </div>
    );
  }

});

if (typeof window !== 'undefined') {
  React.renderComponent(<Application />, document.getElementById('app'));
}

module.exports = Application;
