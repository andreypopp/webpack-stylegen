var ExtractTextPlugin = require('extract-text-webpack-plugin');
var ReactStyleLoader  = require('../lib/loader');
var extract           = require.resolve('../lib/loader/extract');

module.exports = {
  entry: [
    './index.js',
    ReactStyleLoader() + '!./index.js',
  ],
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
          extract,
          'jsx-loader?harmony'
        ]
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('bundle.css')
  ]
};
