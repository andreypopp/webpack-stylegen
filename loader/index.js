'use strict';

var multi = require('multi-loader');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = function make(before) {
  before = before || require.resolve('style-loader');
  return multi(
    ExtractTextPlugin.extract(before, require.resolve('./style')),
    require.resolve('./source')
  );
};
