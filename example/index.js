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

var Application = React.createClass({

  style: ReactStyle({
    backgroundColor: 'white',
    fontSize: '11pt',
    padding: '1em',
    children: {
      marginRight: '0.5em',
      lastChild: {marginRight: 0}
    }
  }),

  render: function() {
    return (
      <div styles={this.style}>
        <h1>Applicaiton</h1>
        <Button style={Button.styles.success}>
          <Icon name="cog" /> OK
        </Button>
        <Button style={Button.styles.error}>
          <Icon name="remove" /> Cancel
        </Button>
        <Button active>
          Active
        </Button>
        <Button>
          Button
        </Button>
      </div>
    );
  }

});

if (typeof window !== 'undefined') {
  React.renderComponent(<Application />, document.getElementById('app'));
}

module.exports = Application;
