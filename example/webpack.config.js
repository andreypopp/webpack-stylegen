var ReactStylePlugin = require('../lib/webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: './index.js',
  output: {
    filename: "bundle.js",
    path: __dirname + "/build",
  },
  resolve: {
    alias: {
      'react-style/lib/utils$': require.resolve('../lib/utils'),
      'react-style$': require.resolve('../lib/index')
    }
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: [
          ReactStylePlugin.loader(),
          'jsx-loader?harmony'
        ]
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('css-loader')
      },
      {
        test: /\.(otf|eot|svg|ttf|woff)$/,
        loader: 'url-loader?limit=8192'
      }
    ]
  },
  plugins: [
    new ReactStylePlugin('bundle.css')
  ]
};
