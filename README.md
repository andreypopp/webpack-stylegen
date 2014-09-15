# React Style

React Style is an approach for styling [React][] components.

Define styles using full power of JavaScript:

    var ReactStyle = require('react-style')

    var styles = ReactStyle({
      color: 'red',
      backgroundColor: 'white'
    })

Style React components:

    var HelloWorld = React.createClass({

      render() {
        return <div styles={styles}>Hello, world!</div>
      }
    })

React Style provides [Webpack][] plugin which analyzes your source code to
extract styles into CSS bundle. Otherwise styles end up in DOM as inline styles.

## Webpack configuration

Use the following minimal `webpack.config.js` to make React Style work for
`*.js` files:

    var ReactStylePlugin = require('react-style/lib/webpack');

    module.exports = {
      module: {
        loaders: [
          {
            test: /\.js$/,
            loader: ReactStylePlugin.loader()
          }
        ]
      },
      plugins: [
        new ReactStylePlugin('bundle.css')
      ]
    };

## Theming

[Webpack]: https://webpack.github.io
[React]: https://facebook.github.io/react/
