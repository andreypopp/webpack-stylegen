/**
 * @jsx React.DOM
 */
'use strict';

var React      = require('react');
var ReactStyle = require('react-style');
var Icon       = require('react-fa');
var Button     = require('./Button');
var utils      = require('./utils');

var Application = React.createClass({

  style: ReactStyle({
    backgroundColor: utils
  }),

  render: function() {
    return (
      <div styles={this.style}>
        Applicaiton
        <Button primary>
          <Icon name="cog" /> OK
        </Button>
        <Button>
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
