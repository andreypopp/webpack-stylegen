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

var TextAlignSwitcher = React.createClass({

  render() {
    return (
      <ButtonGroup>
        <Button
          active={this.props.textAlign === 'left'}
          onClick={this.props.onTextAlign.bind(null, 'left')}>
          <Icon name="align-left" /> Left
        </Button>
        <Button
          active={this.props.textAlign === 'center'}
          onClick={this.props.onTextAlign.bind(null, 'center')}>
          <Icon name="align-center" /> Center
        </Button>
        <Button
          active={this.props.textAlign === 'right'}
          onClick={this.props.onTextAlign.bind(null, 'right')}>
          <Icon name="align-right" /> Right
        </Button>
      </ButtonGroup>
    );
  }
});

var Application = React.createClass({

  style: ReactStyle({
    backgroundColor: 'white',
    fontSize: '10pt',
    padding: '1em',
    children: {
      marginRight: '0.5em',
    },
    lastChild: {
      marginRight: 0
    }
  }),

  render() {
    var styles = [
      this.style,
      ReactStyle({textAlign: this.state.textAlign})
    ];
    return (
      <div styles={styles}>
        {ReactStyle.styleChildren([
          <h1>Applicaiton</h1>,
          <Button styles={Button.styles.success}>
            <Icon name="cog" /> OK
          </Button>,
          <Button styles={Button.styles.error}>
            <Icon name="remove" /> Cancel
          </Button>,
          <TextAlignSwitcher
            textAlign={this.state.textAlign}
            onTextAlign={this.onTextAlign}
            />
          ], this.style)}
      </div>
    );
  },

  getInitialState() {
    return {textAlign: 'left'};
  },

  onTextAlign(textAlign) {
    this.setState({textAlign});
  }

});

if (typeof window !== 'undefined') {
  React.renderComponent(<Application />, document.getElementById('app'));
}

module.exports = Application;
