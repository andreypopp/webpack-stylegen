# React Style

Define styles using full power of JavaScript:

    var ReactStyle = require('react-style')

    var style = ReactStyle({
      color: 'red',
      backgroundColor: 'white'
    })

Use defined styles to style React components:

    <div styles={style}>Hello, world!</div>

React Style analyzes source code and compile static styles into CSS bundle.
