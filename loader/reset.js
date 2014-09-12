'use strict';

var rewrite = require.resolve('./rewrite');

module.exports = function reset(src) {
  this && this.cacheable && this.cacheable();
  return src;
};

module.exports.pitch = function(remainingRequest) {
  this && this.cacheable && this.cacheable();
  remainingRequest = remainingRequest.split('!');
  remainingRequest.shift();
  remainingRequest.unshift(rewrite);
  return "module.exports = require('!!" + remainingRequest.join('!') + "')";
}
