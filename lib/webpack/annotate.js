'use strict';

var crypto            = require('crypto');
var path              = require('path');
var recast            = require('recast');
var annotateStyleName = require('../annotateStyleName');

function findPackageMetadata(fs, dirname, cb) {
  var filename = path.join(dirname, 'package.json');
  fs.readFile(filename, function(err, contents) {
    if (!err) {
      try {
        var metadata = JSON.parse(contents.toString());
      } catch (parseErr) {
        return cb(parseErr);
      }
      return cb(null, metadata, filename);
    }
    dirname = path.join(dirname, '..');
    if (dirname === '/' || /node_modules\/?$/.exec(dirname)) {
      return cb(null, null);
    }
    findPackageMetadata(fs, dirname, cb);
  });
}


function transform(src, prefix) {
  var tree = recast.parse(src);
  tree = annotateStyleName(tree, {prefix: prefix});
  src = recast.print(tree).code;
  return src;
}

var IGNORE_PATH_SEGMENTS = ['', '.', '..', 'lib', 'src'];

module.exports = function annotate(src) {
  this && this.cacheable && this.cacheable();
  if (!/ReactStyle/.exec(src)) {
    return src;
  }

  var callback = this.async();
  var fs = this._compiler.inputFileSystem;

  findPackageMetadata(fs, this.context, function(err, metadata, filename) {
    if (err) {
      return callback(err);
    }
    if (metadata !== null) {
      var prefix = metadata.name;
      var subPrefix = path.relative(path.dirname(filename), this.context)
        .split('/')
        .filter(function(p) {
          return IGNORE_PATH_SEGMENTS.indexOf(p) === -1;
        })
        .join('-');
      if (subPrefix.length > 0) {
        prefix = prefix + '-' + subPrefix;
      }
    } else {
      var hash = crypto.createHash('sha1');
      hash.update(this.resourcePath);
      var prefix = hash.digest('hex').slice(0, 6);
    }
    src = transform(src, prefix);
    callback(null, src);
  }.bind(this));

};
