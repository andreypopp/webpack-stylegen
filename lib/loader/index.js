'use strict';

var ExtractTextPlugin = require('extract-text-webpack-plugin');
var entry             = require.resolve('./entry');

module.exports = function ReactStyleLoader() {
  return [ExtractTextPlugin.extract(), entry].join('!');
};
