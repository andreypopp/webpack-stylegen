'use strict';

var ExtractTextPlugin = require('extract-text-webpack-plugin');
var styleEntry        = require.resolve('./style-entry');

module.exports = function ReactStyleLoader() {
  return ExtractTextPlugin.extract() + '!' + styleEntry;
};
