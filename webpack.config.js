var ExtractTextPlugin = require('extract-text-webpack-plugin');
var ReactStyleLoader = require('./loader');

module.exports = {
  entry: "./example.js",
  output: {
    filename: "bundle.js",
    path: __dirname + "/assets",
    publicPath: "assets/"
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: [
          ReactStyleLoader(),
          'jsx-loader?harmony'
        ]
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('bundle.css')
  ]
};
