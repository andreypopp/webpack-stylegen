var ReactStylePlugin = require('../lib/webpack');

module.exports = {
  entry: './index.js',
  output: {
    filename: "bundle.js",
    path: __dirname + "/build",
    publicPath: "build/"
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: [
          ReactStylePlugin.loader(),
          'jsx-loader?harmony'
        ]
      }
    ]
  },
  plugins: [
    new ReactStylePlugin('bundle.css')
  ]
};
