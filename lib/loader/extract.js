'use strict';

var crypto              = require('crypto');
var recast              = require('recast');
var path                = require('path');
var extractStyleClasses = require('../extractStyleClasses');

function findPackageMetadata(fs, dirname, cb) {
  var filename = path.join(dirname, 'package.json');
  fs.readFile(filename, function(err, contents) {
    if (!err) {
      try {
        var metadata = JSON.parse(contents.toString());
      } catch (parseErr) {
        return cb(parseErr);
      }
      return cb(null, metadata);
    }
    dirname = path.join(dirname, '..');
    if (dirname === '/') {
      return cb(null, null);
    }
    findPackageMetadata(fs, dirname, cb);
  });
}


function transform(src, prefix) {
  var tree = recast.parse(src);
  tree = extractStyleClasses(tree, {prefix: prefix});
  src = recast.print(tree).code;
  return src;
}

module.exports = function extract(src) {
  this && this.cacheable && this.cacheable();
  if (!/ReactStyle/.exec(src)) {
    return src;
  }

  var callback = this.async();
  var fs = this._compiler.inputFileSystem;

  findPackageMetadata(fs, this.context, function(err, metadata) {
    if (err) {
      return callback(err);
    }
    if (metadata !== null) {
      var prefix = metadata.name;
    } else {
      var hash = crypto.createHash('sha1');
      hash.update(this.resourcePath);
      var prefix = hash.digest('hex').slice(0, 6);
    }
    src = transform(src, prefix);
    callback(null, src);
  }.bind(this));

};
