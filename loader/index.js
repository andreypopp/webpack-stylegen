'use strict';

var ExtractTextPlugin = require('extract-text-webpack-plugin');
var style             = require.resolve('./style');
var styleEntry        = require.resolve('./style-entry');

module.exports = function ReactStyleLoader() {
  return ExtractTextPlugin.extract('style-loader', style) + '!' + styleEntry;
};
