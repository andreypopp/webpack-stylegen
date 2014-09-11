
var multi = require('multi-loader');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

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
          multi(
            ExtractTextPlugin.extract('style-loader', require.resolve('./loader/style')),
            require.resolve('./loader/source')
          ),
          'jsx-loader?harmony'
        ]
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin("styles.css")
  ]
};
