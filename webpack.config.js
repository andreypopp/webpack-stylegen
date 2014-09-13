var ExtractTextPlugin = require('extract-text-webpack-plugin');
var ReactStyleLoader = require('./loader');

module.exports = {
  entry: [
    './example.js',
    ReactStyleLoader() + '!./example.js',
  ],
  output: {
    filename: "bundle.js",
    path: __dirname + "/assets",
    publicPath: "assets/"
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'jsx-loader?harmony'
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('bundle.css')
  ],
  node: {
    console: false,
    process: false,
    global: true,
    buffer: true,
    __filename: "mock",
    __dirname: "mock"
  }
};
