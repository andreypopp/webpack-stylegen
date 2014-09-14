'use strict';

var path                        = require('path');
var mergeInto                   = require('react/lib/mergeInto');
var ExtractTextPlugin           = require('extract-text-webpack-plugin');
var entry                       = require.resolve('./entry');
var ExtractTextPlugin__dirname  = path.dirname(require.resolve('extract-text-webpack-plugin'));

function ReactStylePlugin(id, filename, options) {
  this.extractTextPlugin = new ExtractTextPlugin(id, filename, options);
}

ReactStylePlugin.prototype.patchEntries = function(compiler) {
  if (!Array.isArray(compiler.options.entry)) {
    compiler.options.entry = [compiler.options.entry];
  }
  var entries = compiler.options.entry.concat();
  compiler.options.entry = [];
  entries.forEach(function(entry) {
    compiler.options.entry.push(entry, styleEntryLoader(entry));
  });
}

ReactStylePlugin.prototype.apply = function(compiler) {
  this.patchEntries(compiler);
  this.extractTextPlugin.apply(compiler);
  var classNames = {};
	compiler.plugin('this-compilation', function(compilation) {
		compilation.plugin('normal-module-loader', function(loaderContext, module) {
		  var extractText = loaderContext[ExtractTextPlugin__dirname];
		  loaderContext[ExtractTextPlugin__dirname] = function(content, opt) {
		    if (content && content.__classNames) {
		      mergeInto(classNames, content.__classNames);
        }
		    return extractText(content, opt);
      }
    });
  });
  compiler.plugin('compilation', function(compilation) {
    compilation.mainTemplate.plugin('startup', function(source) {
      return [
        'if (typeof window !== "undefined") {',
        '  window.__ReactStyle__ = ' + JSON.stringify(classNames) + ';',
        '}'
      ].join('\n') + source;
    });
  });
}

ReactStylePlugin.loader = function() {
  return require.resolve('./annotate');
}

function styleEntryLoader(request) {
  return [ExtractTextPlugin.extract(), entry, request].join('!');
};

module.exports = ReactStylePlugin;
