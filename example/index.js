/**
 * @jsx React.DOM
 */
'use strict';

require('normalize.css/normalize.css');

var React       = require('react');
var ReactStyle  = require('react-style');
var {rgb}       = require('react-style/lib/utils');
var Icon        = require('react-fa');
var Button      = require('./Button');
var ButtonGroup = require('./ButtonGroup');

var Application = React.createClass({

  style: ReactStyle({
    backgroundColor: 'white',
    fontSize: '10pt',
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
        <Button styles={Button.styles.success}>
          <Icon name="cog" /> OK
        </Button>
        <Button styles={Button.styles.error}>
          <Icon name="remove" /> Cancel
        </Button>
        <ButtonGroup>
          <Button>
            <Icon name="align-left" /> Left
          </Button>
          <Button>
            <Icon name="align-center" /> Center
          </Button>
          <Button>
            <Icon name="align-right" /> Right
          </Button>
        </ButtonGroup>
      </div>
    );
  }

});

if (typeof window !== 'undefined') {
  React.renderComponent(<Application />, document.getElementById('app'));
}

module.exports = Application;
