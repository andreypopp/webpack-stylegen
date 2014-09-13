'use strict';

module.exports = function guard(src) {
  this && this.cacheable && this.cacheable();
  return src;
};

module.exports.pitch = function pitchGuard(remainingRequest) {
  this && this.cacheable && this.cacheable();
  var callback = this.async();
  this._compiler.inputFileSystem.readFile(this.resourcePath, function(err, src) {
    if (err) {
      return callback(err);
    }
    src = src.toString();
    if (/ReactStyle/.exec(src)) {
      callback();
    } else {
      callback(null, "// removed");
    }
  });
}

